
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const getSecurityAnalysis = async (dataSummary: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `You are a high-level cybersecurity AI expert specializing in Adversarial Machine Learning and Real-time Data Streaming Security. 
      Analyze the following summary of a dataset scan result for the A.min security platform, which is integrated with Confluent Cloud (Kafka/Flink).
      
      Focus your insights on:
      1. Potential in-flight attack vectors (Poisoning via stream injection, Evasion, etc.)
      2. How this impacts real-time model training or decision-making in the Kafka pipeline.
      3. Recommended Flink SQL mitigation strategies or Streaming Agent adjustments to isolate these threats.
      
      Context Summary: ${dataSummary}
      
      Please respond in professional English. Use Markdown formatting.`,
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
