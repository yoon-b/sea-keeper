import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { createCleanupReport } from "../../api/reportApi";

interface IFormInput {
  coastName: string;
  coastLength: string;
  beforePhoto: FileList;
  afterPhoto: FileList;
  dumpSitePhoto: FileList;
  realizedAmount: number;
  mainWasteType: string;
  latitude: number;
  longitude: number;
}

const CreateCleanup = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, setValue } = useForm<IFormInput>();
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const formData = new FormData();

    const cleanupData = {
      coastName: data.coastName,
      coastLength: data.coastLength.toString(),
      latitude: data.latitude.toString(),
      longitude: data.longitude.toString(),
      actualTrashVolume: data.realizedAmount.toString(),
      mainTrashType: data.mainWasteType,
    };

    formData.append("cleanup", JSON.stringify(cleanupData));

    if (data.beforePhoto.length > 0) {
      formData.append("beforeViewFile", data.beforePhoto[0]);
    }

    if (data.afterPhoto.length > 0) {
      formData.append("afterViewFile", data.afterPhoto[0]);
    }

    if (data.dumpSitePhoto.length > 0) {
      formData.append("completeViewFile", data.dumpSitePhoto[0]);
    }

    try {
      const res = await createCleanupReport(formData);
      // console.log(res);
      navigate(`/cleanup-detail/${res.result}`);
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
      <form onSubmit={handleSubmit(onSubmit)}>
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
            {...register("realizedAmount")}
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
          <label htmlFor="before-photo" className="py-2">
            청소 전 해안사진:
          </label>
          <input
            type="file"
            id="before-photo"
            accept="image/*"
            capture="environment"
            {...register("beforePhoto")}
          />
        </div>
        <div>
          <label htmlFor="after-photo" className="py-2">
            청소 후 해안사진:
          </label>
          <input
            type="file"
            id="after-photo"
            accept="image/*"
            capture="environment"
            {...register("afterPhoto")}
          />
        </div>
        <div>
          <label htmlFor="dump-site-photo" className="py-2">
            집하 완료 사진:
          </label>
          <input
            type="file"
            id="dump-site-photo"
            accept="image/*"
            capture="environment"
            {...register("dumpSitePhoto")}
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

export default CreateCleanup;
