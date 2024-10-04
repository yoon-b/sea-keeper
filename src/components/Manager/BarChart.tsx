import ReactApexChart from "react-apexcharts";

interface BarChartProps {
  xAxisName: string;
  yAxisName: string;
  data: { x: string; y: number }[];
  onItemClick: (xValue: string | number) => void;
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
      toolbar: {
        show: false,
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
      data: data.map((item, index) => ({
        x: item.x,
        y: item.y,
        fillColor: options.colors[index % options.colors.length],
      })),
    },
  ];

  return (
    <ReactApexChart options={options} series={series} type="bar" height={260} />
  );
};

export default BarChart;
