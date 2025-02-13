import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import styles from "../styles/Wedding.module.css";
import eventsData from "../utils/our_wedding.json";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Stack } from "@mui/material";

import textStyles from '../styles/Text.module.css';

type Event = {
  image: string;
  title: string;
  location: string;
  address: string;
  time: string;
  day: string;
  mapLink: string;
};

Modal.setAppElement("#__next");

const OurWedding: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMapLink, setCurrentMapLink] = useState("");

  useEffect(() => {
    setEvents(eventsData.events);
  }, []);

  const handleOpenModal = (mapLink: string) => {
    setCurrentMapLink(mapLink);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentMapLink("");
  };

  return (
    <div id="wedding" className="myContainer myContainerPad">
      <div className={`${textStyles.title}`}>Lịch trình đám cưới...</div>
      <div className="justify-center relative items-center">
        <div className="swiper-button-prev"><i className="ri-arrow-right-s-line"></i></div>
        <div className="swiper-button-next"><i className="ri-arrow-left-s-line"></i></div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
          spaceBetween={10}
          slidesPerView={2}
          autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true}}
          breakpoints={{
            1280: { slidesPerView: 3 },
            1530: { slidesPerView: 4 }
          }}
        >
          {events.map((event, index) => (
            <SwiperSlide key={index}>
              <Stack
                className="w-full h-full"
                sx={{ borderRadius: "30px", backgroundColor: "rgba(217, 158, 158, 0.23)"}}
              >
                <Stack className="overflow-hidden group" sx={{ borderRadius: "30px" }}>
                  <Image
                    src={event.image}
                    alt={event.title}
                    width={0}
                    height={0}
                    layout="responsive"
                    quality={100}
                    style={{ minHeight: "59vh", maxHeight: "59vh" }}
                    className="object-cover transition-transform group-hover:scale-110"
                  />
                </Stack>
                <div className="p-1">
                  <p className={`${textStyles.sub1} ${textStyles.wedding} text-center`}>{event.title}</p>
                  <div className="flex">
                    <div className="w-1/8">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                        <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                        <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                      </svg>
                    </div>
                    <div className="w-7/8">
                      <p className={`${textStyles.sub2} text-justify`}>{event.location}</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-1/8">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                        <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <div className="w-7/8">
                      <p className={`${textStyles.sub2} text-justify`}>{event.address}</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-1/8">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clip-rule="evenodd" />
                      </svg>
                    </div>
                    <div className="w-7/8">
                      <p className={`${textStyles.sub2} text-justify`}>{event.time}</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-1/8">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                          <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
                          <path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <div className="w-7/8">
                      <p className={`${textStyles.sub2} text-justify`}>{event.day}</p>
                    </div>                    
                  </div>
                  <button
                    onClick={() => handleOpenModal(event.mapLink)}
                    className={"flex border-2 border-red-300 rounded-full hover:bg-red-300/[0.877] hover:text-white transition pt-2 pl-4 pr-4"}
                  >
                    <div className="w-1/8">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 3 L9 5 L15 3 L21 5 V19 L15 17 L9 19 L3 17 Z" fill="#E6E6E6" />
                        <path d="M9 5 L9 19 M15 3 L15 17" />
                        <circle cx="12" cy="10" r="2" fill="currentColor" />
                        <path d="M12 12 C10 14 12 17 12 17 C12 17 14 14 12 12 Z" fill="#FF6F61" />
                      </svg>
                    </div>
                    <div className="w-7/8">
                      <p className={`${textStyles.sub2} text-justify`}>Xem bản đồ</p>
                    </div>
                  </button>
                </div>
              </Stack>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* Popup Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        className={styles.modalContent}
        overlayClassName={styles.modalOverlay}
      >
        <button onClick={handleCloseModal} className="absolute top-[-1rem] right-[-1rem] w-6 h-6 flex items-center justify-center bg-black border-2 border-white-300 rounded-full shadow ">
          <XMarkIcon className="w-4 h-4 text-white" />
        </button>
        {currentMapLink && (
          <iframe
            src={currentMapLink}
            width="900px"
            height="500px"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        )}
      </Modal>
    </div>
  );
};

export default OurWedding;
