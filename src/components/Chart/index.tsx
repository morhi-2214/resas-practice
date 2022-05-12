import { FC } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { Prefecture } from "@/pages/Home";

type Props = {
  data: any;
  labels: Prefecture[];
};

const Chart: FC<Props> = ({ data, labels }) => {
  return (
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis />
      <Tooltip />
      <Legend />
      {labels.map((label, i) => (
        <Line
          key={i}
          type="monotone"
          dataKey={label.prefName}
          stroke="#82ca9d"
        />
      ))}
    </LineChart>
  );
};

export { Chart };
