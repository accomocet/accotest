import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import "./LoginScreen.css";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";
import { FaUser, FaLock } from "react-icons/fa";

const LoginScreen = ({ history }) => {
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");

     const dispatch = useDispatch();

     const userLogin = useSelector((state) => state.userLogin);
     const { loading, error, userInfo } = userLogin;
     const navigate = useNavigate();

     useEffect(() => {
          if (userInfo) {
               navigate("/myhouses");
          }
     }, [navigate, userInfo]);

     const submitHandler = async (e) => {
          e.preventDefault();

          dispatch(login(email, password));
     };

     return (
          <div className="loginContainer poppins-regular">
               {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
               {loading && <Loading />}
               <div>
                    <Form onSubmit={submitHandler} className="">
                         <h1 className="poppins-bold">Login</h1>
                         <Form.Group
                              controlId="formBasicEmail"
                              className="my-3"
                         >
                              <Form.Label>Email Address</Form.Label>
                              <Form.Control
                                   type="email"
                                   value={email}
                                   placeholder="Enter email"
                                   onChange={(e) => setEmail(e.target.value)}
                              />
                              <FaUser />
                         </Form.Group>
                         <Form.Group
                              controlId="formBasicPassword"
                              className="my-3"
                         >
                              <Form.Label>Password</Form.Label>
                              <Form.Control
                                   type="password"
                                   value={password}
                                   placeholder="Enter password"
                                   onChange={(e) => setPassword(e.target.value)}
                              />
                              <FaLock />
                         </Form.Group>
                         <Button variant="primary" type="submit">
                              Submit
                         </Button>
                    </Form>
                    <Row className="py-3">
                         <Col>
                              New Customer?{" "}
                              <Link
                                   to="/register"
                                   style={{
                                        textDecoration: "underline",
                                        color: "blue",
                                   }}
                              >
                                   Register Here
                              </Link>
                         </Col>
                    </Row>
               </div>
          </div>
     );
};

export default LoginScreen;
