import { useRef, useState } from "react";

import { useStoryContext } from "../StoryContext";
import Closed from "../assets/close.svg";
import { StorySwiper } from "../StorySwiper";
import { ThumbnailSwiper } from "../ThumbnailSwiper";

import "./StoryView.css";

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
          className={`stories-navigator-wrapper ${openModal ? "open" : ""}`}
          ref={storyRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="stories-navigator-backdrop" onClick={onCloseModal}>
            <div className="story-top-bar">
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
