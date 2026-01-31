import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import SpotlightCard from "./SpotlightCard";
import styles from "./SectionBootcamp.module.css";
import bootcampImg1 from "../assets/images/bootcamp_img/bootcam1.jpg.jpeg";
import bootcampImg2 from "../assets/images/bootcamp_img/bootcam2.jpg.jpeg";
import bootcampImg3 from "../assets/images/bootcamp_img/bootcam3.jpg.jpeg";
import bootcampImg4 from "../assets/images/bootcamp_img/bootcam4.jpg.jpeg";
import bootcampImg5 from "../assets/images/bootcamp_img/bootcam5.jpg.jpeg";

const bootcamps = [
  {
    title: "CYBER-SMART",
    subtitle: "Master Digital Safety in 9 Days",
    duration: "9 Days",
    image: bootcampImg1,
    topics: [
      "Password Security",
      "Two-Factor Authentication",
      "Phishing & Online Scams",
      "UPI & Payment Safety",
      "Social Media Privacy",
      "WiFi & Network Security",
      "Mobile Security",
      "Data Backup & Ransomware",
      "Digital Hygiene Plan",
      "Safe Browsing Habits"
    ],
    roadmap: [
      "Day 1: Password Security",
      "Day 2: 2FA & MFA",
      "Day 3: Phishing & Scams",
      "Day 4: UPI Safety",
      "Day 5: Social Media Privacy",
      "Day 6: WiFi Security",
      "Day 7: Mobile Permissions",
      "Day 8: Data Backup",
      "Day 9: Action Plan"
    ]
  },
  {
    title: "DECODE E-INDIA",
    subtitle: "9 Digital Systems Every Indian Should Know",
    duration: "9 Days",
    image: bootcampImg2,
    topics: [
      "India’s Digital Systems",
      "UPI, Aadhaar, FASTag, ONDC",
      "Govt Services Access",
      "Cybercrime Reporting",
      "SWAYAM Learning Platform",
      "DigiLocker Usage",
      "UMANG App Services",
      "Digital Health ID (ABHA)",
      "Digital Rupee (e₹)",
      "Bharat Bill Payment System"
    ],
    roadmap: [
      "Day 1: UPI Revolution",
      "Day 2: Aadhaar Ecosystem",
      "Day 3: FASTag Tech",
      "Day 4: ONDC Commerce",
      "Day 5: Digital Health (ABDM)",
      "Day 6: Cybercrime (I4C)",
      "Day 7: Bill Payments (BBPS)",
      "Day 8: Digital Infra",
      "Day 9: SWAYAM Education"
    ]
  },
  {
    title: "CREATOR’S LAB",
    subtitle: "Master Photoshop & Design Theory",
    duration: "9 Days",
    image: bootcampImg3,
    topics: [
      "Photoshop Interface & Tools",
      "Layers, Masks, Blending",
      "Color Theory & Typography",
      "Retouching & Manipulation",
      "Portfolio Building",
      "Smart Objects & Filters",
      "Pen Tool Mastery",
      "Composition Rules",
      "Exporting for Web/Print",
      "AI Generative Fill"
    ],
    roadmap: [
      "Day 1: Photoshop Foundation",
      "Day 2: Selections & Masking",
      "Day 3: Color Theory",
      "Day 4: Typography Mastery",
      "Day 5: Photo Retouching",
      "Day 6: Design Principles",
      "Day 7: Social Media Graphics",
      "Day 8: Logo Identity",
      "Day 9: Portfolio Showcase"
    ]
  },
  {
    title: "THE SKILLS 2026",
    subtitle: "Master Creative & Professional Ways",
    duration: "9 Days",
    image: bootcampImg4,
    topics: [
      "Professional Comm.",
      "Problem Solving (STAR)",
      "Project Management",
      "AI Productivity Tools",
      "Emotional Intelligence",
      "Critical Thinking",
      "Data Visualization",
      "Adaptability & Agility",
      "Networking Skills",
      "Time Management Hacks"
    ],
    roadmap: [
      "Day 1: Communication Skills",
      "Day 2: Digital Workplace",
      "Day 3: Excel & Data",
      "Day 4: Problem Solving",
      "Day 5: Project Management",
      "Day 6: Collaboration",
      "Day 7: AI & Automation",
      "Day 8: Emotional Intelligence",
      "Day 9: Personal Branding"
    ]
  },
  {
    title: "AI THAT UNDERSTANDS",
    subtitle: "Growth through Generative AI",
    duration: "9 Days",
    image: bootcampImg5,
    topics: [
      "Generative AI Basics",
      "Prompt Engineering",
      "AI for Research & Writing",
      "Visual Creativity Tools",
      "Automation Workflows",
      "Ethics in AI Usage",
      "Custom GPT Creation",
      "AI in Excel/Sheets",
      "Voice Synthesis Tools",
      "Future of Work with AI"
    ],
    roadmap: [
      "Day 1: AI Demystified",
      "Day 2: Prompt Engineering",
      "Day 3: Learning & Research",
      "Day 4: Writing Assistant",
      "Day 5: Visual Creativity",
      "Day 6: Content Creation",
      "Day 7: Voice & Video",
      "Day 8: Automation",
      "Day 9: Your AI Future"
    ]
  }
];

