## Goal
Make the language toggle actually change content on every page (compare pages, concept pages, Support, etc.) and add Arabic as a new language, using the Lovable AI Gateway (OpenAI models) to generate the translations.

## Scope of content to translate
- Compare pages: `/vs/freeletics`, `/vs/myfitnesspal`, `/vs/noom`, `/why-visor`
- Concept pages: `/concepts/ai-body-transformation`, `/concepts/behavior-driven-fitness`, `/concepts/emotionally-adaptive-coaching`
- Support page
- Any remaining hardcoded English strings in landing sections, Navbar, Footer

Target languages: English (source), German, Spanish, French, Norwegian, **Arabic (new)**.

## Approach

### 1. Extract hardcoded content into i18n keys
Refactor `ContentPage`-driven pages so `title`, `description`, `h1`, `intro`, `sections[].heading`, `sections[].body` come from `t()` translation keys instead of inline JSX. Body content will be stored as HTML strings and rendered with a safe HTML renderer (DOMPurify-sanitized `dangerouslySetInnerHTML`, or split into structured `{ type: 'p' | 'ul', items: [...] }` JSON — I'll use the structured JSON approach so we don't ship an HTML sanitizer just for marketing copy).

New key layout in each locale file:
```
pages.vsFreeletics.title
pages.vsFreeletics.h1
pages.vsFreeletics.intro
pages.vsFreeletics.sections[].heading
pages.vsFreeletics.sections[].blocks[]  // { type: 'p'|'ul', text? , items? }
```

### 2. Add Arabic
- Add `src/i18n/locales/ar.json`
- Register `ar` in `src/i18n/config.ts` (or wherever `resources` is defined)
- Add Arabic option to the language switcher UI
- Apply `dir="rtl"` on `<html>` when `i18n.language === 'ar'` (via a small effect in `App.tsx` or `main.tsx`)
- Verify Tailwind layout doesn't break in RTL for the affected pages (compare + concept pages are simple prose, should be fine; hero sections use flex — spot-check)

### 3. Machine-translate with OpenAI via Lovable AI Gateway
Use the `ai-gateway` skill script (`/tmp/lovable_ai.py`) with `--json` and `openai/gpt-5-mini` to translate each English key bundle into de, es, fr, no, ar in one pass per language. Output goes straight into `src/i18n/locales/<lang>.json`.

Workflow:
1. Build a canonical `en.json` with all new keys for the affected pages.
2. For each target language, call the script with a system prompt like *"Translate the JSON values from English to <language>. Preserve keys, placeholders like {{name}}, and structure exactly. Return valid JSON only."*
3. Write the returned JSON into the matching locale file.
4. Spot-check Arabic and one other language in the preview.

### 4. Wire pages to i18n
- Update `VsFreeletics.tsx`, `VsMyFitnessPal.tsx`, `VsNoom.tsx`, `WhyVisor.tsx`, the 3 concept pages, and `Support.tsx` to read from `t('pages.<slug>.*', { returnObjects: true })`.
- `ContentPage` gets a small helper to render the structured `blocks` array (`p` → `<p>`, `ul` → `<ul><li>` list). Inline emphasis via a lightweight token like `*word*` → `<em>` so translators (and the model) don't need to hand-write HTML.

### 5. Language switcher
- Add Arabic (label: "العربية") with flag/code `AR`.
- Ensure the current switcher persists selection to localStorage (already does via i18next-browser-languagedetector, I'll confirm).

## Non-goals
- Not translating dynamic user-generated content.
- Not building a translation admin UI.
- Not touching the AI/MCP integration or backend schemas.

## Risks / notes
- Machine translations will be reasonable but not perfect; user can refine later by editing the locale JSON files.
- RTL for Arabic may need small CSS tweaks on the landing hero if anything looks off after first pass — will address only what's visibly broken.
- This uses Lovable AI Gateway credits (one call per target language, ~5 calls total).

## Deliverables
- Refactored 8 pages + `ContentPage` block renderer
- Updated `en.json`, `de.json`, `es.json`, `fr.json`, `no.json`
- New `ar.json` + RTL wiring + Arabic entry in language switcher
