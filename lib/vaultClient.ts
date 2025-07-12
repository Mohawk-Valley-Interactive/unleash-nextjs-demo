import vault from "node-vault";

export async function getDatabaseUrl(): Promise<string> {
  const vaultClient = vault({
    endpoint: process.env["VAULT_ADDR"],
    token: process.env["VAULT_TOKEN"],
  });

  // Adjust the path according to your Vault setup
  const secret = await vaultClient.read("database/creds/demo-app-role");
  const {username, password} = secret.data;
  const databaseUrl = username && password ? `postgresql://${username}:${password}@db:5432/mydb?shema=public` : "";

  return databaseUrl || process.env["DATABASE_URL"] || "";
}
