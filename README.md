# Packlistan

En packapp för friluftsmänniskor. Välj aktivitet och turlängd, se vad som behöver packas och bocka av allt eftersom det hamnar i ryggsäcken.

**Live:** https://app-outdoor-packing.vercel.app/
**Repo:** https://github.com/jenniemodd/app-outdoor-packing

Inlämning 2 i kursen JavaScript-ramverk.

## Bakgrund

Uppgiften var att bygga en React-app mot ett externt API. Grunden var Questlog, en backlog för spel, men vi fick också välja ett mer allmänt API, Shelf API, och själva bestämma vad appen skulle handla om.

Jag tycker om att bygga saker som är funktionella och som jag själv vill använda. Så jag utgick från något jag saknar. Varje gång jag ska ut på tur, oavsett om det är en dagstur eller en flerdagstur, glömmer jag något. Mina packlistor har legat i Anteckningar på iPhonen, men där är det krångligt att bocka av, och svårt att snabbt se vad jag behöver köpa, vad jag har hemma och vad som redan är packat.

Därför byggde jag Packlistan: en app där varje pryl har en status, där listan går att filtrera på aktivitet, turlängd och kategori, och där jag ser direkt hur mycket som är kvar att packa.

---

## Funktioner

- **Packlista grupperad per kategori:** Kläder, Mat, Sova & boende, Säkerhetsutrustning och Övrig utrustning
- **Status direkt i listan:** varje pryl är *Att skaffa*, *Har* eller *Packad*, och statusen ändras med ett tryck
- **Förlopp:** visar hur mycket av packningen som är klar, till exempel "5 av 8 packade"
- **Fyra filter som kan kombineras:** aktivitet (vandring, turskidåkning, topptur, längdskidåkning), turlängd (dagstur, flerdagstur), kategori och status
- **Filtren sparas** i webbläsaren och finns kvar efter omladdning
- **Packa upp allt:** gör alla packade prylar till *Har* igen inför nästa tur. Följer de valda filtren
- **Lägg till, ändra och ta bort** prylar
- **Mobile first** och användbar med tangentbord och skärmläsare

## Kom igång

Kräver Node.js.

```bash
git clone https://github.com/DITT-ANVÄNDARNAMN/app-outdoor-packing.git
cd app-outdoor-packing
npm install
npm run dev
```

Appen startar på http://localhost:5173.

| Kommando | Gör |
|---|---|
| `npm run dev` | Startar utvecklingsservern |
| `npm run build` | Kontrollerar TypeScript och bygger för produktion |
| `npm run preview` | Visar det byggda resultatet lokalt |

## Teknik

- React 19 och TypeScript
- Vite
- React Router (`createBrowserRouter` med layout)
- CSS Modules med gemensamma designvariabler
- Deployad på Vercel

TypeScript är låst till version 6.0, eftersom `typescript-eslint` ännu inte stöder version 7.

## API

