import { useRef, useState } from "react";

import { useStoryContext } from "../StoryContext";
import Closed from "../assets/close.svg";
import { StorySwiper } from "../StorySwiper";
import { ThumbnailSwiper } from "../ThumbnailSwiper";

import styles from "./StoryView.module.scss";

export const StoryView = () => {
  const { openModal, setOpenModal, activeIndex } = useStoryContext();

  const onCloseModal = () => {
    setOpenModal(false);
    document.body.classList.remove("stories-lock-fixed-height");
  };

  const [startY, setStartY] = useState<number | null>(null);
  const storyRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY !== null) {
      const currentY = e.touches[0].clientY;
      const distanceY = currentY - startY;

      if (distanceY > 100) {
        onCloseModal();
      }
    }
  };

  const handleTouchEnd = () => {
    setStartY(null);
  };

  return (
    <>
      {openModal && (
        <div
          className={`${styles["stories-navigator-wrapper"]} ${
            openModal ? styles["open"] : ""
          }`}
          ref={storyRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={styles["stories-navigator-backdrop"]}
            onClick={onCloseModal}
          >
            <div className={styles["story-top-bar"]}>
              <div onClick={onCloseModal}>
                <img src={Closed} alt="Closed" />
              </div>
            </div>
          </div>
          <StorySwiper />
          <ThumbnailSwiper isPrincipal={false} initialSlide={activeIndex} />
        </div>
      )}
    </>
  );
};
