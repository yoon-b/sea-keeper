export const describeWasteType = (wasteType: string): string => {
  const wasteDescriptions: Record<string, string> = {
    "1": "폐어구류 (그물, 밧줄, 양식 자재 등)",
    "2": "부표류 (스티로폼 부표, 인증부표 등)",
    "3": "생활쓰레기류 (음료수병, 포장비닐, 과자봉지, 캔 등)",
    "4": "대형 투기쓰레기류 (가전제품, 타이어 등)",
    "5": "초목류 (자연목, 인공목 등)",
  };

  return wasteDescriptions[wasteType];
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
