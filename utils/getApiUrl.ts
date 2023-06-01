export default function getApiUrl() {
  return process.env.API_URL || "http://localhost:3000"; // fallback should include http:// or https:// etc
}
