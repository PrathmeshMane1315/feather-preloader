import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./PeacockPreloader.css";
import feather from "../assets/peacock feather.png";

export default function PeacockPreloader({ onComplete }) {
  const containerRef = useRef(null);
  const featherRef = useRef(null);
  const textRef = useRef(null);
  const sparkleContainerRef = useRef(null);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (!featherRef.current || !containerRef.current) return;

    const featherEl = featherRef.current;
    const tl = gsap.timeline({
      onComplete: () => setShowText(true)
    });

    gsap.set(featherEl, {
      x: window.innerWidth * 0.5,
      y: window.innerHeight * 0.4,
      rotation: 45,
      scale: 0.2,
      opacity: 0,
    });

    tl.to(featherEl, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power2.out",
    })
    .to(featherEl, {
      x: -window.innerWidth * 0.4,
      y: -window.innerHeight * 0.3,
      rotation: -20,
      duration: 3,
      ease: "power1.inOut",
    }, "+=0.3")
    .to(featherEl, {
      opacity: 0,
      scale: 0.3,
      duration: 0.6,
      ease: "power2.in",
    }, "-=0.5");

    return () => { tl.kill(); };
  }, []);

  useEffect(() => {
    if (!showText || !textRef.current) return;

    const letters = textRef.current.querySelectorAll('.letter');
    
    gsap.fromTo(letters, 
      { opacity: 0, y: 60, scale: 0.3, filter: "blur(15px)" },
      { 
        opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
        duration: 0.7,
        stagger: 0.12,
        ease: "back.out(1.7)",
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 1.5,
            delay: 2,
            ease: "power2.inOut",
            onComplete: () => { if (onComplete) onComplete(); }
          });
        }
      }
    );
  }, [showText, onComplete]);

  useEffect(() => {
    if (!sparkleContainerRef.current || !showText) return;
    const container = sparkleContainerRef.current;

    const createSparkle = () => {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const size = Math.random() * 5 + 2;
      const colors = ['#FFD700', '#00CED1', '#FF69B4', '#7FFF00', '#FF6347', '#E6E6FA'];
      
      sparkle.style.cssText = `
        position: absolute; left: ${x}px; top: ${y}px;
        width: ${size}px; height: ${size}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: 50%;
        box-shadow: 0 0 ${size * 3}px currentColor, 0 0 ${size * 6}px currentColor;
        pointer-events: none; z-index: 50;
      `;
      
      container.appendChild(sparkle);
      gsap.fromTo(sparkle,
        { opacity: 0, scale: 0 },
        { 
          opacity: 1, scale: 1, duration: 0.2,
          onComplete: () => {
            gsap.to(sparkle, {
              opacity: 0, scale: 0, duration: 0.8, delay: 0.1,
              onComplete: () => sparkle.remove()
            });
          }
        }
      );
    };

    const interval = setInterval(createSparkle, 80);
    return () => clearInterval(interval);
  }, [showText]);

  const brandName = "Krishalaa";

  return (
    <div className="loader-overlay" ref={containerRef}>
      <div ref={sparkleContainerRef} className="sparkle-container" />
      
      <img
        ref={featherRef}
        src={feather}
        alt="Peacock Feather"
        className="feather-image"
      />

      {showText && (
        <div ref={textRef} className="brand-text-container">
          <div className="brand-text">
            {brandName.split('').map((letter, index) => (
              <span key={index} className="letter" style={{ '--i': index }}>
                {letter}
              </span>
            ))}
          </div>
          <div className="brand-subtitle">Elegance Redefined</div>
        </div>
      )}

      <div className="bg-particles">
        {[...Array(25)].map((_, i) => (
          <div key={i} className="bg-particle" style={{
            '--delay': `${Math.random() * 5}s`,
            '--duration': `${Math.random() * 3 + 2}s`,
            '--x': `${Math.random() * 100}%`,
            '--size': `${Math.random() * 3 + 1}px`,
          }} />
        ))}
      </div>
    </div>
  );
}