import { useState } from "react";

export default function SentimentIndicator({ content }) {
  const [score, setScore] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const analyzeSentiment = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/analyze-sentiment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const data = await response.json();
      setScore(data.score);
    } catch (error) {
      console.error("Analysis failed:", error);
    }
    setIsLoading(false);
  };

  // Determine sentiment label/color
  const getSentimentLabel = () => {
    if (score === null) return "";
    if (score > 0) return "😊 Positive";
    if (score < 0) return "😞 Negative";
    return "😐 Neutral";
  };

  return (
    <div>
      <button onClick={analyzeSentiment} disabled={isLoading}>
        {isLoading ? "Analyzing..." : "Analyze Sentiment"}
      </button>
      {score !== null && (
        <div style={{ color: score > 0 ? "green" : score < 0 ? "red" : "gray" }}>
          {getSentimentLabel()} (Score: {score})
        </div>
      )}
    </div>
  );
}