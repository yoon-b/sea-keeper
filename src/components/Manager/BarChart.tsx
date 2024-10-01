import ReactApexChart from "react-apexcharts";

interface BarChartProps {
  xAxisName: string;
  yAxisName: string;
  data: { x: number; y: number }[];
  onItemClick: (xValue: number) => void;
}

const BarChart = ({
  xAxisName,
  yAxisName,
  data,
  onItemClick,
}: BarChartProps) => {
  const options = {
    chart: {
      type: "bar" as const,
      events: {
        dataPointSelection: (
          _event: any,
          _chartContext: any,
          { dataPointIndex }: any
        ) => {
          const selectedXValue = data[dataPointIndex].x;
          onItemClick(selectedXValue);
        },
      },
    },
    colors: ["#267EC3", "#46B3A9", "#FDBB3A", "#FF6178", "#8B75D7"],
    xaxis: {
      categories: data.map((item) => item.x),
      title: {
        text: xAxisName,
      },
    },
    yaxis: {
      title: {
        text: yAxisName,
      },
    },
  };

  const series = [
    {
      name: yAxisName,
      data: data.map((item) => Math.round(item.y * 50)),
    },
  ];

  return (
    <ReactApexChart options={options} series={series} type="bar" height={180} />
  );
};

export default BarChart;
