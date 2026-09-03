import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = 3000;

app.use(express.json());

// Shamba Companion AI Prompt Definition
const SHAMBA_COMPANION_SYSTEM_PROMPT = `You are "Shamba Companion", a friendly, experienced Kenyan agricultural advisor and veterinary companion for everyday Kenyan farmers.
You understand the realities of Kenyan farming across Kiambu (zero-grazing, high feed costs), Kericho (cold highlands, high dairy yield), Nakuru (poultry and mixed farming), Kajiado (dry rangelands, goats/sheep), and Nyeri/Eldoret.

Tone and Language Guidelines:
- Use 60% plain English and 40% conversational everyday Kenyan Swahili (e.g., "Shamba iko aje?", "Ng'ombe amepunguza maziwa?", "Kuku zimeanza kufanya weird?", "Hii weather imeaffect your animals?", "Kilo ya feed", "Maji safi", "Hii ni ya sisi").
- Do NOT sound like a corporate robot or textbook.
- Keep responses short, direct, structured with clean bullet points, and easy to read on mobile.
- Example tone:
  "Yeah, that could be worth checking 👌
  How old are the chickens?
  Also check:
  • Feed intake & water temperature
  • Recent cold drafts in the coop
  • Any signs of diarrhea or dullness
  What have you noticed so far kwa shamba?"
- Never provide dangerous unsupported medical prescriptions; always remind farmers to consult a verified Farmers Hub vet for acute cases.`;

// Pre-packaged smart responses for instant Kenyan farm queries if offline or API key pending
function getSimulatedKenyanAdvice(query: string): string {
  const q = query.toLowerCase();
  if (q.includes('kuku') || q.includes('chicken') || q.includes('egg') || q.includes('poultry') || q.includes('layer')) {
    return `Habari mkulima! Hiyo ya kuku kupunguza eggs or feed is very common, especially with sudden weather shifts 👌

Mambo ya kucheck kwanza kwa shamba:
• **Baridi ya usiku na upepo**: Are the coop curtains closed by 5:30 PM? Baridi inafanya kuku watumie energy yote kujipasha moto badala ya kutaga.
• **Maji ya kunywa**: Maji ya asubuhi yakiwa ice cold, layers refuse to drink — na maji ndiyo 65% ya yai!
• **Feed quality**: Have you changed the feed brand or batch recently? Check for dampness or low calcium.
• **Lighting**: Are they getting complete 16 hours of light daily?

Vifaranga au layers wana umri gani, na unaziona zikikohoa au kinyesi kiko vipi?`;
  }

  if (q.includes('ng\'ombe') || q.includes('cow') || q.includes('dairy') || q.includes('maziwa') || q.includes('milk')) {
    return `Pole sana kwa hiyo issue ya maziwa kupungua 👌
Hii baridi ya asubuhi na wet conditions zinacheza na milk production ya wakulima wengi sana saa hii.

Hebu confirm hizi haraka:
• **Joto la maji**: Ng'ombe hapendi maji ya barafu asubuhi. Jaribu kumpa maji kidogo warm yakiwa na molasses — rumination itaamka mara moja.
• **Dry bedding**: Je, mahali analala ni matope au kuna dry straw? If resting floor is cold and wet, cow withholds milk letdown.
• **Titi moja limevimba?**: Check for heat, swelling, or clots in the first strips of milk (dalili za subclinical mastitis).
• **Feed ration**: Unampa kilo ngapi za silage na dairy meal kwa siku?

Niambie breed yake (Friesian au Ayrshire) na siku ngapi tangu azae?`;
  }

  if (q.includes('feed') || q.includes('chakula') || q.includes('ghali') || q.includes('ration') || q.includes('silage')) {
    return `Bei ya commercial feeds imepanda kweli kote Kenya, lakini unaweza cut costs ukifanya smart mixing 👌

Tips za kusaidia shamba lako:
• **Silage + Dry Hay**: Usilishe wet forage pekee yake. Ng'ombe anahitaji dry fiber (kama Rhodes grass au oats hay) 3-4kg ili kuzuia acidosis.
• **Local Protein**: Look into sunflower meal na cotton seed cake from reliable cooperative millers.
• **TMR (Total Mixed Ration)**: Changanya coarse fodder na concentrates pamoja badala ya kumpa dairy meal kwa milking parlor pekee.

Unafuga mifugo gani saa hii, na unapatikana county gani ili nikuambie feed available huko?`;
  }

  return `Shamba iko aje mkulima! 👌 
Niko hapa kusaidia na maswali ya mifugo, kuku, feeds, weather na afya ya shamba lako.

Tell me a bit more:
• Unafuga nini (Dairy, Poultry, Mbuzi, au Nguruwe)?
• Shamba liko county gani (Kiambu, Nakuru, Kericho, Kajiado, etc.)?
• Ni changamoto gani umeona leo kwa shamba?`;
}

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'Farmers Hub API', timestamp: new Date().toISOString() });
});

// Shamba Companion AI API
app.post('/api/companion', async (req: Request, res: Response) => {
  try {
    const { prompt, history, county, livestock } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      res.status(400).json({ error: 'Missing user question' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const userContext = `Farmer County: ${county || 'Not specified'}. Primary Livestock: ${livestock || 'General'}.`;
        const fullPrompt = `${SHAMBA_COMPANION_SYSTEM_PROMPT}\n\nContext: ${userContext}\n\nFarmer says: "${prompt}"\n\nProvide your warm, helpful Kenyan response:`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: fullPrompt,
        });

        const reply = response.text || getSimulatedKenyanAdvice(prompt);
        res.json({ reply, source: 'gemini' });
        return;
      } catch (geminiErr) {
        console.warn('Gemini API call failed, falling back to Kenyan agricultural knowledge engine:', geminiErr);
        const fallback = getSimulatedKenyanAdvice(prompt);
        res.json({ reply: fallback, source: 'knowledge-base' });
        return;
      }
    } else {
      // Offline / Key pending: return authentic agricultural guidance immediately
      const reply = getSimulatedKenyanAdvice(prompt);
      res.json({ reply, source: 'knowledge-base' });
    }
  } catch (error) {
    console.error('Companion endpoint error:', error);
    res.status(500).json({ error: 'Failed to process inquiry' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Farmers Hub Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
