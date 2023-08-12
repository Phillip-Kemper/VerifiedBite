import { Box, Typography } from "@mui/material";
import styles from "./footer.module.css";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 15 }}>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 2 }}>
          Powered by
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 2 }}>
            <a href="https://polygon.technology/polygon-zkevm" target="_blank" rel="noopener noreferrer">
              <span className={styles.logo}>
                <Image src="/polygon.png" alt="Polygon Logo" width={172} height={30} />
              </span>
            </a>
            <a href="https://www.gelato.network/" target="_blank" rel="noopener noreferrer">
              <span className={styles.logo}>
                <Image src="/gelato.png" alt="Logo" width={120} height={60} />
              </span>
            </a>
            <a href="https://fe-lang.org/" target="_blank" rel="noopener noreferrer">
              <span className={styles.logo}>
                <Image src="/fe-logo.png" alt="Logo" width={33} height={40} />
              </span>
            </a>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 2 }}>
          Built by
          <a href="https://www.pretzeldao.com/" target="_blank" rel="noopener noreferrer">
            <span className={styles.logo}>
              <Image src="/dao.jpeg" alt="Pretzel DAO" width={60} height={60} />
            </span>
          </a>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
