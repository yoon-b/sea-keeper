import axiosInstance from "./axiosConfig";
import axios from "axios";
import { readableDate } from "../utils/timeUtils";

export const fetchInspectionForMap = async (
  startTime: string,
  endTime: string
) => {
  try {
    const res = await axiosInstance.get(`/map/monitorings`, {
      params: {
        startTime,
        endTime,
      },
    });
    // console.log(res.data.result);
    return res.data.result;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response) {
        console.log("서버 응답 오류: ", err.response);
      } else if (err.request) {
        console.log("요청 성공 & 응답 없음: ", err.request);
      } else {
        console.log("failed to fetch data", err);
        throw new Error("조사 기록 조회 실패");
      }
    }
  }
};

export const fetchCleanupForMap = async (
  startTime: string,
  endTime: string
) => {
  try {
    const res = await axiosInstance.get(`/map/cleanups`, {
      params: {
        startTime,
        endTime,
      },
    });
    // console.log(res.data.result);
    return res.data.result;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response) {
        console.log("서버 응답 오류: ", err.response);
      } else if (err.request) {
        console.log("요청 성공 & 응답 없음: ", err.request);
      } else {
        console.log("failed to fetch data", err);
        throw new Error("수거 기록 조회 실패");
      }
    }
  }
};

export const fetchAverageForMap = async (
  startTime: string,
  endTime: string
) => {
  try {
    const res = await axiosInstance.get(`/map/average`, {
      params: {
        startTime,
        endTime,
      },
    });
    // console.log(res.data.result);
    return res.data.result;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response) {
        console.log("서버 응답 오류: ", err.response);
      } else if (err.request) {
        console.log("요청 성공 & 응답 없음: ", err.request);
      } else {
        console.log("failed to fetch data", err);
        throw new Error("수거 기록 조회 실패");
      }
    }
  }
};

export const downloadData = async (
  startTime: string,
  endTime: string,
  endPoint: "monitoring" | "cleanup" | "avg"
) => {
  try {
    const res = await axiosInstance.get(`/download/${endPoint}`, {
      params: {
        startTime,
        endTime,
      },
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([res.data]));

    const link = document.createElement("a");
    // const dataName = endPoint === "monitoring" ? "조사" : "청소";
    let dataName: string;
    switch (endPoint) {
      case "monitoring":
        dataName = "조사";
        break;
      case "cleanup":
        dataName = "청소";
        break;
      case "avg":
        dataName = "평균";
        break;
    }
    const filename = `${dataName}_데이터_${readableDate(startTime).replace(
      /-/g,
      ""
    )}_${readableDate(endTime).replace(/-/g, "")}.xlsx`;

    link.href = url;
    link.setAttribute("download", filename);

    document.body.appendChild(link);
    link.click();

    if (link.parentNode) {
      link.parentNode.removeChild(link);
    } else {
      console.warn("Link parent node not found.");
    }

    window.URL.revokeObjectURL(url);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response) {
        console.log("서버 응답 오류: ", err.response);
      } else if (err.request) {
        console.log("요청 성공 & 응답 없음: ", err.request);
      } else {
        console.log("failed to fetch data", err);
        throw new Error("수거 기록 조회 실패");
      }
    }
  }
};
