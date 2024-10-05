import React from "react";
import { Link } from "react-router-dom";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import CleaningServicesOutlinedIcon from "@mui/icons-material/CleaningServicesOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

interface LinkCardProps {
  to: string;
  title: string;
  icon: "camera" | "broom" | "truck";
}

const LongLinkCard: React.FC<LinkCardProps> = ({ to, title, icon }) => {
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
      className={`relative group h-[20dvh] w-[85dvw] flex flex-row rounded-xl shadow-md bg-blue-300 bg-opacity-60`}
    >
      <Link
        to={to}
        className="flex items-center w-full text-black hover:text-blue-500"
      >
        <IconComponent
          className="text-white mx-auto"
          style={{ width: "48px", height: "48px" }}
        />
        <div className="py-4 px-8">
          <p className="text-4xl font-semibold">{title}</p>
        </div>
      </Link>
    </div>
  );
};

export default LongLinkCard;
