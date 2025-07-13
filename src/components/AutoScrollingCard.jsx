import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { testimonials } from "../constants";

const FeedbackCard = React.forwardRef(
  ({ testimonial, name, designation, company, image, onHover }, ref) => (
    <div
      ref={ref}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      // className="bg-black-200 p-10 rounded-3xl min-w-[320px] max-w-[320px] shrink-0 transition-transform duration-300 ease-in-out"

      className="bg-black-200 p-10 rounded-3xl min-w-[320px] max-w-[420px] shrink-0 
        transition-all duration-300 ease-in-out transform hover:scale-[1.03] 
        hover:shadow-[0_8px_30px_rgba(93,188,252,0.15)] 
        border border-transparent hover:border-cyan-400/30"
    >
       <p className="text-white font-black text-[40px] transition-transform duration-300 ease-in-out 
                    group-hover:scale-110 group-hover:text-cyan-300">
        "
      </p>
      <div className="mt-1">
        <p className="text-white tracking-wider text-[16px]">{testimonial}</p>
        <div className="mt-7 flex justify-between items-center gap-1">
          <div className="flex-1 flex flex-col">
            <p className="text-white font-medium text-[16px]">
              <span className="blue-text-gradient">@</span> {name}
            </p>
            <p className="mt-1 text-secondary text-[12px] whitespace-pre-wrap">
              {designation} 
            </p>
          </div>
          <img
            src={image}
            alt={`feedback_by-${name}`}
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  )
);

const AutoScrollingCard = () => {
  const scrollRef = useRef(null);
  const cardRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [manualScroll, setManualScroll] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("right"); // New state

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationFrameId;

    const scroll = () => {
      if (!isPaused && !manualScroll) {
        const maxScrollLeft = el.scrollWidth - el.clientWidth;

        if (scrollDirection === "right") {
          el.scrollLeft += 2.7;
          if (el.scrollLeft >= maxScrollLeft - 1) {
            setScrollDirection("left");
          }
        } else {
          el.scrollLeft -= 2.7;
          if (el.scrollLeft <= 0) {
            setScrollDirection("right");
          }
        }
      }

      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, manualScroll, scrollDirection]);

  const scrollBy = (value) => {
    const el = scrollRef.current;
    if (!el) return;

    setManualScroll(true);
    el.scrollBy({ left: value, behavior: "smooth" });

    setTimeout(() => setManualScroll(false), 2000);
  };

  return (
    <div className="mt-12 bg-black-100 rounded-[20px] relative overflow-hidden">
      <div className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[240px]`}>
        <p className={styles.sectionSubText}>Trusted by Teams, Valued by Leaders</p>
        <h2 className={styles.sectionHeadText}>Testimonials.</h2>
      </div>

      {/* Arrow Controls */}
      <button
        className="absolute left-2 top-2/3 z-10 p-2 rounded-full bg-white/10 hover:bg-violet-500 shadow"
        onClick={() => scrollBy(-320)}
      >
        <ChevronLeft size={20} />
      </button>
      <button
        className="absolute right-2 top-2/3 z-10 p-2 rounded-full bg-white/10 hover:bg-violet-500 shadow"
        onClick={() => scrollBy(320)}
      >
        <ChevronRight size={20} />
      </button>

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="mt-20 p-4 pb-14 px-8 flex gap-6 overflow-x-hidden no-scrollbar scroll-smooth overflow-y-hidden"
      >
        {testimonials.map((testimonial, index) => (
          <FeedbackCard
            key={testimonial.name + index}
            ref={index === 0 ? cardRef : null}
            {...testimonial}
            onHover={setIsPaused}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(AutoScrollingCard, "");