const SectionBootcamp = () => {
  const [cardsPerPage, setCardsPerPage] = useState(1);
  const [trackIndex, setTrackIndex] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);
  const touchActiveRef = useRef(false);
  const trackIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      setCardsPerPage(1);
    };

    // Set initial value
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const pageCount = Math.ceil(bootcamps.length / cardsPerPage);
  const trackRef = useRef(null);
  const tweenRef = useRef(null);
  const suppressAnimRef = useRef(false);

  useEffect(() => {
    trackIndexRef.current = trackIndex;
  }, [trackIndex]);

  const pages = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < bootcamps.length; i += cardsPerPage) {
      chunks.push(bootcamps.slice(i, i + cardsPerPage));
    }
    return chunks;
  }, [cardsPerPage]); // Re-chunk when cardsPerPage changes

  const extendedPages = useMemo(() => {
    if (pageCount <= 1) return pages;
    return [pages[pageCount - 1], ...pages, pages[0]];
  }, [pageCount, pages]);

  useEffect(() => {
    // Reset or adjust index when layout changes
    suppressAnimRef.current = true;
    setTrackIndex(pageCount > 1 ? 1 : 0);
    setPageIndex(0);
  }, [pageCount]); // Triggered when cardsPerPage changes (via pageCount)


  const getPageIndexForTrack = (nextTrackIndex) => {
    if (pageCount <= 1) return 0;
    return (nextTrackIndex - 1 + pageCount) % pageCount;
  };

  const goToTrack = (nextTrackIndex) => {
    if (pageCount <= 1) return;
    if (isAnimatingRef.current) return;

    let safeIndex = nextTrackIndex;
    if (safeIndex < 0) safeIndex = pageCount;
    if (safeIndex > pageCount + 1) safeIndex = 1;

    setPageIndex(getPageIndexForTrack(safeIndex));
    setTrackIndex(safeIndex);
  };

  useEffect(() => {
    if (!trackRef.current) return;
    if (suppressAnimRef.current) {
      gsap.set(trackRef.current, { xPercent: -trackIndex * 100 });
      suppressAnimRef.current = false;
      return;
    }

    if (tweenRef.current) tweenRef.current.kill();
    isAnimatingRef.current = true;
    setIsAnimating(true);
    tweenRef.current = gsap.to(trackRef.current, {
      xPercent: -trackIndex * 100,
      duration: 0.2,
      ease: "power2.inOut",
      onComplete: () => {
        isAnimatingRef.current = false;
        setIsAnimating(false);
        if (pageCount <= 1) return;
        if (trackIndex === 0) {
          suppressAnimRef.current = true;
          goToTrack(pageCount);
        } else if (trackIndex === pageCount + 1) {
          suppressAnimRef.current = true;
          goToTrack(1);
        }
      },
    });
  }, [trackIndex, pageCount]);

  useEffect(() => {
    if (pageCount <= 1) return;
    const timer = setInterval(() => {
      goToTrack(trackIndexRef.current + 1);
    }, 5000);

    return () => clearInterval(timer);
  }, [pageCount, trackIndex]);

  const jumpToIndex = (index) => {
    if (pageCount <= 1) return;
    goToTrack(index + 1);
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    if (!touch) return;
    touchStartXRef.current = touch.clientX;
    touchStartYRef.current = touch.clientY;
    touchActiveRef.current = true;
  };

  const handleTouchMove = (e) => {
    if (!touchActiveRef.current) return;
    const touch = e.touches[0];
    if (!touch) return;
    const deltaX = touch.clientX - touchStartXRef.current;
    const deltaY = touch.clientY - touchStartYRef.current;

    // Only prevent scroll if it's clearly a horizontal swipe
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 30) {
      if (e.cancelable) e.preventDefault();
    }
  };

  const handleTouchEnd = (e) => {
    if (!touchActiveRef.current) return;
    touchActiveRef.current = false;
    const touch = e.changedTouches[0];
    if (!touch) return;
    const deltaX = touch.clientX - touchStartXRef.current;
    const deltaY = touch.clientY - touchStartYRef.current;
    
    // Only trigger slide if it's a clear horizontal swipe
    if (Math.abs(deltaX) < 50 || Math.abs(deltaX) < Math.abs(deltaY) * 1.5) return;

    if (deltaX < 0) {
      goToTrack(trackIndex + 1);
    } else {
      goToTrack(trackIndex - 1);
    }
  };

  return (
    <section className={styles.bootcampSection}>
      <div className={styles.header}>
        <p className={styles.kicker}>9-Day Intensive Bootcamps</p>
        <h2 className={styles.title}>
          Master New Skills in Just <span>9 Days</span>
        </h2>
        <p className={styles.subtitle}>
          Fast-track your growth with our specialized, high-impact short courses designed for immediate results.
        </p>
      </div>

      <div
        className={styles.sliderWrapper}
        onWheel={cardsPerPage > 1 ? (e) => {
          if (Math.abs(e.deltaY) < 5) return;
          if (e.deltaY > 0) {
            goToTrack(trackIndex + 1);
          } else {
            goToTrack(trackIndex - 1);
          }
        } : undefined}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={trackRef}
          className={styles.sliderTrack}
        >
          {extendedPages.map((page, pageIdx) => {
            const realIndex = pageCount > 1
              ? (pageIdx - 1 + pageCount) % pageCount
              : pageIdx;
            const isActive = realIndex === pageIndex;
            return (
            <div
              className={`${styles.sliderPage} ${page.length === 1 ? styles.sliderPageSingle : ""} ${isActive ? styles.sliderPageActive : styles.sliderPageInactive}`}
              key={`page-${pageIdx}`}
            >
              <div className={styles.grid}>
                {page.map((item) => (
                  <SpotlightCard
                    key={item.title}
                    className={styles.card}
                    spotlightColor="rgba(138, 56, 245, 0.25)"
                  >
                    <div className={styles.cardInner}>
                    <div className={styles.cardImageWrap}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className={styles.cardImage}
                        loading="lazy"
                      />
                    </div>
                    <div className={styles.cardContent}>
                      <div className={styles.cardHeader}>
                        <div className={styles.headerText}>
                          <h3>{item.title}</h3>
                          <p className={styles.cardSubtitle}>{item.subtitle}</p>
                        </div>
                        <span className={styles.duration}>{item.duration}</span>
                      </div>
                      
                      <div className={styles.cardColumns}>
                        <div className={styles.topicsContainer}>
                          <h4 className={styles.sectionLabel}>Key Topics</h4>
                          {cardsPerPage === 1 ? (
                            <p className={styles.keyPointsParagraph}>
                              {item.topics.slice(0, 6).join(" • ")}
                            </p>
                          ) : (
                            <ul className={styles.list}>
                              {item.topics
                                .slice(0, 4)
                                .map((point, i) => (
                                <li key={i}>{point}</li>
                              ))}
                            </ul>
                          )}
                        </div>

                        <div className={styles.roadmapContainer}>
                          <h4 className={styles.sectionLabel}>9-Day Roadmap</h4>
                          <ul className={styles.roadmapList}>
                            {item.roadmap.slice(0, cardsPerPage === 1 ? 5 : 5).map((day, i) => (
                              <li key={i} className={styles.roadmapItem}>
                                <span className={styles.dot}></span>
                                {day}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <button className={styles.cta} type="button">
                        View Full Syllabus
                      </button>
                    </div>
                    </div>
                  </SpotlightCard>
                ))}
              </div>
            </div>
            );
          })}
        </div>
      </div>

      <div className={styles.dots} role="tablist" aria-label="Bootcamp pages">
        {Array.from({ length: pageCount }).map((_, index) => (
          <button
            key={index}
            type="button"
            className={`${styles.dotBtn} ${index === pageIndex ? styles.dotActive : ""}`}
            onClick={() => jumpToIndex(index)}
            aria-label={`Show bootcamp page ${index + 1}`}
            aria-pressed={index === pageIndex}
          />
        ))}
      </div>
    </section>
  );
};

export default SectionBootcamp;
