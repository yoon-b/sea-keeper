import React from "react";
import { Link } from "react-router-dom";

interface LinkCardProps {
  to: string;
  title: string;
  imageUrl: string;
  bgColor: string;
}

const LongLinkCard: React.FC<LinkCardProps> = ({
  to,
  title,
  imageUrl,
  bgColor,
}) => (
  <div
    className={`relative group h-[20dvh] w-[70dvw] flex flex-row rounded-xl shadow-md bg-gradient-to-r from-${bgColor}-500 to-${bgColor}-100`}
  >
    <Link
      to={to}
      className="flex items-center w-full text-black hover:text-blue-500"
    >
      <img
        src={imageUrl}
        className="w-24 h-24 m-2"
        alt={title}
        title={title}
        loading="lazy"
        width="100"
        height="100"
      />
      <div className="p-4">
        <p className="text-2xl font-semibold">{title}</p>
      </div>
    </Link>
  </div>
);

export default LongLinkCard;
