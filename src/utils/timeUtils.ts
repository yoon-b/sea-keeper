export const readableDate = (timestamp: string | null) => {
  if (!timestamp) {
    return "유효하지 않은 날짜"; // null인 경우 반환할 기본 값
  }

  const date = new Date(timestamp);

  // 날짜 형식 (YYYY-MM-DD)
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  // 시간 형식 (hh:mm:ss)
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // 오전/오후 표기
  const ampm = hours >= 12 ? "오후" : "오전";
  const formattedHours = String(hours % 12 || 12).padStart(2, "0"); // 12시간 형식

  return `${year}-${month}-${day} ${ampm} ${formattedHours}:${minutes}:${seconds}`;
};
