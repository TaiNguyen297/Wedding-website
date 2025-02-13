import React, { useState, useEffect, useRef, useCallback } from "react";
import timelineData from "../utils/timeline.json";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import textStyles from '../styles/Text.module.css';

const WeddingTimeline: React.FC = () => {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [backgroundImage, setBackgroundImage] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    if (timelineData.length > 0 && timelineData[0].image) {
      setBackgroundImage(timelineData[0].image);
    }
  }, []);

  const changeTimelineIndex = useCallback((direction: "up" | "down") => {
    setCurrentEventIndex((prevIndex) => {
      const newIndex = direction === "down" ? prevIndex + 1 : prevIndex - 1;
      const clampedIndex = Math.max(0, Math.min(newIndex, timelineData.length - 1));
      setBackgroundImage(timelineData[clampedIndex].image);
      return clampedIndex;
    });
  }, []);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartY.current === null) return;
    const touchEndY = e.touches[0].clientY;
    const deltaY = touchEndY - touchStartY.current;

    if (Math.abs(deltaY) > 50) {
      changeTimelineIndex(deltaY < 0 ? "down" : "up");
      touchStartY.current = null;
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(e.deltaY) > 1) {
      changeTimelineIndex(e.deltaY > 0 ? "down" : "up");
    }
  };

  return (
    <div id="story" className="my-20 w-full">
      <div className={`${textStyles.title} `}>Chuyện tình yêu</div>
      <div
        ref={containerRef}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        className="py-12 overflow-y-auto h-screen relative"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : "",
          transition: "background-image 1s ease-in-out",
          backgroundSize: "cover",
        }}
      >
        <div className="mx-auto px-4 relative z-10">
          <VerticalTimeline>
            {timelineData.map((event, index) => (
              <VerticalTimelineElement
                key={index}
                className="transition-opacity duration-500"
                contentStyle={{
                  color: "#2c2c2c",
                  borderRadius: "10px",
                  height: "200px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  opacity: index === currentEventIndex ? 1 : 0.5,
                  filter: index === currentEventIndex ? "brightness(1)" : "brightness(0.5)",
                  transition: "opacity 0.5s ease, filter 0.5s ease",
                }}
                contentArrowStyle={{
                  borderRight: "7px solid #f6e7d7",
                }}
                date={event.time}
                iconStyle={{
                  background: "#f18484",
                  color: "#fff",
                  fontSize: "20px",
                }}
              >
                <div>
                  <h3 className={`${textStyles.sub1}`}>{event.title}</h3>
                  <p className={`${textStyles.sub2}`}>{event.description}</p>
                </div>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>
      </div>
    </div>
  );
};

export default WeddingTimeline;