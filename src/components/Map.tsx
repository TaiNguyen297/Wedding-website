import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'yet-another-react-lightbox/styles.css';
import Lightbox from "yet-another-react-lightbox";
import { useEffect, useRef, useState, useCallback } from 'react';
import { Stack } from "@mui/material";
import Image from "next/image";

import mapStyles from "../styles/VietnamMap.module.css";
import textStyles from '../styles/Text.module.css';
import tripsData from '../utils/trips.json';

const VietnamMap: React.FC = () => {
  const [svgContent, setSvgContent] = useState<string>('');
  const [selectedProvinceImages, setSelectedProvinceImages] = useState<string[]>([]);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [hoveredProvince, setHoveredProvince] = useState<string | null>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/vietnam.svg')
      .then((response) => response.text())
      .then((data) => {
        const provinces = tripsData.map((item) => item.place);
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(data, "image/svg+xml");

        svgDoc.querySelectorAll('path').forEach((path) => {
          const provinceName = path.getAttribute('title');
          if (provinceName && provinces.includes(provinceName)) {
            path.classList.add(mapStyles.vietnam);
            path.setAttribute('data-highlight', 'true');
            path.setAttribute('data-province', provinceName);
          }
        });

        const updatedSvg = new XMLSerializer().serializeToString(svgDoc);
        setSvgContent(updatedSvg);
      })
      .catch((error) => console.error('Error loading SVG:', error));
  }, []);

  const handleProvinceClick = useCallback((provinceName: string) => {
    const provinceData = tripsData.find(item => item.place === provinceName);
    if (provinceData) {
      setSelectedProvinceImages(provinceData.image);
      setIsLightboxOpen(true);
    }
  }, []);

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const handleSVGClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = event.target as SVGElement;
    if (target.tagName.toLowerCase() === 'path') {
      const provinceName = target.getAttribute('title');
      if (provinceName) {
        handleProvinceClick(provinceName);
      }
    }
  };

  const handleSVGMouseOver = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = event.target as SVGElement;
    if (target.tagName.toLowerCase() === 'path') {
      const provinceName = target.getAttribute('title');
      if (provinceName) {
        setHoveredProvince(provinceName);
      }
    }
  };

  const handleSVGMouseOut = () => {
    setHoveredProvince(null);
  };

  const handleCircularImageMouseOver = (provinceName: string) => {
    if (svgContainerRef.current) {
      const path = svgContainerRef.current.querySelector(`path[data-province="${provinceName}"]`);
      if (path) {
        path.classList.add(mapStyles.hoveredProvince);
      }
    }
  };

  const handleCircularImageMouseOut = (provinceName: string) => {
    if (svgContainerRef.current) {
      const path = svgContainerRef.current.querySelector(`path[data-province="${provinceName}"]`);
      if (path) {
        path.classList.remove(mapStyles.hoveredProvince);
      }
    }
  };

  const provincesTotal = tripsData.length;

  return (
    <div id="journey" className="myContainer myContainerPad">
      <div className={textStyles.title}>Những chuyến đi...</div>
      <div className={`${textStyles.sub1} text-center`}>
        Bọn mình đã đi được {provincesTotal} tỉnh thành
      </div>
      <div className="flex" style={{ minHeight: "80vh", maxHeight: "80vh" }}>
        {/* Map Container */}
        <div className="w-1/4">
          <div
            ref={svgContainerRef}
            className={mapStyles.vietnam}
            dangerouslySetInnerHTML={{ __html: svgContent }}
            onClick={handleSVGClick}
            onMouseOver={handleSVGMouseOver}
            onMouseOut={handleSVGMouseOut}
          />
        </div>
        {/* Circular Images Container */}
        <div className="w-3/4 grid grid-cols-6 gap-4">
          {tripsData.map((place, index) => (
            <Stack key={index} spacing={1} alignItems="center">
              <Stack
                className={`w-full overflow-hidden group ${
                  hoveredProvince === place.place ? 'ring-4 ring-yellow-500' : ''
                }`}
                sx={{ borderRadius: "50px", marginTop: "10px", padding: "1px" }}
                onClick={() => handleProvinceClick(place.place)}
                onMouseOver={() => handleCircularImageMouseOver(place.place)}
                onMouseOut={() => handleCircularImageMouseOut(place.place)}
              >
                <Image
                  src={place.image[0]}
                  alt={place.place}
                  width={0}
                  height={0}
                  layout="responsive"
                  quality={100}
                  style={{ minHeight: "12vh", maxHeight: "12vh" }}
                  className="object-cover transition-transform hover:scale-110"
                />
              </Stack>
              <p className={`${textStyles.sub2} text-center`}>{place.place}</p>
              <p className={`${textStyles.sub3} text-center`}>{place.day}</p>
            </Stack>
          ))}
        </div>

        {isLightboxOpen && (
          <Lightbox
            slides={selectedProvinceImages.map((image) => ({ src: image }))}
            open={isLightboxOpen}
            close={closeLightbox}
          />
        )}
      </div>
    </div>
  );
};

export default VietnamMap;