import { StoryProvider, StoryView, ThumbnailSwiper } from "./components";

import "swiper/css";
import "./StoryCarousel.css";

interface StoryCarouselProps {
  duration?: number;
}

export const StoryCarousel: React.FC<StoryCarouselProps> = ({
  duration = 5000,
}) => {
  return (
    <StoryProvider duration={duration}>
      <ThumbnailSwiper />
      <StoryView />
    </StoryProvider>
  );
};
