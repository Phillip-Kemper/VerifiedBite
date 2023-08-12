import HomeHeader from "../homeHeader";
import Footer from "../footer";
import { Container } from "@mui/material";

const Layout = ({ children }: JSX.ElementChildrenAttribute) => {
  return (
    <>
      <Container maxWidth="lg">
        <HomeHeader />
        {children}
        <Footer />
      </Container>
    </>
  );
};

export default Layout;
