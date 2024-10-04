import axiosInstance from "./axiosConfig";
import { toast } from "react-hot-toast";

// 조사 기록 전체 조회
export const fetchInspectionReport = async (page: number) => {
  try {
    const res = await axiosInstance.get(`/monitoring-list`, {
      params: {
        page: page,
        size: 5,
      },
    });
    return res.data;
  } catch (err) {
    console.log("failed to fetch data", err);
    throw new Error("전체 목록 조회 실패");
  }
};

// 관리자 조사 기록 전체 조회
export const fetchInspectionReportForAdmin = async (page: number) => {
  try {
    const res = await axiosInstance.get(`/admin/monitoring-list`, {
      params: {
        page: page,
        size: 5,
      },
    });
    return res.data;
  } catch (err) {
    console.log("failed to fetch data", err);
    throw new Error("전체 목록 조회 실패");
  }
};

// 조사 기록 개별 조회
export const fetchInspectionReportById = async (
  reportId: number
): Promise<Inspection> => {
  try {
    const res = await axiosInstance.get(`/monitoring/${reportId}`);
    return res.data.result;
  } catch (err) {
    console.log("failed to fetch data", err);
    throw new Error("개별 조회 실패");
  }
};

// 조사 기록 생성
export const createInspectionReport = async (formData: FormData) => {
  try {
    const createPromise = axiosInstance.post(`/monitoring`, formData);

    const res = await toast.promise(createPromise, {
      loading: "기록 작성 중...",
      success: "기록 작성 성공!",
      error: "기록 작성 실패",
    });

    return res.data;
  } catch (err) {
    console.log("failed to create report", err);
    throw new Error("기록 생성 실패");
  }
};

// 조사 기록 삭제
export const deleteInspectionReport = async (reportId: number) => {
  try {
    const deletePromise = axiosInstance.delete(`/monitoring/${reportId}`);

    const res = await toast.promise(deletePromise, {
      loading: "기록 삭제 중...",
      success: "기록 삭제 성공!",
      error: "기록 삭제 실패",
    });

    return res.data;
  } catch (err) {
    console.log("failed to delete data", err);
    throw new Error("기록 삭제 실패");
  }
};

// 청소 기록 전체 조회
export const fetchCleanupReport = async (page: number) => {
  try {
    const res = await axiosInstance.get(`/cleanup-list`, {
      params: {
        page: page,
        size: 5,
      },
    });
    return res.data;
  } catch (err) {
    console.log("failed to fetch data", err);
    throw new Error("전체 목록 조회 실패");
  }
};

// 관리자 청소 기록 전체 조회
export const fetchCleanupReportForAdmin = async (page: number) => {
  try {
    const res = await axiosInstance.get(`/cleanup-list/admin`, {
      params: {
        page: page,
        size: 5,
      },
    });
    return res.data;
  } catch (err) {
    console.log("failed to fetch data", err);
    throw new Error("전체 목록 조회 실패");
  }
};

// 청소 기록 개별 조회
export const fetchCleanupReportById = async (reportId: number) => {
  try {
    const res = await axiosInstance.get(`/cleanup/${reportId}`);
    return res.data.result;
  } catch (err) {
    console.log("failed to fetch data", err);
    throw new Error("개별 조회 실패");
  }
};

// 청소 기록 생성
export const createCleanupReport = async (formData: FormData) => {
  try {
    const createPromise = axiosInstance.post(`/cleanup`, formData);

    const res = await toast.promise(createPromise, {
      loading: "기록 작성 중...",
      success: "기록 작성 성공!",
      error: "기록 작성 실패",
    });

    return res.data;
  } catch (err) {
    console.log("failed to create report", err);
    throw new Error("기록 생성 실패");
  }
};

// 청소 기록 삭제
export const deleteCleanupReport = async (reportId: number) => {
  try {
    const deletePromise = axiosInstance.delete(`/cleanup/${reportId}`);

    const res = await toast.promise(deletePromise, {
      loading: "기록 삭제 중...",
      success: "기록 삭제 성공!",
      error: "기록 삭제 실패",
    });

    return res.data;
  } catch (err) {
    console.log("failed to delete data", err);
    throw new Error("기록 삭제 실패");
  }
};
