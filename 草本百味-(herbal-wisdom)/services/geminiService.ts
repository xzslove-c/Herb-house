import { GoogleGenAI, Type, Schema } from "@google/genai";
import { MedicineDetails } from "../types";

const parseMedicineDetails = (jsonText: string): MedicineDetails | null => {
  try {
    // Clean up potential markdown code blocks if the model adds them despite schema
    const cleanedText = jsonText.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanedText) as MedicineDetails;
  } catch (e) {
    console.error("Failed to parse JSON response", e);
    return null;
  }
};

export const fetchMedicineDetails = async (name: string): Promise<MedicineDetails | null> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("API Key not found");
      // Fallback for demo purposes if no key is present, though prompt implies key availability.
      // In a real strict environment, we might throw error. 
      // For this user persona, I will assume key exists as per instructions.
      return null;
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const responseSchema: Schema = {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING },
        efficacy: { type: Type.STRING, description: "A concise summary of the medicine's main functions in TCM." },
        region: { type: Type.STRING, description: "Main geographical regions of origin." },
        books: { 
          type: Type.ARRAY, 
          items: { type: Type.STRING },
          description: "List of famous ancient medical texts mentioning this herb (e.g., Shanghan Lun, Ben Cao Gang Mu)."
        }
      },
      required: ["name", "efficacy", "region", "books"]
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Provide Traditional Chinese Medicine (TCM) details for the herb: "${name}". 
                 Return the response in valid JSON matching the schema.
                 Language: Simplified Chinese.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      }
    });

    if (response.text) {
      return parseMedicineDetails(response.text);
    }
    return null;

  } catch (error) {
    console.error("Error fetching medicine details:", error);
    return null;
  }
};