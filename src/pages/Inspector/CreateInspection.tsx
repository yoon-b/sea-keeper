import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  createInspectionReport,
  fetchInspectionAutoResults,
} from "../../api/reportApi";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "../../utils/useDebounce";
import AddressName from "../../components/Common/AddressName";

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
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<IFormInput>();
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const debouncedKeyword = useDebounce(inputValue, 300);
  const [isManualInput, setIsManualInput] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: suggestions = [] } = useQuery<string[]>({
    queryKey: ["autocomplete", debouncedKeyword],
    queryFn: () => fetchInspectionAutoResults(debouncedKeyword),
    enabled: !!debouncedKeyword && !isManualInput,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsManualInput(false);
    if (e.target.value) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion); // input을 클릭한 제안으로 채우기
    setValue("coastName", suggestion);
    setIsManualInput(true); // 수동 입력 모드 활성화 (API 호출 막음)
    setShowSuggestions(false); // suggestions 숨기기
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false); // 외부 클릭 시 suggestions 숨기기
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef]);

  useEffect(() => {
    if (suggestions.length > 0 && !isManualInput) {
      setShowSuggestions(true);
    }
  }, [suggestions]);

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
      navigate(`/report-detail/${res.result}`);
    } catch (err) {
      console.log("조사 기록 작성 실패", err);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          console.log(location);

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
  }, []);

  return (
    <div className="text-black m-4">
      <div className="relative w-full h-[50%] my-2 flex flex-start">
        <AddressName location={location} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <input
          {...register("coastName")}
          className="report-input-field"
          required
          type="text"
          placeholder="해안명*"
          value={inputValue}
          onChange={handleInputChange}
        />

        <div className="relative w-full h-[50%] my-2">
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-10 bg-white border border-gray-300 mt-1 max-h-48 w-[100%] overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="p-2 hover:bg-gray-200 cursor-pointer text-left"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

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
            {...register("estimatedAmount")}
            className="report-input-field"
            required
            type="number"
            placeholder="수거 예측량*"
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
          <label htmlFor="photo" className="text-gray-500 py-2 text-left">
            해안사진:
          </label>
          <input
            type="file"
            id="photo"
            accept="image/*"
            {...register("photo")}
          />
        </div>

        <button
          type="submit"
          className="w-full text-base shadow-sm font-medium tracking-wider text-white rounded-md mt-8"
          style={{ backgroundColor: "#1d2268" }}
        >
          작성하기
        </button>
      </form>
    </div>
  );
};

export default CreateInspection;
