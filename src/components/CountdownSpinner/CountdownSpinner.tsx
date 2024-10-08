import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';

export interface CountdownSpinnerProps {
  value: number;
}
export default function CountdownSpinner({ value }: CountdownSpinnerProps) {
  return (
    <div className="size-10 mx-2 text-sm flex items-center">
      <CircularProgressbarWithChildren
        value={value}
        strokeWidth={14}
        counterClockwise
        maxValue={60}
        styles={buildStyles({
          strokeLinecap: 'butt',
        })}
      >
        <div style={{ fontSize: 12 }}>
          <strong>{value}</strong>
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
}
