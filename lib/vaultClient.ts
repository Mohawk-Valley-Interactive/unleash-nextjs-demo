import vault from "node-vault";

export async function getDatabaseUrl(): Promise<string> {
  console.log(`Vault URL: ${process.env["VAULT_ADDR"]}`);
  console.log(`Vault Token: ${process.env["VAULT_TOKEN"]}`);
  let databaseUrl = "";

  try {
    const vaultClient = vault();

    // Adjust the path according to your Vault setup
    const secret = await vaultClient.read("database/creds/demo-app-role");
    const {username, password} = secret.data;
    databaseUrl = username && password ? `postgresql://${username}:${password}@db:5432/mydb?schema=public` : "";

    console.log("Database URL:", databaseUrl);
  } catch (error) {
    console.error("Error fetching database credentials from Vault:", error);
  }

  return databaseUrl;
}
