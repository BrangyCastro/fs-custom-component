import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";

import { useStoryContext } from "../StoryContext";
import ArrowLeft from "../assets/arrow_left.svg";
import ArrowRight from "../assets/arrow_right.svg";

import "./ThumbnailSwiper.css";

interface ThumbnailSwiperProps {
  isPrincipal?: boolean;
  initialSlide?: number;
}

export const ThumbnailSwiper: React.FC<ThumbnailSwiperProps> = ({
  isPrincipal = true,
  initialSlide = 0,
}) => {
  const { activeIndex, setActiveIndex, stories, setOpenModal } =
    useStoryContext();
  const swiperRef = useRef<SwiperCore>();

  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(true);

  const [loadingImages, setLoadingImages] = useState<boolean[]>(
    new Array(stories.length).fill(true)
  );

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.update();
      checkButtonsVisibility();
    }
  }, [stories, initialSlide]);

  const checkButtonsVisibility = () => {
    if (swiperRef.current) {
      const isBeginning = swiperRef.current.isBeginning; // Verificar si está en la primera historia
      const isEnd = swiperRef.current.isEnd; // Verificar si está en la última historia
      setShowPrev(!isBeginning); // Mostrar "Atrás" si no estamos en el primer item
      setShowNext(!isEnd); // Mostrar "Siguiente" si no estamos en el último item
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      const currentIndex = swiperRef.current.activeIndex;
      if (currentIndex < stories.length - 1) {
        swiperRef.current.slideNext(); // Desplazar a la siguiente miniatura
        checkButtonsVisibility(); // Actualizar visibilidad de botones
      } else {
        alert("Has llegado al último item");
      }
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      const currentIndex = swiperRef.current.activeIndex;
      if (currentIndex > 0) {
        swiperRef.current.slidePrev(); // Desplazar a la miniatura anterior
        checkButtonsVisibility(); // Actualizar visibilidad de botones
      } else {
        alert("Estás en el primer item");
      }
    }
  };

  const handleTouchStart = () => {
    if (swiperRef.current) {
      swiperRef.current.off("slideChangeTransitionEnd", checkButtonsVisibility);
    }
  };

  const handleTouchEnd = () => {
    if (swiperRef.current) {
      swiperRef.current.on("slideChangeTransitionEnd", checkButtonsVisibility);
      checkButtonsVisibility(); // Verificar visibilidad de botones al soltar el arrastre
    }
  };

  const handleImageLoad = (index: number) => {
    setLoadingImages((prev) => {
      const updated = [...prev];
      updated[index] = false;
      return updated;
    });
  };

  return (
    <>
      <Swiper
        modules={[Navigation]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        slidesPerView="auto"
        spaceBetween={10}
        className={`swiper-container story-groups-slider ${
          !isPrincipal && "story-groups-thumbnails-slider"
        }`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        initialSlide={initialSlide}
      >
        {stories.map((story, index) => (
          <SwiperSlide key={index} className="thumbnail-slide">
            <div
              className={`story-group-thumbnail-container ${
                !isPrincipal && index === activeIndex ? "active" : ""
              }`}
              onClick={() => {
                setActiveIndex(index);
                if (isPrincipal) {
                  setOpenModal(true);
                  document.body.classList.add("stories-lock-fixed-height");
                }
              }}
            >
              <div className="overlay"></div>
              <div className="thumbnail-background">
                {loadingImages[index] && <div className="skeleton-loader" />}
                <img
                  src={story.image}
                  alt={`Thumbnail ${index}`}
                  className={`${loadingImages[index] ? "hidden" : ""}`}
                  onLoad={() => handleImageLoad(index)}
                />
              </div>
              <span className="story-title">
                {story.title} {index + 1}
              </span>
            </div>
          </SwiperSlide>
        ))}
        <div
          className="thumbnails-nav-button"
          onClick={handlePrev}
          style={{
            left: "0%",
            display: showPrev ? "flex" : "none",
          }}
        >
          <img src={ArrowLeft} />
        </div>
        <div
          className="thumbnails-nav-button"
          onClick={handleNext}
          style={{
            right: "0%",
            display: showNext ? "flex" : "none",
          }}
        >
          <img src={ArrowRight} />
        </div>
      </Swiper>
    </>
  );
};
