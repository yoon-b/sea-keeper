import { Link } from "react-router-dom";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import CleaningServicesOutlinedIcon from "@mui/icons-material/CleaningServicesOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";

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
    case "chart":
      IconComponent = InsertChartOutlinedIcon;
      break;
    default:
      IconComponent = AddAPhotoIcon;
  }

  return (
    <div
      className={`relative group h-48 flex flex-col justify-center rounded-xl shadow-md px-2`}
      style={{ backgroundColor: "#1d2268" }}
    >
      <Link to={to} className="text-white">
        <div className="h-20 pt-4">
          <IconComponent
            className="text-white mx-auto"
            style={{ width: "60px", height: "60px" }}
          />
        </div>
        <div className="p-6 pb-0 z-10 w-full">
          <p className="inline-block text-tg text-center w-full text-xl font-sans font-semibold leading-snug tracking-normal antialiased">
            {title}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default LinkCard;
