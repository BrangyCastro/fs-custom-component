import React, { createContext, useState, useContext } from "react";

interface Story {
  image: string;
  title: string;
  stories?: StoryChild[];
}

interface StoryChild {
  id: number;
  title: string;
}

interface StoryContextType {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  stories: Story[];
  setStories: (stories: Story[]) => void;
  setOpenModal: (openModal: boolean) => void;
  openModal: boolean;
  duration: number;
}

const StoryContext = createContext<StoryContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useStoryContext = () => {
  const context = useContext(StoryContext);
  if (!context) {
    throw new Error("useStoryContext debe usarse dentro de un StoryProvider");
  }
  return context;
};

export const StoryProvider: React.FC<{
  children: React.ReactNode;
  duration: number;
}> = ({ children, duration = 5000 }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [stories, setStories] = useState<Story[]>([
    {
      title: "Story",
      image: "https://via.placeholder.com/300x500?text=Story+1",
      stories: [
        {
          id: 1,
          title: "Story Child",
        },
        {
          id: 2,
          title: "Story Child",
        },
      ],
    },
    {
      title: "Story",
      image: "https://via.placeholder.com/300x500?text=Story+2",
    },
    {
      title: "Story",
      image: "https://via.placeholder.com/300x500?text=Story+3",
    },
    {
      title: "Story",
      image: "https://via.placeholder.com/300x500?text=Story+4",
    },
    {
      title: "Story",
      image: "https://via.placeholder.com/300x500?text=Story+5",
    },
    {
      title: "Story",
      image: "https://via.placeholder.com/300x500?text=Story+6",
    },
    {
      title: "Story",
      image: "https://via.placeholder.com/300x500?text=Story+7",
    },
    {
      title: "Story",
      image: "https://via.placeholder.com/300x500?text=Story+8",
    },
    {
      title: "Story",
      image: "https://via.placeholder.com/300x500?text=Story+9",
    },
    {
      title: "Story",
      image: "https://via.placeholder.com/300x500?text=Story+10",
    },
    {
      title: "Story",
      image: "https://via.placeholder.com/300x500?text=Story+11",
    },
    {
      title: "Story",
      image: "https://via.placeholder.com/300x500?text=Story+12",
    },
    {
      title: "Story",
      image: "https://via.placeholder.com/300x500?text=Story+13",
    },
    {
      title: "Story",
      image: "https://via.placeholder.com/300x500?text=Story+14",
    },
    {
      title: "Story",
      image: "https://via.placeholder.com/300x500?text=Story+15",
    },
    {
      title: "Story",
      image: "https://via.placeholder.com/300x500?text=Story+16",
    },
    {
      title: "Story",
      image: "https://via.placeholder.com/300x500?text=Story+17",
    },
    {
      title: "Story",
      image: "https://via.placeholder.com/300x500?text=Story+18",
    },
    {
      title: "Story",
      image: "https://via.placeholder.com/300x500?text=Story+19",
    },
    {
      title: "Story",
      image: "https://via.placeholder.com/300x500?text=Story+20",
    },
  ]);

  return (
    <StoryContext.Provider
      value={{
        activeIndex,
        setActiveIndex,
        stories,
        setStories,
        setOpenModal,
        openModal,
        duration,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};
