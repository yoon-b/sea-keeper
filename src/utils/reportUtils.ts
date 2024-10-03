// export const describeWasteType = (wasteType: number): string => {
//   const wasteDescriptions: Record<number, string> = {
//     1: "폐어구류 (그물, 밧줄, 양식 자재 등)",
//     2: "부표류 (스티로폼 부표, 인증부표 등)",
//     3: "생활쓰레기류 (음료수병, 포장비닐, 과자봉지, 캔 등)",
//     4: "대형 투기쓰레기류 (가전제품, 타이어 등)",
//     5: "초목류 (자연목, 인공목 등)",
//   };

//   return wasteDescriptions[wasteType];
// };
interface WasteDescription {
  category: string;
  examples: string;
}

export const describeWasteType = (wasteType: number): WasteDescription => {
  const wasteDescriptions: Record<number, WasteDescription> = {
    1: { category: "폐어구류", examples: "그물, 밧줄, 양식 자재 등" },
    2: { category: "부표류", examples: "스티로폼 부표, 인증부표 등" },
    3: {
      category: "생활쓰레기류",
      examples: "음료수병, 포장비닐, 과자봉지, 캔 등",
    },
    4: { category: "대형 투기쓰레기류", examples: "가전제품, 타이어 등" },
    5: { category: "초목류", examples: "자연목, 인공목 등" },
  };

  const defaultDescription: WasteDescription = {
    category: "기타 쓰레기",
    examples: "기타 항목",
  };

  return wasteDescriptions[wasteType] || defaultDescription;
};

export const convertSerialNumberToDate = (serialNumber: string): string => {
  const dateString = serialNumber.substring(0, 8);

  if (dateString.length !== 8) {
    throw new Error("Serial number must be at least 8 characters long.");
  }

  const year = dateString.substring(0, 4);
  const day = dateString.substring(4, 6);
  const month = dateString.substring(6, 8);

  return `${year}-${day}-${month}`;
};
