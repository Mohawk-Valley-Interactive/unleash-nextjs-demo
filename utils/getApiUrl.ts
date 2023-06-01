export default function getApiUrl() {
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"; // fallback should include http:// or https:// etc
}
