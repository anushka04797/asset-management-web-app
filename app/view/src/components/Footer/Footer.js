import React from "react";
import { Container, Nav, NavItem, NavLink } from "reactstrap";

function Footer() {
  return (
    <footer className="footer">
      <Container fluid>
        <Nav>
          <NavItem>
            <NavLink href="https://dma-bd.com">
              DMA
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://dma-bd.com/about-me/home/">
              About Us
            </NavLink>
          </NavItem>
          {/* <NavItem>
            <NavLink href="https://www.creative-tim.com/blog?ref=bdr-user-archive-footer">
              Blog
            </NavLink>
          </NavItem> */}
        </Nav>
        <div className="copyright">
          © {new Date().getFullYear()} made with{" "}
          <i className="tim-icons icon-heart-2" /> by{" "}
          <a
            href="https://dma-bd.com"
            target="_blank"
          >
            DMA
          </a>{" "}
          for a better web.
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
