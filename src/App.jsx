import { useState } from "react";
import "./App.css";

function App() {
  const [emailText, setEmailText] = useState("");
  const [result, setResult] = useState("");

  const analyzeEmail = () => {
    let riskScore = 0;

    if (emailText.toLowerCase().includes("urgent")) riskScore += 1;
    if (emailText.toLowerCase().includes("click here")) riskScore += 1;
    if (emailText.toLowerCase().includes("verify account")) riskScore += 1;

    if (riskScore >= 2) {
      setResult("⚠️ High Risk: This email may be phishing.");
    } else {
      setResult("✅ Low Risk: This email appears safe.");
    }
  };

  return (
    <div className="container">
      <h1>PhishGuard</h1>
      <p>Analyze emails for phishing threats in real time.</p>

      <textarea
        placeholder="Paste email content here..."
        value={emailText}
        onChange={(e) => setEmailText(e.target.value)}
      />

      <button onClick={analyzeEmail}>Analyze Email</button>

      <div className="result">{result}</div>
    </div>
  );
}

export default App;
