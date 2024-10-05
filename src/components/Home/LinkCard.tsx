import { Link } from "react-router-dom";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import CleaningServicesOutlinedIcon from "@mui/icons-material/CleaningServicesOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

interface LinkCardProps {
  to: string;
  title: string;
  icon: "camera" | "broom" | "truck" | "chart";
}

const LinkCard: React.FC<LinkCardProps> = ({ to, title, icon }) => {
  let IconComponent;

  switch (icon) {
    case "camera":
      IconComponent = AddAPhotoIcon;
      break;
    case "broom":
      IconComponent = CleaningServicesOutlinedIcon;
      break;
    case "truck":
      IconComponent = LocalShippingOutlinedIcon;
      break;
    default:
      IconComponent = AddAPhotoIcon;
  }

  return (
    <div
      className={`relative group h-48 flex flex-col items-center justify-center rounded-xl shadow-md bg-blue-300 bg-opacity-60`}
    >
      <Link to={to} className="text-black">
        <div className="h-20 pt-4">
          {/* <div
            className={`absolute top-3 lg:top-[-10%] left-[5%] z-2 group-hover:top-[-40%] group-hover:opacity-[0.9] duration-300 w-[90%] h-28 bg-blue-300 rounded-xl justify-items-center align-middle`}
          /> */}
          <IconComponent
            className="text-white mx-auto"
            style={{ width: "60px", height: "60px" }}
          />
        </div>
        <div className="p-6 z-10 w-full">
          <p className="mb-2 inline-block text-tg text-center w-full text-xl font-sans font-semibold leading-snug tracking-normal antialiased">
            {title}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default LinkCard;
