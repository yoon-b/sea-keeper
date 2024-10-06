import WebBackgroundImage from "../../assets/image/web-bg.jpg";
import BadaIcon from "/pwa-192x192.png";
import QrCode from "../../assets/image/qr-code.png";

const Mobile = () => {
  return (
    <div
      className="flex flex-col justify-center items-center space-y-6"
      style={{
        textAlign: "center",
        padding: "2rem",
        backgroundImage: `url(${WebBackgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div className="flex space-x-4">
        <img
          src={BadaIcon}
          alt="바다환경 지킴이"
          className="w-48 h-48 font-bold"
        />
        <img src={QrCode} alt="접속 링크" className="w-48 h-48" />
      </div>
      <h1 className="text-indigo-900">바다지킴이</h1>
      <h3 className="text-indigo-900">모바일 기기로 이용해 주세요</h3>
    </div>
  );
};

export default Mobile;
