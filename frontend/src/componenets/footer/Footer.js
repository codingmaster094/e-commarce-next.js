import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faGooglePlusG,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { Image } from "react-bootstrap";
import imageBanner from "../../../public/user.png";
export default function Footer() {
  return (
    <div>
      <footer id="footer" className="overflow-hidden pt-5">
        <hr></hr>
        <div className="container">
          <div className="row">
            <div className="footer-top-area">
              <div className="row d-flex flex-wrap justify-content-between">
                <div className="col-lg-3 col-sm-6 pb-3">
                  <div className="footer-menu">
                    <p>
                      Nisi, purus vitae, ultrices nunc. Sit ac sit suscipit
                      hendrerit. Gravida massa volutpat aenean odio erat nullam
                      fringilla.
                    </p>
                    <div className="social-links">
                      <ul className="d-flex list-unstyled">
                        <li>
                          <Link
                            href={"https://www.facebook.com/"}
                            className="a"
                            target="_blank"
                          >
                            {" "}
                            <FontAwesomeIcon icon={faFacebook} />
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={"https://twitter.com/i/flow/login"}
                            className="a"
                            target="_blank"
                          >
                            <FontAwesomeIcon icon={faTwitter} />
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={
                              "https://support.google.com/answer/2451065?hl=en"
                            }
                            className="a"
                            target="_blank"
                          >
                            <FontAwesomeIcon icon={faGooglePlusG} />
                          </Link>
                        </li>
                        <li>
                          <Link
                            href={"https://www.instagram.com/accounts/login/"}
                            className="a"
                            target="_blank"
                          >
                            <FontAwesomeIcon icon={faInstagram} />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-sm-6 pb-3">
                  <div className="footer-menu text-uppercase">
                    <h5 className="widget-title pb-2">Quick Links</h5>
                    <ul className="menu-list list-unstyled text-uppercase">
                      <li className="menu-item pb-2">
                        <Link className="a" href="#">
                          Home
                        </Link>
                      </li>
                      <li className="menu-item pb-2">
                        <Link className="a" href="#">
                          About
                        </Link>
                      </li>
                      <li className="menu-item pb-2">
                        <Link className="a" href="#">
                          Shop
                        </Link>
                      </li>
                      <li className="menu-item pb-2">
                        <Link className="a" href="#">
                          Blogs
                        </Link>
                      </li>
                      <li className="menu-item pb-2">
                        <Link className="a" href="#">
                          Contact
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6 pb-3">
                  <div className="footer-menu text-uppercase">
                    <h5 className="widget-title pb-2">Help & Info Help</h5>
                    <ul className="menu-list list-unstyled">
                      <li className="menu-item pb-2">
                        <Link className="a" href="#">
                          Track Your Order
                        </Link>
                      </li>
                      <li className="menu-item pb-2">
                        <Link className="a" href="#">
                          Returns Policies
                        </Link>
                      </li>
                      <li className="menu-item pb-2">
                        <Link className="a" href="#">
                          Shipping + Delivery
                        </Link>
                      </li>
                      <li className="menu-item pb-2">
                        <Link className="a" href="#">
                          Contact Us
                        </Link>
                      </li>
                      <li className="menu-item pb-2">
                        <Link className="a" href="#">
                          Faqs
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 col-sm-6">
                  <div className="footer-menu contact-item">
                    <h5 className="widget-title text-uppercase pb-2">
                      Contact Us
                    </h5>
                    <p>
                      Do you have any queries or suggestions?{" "}
                      <Link className="a" href="mailto:">
                        yourinfo@gmail.com
                      </Link>
                    </p>
                    <p>
                      If you need support? Just give us a call.{" "}
                      <Link className="a" href="">
                        +55 111 222 333 44
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6 text-center">
            <div className="copyright">
              <p>© Copyright 2023 Online Shoping.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
