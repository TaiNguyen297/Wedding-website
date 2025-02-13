import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Modal from "react-modal";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import galleryData from "../utils/gallery.json";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Image from "next/image";
import { Stack } from "@mui/material";

import textStyles from '../styles/Text.module.css';

const WeddingGallery = () => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const images = galleryData.images.map((image) => ({ src: image }));

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setIsLightboxOpen(true);
  };

  return (
    <section id="gallery" >
      {/* Gallery */}
      <div className="myContainer myContainerPad">
        <div className={`${textStyles.title}`}>Bộ ảnh cưới nè...</div>
        <div className="columns-4 sm:columns-5 md:columns-6 xl:columns-7">
          {galleryData.images.map((image, index) => (
            <Stack
              key={index}
              className="mb-4 break-inside-avoid cursor-pointer overflow-hidden group"
              sx={{ borderRadius: "20px" }}
              onClick={() => handleImageClick(index)}
            >
              <Image
                src={image}
                alt={`Wedding Image ${index}`}
                width={0}
                height={0}
                layout="responsive"
                quality={100}
                className="w-full group-hover:scale-110"
              />
            </Stack>
          ))}
        </div>
      </div>

      {/* Video */}
      <div className="myHalfContainer ">
        <Image
          src="/gallery/video_background.JPEG"
          alt="video_background"
          width={0}
          height={0}
          layout="responsive"
          quality={100}
          style={{ minHeight: "65vh", maxHeight: "65vh", width: "100vw"}}
          className="object-cover transition-transform group-hover:scale-110"
        />
        <Stack
          sx={{
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.33)",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "65vh",
            alignItems: "center"
          }}
        >
          <div className={`${textStyles.title}`}>Video của chúng mình...</div>
          <Stack sx={{ position: "absolute", bottom: "25%", left: "50%", transform: "translateX(-50%)" }}>
            <button
              onClick={openModal}
              className="border-2 rounded-full hover:scale-110 transform transition-all duration-300 bg-gray-100 w-24 h-24"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9.75 16.5v-9l6 4.5-6 4.5z" />
              </svg>
            </button>
          </Stack>
        </Stack>
      </div>

      {/* Modal Video */}
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className="relative w-11/12 md:w-3/4 lg:w-2/3 xl:w-9/12 p-3 bg-white rounded mx-auto my-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center"
      >
        {/* Nút đóng modal */}
        <button
          onClick={closeModal}
          className="absolute top-[-1rem] right-[-1rem] w-6 h-6 flex items-center justify-center bg-black border-2 border-white-300 rounded-full shadow "
        >
          <XMarkIcon className="w-4 h-4 text-white" />
        </button>

        {/* Video YouTube */}
        <iframe
          className="w-full h-[600px] md:h-[700px] lg:h-[800px] xl:h-[900px]"
          src="https://www.youtube.com/embed/a7fzkqLozwA?si=ep12eBz6Z8wFRhCl"
          title="Wedding Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Modal>

      {/* Lightbox */}
      {isLightboxOpen && (
        <Lightbox
          slides={images}
          open={isLightboxOpen}
          close={() => setIsLightboxOpen(false)}
          index={currentIndex}
        />
      )}
    </section>
  );
};

export default WeddingGallery;
