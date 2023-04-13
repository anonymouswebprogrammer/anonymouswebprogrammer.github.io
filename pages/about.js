import React from "react";
import styles from "../styles/About.module.css";
import AboutView from "../views/aboutView.js";

export default function About() {
  return (
    <div className={styles.pageContent}>
      <div className={styles.aboutView}>
        <AboutView />
      </div>
    </div>
  );
}
