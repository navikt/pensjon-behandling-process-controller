#!/bin/bash

env="q2"

bold=$(tput bold)
normal=$(tput sgr0)
white="[97;1m"
yellow="[33;1m"
endcolor="[0m"

HAR_NAIS_CLI=$(command -v nais >& /dev/null ; echo $?)

if [ $HAR_NAIS_CLI ]; then
  DISCONNECT_STATUS=$(nais device status | grep -c Disconnected)	

  if [ $DISCONNECT_STATUS -eq 1 ]; then
    read -p "Du er ikke koblet til med naisdevice. Vil du koble til? (j/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[YyjJ]$ ]]; then
      nais device connect
    else
      echo "Du må være koblet til med naisdevice, avslutter"
      exit 1
    fi
  fi
fi

base64 --help >& /dev/null || (
  echo "ERROR: You need to install the base64 tool on your machine. (brew install base64 on macOS)" && exit 1
) || exit 1
which kubectl >& /dev/null || (
  echo "ERROR: You need to install and configure kubectl (see: https://confluence.adeo.no/x/UzjYF)" && exit 1
) || exit 1

gcloud auth print-access-token >& /dev/null || (
  echo "Inlogging i GCP er utløpt. Kjør 'gcloud auth login'" && exit 1
) || exit 1

declare -a azureAdFields=(
  "AZURE_APP_CLIENT_ID"
  "AZURE_APP_CLIENT_SECRET"
  "AZURE_APP_TENANT_ID"
  "AZURE_OPENID_CONFIG_ISSUER"
  "AZURE_OPENID_CONFIG_TOKEN_ENDPOINT"
)

rm -f .env
touch .env

echo

echo -e "${bold}Henter secrets fra Kubernetes${normal}"

mkdir -p secrets/q2/nais.io/azure
for i in "${azureAdFields[@]}"
do
    echo -n -e "\t- $i "
    echo -n $i= >> .env
    kubectl --context=dev-gcp -n pensjon-q2 get secret "$(kubectl --context=dev-gcp -n pensjon-q2 get secrets | grep "azure-pensjon-bpc-q2" | tail -1 | awk '{print $1}')" -o jsonpath="{.data.$i}" | base64 --decode >> .env
    echo >> .env
    echo -e "${bold}${white}✔${endcolor}${normal}"
done

echo AZURE_CALLBACK_URL=http://localhost:3000/auth/callback >> .env
echo PEN_URL=http://localhost:8089/pen >> .env
echo PEN_SCOPE=api://dev-fss.pensjon-q2.pensjon-pen-q2/.default >> .env
echo ENABLE_OAUTH20_CODE_FLOW=true >> .env
echo ENV=q2 >> .env
echo PEN_APPLICATION=pensjon-pen-q2 >> .env

echo

echo "${bold}Hentet hemmeligheter og oppdatert .env fil ${normal}"
