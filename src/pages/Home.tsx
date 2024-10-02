import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="page-container">
      {/* <div className="container mx-auto px-[12px] md:px-24 xl:px-12 max-w-[1300px] nanum2"> */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-16">
        <div className="relative group h-48 flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
          <Link to="/inspector">
            <div className="h-28">
              <div className="absolute top-3 lg:top-[-10%] left-[5%] z-40 group-hover:top-[-40%] group-hover:opacity-[0.9] duration-300 w-[90%] h-28 bg-blue-300 rounded-xl justify-items-center align-middle">
                <img
                  src="https://epicpadprinting.com/public/img/indus/Automotive.png"
                  className="w-36 h-36 m-auto"
                  alt="Automotive"
                  title="Automotive"
                  loading="lazy"
                  width="200"
                  height="200"
                />
              </div>
            </div>
            <div className="p-6 z-10 w-full">
              <p className="mb-2 inline-block text-tg text-center w-full text-xl font-sans font-semibold leading-snug tracking-normal antialiased">
                조사하기
              </p>
            </div>
          </Link>
        </div>

        <div className="relative group h-48 flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
          <Link to="/manager">
            <div className="h-28">
              <div className="absolute top-3 lg:top-[-10%] left-[5%] z-40 group-hover:top-[-40%] group-hover:opacity-[0.9] duration-300 w-[90%] h-28 bg-blue-300 rounded-xl justify-items-center align-middle">
                <img
                  src="https://epicpadprinting.com/public/img/indus/Automotive.png"
                  className="w-36 h-36 m-auto"
                  alt="Automotive"
                  title="Automotive"
                  loading="lazy"
                  width="200"
                  height="200"
                />
              </div>
            </div>
            <div className="p-6 z-10 w-full">
              <p className="mb-2 inline-block text-tg text-center w-full text-xl font-sans font-semibold leading-snug tracking-normal antialiased">
                관리하기
              </p>
            </div>
          </Link>
        </div>

        <div className="relative group h-48 flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
          <Link to="/cleaner">
            <div className="h-28">
              <div className="absolute top-3 lg:top-[-10%] left-[5%] z-40 group-hover:top-[-40%] group-hover:opacity-[0.9] duration-300 w-[90%] h-28 bg-blue-300 rounded-xl justify-items-center align-middle">
                <img
                  src="https://epicpadprinting.com/public/img/indus/Automotive.png"
                  className="w-36 h-36 m-auto"
                  alt="Automotive"
                  title="Automotive"
                  loading="lazy"
                  width="200"
                  height="200"
                />
              </div>
            </div>
            <div className="p-6 z-10 w-full">
              <p className="mb-2 inline-block text-tg text-center w-full text-xl font-sans font-semibold leading-snug tracking-normal antialiased">
                청소하기
              </p>
            </div>
          </Link>
        </div>

        <div className="relative group h-48 flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
          <Link to="/collector">
            <div className="h-28">
              <div className="absolute top-3 lg:top-[-10%] left-[5%] z-40 group-hover:top-[-40%] group-hover:opacity-[0.9] duration-300 w-[90%] h-28 bg-blue-300 rounded-xl justify-items-center align-middle">
                <img
                  src="https://epicpadprinting.com/public/img/indus/Automotive.png"
                  className="w-36 h-36 m-auto"
                  alt="Automotive"
                  title="Automotive"
                  loading="lazy"
                  width="200"
                  height="200"
                />
              </div>
            </div>
            <div className="p-6 z-10 w-full">
              <p className="mb-2 inline-block text-tg text-center w-full text-xl font-sans font-semibold leading-snug tracking-normal antialiased">
                운반하기
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
