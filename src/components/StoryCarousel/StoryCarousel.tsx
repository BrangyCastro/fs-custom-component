import { StoryProvider, StoryView, ThumbnailSwiper } from "./components";

import "swiper/css";

interface StoryCarouselProps {
  duration?: number;
}

const StoryCarousel: React.FC<StoryCarouselProps> = ({ duration = 5000 }) => {
  return (
    <StoryProvider duration={duration}>
      <ThumbnailSwiper />
      <StoryView />
    </StoryProvider>
  );
};

export default StoryCarousel;
