#!/bin/bash

env="q2"

bold=$(tput bold)
normal=$(tput sgr0)
white="[97;1m"
red="[31;1m"
endcolor="[0m"

command -v base64 >/dev/null 2>&1 || { echo -e >&2 "${red}Du må installere installere base64 (brew install base64 on macOS)${endcolor}"; exit 1; }
command -v kubectl >/dev/null 2>&1 || { echo -e >&2 "${red}Du må installere kubectl (https://docs.nais.io/basics/access/)${endcolor}"; exit 1; }
command -v gcloud >/dev/null 2>&1 || { echo -e >&2 "${red}Du må installere gcloud (https://docs.nais.io/basics/access/)${endcolor}"; exit 1; }
command -v gcloud >/dev/null 2>&1 || { echo -e >&2 "${red}Du må installere gcloud (https://docs.nais.io/basics/access/)${endcolor}"; exit 1; }

if command -v nais >& /dev/null; then
  DISCONNECT_STATUS=$(nais device status | grep -c Disconnected)

  if [ $DISCONNECT_STATUS -eq 1 ]; then
    read -p "Du er ikke koblet til med naisdevice. Vil du koble til? (j/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[YyjJ]$ ]]; then
      nais device connect
    else
      echo -e "${red}Du må være koblet til med naisdevice, avslutter${endcolor}"
      exit 1
    fi
  fi
fi

gcloud auth print-access-token >& /dev/null || (
  echo "Inlogging i GCP er utløpt. Kjør 'gcloud auth login'" && exit 1
) || exit 1

function fetch_kubernetes_secret {
    local context=$1
    local namespace=$2
    local secret=$3
    local name=$4

    echo -n -e "\t$name "

    {
      echo -n "$name="
      kubectl --context="$context" -n "$namespace" get secret "$(kubectl --context=$context -n $namespace get secrets | grep $secret | tail -1 | awk '{print $1}')" -o json | jq -j ".data[\"$name\"]" | base64 --decode
      echo
    } >> .env

    echo -e "${bold}${white}✔${endcolor}${normal}"
}

function fetch_kubernetes_secret_array {
    local context=$1
    local namespace=$2
    local secret=$3
    local A=("$@")

    for i in "${A[@]:3}"
    do
        fetch_kubernetes_secret "$context" "$namespace" "$secret" "$i"
    done
}

rm -f .env
touch .env

echo

echo -e "${bold}Henter secrets fra Kubernetes${normal}"

fetch_kubernetes_secret_array "dev-gcp" "pensjon-$env" "azure-pensjon-bpc-$env" \
  "AZURE_APP_CLIENT_ID" \
  "AZURE_APP_CLIENT_SECRET" \
  "AZURE_APP_TENANT_ID" \
  "AZURE_OPENID_CONFIG_ISSUER" \
  "AZURE_OPENID_CONFIG_TOKEN_ENDPOINT"

{
  echo AZURE_CALLBACK_URL=http://localhost:3000/auth/callback
  echo PEN_URL=http://localhost:8089/pen
  echo PEN_SCOPE=api://dev-fss.pensjon-q2.pensjon-pen-q2/.default
  echo ENABLE_OAUTH20_CODE_FLOW=true
  echo ENV=q2
  echo PEN_APPLICATION=pensjon-pen-q2
} >> .env

echo

echo "${bold}Hentet hemmeligheter og oppdatert .env fil ${normal}"
