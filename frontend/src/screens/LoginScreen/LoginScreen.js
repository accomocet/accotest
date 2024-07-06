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
      <div className="wrapper">
        <Form onSubmit={submitHandler} className="">
          <h1 className="poppins-bold">Login</h1>
          <Form.Group controlId="formBasicEmail" className="my-4.5 input-box">
            {/* <Form.Label>Email Address</Form.Label> */}
            <Form.Control
              className="ip"
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <FaUser className="icon" />
          </Form.Group>
          <Form.Group
            controlId="formBasicPassword"
            className="my-4.5 input-box"
          >
            {/* <Form.Label>Password</Form.Label> */}
            <Form.Control
              className="ip"
              type="password"
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className="icon" />
          </Form.Group>
          <Button
            variant=""
            className="custom-btn poppins-semibold"
            type="submit"
          >
            Login
          </Button>
          <Row className="new-customer">
            <Col>
              New Customer?{" "}
              <Link className="new-customer-link" to="/register">
                Register Here
              </Link>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default LoginScreen;
