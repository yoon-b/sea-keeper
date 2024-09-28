import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { createInspectionReport } from "../../api/reportApi";

interface IFormInput {
  coastName: string;
  coastLength: string;
  photo: FileList;
  estimatedAmount: number;
  mainWasteType: string;
  latitude: number;
  longitude: number;
}

const CreateInspection = () => {
  const { register, handleSubmit, setValue } = useForm<IFormInput>();
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const formData = new FormData();

    const monitoringData = {
      coastName: data.coastName,
      coastLength: data.coastLength.toString(),
      latitude: data.latitude.toString(),
      longitude: data.longitude.toString(),
      predictedTrashVolume: data.estimatedAmount.toString(),
      mainTrashType: data.mainWasteType,
    };

    formData.append("monitoring", JSON.stringify(monitoringData));

    if (data.photo.length > 0) {
      formData.append("monitoringViewFile", data.photo[0]);
    }

    try {
      const res = await createInspectionReport(formData);
      console.log(res);
    } catch (err) {
      console.log("조사 기록 작성 실패", err);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          setLocation({ latitude, longitude });

          setValue("latitude", latitude);
          setValue("longitude", longitude);
        },
        (error) => {
          console.error("사용자 위치에 접근할 수 없습니다.", error);
        }
      );
    } else {
      console.error("위치 접근 권한이 없습니다.");
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="flex items-center justify-between">
          <label className="py-2">해안명</label>
          <input
            {...register("coastName")}
            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
            required
            type="text"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="py-2">해안 길이</label>
          <input
            {...register("coastLength")}
            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
            required
            type="number"
          />
          m
        </div>

        <div className="flex items-center justify-between">
          <label className="py-2">수거 예측량</label>
          <input
            {...register("estimatedAmount")}
            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
            required
            type="number"
          />
          개
        </div>

        <label className="font-semibold py-2">주요 쓰레기 종류</label>
        <select
          {...register("mainWasteType")}
          className="block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
          required
        >
          <option value="1">폐어구류 (그물, 밧줄, 양식 자재 등)</option>
          <option value="2">부표류 (스티로폼 부표, 인증부표 등)</option>
          <option value="3">
            생활쓰레기류 (음료수병, 포장비닐, 과자봉지, 캔 등)
          </option>
          <option value="4">대형 투기쓰레기류 (가전제품, 타이어 등)</option>
          <option value="5">초목류 (자연목, 인공목 등)</option>
        </select>

        <div>
          <label htmlFor="photo" className="py-2">
            해안사진:
          </label>
          <input
            type="file"
            id="photo"
            accept="image/*"
            capture="environment"
            {...register("photo")}
          />
        </div>

        <div className="py-2">
          <button type="button" onClick={getCurrentLocation}>
            현재 위치 입력
          </button>
        </div>

        {location && (
          <div>
            <p>위도: {location.latitude}</p>
            <p>경도: {location.longitude}</p>
          </div>
        )}

        <input type="hidden" {...register("latitude")} />
        <input type="hidden" {...register("longitude")} />

        <button type="submit">작성하기</button>
      </form>
    </React.Fragment>
  );
};

export default CreateInspection;
