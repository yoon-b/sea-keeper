import { useState } from "react";
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
    <div className="text-black m-4">
      <h3 className="text-lg font-semibold text-slate-800 mb-2 p-2">
        청소 기록 작성하기
      </h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("coastName")}
          className="report-input-field"
          required
          type="text"
          placeholder="해안명*"
        />

        <div className="relative w-full h-[50%] my-2">
          <input
            {...register("coastLength")}
            className="report-input-field"
            required
            type="number"
            placeholder="해안 길이*"
          />
          <p className="report-input-unit">m</p>
        </div>

        <div className="relative w-full h-[50%] my-2">
          <input
            {...register("realizedAmount")}
            className="report-input-field"
            required
            type="number"
            placeholder="실제 수거량*"
          />
          <p className="report-input-unit">개</p>
        </div>

        <div className="flex flex-col my-2">
          <label className="text-gray-500 py-2 text-left">주요 쓰레기:</label>
          <select
            {...register("mainWasteType")}
            className="report-input-field"
            required
            defaultValue=""
          >
            <option value="" disabled>
              주요 쓰레기 종류를 선택하세요.
            </option>
            <option value="1">폐어구류 (그물, 밧줄, 양식 자재 등)</option>
            <option value="2">부표류 (스티로폼 부표, 인증부표 등)</option>
            <option value="3">
              생활쓰레기류 (음료수병, 포장비닐, 과자봉지, 캔 등)
            </option>
            <option value="4">대형 투기쓰레기류 (가전제품, 타이어 등)</option>
            <option value="5">초목류 (자연목, 인공목 등)</option>
          </select>
        </div>

        <div className="flex flex-col my-2">
          <label
            htmlFor="before-photo"
            className="text-gray-500 py-2 text-left"
          >
            청소 전 해안사진:
          </label>
          <input
            type="file"
            id="before-photo"
            accept="image/*"
            {...register("beforePhoto")}
          />
        </div>
        <div className="flex flex-col my-2">
          <label htmlFor="after-photo" className="text-gray-500 py-2 text-left">
            청소 후 해안사진:
          </label>
          <input
            type="file"
            id="after-photo"
            accept="image/*"
            {...register("afterPhoto")}
          />
        </div>
        <div className="flex flex-col my-2">
          <label
            htmlFor="dump-site-photo"
            className="text-gray-500 py-2 text-left"
          >
            집하 완료 사진:
          </label>
          <input
            type="file"
            id="dump-site-photo"
            accept="image/*"
            {...register("dumpSitePhoto")}
          />
        </div>

        <div className="my-2">
          <p className="text-gray-500 py-2 text-left">현재 위치:</p>
          {location ? (
            <div className="flex justify-around items-center">
              <span>위도: {location.latitude.toFixed(4)}</span>
              <span>경도: {location.longitude.toFixed(4)}</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={getCurrentLocation}
              className="text-sm shadow-sm font-medium tracking-wider border border-gray-500 rounded-md bg-transparent text-black"
            >
              현재 위치 입력하기
            </button>
          )}
        </div>

        <input type="hidden" {...register("latitude")} />
        <input type="hidden" {...register("longitude")} />

        <button
          type="submit"
          className="w-full text-base shadow-sm font-medium tracking-wider text-white rounded-md mt-8"
        >
          작성하기
        </button>
      </form>
    </div>
  );
};

export default CreateCleanup;
