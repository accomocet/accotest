import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import logo from "../Header/accomo logo.png";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, NavLink, useNavigate } from "react-router-dom"; // Import NavLink for active link styling
import { logout } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import "../Header/Header.css";
const Header = ({ setSearch }) => {
     const navigate = useNavigate();
     const dispatch = useDispatch();

     const userLogin = useSelector((state) => state.userLogin);
     const { userInfo } = userLogin;

     const logoutHandler = () => {
          dispatch(logout());
          navigate("/");
     };

     return (
          <Navbar expand="lg" className="bg-primary nav-pos" variant="dark">
               <Container>
                    <Navbar.Brand>
                         <img className="acologo" src={logo}></img>
                         <Link to="/">accomoCET</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                         <Nav className="me-auto">
                              <Form className="d-flex">
                                   <Form.Control
                                        type="search"
                                        placeholder="Search Houses"
                                        className="me-2"
                                        aria-label="Search"
                                        onChange={(e) =>
                                             setSearch(e.target.value)
                                        }
                                   />
                              </Form>
                         </Nav>

                         <Nav className="ml-auto">
                              <NavLink
                                   to="/allhouses"
                                   className="nav-link"
                                   activeClassName="active"
                              >
                                   View All Hostels
                              </NavLink>
                         </Nav>

                         {userInfo ? (
                              <Nav
                                   className="me-auto my-2 my-lg-0"
                                   style={{ maxHeight: "100px" }}
                                   navbarScroll
                              >
                                   <Nav.Link href="/myhouses">
                                        My Hostels
                                   </Nav.Link>
                                   <NavDropdown
                                        title={userInfo?.name}
                                        id="navbarScrollingDropdown"
                                   >
                                        <NavDropdown.Item href="/profile">
                                             My Profile
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                             onClick={logoutHandler}
                                        >
                                             Logout
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                   </NavDropdown>
                              </Nav>
                         ) : (
                              <Nav>
                                   <Nav.Link href="/login">Login</Nav.Link>
                              </Nav>
                         )}
                    </Navbar.Collapse>
               </Container>
          </Navbar>
     );
};

export default Header;
