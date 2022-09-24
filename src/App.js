/** @format */

import "./App.css";
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function App() {
  const [dots, setDots] = useState([]);
  const [activeDotPosition, setActiveDotPosition] = useState({
    x: undefined,
    y: undefined,
  });
  const [activeValue, setActiveValue] = useState(undefined);
  const [activeIndex, setActiveIndex] = useState(null);

  const setActiveData = (props) => {
    if (props.activeTooltipIndex !== undefined) {
      setActiveDotPosition({ x: props.chartX, y: props.chartY });
      setActiveIndex(props.activeTooltipIndex);
    }
  };
  const setDotsData = () => {
    const dotsData = [];
    for (let index = 0; index <= 7; index++) {
      const xCoordinate =
        document.querySelector(`[id=dot_${index}]`) || undefined;
      const yCoordinate =
        document.querySelector(`[id=dot_${index}]`) || undefined;
      if (!!xCoordinate && !!yCoordinate) {
        dotsData.push({
          x: parseInt(xCoordinate, 10),
          y: parseInt(yCoordinate, 10),
        });
      }
    }
    if (dotsData.length) {
      setDots(dotsData);
    }
  };

  const handleAnimationEnd = () => {
    setDotsData();
  };
  const CustomTooltip = ({ active, payload, label }) => {
    console.log(payload, "payload");
    if (active && payload?.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltiptext">{`${payload[activeValue?.index]?.name} : ${
            payload[activeValue?.index]?.value
          }`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{margin:'100px'}}>
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
      onMouseMove={(e) => setActiveData(e)}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis allowDuplicatedCategory={true} />
      <Tooltip
        content={<CustomTooltip />}
        isAnimationActive={false}
        position={activeDotPosition}
        allowEscapeViewBox={{ x: true, y: true }}
        wrapperStyle={{
          visibility:
            activeDotPosition.x !== undefined &&
            activeDotPosition.y !== undefined
              ? "visible"
              : "hidden",
        }}
      />
      <Legend />
      <Line
        type="monotone"
        dataKey="pv"
        stroke="#8884d8"
        onAnimationEnd={handleAnimationEnd}
        activeDot={{
          onMouseOver: () => setActiveValue({ index: 0, value: "pv" }),
          r: 8,
        }}
      />
      <Line
        type="monotone"
        dataKey="uv"
        stroke="red"
        onAnimationEnd={handleAnimationEnd}
        activeDot={{
          onMouseOver: () => setActiveValue({ index: 1, value: "uv" }),
          r: 8,
        }}
      />
    </LineChart>
    </div>
  );
}
