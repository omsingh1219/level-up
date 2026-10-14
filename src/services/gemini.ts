// src/services/gemini.ts

export async function askGeminiAI(userPrompt: string): Promise<string> {
  try {
    // This sends the user's prompt to your secure local server running on port 5000
    const response = await fetch("http://localhost:5000/api/chat", {
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
