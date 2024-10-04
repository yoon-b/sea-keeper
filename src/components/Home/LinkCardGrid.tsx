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
    },
    {
      to: "/manager",
      title: "관리하기",
      imageUrl: "https://epicpadprinting.com/public/img/indus/Automotive.png",
    },
    {
      to: "/cleaner",
      title: "청소하기",
      imageUrl: "https://epicpadprinting.com/public/img/indus/Automotive.png",
    },
    {
      to: "/collector",
      title: "운반하기",
      imageUrl: "https://epicpadprinting.com/public/img/indus/Automotive.png",
    },
  ];

  const defaultLinks = [
    {
      to: "/inspector",
      title: "조사하기",
      imageUrl: "https://epicpadprinting.com/public/img/indus/Automotive.png",
    },
    {
      to: "/cleaner",
      title: "청소하기",
      imageUrl: "https://epicpadprinting.com/public/img/indus/Automotive.png",
    },
  ];

  const linksToRender = mode === "manager" ? ManagerLinks : defaultLinks;

  return (
    <div
      className={`grid ${
        mode === "default" ? "grid-cols-1" : "grid-cols-2"
      } gap-x-4 gap-y-16`}
    >
      {linksToRender.map((link) => {
        return mode === "default" ? (
          <LongLinkCard
            key={link.to}
            to={link.to}
            title={link.title}
            imageUrl={link.imageUrl}
          />
        ) : (
          <LinkCard
            key={link.to}
            to={link.to}
            title={link.title}
            imageUrl={link.imageUrl}
          />
        );
      })}
    </div>
  );
};

export default LinkCardGrid;
