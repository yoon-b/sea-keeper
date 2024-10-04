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
      bgColor: "blue",
    },
    {
      to: "/manager",
      title: "관리하기",
      imageUrl: "https://epicpadprinting.com/public/img/indus/Automotive.png",
      bgColor: "rose",
    },
    {
      to: "/cleaner",
      title: "청소하기",
      imageUrl: "https://epicpadprinting.com/public/img/indus/Automotive.png",
      bgColor: "indigo",
    },
    {
      to: "/collector",
      title: "운반하기",
      imageUrl: "https://epicpadprinting.com/public/img/indus/Automotive.png",
      bgColor: "yellow",
    },
  ];

  const defaultLinks = [
    {
      to: "/inspector",
      title: "조사하기",
      imageUrl: "https://epicpadprinting.com/public/img/indus/Automotive.png",
      bgColor: "blue",
    },
    {
      to: "/cleaner",
      title: "청소하기",
      imageUrl: "https://epicpadprinting.com/public/img/indus/Automotive.png",
      bgColor: "indigo",
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
