import { useState } from "react";
import gsap from "gsap";

export default function Accordion({title, children}) {

  const [accordionToggle, setAccordionToggle] = useState(false);

  const toggleAccordion = (e) => {
    const toggle = e.currentTarget;
    const targetContainer = toggle.nextElementSibling;
    const arrow = toggle.querySelector("span");

    if (targetContainer.clientHeight === 0) {
      setAccordionToggle(!accordionToggle);
      const containerHeight = targetContainer.scrollHeight;
      gsap.fromTo( targetContainer, { height: 0, opacity: 0, }, { height: containerHeight, opacity: 1, duration: 0.3, ease: "power2.in", }, );
      gsap.to(arrow, { rotate: 45, duration: 0.3, ease: "power2.in", } );
    } else {
      setAccordionToggle(!accordionToggle);
      gsap.to(targetContainer, { height: 0, opacity: 0, duration: 0.3, ease: "power2.in", } );
      gsap.to(arrow, { rotate: -45, duration: 0.3, ease: "power2.in", } );
    }
  };

  return (
    <>
      <button onClick={(e) => { 
        e.preventDefault(); 
        toggleAccordion(e); 
        }}
          className={`mb-2 inline-flex items-center gap-5 rounded-lg border-2 border-gray-200 px-4 py-2 transition-all duration-200 hover:bg-gray-300
          ${accordionToggle ? "bg-gray-800 text-gray-200 hover:bg-gray-600" : "bg-gray-200 text-gray-900"}`}
        >
        {title}<span className={`relative block aspect-square h-3 -rotate-45 border-r-2 border-b-2 ${accordionToggle ? "-top-0.5 border-gray-200" : "border-gray-800"}`}></span>
      </button>
      <div style={{ height: 0 }} className="overflow-hidden">
        {children}
      </div>
    </>
  )
}