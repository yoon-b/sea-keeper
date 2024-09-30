interface ChartData {
  x: number;
  y: number;
}

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
    case "type":
      return {
        title: "주요 쓰레기 종류",
        xAxis: "쓰레기 종류",
        yAxis: "수거량 (L)",
      };
    case "average":
      return {
        title: "거리 대비 평균 수거량",
        xAxis: "해안선 명",
        yAxis: "평균 수거량 (L)",
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
  cleanupData: Cleanup[]
): ChartData[] => {
  const totals: Record<number, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  cleanupData.forEach((cleanup) => {
    totals[cleanup.mainTrashType] += cleanup.actualTrashVolume;
  });

  const chartData: ChartData[] = Object.keys(totals).map((key) => ({
    x: Number(key),
    y: totals[Number(key)], // 해당 쓰레기 타입의 총합
  }));

  return chartData;
};
