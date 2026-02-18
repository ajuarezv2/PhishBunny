import { useState } from "react";
import "./App.css";

function App() {
  const [emailText, setEmailText] = useState("");
  const [result, setResult] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeEmail = () => {
    if (!emailText.trim()) {
      setResult("📝 Please paste some email content to analyze.");
      return;
    }

    setIsAnalyzing(true);
    
    setTimeout(() => {
      let riskScore = 0;
      const lowerCaseText = emailText.toLowerCase();

      const phishingKeywords = [
        "urgent", "click here", "verify account", "suspended", 
        "security alert", "confirm payment", "update information",
        "unusual activity", "limited time", "account locked",
        "verify your identity", "password expired", "bank details",
        "irs", "social security", "paypal", "netflix", "amazon"
      ];

      phishingKeywords.forEach(keyword => {
        if (lowerCaseText.includes(keyword)) {
          riskScore += 1;
        }
      });

      const urlMatches = lowerCaseText.match(/https?:\/\/[^\s]+/g) || [];
      const suspiciousUrls = urlMatches.filter(url => 
        url.includes("bit.ly") || 
        url.includes("tinyurl") || 
        url.includes("goo.gl") ||
        url.includes("shorturl")
      ).length;
      
      if (suspiciousUrls > 0) {
        riskScore += suspiciousUrls;
      }

      const urgencyWords = ["immediately", "within 24 hours", "asap", "action required", "urgent"];
      urgencyWords.forEach(word => {
        if (lowerCaseText.includes(word)) riskScore += 1;
      });

      if (riskScore >= 4) {
        setResult("🔴 HIGH RISK: This email shows multiple strong phishing indicators!");
      } else if (riskScore >= 2) {
        setResult("🟡 MEDIUM RISK: Be cautious - this email has some suspicious elements.");
      } else {
        setResult("✅ SAFE: No significant phishing indicators detected.");
      }

      setIsAnalyzing(false);
    }, 500);
  };

  const clearEmail = () => {
    setEmailText("");
    setResult("");
  };

  return (
    <div className="container">
      <h1>🐰 PhishBunny</h1>
      <p>Hop into safety! Analyze emails for phishing threats in real time.</p>

      <textarea
        placeholder="Paste email content here..."
        value={emailText}
        onChange={(e) => setEmailText(e.target.value)}
      />

      <div className="button-group">
        <button onClick={analyzeEmail} disabled={isAnalyzing}>
          {isAnalyzing ? "Analyzing..." : "Analyze Email"}
        </button>
        {emailText && (
          <button 
            onClick={clearEmail}
            className="clear-btn"
          >
            Clear
          </button>
        )}
      </div>

      <div className="result">{result}</div>
    </div>
  );
}

export default App;
