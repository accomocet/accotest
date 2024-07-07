import React, { useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";
import "./LandingPage.css";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
     const navigate = useNavigate();

     useEffect(() => {
          const userInfo = localStorage.getItem("userInfo");

          if (userInfo) {
               navigate("/myhouses");
          }
     }, [navigate]);
     return (
          <div className="main">
               <Container className="outer">
                    <Row className="mainrow">
                         <Col md={6} className="maincol title-container">
                              <div>
                                   <h2
                                        className="title"
                                        style={{
                                             color: "rgb(5, 12, 112)",
                                             padding: "0px 0px",
                                             margin: "0px 0px",
                                        }}
                                   >
                                        Welcome to...
                                   </h2>
                                   <h1
                                        className="heading poppins-bold"
                                        style={{
                                             color: "rgb(5, 12, 112)",
                                             fontSize: "90px",
                                             padding: "0px 0px",
                                             margin: "0px 0px",
                                        }}
                                   >
                                        accomoCET
                                   </h1>
                                   <p className="subtitle">
                                        One solution for all your housing needs,
                                        simplifying the Search for Hostel and PG
                                        Accommodation with Easy Listings,
                                        Seamless Communication, and Hassle-Free
                                        Management for College Students and
                                        Hostel Owners.
                                   </p>
                                   <div
                                        className="buttonContainer"
                                        style={{
                                             paddingLeft: "0px",
                                             paddingRight: "0px",
                                        }}
                                   >
                                        <a href="/login">
                                             <Button
                                                  size="lg"
                                                  className="landingbutton btn-login"
                                                  variant=""
                                             >
                                                  Login
                                             </Button>
                                        </a>
                                        <a href="/register">
                                             <Button
                                                  size="lg"
                                                  className="landingbutton btn-signup"
                                                  variant=""
                                             >
                                                  Signup
                                             </Button>
                                        </a>
                                   </div>
                              </div>
                         </Col>
                         <Col md={6} className="maincol"></Col>
                    </Row>
               </Container>
          </div>
     );
};

export default LandingPage;
