import React from 'react'
import instaLogo from '../assets/images/instaLogo.png'
import facebookLogo from '../assets/images/facebookLogo.png'
import linkdinLogo from '../assets/images/linkdinLogo.png'
import youtubeLogo from '../assets/images/youtubeLogo.png'
import footerLogo from '../assets/images/footerLogo.png'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footerMainContainer}>
      <div className={styles.footerContent}>
        <div className={styles.footerColumn}>
          <img src={footerLogo} alt="Virtual Academy Logo" className={styles.logo} />
          <div className={styles.contactSection}>
            <h3 className={styles.footerHeading}>Contacts</h3>
            <p>info@techcadd.com</p>
            <p>9888122255</p>
            <div className={styles.socialIcons}>
                <a href="https://www.instagram.com/techcadd_india/" target="_blank" rel="noreferrer">
                  <img src={instaLogo} alt="Instagram" />
                </a>
                <a href="https://www.facebook.com/techcaddcomputerinstitute/" target="_blank" rel="noreferrer">
                  <img src={facebookLogo} alt="Facebook" />
                </a>
                <a href="https://www.linkedin.com/company/techcadd-computer-education/posts/?feedView=all" target="_blank" rel="noreferrer">
                  <img src={linkdinLogo} alt="LinkedIn" />
                </a>
                <a href="https://youtube.com/@techcaddindia?si=0_O_1hCZc_TSKdvX" target="_blank" rel="noreferrer">
                  <img src={youtubeLogo} alt="YouTube" />
                </a>
            </div>
          </div>
          <div className={styles.registeredOffice}>
            <h3 className={styles.footerHeading}>Registered Office</h3>
            <p>2nd Floor, Crystal Plaza, SCS 78,<br />Opp. Pims Hospital, Jalandhar,<br />Punjab 144001</p>
          </div>
        </div>

        <div className={`${styles.footerColumn} ${styles.coursesColumn}`}>
          <h3 className={styles.footerHeading}>Courses</h3>
          <ul>
            <li>AI ML</li>
            <li>Cloud Computing</li>
            <li>Cyber Security</li>
            <li>Data Analytics</li>
            <li>Data Science</li>
            <li>Digital Marketing</li>
            <li>UX UI Designing</li>
            <li>Web Development</li>
            <li>Web Designing</li>
          </ul>
        </div>

        <div className={`${styles.footerColumn} ${styles.comboCourses}`}>
          <h3 className={styles.footerHeading}>Combos Courses</h3>
          <ul>
            <li>Full Stack Combo</li>
            <li>Data Scientist Combo</li>
            <li>Finance Combo</li>
            <li>Tech Geek Combo</li>
            <li>Creative Designer Combo</li>
            <li>Data Analytics Combo</li>
            <li>Marketing Combo</li>
            <li>AI Engineer Combo</li>
          </ul>
        </div>

        <div className={styles.footerColumn}>
          <h3 className={styles.footerHeading}>Branches</h3>
          <ul>
            <li>SAS Nagar</li>
            <li>Jalandhar</li>
            <li>Amritsar</li>
            <li>Phagwara</li>
            <li>Hoshiarpur</li>
            <li>Ludhiana</li>
            <li>Greater Noida</li>
          </ul>
        </div>

        <div className={`${styles.footerColumn} ${styles.whyAcademyColumn}`}>
          <h3 className={styles.footerHeading}>Why Virtual Academy?</h3>
          <ul>
            <li>1000+ Students Trained</li>
            <li>750+ Students Placed</li>
            <li>50+ Hiring Partners</li>
            <li>Up To 8+ LPA Highest Package</li>
            <li>Industry Focused Curriculum</li>
            <li>Live Projects & Mentorship</li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p className={styles.copyrightText}>2026 TechCadd Virtual Academy. All Rights Reserved.</p>
        <div className={styles.footerLinks}>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Refund Policy</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
