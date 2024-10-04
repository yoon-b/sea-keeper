import { useState, useEffect, useRef } from "react";
import defaultBeforeImg from "../../assets/image/before-example.jpg";
import defaultAfterImg from "../../assets/image/after-example.jpg";
import defaultCompleteImg from "../../assets/image/complete-example.jpg";

interface CarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<CarouselProps> = ({ images }) => {
  const labels = ["청소 전", "청소 후", "집하 후"];
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      setCurrentSlide((prev) => (prev === images.length - 1 ? prev : prev + 1));
    }

    if (touchStartX.current - touchEndX.current < -50) {
      setCurrentSlide((prev) => (prev === 0 ? prev : prev - 1));
    }
  };

  useEffect(() => {
    const slider = document.getElementById(`slider${currentSlide + 1}`);
    if (slider) {
      (slider as HTMLInputElement).checked = true;
    }
  }, [currentSlide]);

  return (
    <div
      className="relative w-full h-[40vh] bg-slate-800"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
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
              src={
                image && image !== "null"
                  ? `${image}.webp`
                  : index === 0
                  ? defaultBeforeImg
                  : index === 1
                  ? defaultAfterImg
                  : defaultCompleteImg
              }
              alt={`carousel-img-${index + 1}`}
            />
            <span className="absolute bottom-2 right-2 text-white bg-gray-800 bg-opacity-70 px-2 py-1 rounded">
              {labels[index]}
            </span>
          </div>
        ))}
      </div>

      <div className="absolute w-full flex justify-center gap-2 bottom-4">
        {images.map((_, index) => (
          <label
            key={index}
            className={`block w-5 h-5 bg-white cursor-pointer opacity-50 z-10 transition-all duration-300 ease-in-out 
        hover:scale-125 hover:opacity-100 ${
          currentSlide === index ? "opacity-100 w-10" : ""
        }`}
            htmlFor={`slider${index + 1}`}
          ></label>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
