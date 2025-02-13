import React from "react";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";
import { Stack } from "@mui/material";
import weddingData from "../utils/wedding_box.json";
import textStyles from '../styles/Text.module.css';

const WeddingBox: React.FC = () => {
  return (
    <div id="gifts" className="myHalfContainer myHalfContainerPad">
      <div className={`${textStyles.title}`}>Hòm mừng cưới...</div>
      <div className="flex justify-center gap-10">
        <Stack key={weddingData[0].accountNumber} className="flex-row bg-white border-4 border-pink-200 w-full p-8" sx={{ borderRadius: "40px" }}>
          <div className="w-3/5">
            <p className={`${textStyles.sub1} text-left`}>{weddingData[0].title}</p>
            <p className={`${textStyles.sub2} text-left`}>Số tài khoản: {weddingData[0].accountNumber}</p>
            <p className={`${textStyles.sub2} text-left`}>Chủ tài khoản: {weddingData[0].accountName}</p>
            <p className={`${textStyles.sub2} text-left`}>Ngân hàng: {weddingData[0].bankName}</p>
          </div>
          <div className="w-2/5">
            <Image
              src={weddingData[0].qrCode}
              alt="QR Code"
              width={0}
              height={0}
              layout="responsive"
              quality={100}
              style={{ maxHeight: "30vh"}}
              className=""
            />
          </div>
        </Stack>
        <Stack key={weddingData[1].accountNumber} className="flex-row bg-white border-4 border-pink-200 w-full p-8" sx={{ borderRadius: "40px" }}>
          <div className="w-2/5">
            <Image
              src={weddingData[0].qrCode}
              alt="QR Code"
              width={0}
              height={0}
              layout="responsive"
              quality={100}
              style={{ maxHeight: "30vh"}}
              className=""
            />
          </div>
          <div className="w-3/5">
            <p className={`${textStyles.sub1} text-right`}>{weddingData[1].title}</p>
            <p className={`${textStyles.sub2} text-right`}>Số tài khoản: {weddingData[1].accountNumber}</p>
            <p className={`${textStyles.sub2} text-right`}>Chủ tài khoản: {weddingData[1].accountName}</p>
            <p className={`${textStyles.sub2} text-right`}>Ngân hàng: {weddingData[1].bankName}</p>
          </div>
        </Stack>
      </div>
    </div>
  );
};

export default WeddingBox;
