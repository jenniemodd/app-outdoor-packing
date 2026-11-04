/**
 * Hur en pryl ser ut när den kommer från API:t.
 * response.json() returnerar `any`, så den här typen är vårt löfte till TypeScript.
 * Docs: https://shelf-api-mu.vercel.app/docs (under "Schemas")
 */
export type Item = {
  id: string // skapas av servern
  title: string // "Pannlampa"
  subtitle: string // märke, modell, vikt
  category: string // "Kläder", "Mat"...
  status: string // "Att skaffa", "Har" eller "Packad"
  rating: number | null // 1–5, eller null om ej betygsatt
  imageUrl: string // länk till bild, eller tom text
  notes: string // egna anteckningar
  tags: string[] // aktiviteter och turlängd: ["vandring", "dagstur"]
  date: string | null // senast använd, "2026-09-14", eller null
  createdAt: string // när prylen skapades, sätts av servern
  updatedAt: string // senast ändrad, sätts av servern
}