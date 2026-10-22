import React from "react";
import personalLogo from '../assets/personal-logo.svg';
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row row__column">
          <Link to="/">
            <figure className="footer__logo">
              <img src={personalLogo} className="footer__logo--img" alt="" />
            </figure>
          </Link>
          <div className="footer__list">
            <Link to="/" className="footer__link">Home</Link>
            <span className="footer__link no-cursor">Find Your Movie</span>
            <Link to="/books" className="footer__link">Contact</Link>
          </div>
          <div className="footer__copyright">
            Copyright &copy; 2021 Movie Finder. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
