import React from 'react';
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <div className="bg-gray-300 ">
      <div className="flex flex-col items-center justify-center h-screen">
        {/* Circle Image with Decorative Border */}
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-6">
          <Image src="/images/LIN00151.JPG" alt='Thank you' width={400} height={300} layout="responsive"/>
          <div
            className="absolute inset-0 rounded-full border-8 border-opacity-30 border-white"
            aria-hidden="true"
          ></div>
        </div>

        {/* Thank You Text */}
        <h2 className="font-bold text-gray-700">Thank you!</h2>
      </div>
    </div>
  );
};

export default Footer;