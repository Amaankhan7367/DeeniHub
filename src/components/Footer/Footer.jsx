import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import "./Footer.css";

function Footer() {
  return (
    <footer className="deeni-footer">
      <div className="footer-container">
        <div className="footer-grid">

          {/* Logo + Copy */}
          <div className="footer-col">
            <div className="footer-logo">
              <Logo width="120px" />
            </div>
            <p className="footer-copy">
              © Copyright {new Date().getFullYear()} — DeeniHub.  
              <br />All Rights Reserved.
            </p>
          </div>

          {/* Company */}
          <div className="footer-col">
            <h3 className="footer-title">Company</h3>
            <ul>
              <li><Link to="/">Features</Link></li>
              <li><Link to="/">Pricing</Link></li>
              <li><Link to="/">Affiliate Program</Link></li>
              <li><Link to="/">Press Kit</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-col">
            <h3 className="footer-title">Support</h3>
            <ul>
              <li><Link to="/">Account</Link></li>
              <li><Link to="/">Help</Link></li>
              <li><Link to="/">Contact Us</Link></li>
              <li><Link to="/">Customer Support</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="footer-col">
            <h3 className="footer-title">Legals</h3>
            <ul>
              <li><Link to="/">Terms & Conditions</Link></li>
              <li><Link to="/">Privacy Policy</Link></li>
              <li><Link to="/">Licensing</Link></li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;