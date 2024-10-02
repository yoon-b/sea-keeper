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
    },
    // plotOptions: {
    //   bar: {
    //     horizontal: false, // 수평 바 차트 여부
    //     columnWidth: "100%", // 바의 폭 설정 (50%에서 100%까지 조정 가능)
    //     endingShape: "rounded", // 바 끝 모양 설정
    //   },
    // },
    // legend: {
    //   show: false,
    // },
    colors: ["#267EC3", "#46B3A9", "#FDBB3A", "#FF6178", "#8B75D7"],
    // fill: {
    //   opacity: 1,
    //   colors: ["#267EC3", "#46B3A9", "#FDBB3A", "#FF6178", "#8B75D7"],
    // },
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

  const series = [{ data: data.map((item) => Math.round(item.y * 50)) }];

  // const series = data.map((item, index) => ({
  //   name: `${yAxisName} ${item.x}`, // 시리즈 이름
  //   data: [
  //     {
  //       x: item.x,
  //       y: Math.round(item.y * 50),
  //       color: options.colors[index % options.colors.length], // 색상 할당
  //     },
  //   ],
  // }));

  return (
    <ReactApexChart options={options} series={series} type="bar" height={180} />
  );
};

export default BarChart;
