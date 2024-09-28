import axiosInstance from "./axiosConfig";

interface InspectionReport {
  serialNumber: string;
  latitude: number;
  longitude: number;
  coastName: string;
  coastLength: number;
  predictedTrashVolume: number;
  mainTrashType: string;
  monitoringImageUrl: string;
}

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

// 조사 기록 개별 조회
// export const fetchInspectionReportById = async (reportId: number) => {
export const fetchInspectionReportById = async (
  reportId: number
): Promise<InspectionReport> => {
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
    // console.log("form data: ", formData);
    const dataObject = Object.fromEntries(formData.entries());
    console.log("Data Object: ", dataObject);

    const res = await axiosInstance.post(`/monitoring`, formData);
    return res.data;
  } catch (err) {
    console.log("failed to create report", err);
    throw new Error("기록 생성 실패");
  }
};

// 조사 기록 삭제
export const deleteInspectionReport = async (reportId: number) => {
  try {
    const res = await axiosInstance.delete(`/monitoring/${reportId}`);
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

// 청소 기록 개별 조회
export const fetchCleanupReportById = async (reportId: number) => {
  try {
    const res = await axiosInstance.get(`/cleanup/${reportId}`);
    return res.data;
  } catch (err) {
    console.log("failed to fetch data", err);
    throw new Error("개별 조회 실패");
  }
};

// 청소 기록 생성
export const createCleanupReport = async () => {
  try {
    const res = await axiosInstance.post(`/cleanup`);
    return res.data;
  } catch (err) {
    console.log("failed to create report", err);
    throw new Error("기록 생성 실패");
  }
};

// 청소 기록 삭제
export const deleteCleanupReport = async (reportId: number) => {
  try {
    const res = await axiosInstance.delete(`/cleanup/${reportId}`);
    return res.data;
  } catch (err) {
    console.log("failed to delete data", err);
    throw new Error("기록 삭제 실패");
  }
};
