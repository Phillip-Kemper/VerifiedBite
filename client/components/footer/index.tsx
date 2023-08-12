import { Box, Typography } from "@mui/material";
import styles from "./footer.module.css";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{' '}
        <span className={styles.logo}>
          <Image src="/polygon.png" alt="Polygon Logo" width={172} height={30}/>
        </span>
      </a>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Built By{' '}
        <span className={styles.logo}>
          <Image src="/dao.jpeg" alt="Pretzel DAO" width={42} height={42} />
        </span>
      </a>
      </>
    </footer>
  );
};

export default Footer;
