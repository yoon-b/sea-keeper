import { useEffect } from "react";
import { Link } from "react-router-dom";

interface LinkCardProps {
  to: string;
  title: string;
  imageUrl: string;
}

const LinkCard: React.FC<LinkCardProps> = ({ to, title, imageUrl }) => (
  <div className="relative group h-48 flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
    <Link to={to}>
      <div className="h-28">
        <div className="absolute top-3 lg:top-[-10%] left-[5%] z-40 group-hover:top-[-40%] group-hover:opacity-[0.9] duration-300 w-[90%] h-28 bg-blue-300 rounded-xl justify-items-center align-middle">
          <img
            src={imageUrl}
            className="w-36 h-36 m-auto"
            alt={title}
            title={title}
            loading="lazy"
            width="200"
            height="200"
          />
        </div>
      </div>
      <div className="p-6 z-10 w-full">
        <p className="mb-2 inline-block text-tg text-center w-full text-xl font-sans font-semibold leading-snug tracking-normal antialiased">
          {title}
        </p>
      </div>
    </Link>
  </div>
);

const Home = () => {
  useEffect(() => {
    const preventSwipeBack = (event: TouchEvent) => {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    };

    window.addEventListener("touchmove", preventSwipeBack, { passive: false });

    return () => {
      window.removeEventListener("touchmove", preventSwipeBack);
    };
  }, []);

  return (
    <div className="page-container">
      <div className="grid grid-cols-2 gap-x-4 gap-y-16">
        <LinkCard
          to="/inspector"
          title="조사하기"
          imageUrl="https://epicpadprinting.com/public/img/indus/Automotive.png"
        />
        <LinkCard
          to="/manager"
          title="관리하기"
          imageUrl="https://epicpadprinting.com/public/img/indus/Automotive.png"
        />
        <LinkCard
          to="/cleaner"
          title="청소하기"
          imageUrl="https://epicpadprinting.com/public/img/indus/Automotive.png"
        />
        <LinkCard
          to="/collector"
          title="운반하기"
          imageUrl="https://epicpadprinting.com/public/img/indus/Automotive.png"
        />
      </div>
    </div>
  );
};

export default Home;
