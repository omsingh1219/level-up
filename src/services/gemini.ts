// src/services/gemini.ts

// src/services/gemini.ts

export async function askGeminiAI(userPrompt: string): Promise<string> {
  try {
    // UPDATED PIPELINE: Fetch data from the live internet backend endpoint
    const response = await fetch("https://railway.app", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: userPrompt }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.reply; // Returns the text response back to your component
  } catch (error) {
    console.error("AI Fetch Error:", error);
    return "Sorry, something went wrong processing your request.";
  }
}
