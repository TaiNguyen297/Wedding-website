import React from 'react';
import Image from "next/image";
import { Stack } from "@mui/material";
// import { ellipsisText } from "@/utils/common";

import profileData from '../utils/profile.json';
import textStyles from '../styles/Text.module.css';

const Profile: React.FC = () => {
  return (
    <div id="couple" className="myContainer myContainerPad">
      <div className={`${textStyles.title}`}>Chúng mình là ...</div>
      <div className="grid grid-cols-2">
        {profileData.map((profile, index) => (
          <Stack key={index} className="w-full h-full" sx={{ position: "relative"}}>
            <Stack className="overflow-hidden group" sx={{ borderRadius: "40px" }}>
              <Image
                src={profile.image}
                alt={profile.name}
                width={0}
                height={0}
                layout="responsive"
                quality={100}
                style={{ minHeight: "86vh", maxHeight: "86vh" }}
                className="object-cover transition-transform group-hover:scale-110"
                />
            </Stack>
            <Stack sx={{
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(0, 0, 0, 0.23)",
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              minHeight: "20%",
              borderRadius: "30px",
              padding: "10px",
            }}>
              <p className={`${textStyles.sub1} text-white text-justify`}>{profile.name}</p>
              <p className={`${textStyles.sub2} text-white text-justify`}>Con ông {profile.father} và bà {profile.mother}</p>
              <p className={`${textStyles.sub2} text-white text-justify`}>Tư gia {profile.address}</p>
              <p className={`${textStyles.sub2} text-white text-justify`}>{profile.bio}</p>
            </Stack>
          </Stack>
        ))}
      </div>
    </div>
  );
};

export default Profile;