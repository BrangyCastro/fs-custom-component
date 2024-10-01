import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";

import { useStoryContext } from "../StoryContext";
import { StoryProgressIndicator } from "../StoryProgressIndicator";
import ArrowLeft from "../assets/arrow_left.svg";
import ArrowRight from "../assets/arrow_right.svg";
import Closed from "../assets/close.svg";

import styles from "./StorySwiper.module.scss";

export const StorySwiper: React.FC = () => {
  const { activeIndex, setActiveIndex, stories, setOpenModal } =
    useStoryContext();
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const swiperRef = useRef<SwiperCore>();

  const handleNavigation = (direction: "next" | "prev") => {
    const newIndex = direction === "next" ? activeIndex + 1 : activeIndex - 1;
    if (newIndex >= 0 && newIndex < stories.length) {
      setActiveIndex(newIndex);
    } else if (newIndex >= stories.length) {
      setOpenModal(false);
    } else {
      setActiveIndex(stories.length - 1);
    }
  };

  const handleProgressComplete = () => {
    handleNavigation("next");
  };

  const onCloseModal = () => {
    setOpenModal(false);
    document.body.classList.remove("stories-lock-fixed-height");
  };

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(activeIndex);
    }
  }, [activeIndex]);

  return (
    <div className={styles["stories-navigator-container"]}>
      <div
        className={styles["nav-button"]}
        onClick={() => handleNavigation("prev")}
        style={{ visibility: activeIndex > 0 ? "visible" : "hidden" }}
        aria-label="Previous story"
      >
        <img src={ArrowLeft} alt="Arrow Left" />
      </div>
      <Swiper
        modules={[Navigation]}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        slidesPerView={1}
        initialSlide={activeIndex}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        className={`${styles["swiper-container"]} ${styles["story-groups-slider"]}`}
      >
        {stories.map((story, index) => (
          <SwiperSlide key={index}>
            <StoryProgressIndicator
              isActive={index === activeIndex}
              isPaused={isPaused}
              onComplete={handleProgressComplete}
            />
            <div
              className={styles["story-background-container"]}
              style={{
                backgroundSize: "cover",
                backgroundPosition: "center center",
                backgroundImage: `linear-gradient(rgb(16, 20, 25) 0%, rgba(16, 20, 25, 0) 40%), url("${story.image}")`,
              }}
            >
              <div className={styles["navigation-overlay"]}>
                <div
                  className={`${styles["navigation-overlay-area"]} ${styles["left"]}`}
                  onClick={() => handleNavigation("prev")}
                  style={{
                    visibility: activeIndex > 0 ? "visible" : "hidden",
                  }}
                  aria-label="Previous story"
                ></div>
                <div
                  className={`${styles["navigation-overlay-area"]} ${styles["right"]}`}
                  onClick={() => handleNavigation("next")}
                  style={{
                    visibility:
                      activeIndex < stories.length - 1 ? "visible" : "hidden",
                  }}
                  aria-label="Next story"
                ></div>
              </div>
              <div className={styles["story-top-bar"]}>
                <div className={styles["info"]}>
                  <div className={styles["heading"]}>
                    <span className={styles["title"]}>
                      {story.title} {index + 1}
                    </span>
                  </div>
                </div>
                <div className={styles["close"]} onClick={onCloseModal}>
                  <img src={Closed} alt="Closed" />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className={styles["nav-button"]}
        onClick={() => handleNavigation("next")}
        style={{
          visibility: activeIndex < stories.length - 1 ? "visible" : "hidden",
        }}
        aria-label="Next story"
      >
        <img src={ArrowRight} alt="Arrow Right" />
      </div>
    </div>
  );
};
