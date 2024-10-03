interface CarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<CarouselProps> = ({ images }) => {
  const labels = ["청소 전", "청소 후", "집하 후"];

  return (
    <div className="relative w-full h-[40vh] bg-slate-800">
      <input
        className="hidden peer/slider1 checkbox"
        type="radio"
        name="slider"
        id="slider1"
        defaultChecked
      />
      <input
        className="hidden peer/slider2 checkbox"
        type="radio"
        name="slider"
        id="slider2"
      />
      <input
        className="hidden peer/slider3 checkbox"
        type="radio"
        name="slider"
        id="slider3"
      />

      <div className="relative w-[300vw] h-[100%] flex transition-all duration-500 ease-in-out peer-checked/slider1:-left-0 peer-checked/slider2:-left-[100vw] peer-checked/slider3:-left-[200vw]">
        {images.map((image, index) => (
          <div key={index} className="relative w-full h-full flex">
            <img
              className="object-cover w-full h-full"
              src={`${image}.webp`}
              alt={`carousel-img-${index + 1}`}
            />
            <span className="absolute bottom-2 right-2 text-white bg-gray-800 bg-opacity-70 px-2 py-1 rounded">
              {labels[index]}
            </span>
          </div>
        ))}
      </div>

      <div className="absolute w-full flex justify-center gap-2 bottom-4">
        <label
          className="block w-5 h-5 bg-white cursor-pointer opacity-50 z-10 transition-all duration-300 ease-in-out hover:scale-125 hover:opacity-100 peer-[&_label:nth-of-type(1)]/slider1:peer-checked/slider1:opacity-100 peer-[&_label:nth-of-type(1)]/slider1:peer-checked/slider1:w-10"
          htmlFor="slider1"
        ></label>
        <label
          className="block w-5 h-5 bg-white cursor-pointer opacity-50 z-10 transition-all duration-300 ease-in-out hover:scale-125 hover:opacity-100 peer-[&_label:nth-of-type(2)]/slider2:peer-checked/slider2:opacity-100 peer-[&_label:nth-of-type(2)]/slider2:peer-checked/slider2:w-10"
          htmlFor="slider2"
        ></label>
        <label
          className="block w-5 h-5 bg-white cursor-pointer opacity-50 z-10 transition-all duration-300 ease-in-out hover:scale-125 hover:opacity-100 peer-[&_label:nth-of-type(3)]/slider3:peer-checked/slider3:opacity-100 peer-[&_label:nth-of-type(3)]/slider3:peer-checked/slider3:w-10"
          htmlFor="slider3"
        ></label>
      </div>
    </div>
  );
};

export default ImageCarousel;
