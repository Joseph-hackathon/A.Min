
import { GoogleGenAI } from "@google/genai";

export const getSecurityAnalysis = async (dataSummary: string) => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      // Gracefully handle missing API key without crashing the app
      console.warn("Gemini API key is not configured in environment variables.");
      return "Security analysis is currently unavailable. Please configure the API_KEY in Vercel settings.";
    }

    // Initialize inside the function to ensure the app doesn't crash on load
    const ai = new GoogleGenAI({ apiKey });
    
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
    return "An error occurred while generating the security analysis. Please check your network and API key status.";
  }
};
