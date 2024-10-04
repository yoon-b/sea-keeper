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
    className="relative group h-24 flex flex-row rounded-xl bg-clip-border text-gray-700 shadow-md"
    // style={{
    //   background: bgColor,
    // }}
  >
    <Link
      to={to}
      className="flex items-center w-full text-gray-700 hover:text-blue-500 bg-gradient-to-r from-violet-400 to-purple-300"
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
        <p className="text-lg font-semibold">{title}</p>
      </div>
    </Link>
  </div>
);

export default LongLinkCard;
