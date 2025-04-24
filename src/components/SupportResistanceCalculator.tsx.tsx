import { useState } from "react";

export default function SupportResistanceCalculator() {
  const [disappearValue, setDisappearValue] = useState(0);
  const [supportResistance, setSupportResistance] = useState({ resistance: 0, support: 0 });
  const [criticalValue, setCriticalValue] = useState(0);

  const [high, setHigh] = useState(0);
  const [low, setLow] = useState(0);
  const [divisions, setDivisions] = useState<number[]>([]);

  const handleDisappearConfirm = () => {
    const supportValue = disappearValue * (1 - 0.307);
    const resistanceValue = disappearValue * (1 - 0.23);
    const critical = disappearValue * (1 - 0.342);

    setSupportResistance({ support: supportValue, resistance: resistanceValue });
    setCriticalValue(critical);
  };

  const handleRangeConfirm = () => {
    const min = Math.min(low, high);
    const max = Math.max(low, high);
    const step = (max - min) / 4;
    const points = Array.from({ length: 5 }, (_, i) => Math.round(min + step * i));
    setDivisions(points.reverse());
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-6">
      <h2>📉 소멸점 기준 지지/저항 계산기</h2>
      <div>
        <input type="number" value={disappearValue} onChange={(e) => setDisappearValue(parseFloat(e.target.value))} />
        <button onClick={handleDisappearConfirm}>확인</button>
      </div>
      <div>
        <p>📊 저항/지지: <strong>{Math.round(supportResistance.resistance)}</strong> ~ <strong>{Math.round(supportResistance.support)}</strong></p>
        <p style={{ color: "red" }}>⚠️ 위험 수치 (-34.2%): {Math.round(criticalValue)}</p>
      </div>

      <h2>📏 고가/저가 기준 5등분 계산기</h2>
      <div>
        <input type="number" value={high} onChange={(e) => setHigh(parseFloat(e.target.value))} placeholder="고가" />
        <input type="number" value={low} onChange={(e) => setLow(parseFloat(e.target.value))} placeholder="저가" />
        <button onClick={handleRangeConfirm}>확인</button>
      </div>
      <div>
        {divisions.map((val, i) => (
          <div key={i}>{val}</div>
        ))}
      </div>
    </div>
  );
}
