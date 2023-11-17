import k8s from "@kubernetes/client-node";
import fs from "fs/promises";
import { parse, stringify } from "envfile";
const kc = new k8s.KubeConfig();
const NAMESPACE = "pensjon-q2";
const SECRET_SUBSET = "pensjon-bpc-q2";
const ENV_FILE = ".env";

kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

const wantedSecrets = [
  "AZURE_APP_CLIENT_ID",
  "AZURE_APP_CLIENT_SECRET",
  "AZURE_APP_TENANT_ID",
  "AZURE_OPENID_CONFIG_ISSUER",
  "AZURE_OPENID_CONFIG_TOKEN_ENDPOINT"
]

k8sApi.listNamespacedSecret(NAMESPACE).then((res) => {
  const secrets = res.body.items;
  const azureSecret = secrets.find((secret) => {
    return secret.metadata?.name?.includes(SECRET_SUBSET);
  });

  var fetchSecrets = Object.fromEntries(wantedSecrets.map(function (wantedSecret) {
    return [wantedSecret,  (azureSecret?.data &&
    Buffer.from(azureSecret.data[wantedSecret], "base64").toString(
        "ascii"
    ))];
  }))

  console.log(fetchSecrets)

  writeEnv(fetchSecrets)
});

const writeEnv = async (secrets) => {
  const rawEnvFile = await fs
    .readFile(ENV_FILE, { encoding: "utf8" })
    .catch(() =>
      console.log(`No env file ${ENV_FILE}. Will create a new one.`)
    );

  const env = (rawEnvFile && parse(rawEnvFile)) ?? {};

  const updatedEnvObj = {
    AZURE_CALLBACK_URL: 'http://localhost:3000/auth/callback',
    PEN_URL: 'http://localhost:8089/pen',
    PEN_SCOPE: 'api://dev-fss.pensjon-q2.pensjon-pen-q2/.default',
    ENABLE_OAUTH20_CODE_FLOW: 'true',
    ...env,
    ...secrets,
  };

  const newEnvFile = stringify(updatedEnvObj);
  fs.writeFile(ENV_FILE, newEnvFile).then(() => {
    console.log(`New env file "${ENV_FILE}" created`);
  });
};
