import React, { useState } from 'react';
import { FaCheckCircle } from "react-icons/fa";
import styles from "./SectionContact.module.css";

const SectionContact = () => {
  const [experience, setExperience] = useState("");
  const [interest, setInterest] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      experience: experience || "",
      topic: interest || "",
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
    };

    try {
      const response = await fetch(`${apiBaseUrl}/api/form`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setExperience("");
      setInterest("");
      setFormData({ name: "", phone: "", email: "" });
      alert("Form submitted!");
    } catch (error) {
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <section className={styles.contactSection}>
      <div className={styles.contactCard}>
        {/* Left Side */}
        <div className={styles.leftSide}>
          <p className={styles.smallText}>Restricted by opportunities?</p>
          <h1 className={styles.mainHeading}>
            From Skills to Salary — Faster
          </h1>

          <div className={styles.featuresList}>
            <div className={styles.featureItem}>
              <FaCheckCircle className={styles.checkIcon} />
              <p>
                <span className={styles.featureStat}>128%</span> average hike via our placement cell
              </p>
            </div>
            <div className={styles.featureItem}>
              <FaCheckCircle className={styles.checkIcon} />
              <p>
                <span className={styles.featureStat}>1.5 Lac+</span> learners cracked top tech companies
              </p>
            </div>
            <div className={styles.featureItem}>
              <FaCheckCircle className={styles.checkIcon} />
              <p>
                <span className={styles.featureStat}>1,400+</span> unicorn startups
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className={styles.rightSide}>
          <h3 className={styles.formTitle}>Let's find the right course for you</h3>
          
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            
            {/* Experience Radio Group */}
            <div className={styles.formGroup}>
              <label className={styles.groupLabel}>Experience</label>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input 
                    type="radio" 
                    name="experience" 
                    value="technical"
                    checked={experience === "technical"}
                    onChange={(e) => setExperience(e.target.value)}
                  />
                  <span>Working Professional - Technical Roles</span>
                </label>
                <label className={styles.radioLabel}>
                  <input 
                    type="radio" 
                    name="experience" 
                    value="non-technical"
                    checked={experience === "non-technical"}
                    onChange={(e) => setExperience(e.target.value)}
                  />
                  <span>Working Professional - Non Technical</span>
                </label>
                <label className={styles.radioLabel}>
                  <input 
                    type="radio" 
                    name="experience" 
                    value="final-year"
                    checked={experience === "final-year"}
                    onChange={(e) => setExperience(e.target.value)}
                  />
                  <span>College Student - Final Year</span>
                </label>
                <label className={styles.radioLabel}>
                  <input 
                    type="radio" 
                    name="experience" 
                    value="others"
                    checked={experience === "others"}
                    onChange={(e) => setExperience(e.target.value)}
                  />
                  <span>Others</span>
                </label>
              </div>
            </div>

            {/* Topic Dropdown */}
            <div className={styles.formGroup}>
              <label className={styles.groupLabel}>Select topic of interest</label>
              <select 
                className={styles.selectInput}
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
              >
                <option value="" disabled>Select your options/choices</option>
                <option value="web-dev">Web Development</option>
                <option value="data-science">Data Science</option>
                <option value="dsa">DSA</option>
              </select>
            </div>

            {/* Inputs */}
            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter name"
                value={formData.name}
                onChange={handleChange}
                className={styles.textInput}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Phone Number</label>
              <input
                type="text"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                className={styles.textInput}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.inputLabel}>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                className={styles.textInput}
                required
              />
            </div>

            <button type="submit" className={styles.submitButton}>
              Find your course
            </button>
            <p className={styles.disclaimer}>
              By proceeding you agree to our Terms & Privacy Policy
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

export default SectionContact;