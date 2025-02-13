import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { Stack } from "@mui/material";

import banner from '../utils/banner.json';
import textStyles from '../styles/Text.module.css';

// Define wedding date to countdown
const WEDDING_DATE = new Date('2025-03-18T18:00:00');

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const weddingTime = WEDDING_DATE.getTime();
      const difference = weddingTime - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="myContainer">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="absolute inset-0 swiper-container w-full h-full"
      >
        {banner.images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
              <div className="absolute inset-0 bg-black opacity-60"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col z-10">
        <div className={`${textStyles.title}`} style={{ color: 'white' }}>Chỉ còn...</div>
          <div className="flex">
            <div className="w-1/3"></div>
            <Stack
              className="w-1/3 grid grid-cols-4"
              sx={{ position: "absolute", bottom: "30%", left: "50%", transform: "translateX(-50%)" }}
            >
              <div className="bg-red-300 pt-5 pb-5 rounded-full w-full flex flex-col">
                <p className={`${textStyles.sub1Count} text-white  text-center`}>{timeLeft.days}</p>
                <p className={`${textStyles.sub3Count} ${textStyles.wedding} text-white text-center`}>DAYS</p>
              </div>
              <div className="bg-red-300 pt-5 pb-5 rounded-full w-full flex flex-col">
                <p className={`${textStyles.sub1Count} text-white  text-center`}>{timeLeft.hours}</p>
                <p className={`${textStyles.sub3Count} ${textStyles.wedding} text-white text-center`}>HOURS</p>
              </div>
              <div className="bg-red-300 pt-5 pb-5 rounded-full w-full flex flex-col">
                <p className={`${textStyles.sub1Count} text-white  text-center`}>{timeLeft.minutes}</p>
                <p className={`${textStyles.sub3Count} ${textStyles.wedding} text-white text-center`}>MINUTES</p>
              </div>
              <div className="bg-red-300 pt-5 pb-5 rounded-full w-full flex flex-col">
                <p className={`${textStyles.sub1Count} text-white  text-center`}>{timeLeft.seconds}</p>
                <p className={`${textStyles.sub3Count} ${textStyles.wedding} text-white text-center`}>SECONDS</p>
              </div>
            </Stack>
            <div className="w-1/3"></div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;