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
          event: any,
          chartContext: any,
          { dataPointIndex }: any
        ) => {
          const selectedXValue = data[dataPointIndex].x; // 선택된 item의 x 값
          onItemClick(selectedXValue); // 상위 컴포넌트에 클릭한 x 값 전달
          console.log("선택된 아이템", selectedXValue);
        },
      },
    },
    colors: ["#267EC3", "#46B3A9", "#FDBB3A", "#FF6178", "#8B75D7"],
    xaxis: {
      categories: data.map((item) => item.x), // x 데이터
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
      data: data.map((item) => item.y * 50), // y 데이터
    },
  ];

  return (
    <ReactApexChart options={options} series={series} type="bar" height={180} />
  );
};

export default BarChart;
