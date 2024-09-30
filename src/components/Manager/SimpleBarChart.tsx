import ReactApexChart from "react-apexcharts";

const SimpleBarChart = () => {
  const options = {
    chart: {
      type: "bar" as const,
    },
    // fill: {
    //   colors: ["#267EC3", "#46B3A9", "#FDBB3A", "#FF6178", "#8B75D7"],
    // },
    colors: ["#267EC3", "#46B3A9", "#FDBB3A", "#FF6178", "#8B75D7"],
    xaxis: {
      categories: ["A", "B", "C", "D", "E"],
    },
  };

  const series = [
    {
      name: "Sample Data",
      data: [10, 20, 30, 40, 50],
    },
  ];

  return (
    <ReactApexChart options={options} series={series} type="bar" height={180} />
  );
};

export default SimpleBarChart;
