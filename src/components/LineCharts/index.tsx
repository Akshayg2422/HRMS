import React from "react";
import {ContainerProps} from '../Interface'
import {Card,CardHeading} from '@components'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Brush,
  Legend,
  Label,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

interface ChartProps extends ContainerProps {
    width : string | number;
    height :  string | number;
    datas : Array<{}>;
    CustomTooltip? : any;
    themeColor?:string;
    formatXAxis?: any;
    title?: string;
    yaxisLabel? : string;
    xaxisLabel? : string;
    linename1?:string;
    lineDataKey1:string;
    linename2?:string;
    lineDataKey2?:string;
    linename3?:string;
    lineDataKey3?:string;
    StrokeLine1:string;
    StrokeLine2?:string;
    StrokeLine3?:string;
    dataKeyXaxis?:string;
    dataKeyYaxis?:string;
    children?: React.ReactNode
  }
function LineCharts({
  datas,
  CustomTooltip,
  themeColor,
  formatXAxis,
  height,
  width,
  xaxisLabel,
  yaxisLabel,
  linename1,
  linename2,
  linename3,
  lineDataKey1,
  lineDataKey2,
  lineDataKey3,
  StrokeLine1,
  StrokeLine2,
  StrokeLine3,
  title,
  dataKeyXaxis,
  dataKeyYaxis,
  children
}:ChartProps) {
  return (
    <Card>
    {title &&
      <CardHeading title={title} children={children} />
    }
    <ResponsiveContainer
      width={width}
      height={height}
      className="Sentiment-Card"
    >
      <LineChart
        data={datas}
        margin={{
          top: 5,
          left: 20,
          bottom:5
        }}
      >
          <CartesianGrid strokeDasharray="3 3" vertical={false}/>
        <XAxis
          tickFormatter={formatXAxis}
          tick={{ fill: themeColor }}
          dataKey={dataKeyXaxis}
          stroke={themeColor}
        >
            <Label
            value={xaxisLabel}
            fill={themeColor}
            position="center"
            dy="-1.645em"
            dx="-100"
          />
        </XAxis>
        <YAxis tick={{ fill: themeColor }} dataKey={dataKeyYaxis} stroke={themeColor}>
          <Label
            value={yaxisLabel}
            angle={-90}
            fill={themeColor}
            position="center"
            dy="-1.645em"
            dx="-100"
            style={{ paddingBottom: "50px" }}
          />
        </YAxis>
        <Tooltip content={CustomTooltip} cursor={false} /> 
        <Line
          name={linename1}
          type="monotone"
          dataKey={lineDataKey1}
          stroke={StrokeLine1}
          dot={false}
        />
        <Line
          name={linename2}
          type="monotone"
          dataKey={lineDataKey2}
          stroke={StrokeLine2}
          dot={false}
        />
        <Line
          name={linename3}
          type="monotone"
          dataKey={lineDataKey3}
          stroke={StrokeLine3}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
    </Card>
  );
}

export default LineCharts;
