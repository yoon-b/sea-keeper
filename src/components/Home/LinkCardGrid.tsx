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
      icon: "camera" as const,
    },
    {
      to: "/cleaner",
      title: "청소하기",
      icon: "broom" as const,
    },
    {
      to: "/collector",
      title: "수거하기",
      icon: "truck" as const,
    },
    {
      to: "/manager",
      title: "관리하기",
      icon: "truck" as const,
    },
  ];

  const defaultLinks = [
    {
      to: "/inspector",
      title: "조사하기",
      icon: "camera" as const,
    },
    {
      to: "/cleaner",
      title: "청소하기",
      icon: "broom" as const,
    },
    {
      to: "/collector",
      title: "수거하기",
      icon: "truck" as const,
    },
  ];

  const linksToRender = mode === "manager" ? ManagerLinks : defaultLinks;

  return (
    <div
      className={`grid ${
        mode === "default" ? "grid-cols-1" : "grid-cols-2"
      } gap-x-4 gap-y-6 mt-16`}
    >
      {linksToRender.map((link) => {
        return mode === "default" ? (
          <LongLinkCard
            key={link.to}
            to={link.to}
            title={link.title}
            icon={link.icon}
          />
        ) : (
          <LinkCard
            key={link.to}
            to={link.to}
            title={link.title}
            icon={link.icon}
          />
        );
      })}
    </div>
  );
};

export default LinkCardGrid;
