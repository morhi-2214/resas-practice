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

import colors from "@/mocks/barColors";
import { Prefecture } from "@/pages/Home";

type Props = {
  data: any;
  labels: Prefecture[] | undefined;
};

const Chart: FC<Props> = ({ data, labels }) => {
  return (
    <LineChart
      width={900}
      height={500}
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
      {labels &&
        labels.map((label, i) => (
          <Line
            key={i}
            type="monotone"
            dataKey={label.prefName}
            stroke={colors[i]}
          />
        ))}
    </LineChart>
  );
};

export { Chart };
