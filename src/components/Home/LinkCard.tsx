import { Link } from "react-router-dom";

interface LinkCardProps {
  to: string;
  title: string;
  imageUrl: string;
  bgColor: string;
}

const LinkCard: React.FC<LinkCardProps> = ({
  to,
  title,
  imageUrl,
  bgColor,
}) => (
  <div
    className={`relative group h-48 flex flex-row rounded-xl shadow-md bg-${bgColor}-100`}
  >
    <Link to={to} className="text-black">
      <div className="h-28">
        <div
          className={`absolute top-3 lg:top-[-10%] left-[5%] z-40 group-hover:top-[-40%] group-hover:opacity-[0.9] duration-300 w-[90%] h-28 bg-${bgColor}-300 rounded-xl justify-items-center align-middle`}
        >
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

export default LinkCard;
