import { useState } from "react";
import InputScreen from "@/components/InputScreen";
import ResultScreen from "@/components/ResultScreen";
import type { STPResult } from "@/lib/stp";

type Screen = "input" | "result";

export default function App() {
  const [screen, setScreen] = useState<Screen>("input");
  const [result, setResult] = useState<STPResult | null>(null);
  const [key, setKey] = useState(0);

  const handleResult = (r: STPResult) => {
    setResult(r);
    setKey((k) => k + 1);
    setScreen("result");
  };

  const handleBack = () => {
    setKey((k) => k + 1);
    setScreen("input");
  };

  return (
    <div
      key={key}
      className="mx-auto w-full"
      style={{
        maxWidth: 480,
        minHeight: "100dvh",
      }}
    >
      {screen === "input" && <InputScreen onResult={handleResult} />}
      {screen === "result" && result && <ResultScreen result={result} onBack={handleBack} />}
    </div>
  );
}
