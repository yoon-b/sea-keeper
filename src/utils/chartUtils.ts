export const getChartConfig = (dataTitle: string): ChartConfig => {
  switch (dataTitle) {
    case "estimatedAmount":
      return {
        title: "쓰레기 예측량",
        xAxis: "오염 등급",
        yAxis: "예측량 (L)",
      };
    case "realizedAmount":
      return {
        title: "쓰레기 실 수거량",
        xAxis: "오염 등급",
        yAxis: "수거량 (L)",
      };
    case "estimatedType":
      return {
        title: "예측 주요 쓰레기 종류",
        xAxis: "쓰레기 종류",
        yAxis: "수거량 (L)",
      };
    case "realizedType":
      return {
        title: "실 주요 쓰레기 종류",
        xAxis: "쓰레기 종류",
        yAxis: "수거량 (L)",
      };
    case "average":
      return {
        title: "거리 대비 평균 수거량",
        xAxis: "해안선 명",
        yAxis: "평균 수거량 (L/m)",
      };
    default:
      return {
        title: "기본 차트",
        xAxis: "X축",
        yAxis: "Y축",
      };
  }
};

export const calculateTrashTypeTotals = (
  reportData: (Inspection | Cleanup)[]
): ChartData[] => {
  const totals: Record<number, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  reportData.forEach((report) => {
    if ("predictedTrashVolume" in report) {
      totals[report.mainTrashType] += report.predictedTrashVolume / 50;
    } else if ("actualTrashVolume" in report) {
      totals[report.mainTrashType] += report.actualTrashVolume;
    }
  });

  const chartData: ChartData[] = Object.keys(totals).map((key) => ({
    x: key,
    y: totals[Number(key)],
  }));

  return chartData;
};

export const coastStatsToChartData = (
  coastStats: CoastStats[]
): ChartData[] => {
  const topFiveCoastStats = coastStats.slice(0, 5);

  const chartData: ChartData[] = topFiveCoastStats.map((coast) => ({
    x: coast.coastName,
    y: coast.avgTrashVolume,
  }));

  return chartData;
};
