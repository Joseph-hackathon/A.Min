
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getSecurityAnalysis = async (dataSummary: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `You are a high-level cybersecurity AI expert specializing in Adversarial Machine Learning. 
      Analyze the following summary of a dataset scan result for the A.min security platform and provide professional insights on:
      1. Potential attack vectors (Poisoning, Evasion, etc.)
      2. Impact on model reliability
      3. Recommended mitigation strategies based on the A.min security framework.
      
      Data Summary: ${dataSummary}
      
      Please respond in professional English.`,
      config: {
        temperature: 0.7,
        topP: 0.95,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini analysis error:", error);
    return "An error occurred while generating the security analysis. Please try again later.";
  }
};
