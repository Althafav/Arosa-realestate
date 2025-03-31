// MinMaxSlider.tsx
import React, { useState, useEffect } from 'react';

interface MinMaxSliderProps {
  min: number;
  max: number;
  onChange: (min: number, max: number) => void;
}

const MinMaxSlider: React.FC<MinMaxSliderProps> = ({ min, max, onChange }) => {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);

  useEffect(() => {
    onChange(minValue, maxValue);
  }, [minValue, maxValue, onChange]);

  return (
    <div className="price-range-slider">
      <div className="flex justify-between mb-2">
        <span>${minValue.toLocaleString()}</span>
        <span>${maxValue.toLocaleString()}</span>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="range"
          min={min}
          max={max}
          value={minValue}
          onChange={(e) => setMinValue(parseInt(e.target.value))}
          className="w-full"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxValue}
          onChange={(e) => setMaxValue(parseInt(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default MinMaxSlider;