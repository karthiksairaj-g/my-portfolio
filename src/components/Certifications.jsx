import React, { useEffect, useRef, useState } from "react";
import { Tilt } from "react-tilt";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { certificates } from "../constants";
import FullscreenImageModal from "./FullScreenImageModal";

gsap.registerPlugin(ScrollTrigger);

// Reusable Card
const CertificationCard = ({ name, image, onImageClick }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    gsap.fromTo(
      el,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "top center",
          scrub: true,
          markers: false,
        },
      }
    );
  }, []);

  return (
    <div ref={cardRef}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
      >
        <div className="relative w-full h-[230px]">
          <img
            src={image}
            alt="image_of_certificate"
            className="w-full h-full object-cover object-left rounded-2xl cursor-pointer"
            title={name}
            onClick={() => onImageClick(image)}
          />
        </div>
      </Tilt>
    </div>
  );
};

// Parent Component
const Certifications = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage('');
  };

  useEffect(() => {
    gsap.fromTo(
      ".project-card",
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".works-container",
          start: "top bottom",
          end: "top center",
          scrub: true,
          markers: false,
        },
      }
    );
  }, []);

  return (
    <>
      <div>
        <p className={`${styles.sectionSubText}`}>what I have acheived</p>
        <h2 className={`${styles.sectionHeadText}`}>Certifications.</h2>
      </div>

      <div className="w-full flex">
        <p className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]">
          Verified professional credentials reflecting advanced knowledge,
          compliance with industry standards, achievements that demonstrate
          proven skills and a commitment to professional development across key
          areas of expertise.
        </p>
      </div>

      <div className="works-container mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-5">
        {certificates.map((certificate, index) => (
          <div key={`certificate-${index}`} className="project-card">
            <CertificationCard
              name={certificate.name}
              image={certificate.image}
              onImageClick={handleImageClick}
            />
          </div>
        ))}
      </div>

      <FullscreenImageModal
        isOpen={isModalOpen}
        imageSrc={selectedImage}
        onClose={closeModal}
      />
    </>
  );
};

export default SectionWrapper(Certifications, "");
