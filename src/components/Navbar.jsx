import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { crown ,menu,close} from "../assets";

const Navbar = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume/Karthik_Sai_Raj_FullStackDeveloper_Resume.pdf"; 
    link.download = "Karthik_Sai_Raj_FullStackDeveloper_Resume.pdf";
    link.click();
  };
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
 const [isHovered, setIsHovered] = useState(false);

      const buttonStyle = {
        backgroundColor: isHovered ? '#4b0cc2' : '',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        
      };
  return (
    <nav
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-primary" : "bg-transparent"
      }`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to='/'
          className='flex items-center gap-2'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={crown} alt='logo' className='w-9 h-9 object-contain' />
          <p className='text-white text-[20px] font-bold cursor-pointer flex ' title='Guddeti Karthik Sai Raj'>
            GKSR
          </p>
        </Link>

        <ul className='list-none hidden sm:flex flex-row gap-10' style={{alignItems : 'center'}}>
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
          <li>
             <button
        onClick={handleDownload}
        className="flex items-center gap-2 px-2 py-2 rounded-xl transition
        hover:scale-[1.03] 
        hover:shadow-[0_8px_30px_rgba(93,188,252,0.15)] 
        border border-transparent hover:border-cyan-400/30
        "
        title="Download Resume"
        style={buttonStyle}
         onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src="/src/assets/download-file.gif"
          alt="Download"
          className="w-9 h-9 rounded-lg"
        />
      </button>
          </li>
        </ul>
          
          
        {/* below div is for menu */}
        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img
            src={toggle ? close : menu}
            alt='menu'
            className='w-[28px] h-[28px] object-contain'
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl
             shadow-[0_8px_30px_rgba(93,188,252,0.15)] 
        border border-1  border-cyan-400/30 
        
        bg-tertiary 
            `}
          >
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4 text-black'>
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-bold cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
              <li>
             <button
        onClick={handleDownload}
        className="flex items-center gap-2 px-2 py-2 rounded-xl transition
        hover:scale-[1.03] 
        hover:shadow-[0_8px_30px_rgba(93,188,252,0.15)] 
        border border-transparent hover:border-cyan-400/30
        "
        title="Download Resume"
        style={buttonStyle}
         onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src="/src/assets/download-file.gif"
          alt="Download"
          className="w-9 h-9 rounded-lg"
        />
      </button>
          </li>
            </ul>
          </div>
        </div>

       </div>
    </nav>
  );
};
export default Navbar;
