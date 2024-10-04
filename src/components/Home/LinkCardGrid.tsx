import React from "react";
import LinkCard from "./LinkCard";
import LongLinkCard from "./LongLinkCard";

interface LinkCardGridProps {
  mode: "default" | "manager";
}

const LinkCardGrid: React.FC<LinkCardGridProps> = ({ mode }) => {
  const ManagerLinks = [
    {
      to: "/inspector",
      title: "조사하기",
      imageUrl: "https://epicpadprinting.com/public/img/indus/Automotive.png",
      bgColor: "#267EC3",
    },
    {
      to: "/manager",
      title: "관리하기",
      imageUrl: "https://epicpadprinting.com/public/img/indus/Automotive.png",
      bgColor: "#FDBB3A",
    },
    {
      to: "/cleaner",
      title: "청소하기",
      imageUrl: "https://epicpadprinting.com/public/img/indus/Automotive.png",
      bgColor: "#46B3A9",
    },
    {
      to: "/collector",
      title: "운반하기",
      imageUrl: "https://epicpadprinting.com/public/img/indus/Automotive.png",
      bgColor: "#FF6178",
    },
  ];

  const defaultLinks = [
    {
      to: "/inspector",
      title: "조사하기",
      imageUrl: "https://epicpadprinting.com/public/img/indus/Automotive.png",
      bgColor: "#267EC3",
    },
    {
      to: "/cleaner",
      title: "청소하기",
      imageUrl: "https://epicpadprinting.com/public/img/indus/Automotive.png",
      bgColor: "#46B3A9",
    },
  ];

  const linksToRender = mode === "manager" ? ManagerLinks : defaultLinks;

  return (
    <div
      className={`grid ${
        mode === "default" ? "grid-cols-1" : "grid-cols-2"
      } gap-x-4 gap-y-8`}
    >
      {linksToRender.map((link) => {
        return mode === "default" ? (
          <LongLinkCard
            key={link.to}
            to={link.to}
            title={link.title}
            imageUrl={link.imageUrl}
            bgColor={link.bgColor}
          />
        ) : (
          <LinkCard
            key={link.to}
            to={link.to}
            title={link.title}
            imageUrl={link.imageUrl}
            bgColor={link.bgColor}
          />
        );
      })}
    </div>
  );
};

export default LinkCardGrid;
