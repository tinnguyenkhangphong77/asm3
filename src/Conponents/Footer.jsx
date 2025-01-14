import React from "react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={styles.footer}>
      <div></div>
      <div>
        <h4 className={styles.content}>CUSTOMER SERVICES</h4>
        <ul className={styles.list}>
          <li>
            <a href="#">Help & contact Us</a>
          </li>
          <li>
            <a href="#">Return & Refunds</a>
          </li>
          <li>
            <a href="#">Online Store</a>
          </li>
          <li>
            <a href="#">Terms & Conditión</a>
          </li>
        </ul>
      </div>
      <div>
        <h4 className={styles.content}>COMPANY</h4>
        <ul className={styles.list}>
          <li>
            <a href="#">What We Do</a>
          </li>
          <li>
            <a href="#">Available Services</a>
          </li>
          <li>
            <a href="#">Lastest Posts</a>
          </li>
          <li>
            <a href="#">FAQs</a>
          </li>
        </ul>
      </div>
      <div>
        <h4 className={styles.content}>SOCIAL MEDIA</h4>
        <ul className={styles.list}>
          <li>
            <a href="#">Twiter</a>
          </li>
          <li>
            <a href="#">Instargam</a>
          </li>
          <li>
            <a href="#">Facebook</a>
          </li>
          <li>
            <a href="#">Printerest</a>
          </li>
        </ul>
      </div>
      <div></div>
    </div>
  );
}

export default Footer;
