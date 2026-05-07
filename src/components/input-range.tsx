import { Slider } from '@/components/ui/slider.tsx';
import { Input } from '@/components/ui/input.tsx';

interface InputRangeProps {
  fromValue: number;
  toValue: number;
  onChange: (fromValue: number, toValue: number) => void;
  maxValue: number;
  minValue: number;
}

export const InputRange = ({
  fromValue,
  toValue,
  onChange,
  maxValue,
  minValue,
}: InputRangeProps) => {
  const handleFromChange = (value: number) => {
    const newFrom = Math.max(minValue, Math.min(maxValue, value));
    const newTo = newFrom > toValue ? newFrom : toValue;
    onChange(newFrom, newTo);
  };

  const handleToChange = (value: number) => {
    const newTo = Math.max(minValue, Math.min(maxValue, value));
    const newFrom = newTo < fromValue ? newTo : fromValue;
    onChange(newFrom, newTo);
  };

  return (
    <div>
      <div className="flex justify-between mb-2 gap-2">
        <Input
          type="number"
          min={minValue}
          max={maxValue}
          value={fromValue}
          onChange={(e) => handleFromChange(Number(e.target.value))}
          className="w-16 text-sm"
        />
        <Input
          type="number"
          min={minValue}
          max={maxValue}
          value={toValue}
          onChange={(e) => handleToChange(Number(e.target.value))}
          className="w-16 text-sm"
        />
      </div>
      <Slider
        value={[fromValue, toValue]}
        min={minValue}
        max={maxValue}
        onValueChange={(values) => onChange(values[0], values[1])}
      />
    </div>
  );
};