Appen använder [Shelf API](https://shelf-api-mu.vercel.app/docs), den allmänna versionen av Questlog API som läraren erbjöd som alternativ. Den fungerar på samma sätt men har fria fält, så att appen kan handla om något annat än spel.

**Mitt handle:** `jennie-packlista`

Så här använder jag fälten:

| Fält | I Packlistan | Exempel |
|---|---|---|
| `title` | Prylens namn | Pannlampa |
| `subtitle` | Märke, modell eller vikt | Petzl Actik, 80 g |
| `category` | Typ av utrustning | Säkerhetsutrustning |
| `status` | Var prylen befinner sig | Att skaffa, Har, Packad |
| `tags` | Aktiviteter och turlängd | vandring, dagstur |

### Varför appen saknar bilder, betyg och anteckningar

Kravspecen för Questlog nämner omslag, betyg och anteckningar för varje spel. Shelf API har motsvarande fält, men Packlistan använder dem inte. En pryl i en packlista behöver inget betyg eller någon bild: det viktiga är att snabbt se vad som ska med och vad som redan är packat, helst med en hand på mobilen och den andra i ryggsäcken.

I stället lade jag till en extrafunktion som passar hur appen faktiskt används: **Packa upp allt**. Efter varje tur ska listan kunna återställas inför nästa, utan att varje pryl behöver tryckas om en och en. Funktionen passade bra in i den uppbyggnad som redan fanns, eftersom den återanvänder `updateItem` från `useItemActions` och samma filter som förloppsraden.

## Projektstruktur

```
src/
├── components/     Delar av sidan som får data via props
│   ├── FilterButtons.tsx    En återanvändbar grupp filterknappar
│   ├── ItemCard.tsx         En rad i listan
│   ├── ItemForm.tsx         Formuläret för att lägga till och ändra
│   ├── ItemList.tsx         Listan, grupperad per kategori
│   └── StatusPicker.tsx     De tre statusknapparna på varje rad
├── hooks/          All kommunikation med API:t, och localStorage
├── pages/          En komponent per route
├── styles/         variables.css med alla färger, typsnitt och mått
├── utils/          Hjälpfunktioner, t.ex. groupByCategory
├── config.ts       API-adress, statusar, kategorier och aktiviteter
└── types.ts        Typerna Item och NewItem
```

| Route | Sida |
|---|---|
| `/` | Packlistan med filter och förlopp |
| `/items/new` | Lägg till pryl |
| `/items/:id` | En pryl |
| `/items/:id/edit` | Ändra pryl |
| `*` | 404 |

## Custom hooks

All fetch-logik ligger i egna hooks i mappen `hooks`. Ingen sida eller komponent anropar `fetch` själv.

| Hook | Gör | Lämnar tillbaka |
|---|---|---|
| `useItems(status)` | Hämtar alla prylar, eller bara de med en viss status (`?status=`). Hämtar om när statusen ändras. Kan även ändra status på en pryl. | `items`, `isLoading`, `error`, `updateStatus`, `reload` |
| `useItem(id)` | Hämtar en pryl. Skiljer på 404 och andra fel. | `item`, `isLoading`, `error` |
| `useItemActions()` | Skapar (POST), ändrar (PATCH) och tar bort (DELETE). | `createItem`, `updateItem`, `deleteItem`, `isSaving`, `error` |
| `useLocalStorage(key, startvärde)` | Fungerar som `useState`, men sparar värdet i localStorage. | `[värde, setVärde]` |

**Hur de fungerar:** varje hook håller sin egen state för data, laddning och fel, gör anropet i `useEffect` eller i en funktion, kontrollerar `response.ok` och visar API:ts eget felmeddelande när något går fel. `useItems` har ett räkneverk, `reloadKey`, som räknas upp efter en ändring. Det gör att `useEffect` körs igen och listan hämtas på nytt. I `useItemActions` ligger den gemensamma logiken för POST, PATCH och DELETE i en hjälpfunktion, `sendRequest`, så att den inte upprepas tre gånger.

**Varför jag byggt så:**

- **Komponenterna blir enklare.** En sida skriver `const { item, isLoading, error } = useItem(id)` och behöver bara bry sig om vad den ska visa.
- **Samma kod används på flera ställen.** Detaljsidan och ändra-sidan hade först exakt samma hämtningskod. Nu använder båda `useItem`.
- **Ett ställe att ändra.** Ändras API:t behöver bara hooksen uppdateras.
- **Hooks går att återanvända.** Startsidan anropar `useItems` två gånger: en gång för listan, som filtreras på status, och en gång utan filter för att räkna förloppet. Annars skulle förloppet visa "0 packade" när filtret *Har* är valt.

Kursens förslag var att samla hooksen i en fil. Jag har en fil per hook, eftersom det gör varje fil kort och lätt att hitta.

## Sparat filter

Alla fyra filtren sparas med `useLocalStorage` under nycklarna `packlista-status`, `packlista-activity`, `packlista-duration` och `packlista-category`. Hooken läser det sparade värdet när sidan laddas och sparar varje ändring med `useEffect`. Värdet görs om till text med `JSON.stringify`, eftersom localStorage bara kan spara text. Läsning och skrivning ligger i `try/catch`, så att appen fungerar även när localStorage är avstängt, till exempel i privat läge.

Prylarna sparas i API:t, eftersom de ska finnas kvar på alla enheter. Filtren sparas lokalt, eftersom de bara rör den packning jag håller på med.

## Medvetna val

- **Statusfiltret sköts av API:t, de andra filtren i React.** Aktivitet och turlängd är taggar, och API:t kan inte filtrera på taggar. Kategori filtreras också i React, så att listan och förloppet använder samma funktion, `matchesFilters`.
- **Aktiviteter och kategorier ligger i `config.ts`.** Jag övervägde att låta användaren skapa egna aktiviteter i formuläret, men valde en fast lista för att undvika stavfel och dubbletter. En ny aktivitet läggs till med en rad kod.
- **En pryl kan höra till flera aktiviteter.** Pannlampan behövs både på vandring och topptur. Därför är aktiviteter taggar och inte kategorier, så att prylen bara behöver läggas in en gång.
- **Radioknappar för status och kategori, kryssrutor för aktiviteter.** En pryl kan bara ha en status och en kategori, men flera aktiviteter.
- **Packa upp allt skickar anropen samtidigt.** API:t kan bara ändra en pryl åt gången, så knappen skickar ett PATCH-anrop per packad pryl med `Promise.all` och väntar tills alla är klara. Det går snabbare än att skicka dem ett i taget.

## Design

- **CSS Modules:** varje komponent har en egen `.module.css`. Klassnamnen blir unika, så komponenter kan inte råka påverka varandra.
- **Designvariabler:** alla färger, typsnitt, avstånd och hörn ligger i `src/styles/variables.css`. Modulerna använder bara `var(--...)`, så att utseendet kan ändras på ett ställe.
- **Styling via attribut:** vald filterknapp stylas med `aria-pressed`, aktiv menylänk med `aria-current` och radernas status med `data-status`. Samma attribut som hjälper skärmläsare styr alltså utseendet.
- **Tillgänglighet:** knapparna är minst 44 px höga, fokusringen syns när man använder tangentbordet, och statusknapparna är riktiga radioknappar som går att välja med piltangenterna.

## Krav och var de finns

| Krav | Var |
|---|---|
| Lista, sida per post, formulär, 404 | `ItemsPage`, `ItemDetailPage`, `NewItemPage`, `EditItemPage`, `NotFoundPage` |
| React Router med layout och navigering | `App.tsx`, `RootLayout.tsx` |
| Filterknappar för status | `FilterButtons` på startsidan |
| CRUD | `useItems`, `useItem`, `useItemActions` |
| Komponenter med props | `components/` |
| Laddningsindikator i listan och på en pryl | `ItemList`, `ItemDetailPage`, `EditItemPage` |
| `response.ok` och felmeddelanden | Alla hooks |
| TypeScript-typ | `types.ts` |
| Custom hooks för all fetch (VG) | `hooks/` |
| Sparat filter med `useLocalStorage` (VG) | `hooks/useLocalStorage.ts`, `ItemsPage` |