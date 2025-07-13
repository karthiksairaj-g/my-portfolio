import React from "react";
import { SiGmail, SiLeetcode, SiInstagram, SiLinkedin, SiGithub } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="w-full py-4 bg-black-100/55 text-white flex justify-center gap-6">
      <a
        href="https://www.linkedin.com/in/karthiksairajg/"
        target="_blank"
        rel="noopener noreferrer"
        title="LinkedIn"
      >
        <SiLinkedin size={24} />
      </a>
          <a
        href="https://leetcode.com/u/karthik_sai_raj_g/"
        target="_blank"
        rel="noopener noreferrer"
        title="LeetCode"
      >
        <SiLeetcode size={24} />
      </a>
       <a
        href="mailto:karthiksairajndk@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
        title="GMail"
      >
        <SiGmail size={24} />
      </a>
       <a
        href="https://www.instagram.com/karthik_sai_raj_g/"
        target="_blank"
        rel="noopener noreferrer"
        title="Instagram"
      >
        <SiInstagram size={24} />
      </a>
       <a
        href="https://github.com/karthiksairaj-g"
        target="_blank"
        rel="noopener noreferrer"
        title="Github"
      >
        <SiGithub size={24} />
      </a>
    </footer>
  );
};

export default Footer;