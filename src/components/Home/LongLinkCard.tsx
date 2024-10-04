import React from "react";
import { Link } from "react-router-dom";

interface LinkCardProps {
  to: string;
  title: string;
  imageUrl: string;
}

const LongLinkCard: React.FC<LinkCardProps> = ({ to, title, imageUrl }) => (
  <div className="relative group h-24 flex flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
    <Link to={to} className="flex items-center w-full">
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
