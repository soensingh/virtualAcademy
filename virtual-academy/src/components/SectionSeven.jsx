
import styles from "./SectionSeven.module.css";
import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import courseImg1 from "../assets/images/course_img/virtual 1.png";
import courseImg2 from "../assets/images/course_img/virtual 2.png";
import courseImg3 from "../assets/images/course_img/virtual 3.png";
import courseImg4 from "../assets/images/course_img/virtual 4.png";
import courseImg5 from "../assets/images/course_img/virtual 5.png";
import courseImg6 from "../assets/images/course_img/virtual 6.png";
import courseImg7 from "../assets/images/course_img/virtual 7.png";
import courseImg8 from "../assets/images/course_img/virtual 8.png";
import courseImg9 from "../assets/images/course_img/virtual 9.png";

const EarthSphere = () => {
  const earthRef = useRef(null);
  const cloudsRef = useRef(null);
  const [dayMap, specularMap, bumpRoughnessMap, cloudsMap] = useLoader(
    THREE.TextureLoader,
    [
      new URL("../assets/texture/earth_day_4096.jpg", import.meta.url).href,
      new URL("../assets/texture/earth_specular_2048.jpg", import.meta.url).href,
      new URL("../assets/texture/earth_bump_roughness_clouds_4096.jpg", import.meta.url).href,
      new URL("../assets/texture/earth_clouds_1024.png", import.meta.url).href,
    ]
  );

  dayMap.colorSpace = THREE.SRGBColorSpace;
  specularMap.colorSpace = THREE.SRGBColorSpace;
  cloudsMap.colorSpace = THREE.SRGBColorSpace;
  dayMap.anisotropy = 8;
  specularMap.anisotropy = 8;
  bumpRoughnessMap.anisotropy = 8;
  cloudsMap.anisotropy = 8;

  useFrame((_, delta) => {
    if (!earthRef.current) return;
    earthRef.current.rotation.y += delta * 0.06;
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group>
      <mesh ref={earthRef} position={[2.2, -0.4, -2]}>
        <sphereGeometry args={[2.3, 64, 64]} />
        <meshStandardMaterial
          map={dayMap}
          bumpMap={bumpRoughnessMap}
          bumpScale={0.06}
          roughnessMap={bumpRoughnessMap}
          metalnessMap={specularMap}
          metalness={0.05}
          roughness={0.65}
        />
      </mesh>
      <mesh ref={cloudsRef} position={[2.2, -0.4, -2]}>
        <sphereGeometry args={[2.37, 64, 64]} />
        <meshStandardMaterial
          map={cloudsMap}
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[2.2, -0.4, -2]}>
        <sphereGeometry args={[2.45, 64, 64]} />
        <meshBasicMaterial
          color="#4db2ff"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

const SectionSeven = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const courses = [
    {
      id: 1,
      tag: "",
      title: "Full Stack Web Development",
      meta: ["Duration: 2 months", "Live projects", "Placement support"],
      badge: "Online Program",
      accent: "#0b5cff",
      image: courseImg1,
    },
    {
      id: 2,
      tag: "",
      title: "Data Science & Analytics",
      meta: ["Duration: 2 months", "50+ case studies", "Python + SQL"],
      badge: "Online Program",
      accent: "#7a3df2",
      image: courseImg2,
    },
    {
      id: 3,
      tag: "",
      title: "Advanced AI & Machine Learning",
      meta: ["Duration: 2 months", "Deep learning labs", "Real-world projects"],
      badge: "Online Program",
      accent: "#8b1b2e",
      image: courseImg3,
    },
    {
      id: 4,
      tag: "",
      title: "Cloud & DevOps Engineering",
      meta: ["Duration: 2 months", "AWS + Docker", "CI/CD pipelines"],
      badge: "Online Program",
      accent: "#b1006a",
      image: courseImg4,
      isNew: true,
    },
    {
      id: 5,
      tag: "",
      title: "Business Analytics with AI",
      meta: ["Duration: 2 months", "Dashboarding", "Decision science"],
      badge: "Online Program",
      accent: "#f06b22",
      image: courseImg5,
      isNew: true,
    },
    {
      id: 6,
      tag: "",
      title: "Cyber Security & Ethical Hacking",
      meta: ["Duration: 2 months", "Hands-on labs", "Industry tools"],
      badge: "Online Program",
      accent: "#1e7d5c",
      image: courseImg6,
    },
    {
      id: 7,
      tag: "",
      title: "UI/UX Design Bootcamp",
      meta: ["Duration: 2 months", "Portfolio-ready", "Figma workflows"],
      badge: "Online Program",
      accent: "#2f6ae5",
      image: courseImg7,
    },
    {
      id: 8,
      tag: "",
      title: "Digital Marketing & Growth",
      meta: ["Duration: 2 months", "SEO + Ads", "Growth experiments"],
      badge: "Online Program",
      accent: "#6d2df7",
      image: courseImg8,
    },
    {
      id: 9,
      tag: "",
      title: "Mobile App Development",
      meta: ["Duration: 2 months", "React Native", "App deployment"],
      badge: "Online Program",
      accent: "#e25428",
      image: courseImg9,
    },
  ];

  const isMatch = (course) => {
    if (!searchTerm) return false;
    const term = searchTerm.toLowerCase();
        return course.title.toLowerCase().includes(term) ||
          (course.tag && course.tag.toLowerCase().includes(term));
  };

  const hasSearch = searchTerm.length > 0;


  return (
    <section className={styles.comboSection}>
      <div className={styles.earthCanvas} aria-hidden="true">
      </div>
      <div className={styles.earthLayer} aria-hidden="true">
        <Canvas camera={{ position: [0, 0, 7], fov: 35 }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[6, 1, 4]} intensity={3.8} />
          <Suspense fallback={null}>
            <EarthSphere />
          </Suspense>
        </Canvas>
      </div>
      <div className={styles.earthOverlay} aria-hidden="true" />

      <div className={styles.contentWrap}>
        <h2 className={styles.comboTitle}>
          Choose <span className={styles.highlight}>Your Career</span>
        </h2>
        <p className={styles.comboSubtitle}>
          Pick a path that matches your goals and timeline.
        </p>

        <div className={styles.searchContainer}>
          <input
            type="text"
            id="course-search-input"
            className={styles.searchInput}
            placeholder="Search for courses (e.g. AI, Data Science)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={styles.cardsViewport}>
          <div className={styles.cardsTrack}>
            {courses.map((course, index) => {
              const matched = isMatch(course);
              const isFaded = hasSearch && !matched;
              const isHighlighted = hasSearch && matched;

              return (
                <article
                  key={`${course.id}-${index}`}
                  className={`${styles.courseCard} ${isFaded ? styles.faded : ""} ${isHighlighted ? styles.highlighted : ""}`}
                >
                  <div
                    className={styles.cardTop}
                    style={{ background: course.accent }}
                    aria-hidden="true"
                  >
                    <img
                      className={styles.cardImage}
                      src={course.image}
                      alt={course.title}
                      loading="lazy"
                    />
                  </div>
                  <div className={styles.cardBody}>
                    {course.tag && <div className={styles.cardTag}>{course.tag}</div>}
                    <h3 className={styles.cardTitle}>{course.title}</h3>
                    <ul className={styles.cardMeta}>
                      {course.meta.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <div className={styles.priceRow}>
                      <span className={styles.priceOld}>₹12,000</span>
                      <span className={styles.priceNew}>₹9,500</span>
                    </div>
                    <div className={styles.cardActions}>
                      <button type="button" className={styles.secondaryButton}>
                        Get Details
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionSeven;
