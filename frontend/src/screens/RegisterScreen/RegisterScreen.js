import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import "./RegisterScreen.css";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";
import CetImage from "../../cetpng.png";
import {
     FaUser,
     FaEnvelope,
     FaLock,
     FaUserLock,
     FaImage,
} from "react-icons/fa";

const RegisterScreen = () => {
     const [email, setEmail] = useState("");
     const [name, setName] = useState("");
     const [pic, setPic] = useState(
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
     );
     const [password, setPassword] = useState("");
     const [confirmpassword, setConfirmPassword] = useState("");
     const [message, setMessage] = useState(null);
     const [picMessage, setPicMessage] = useState(null);
     const [isAdmin, setIsAdmin] = useState(false);

     const dispatch = useDispatch();
     const navigate = useNavigate();

     const userRegister = useSelector((state) => state.userRegister);
     const { loading, error, userInfo } = userRegister;

     useEffect(() => {
          if (userInfo) {
               navigate("/myhouses");
          }
     });

     const handleChange = async (e) => {
          setIsAdmin(e.target.checked);
     };

     const submitHandler = async (e) => {
          e.preventDefault();

          if (password !== confirmpassword) {
               setMessage("Passwords do not match");
          } else {
               dispatch(register(name, email, password, pic, isAdmin));
          }
     };

     const postDetails = (pics) => {
          if (!pics) {
               return setPicMessage("Please select an Image");
          }
          setPicMessage(null);

          if (pics.type === "image/jpeg" || pics.type === "image/png") {
               const data = new FormData();
               data.append("file", pics);
               data.append("upload_preset", "notezipper");
               data.append("cloud_name", "abhijithrajeevcloud");
               fetch(
                    "http://api.cloudinary.com/v1_1/abhijithrajeevcloud/image/upload",
                    {
                         method: "post",
                         body: data,
                    }
               )
                    .then((res) => res.json())
                    .then((data) => {
                         console.log(data);
                         setPic(data.url.toString());
                    })
                    .catch((err) => {
                         console.log(err);
                    });
          } else {
               return setPicMessage("Please select an Image");
          }
     };

     return (
          <div className="loginContainer poppins-regular">
               <Row className="row-container justify-content-end">
                    <Col md={6} className="image-container">
                         <img src={CetImage} className="cet-image"></img>
                    </Col>
                    <Col md={6} className="">
                         <div className="wrapper">
                              {error && (
                                   <ErrorMessage variant="danger">
                                        {error}
                                   </ErrorMessage>
                              )}
                              {message && (
                                   <ErrorMessage variant="danger">
                                        {message}
                                   </ErrorMessage>
                              )}
                              {loading && <Loading />}
                              <Form onSubmit={submitHandler}>
                                   <h1 className="poppins-bold">Register</h1>
                                   <Form.Group
                                        controlId="formBasicEmail"
                                        className="my-4.5 input-box"
                                   >
                                        {/* <Form.Label>Name</Form.Label> */}
                                        <Form.Control
                                             className="ip"
                                             type="name"
                                             value={name}
                                             placeholder="Enter name"
                                             onChange={(e) =>
                                                  setName(e.target.value)
                                             }
                                        />
                                        <FaUser className="icon" />
                                   </Form.Group>
                                   <Form.Group
                                        controlId="formBasicEmail"
                                        className="my-4.5 input-box"
                                   >
                                        {/* <Form.Label>Email Address</Form.Label> */}
                                        <Form.Control
                                             className="ip"
                                             type="email"
                                             value={email}
                                             placeholder="Enter email"
                                             onChange={(e) =>
                                                  setEmail(e.target.value)
                                             }
                                        />
                                        <FaEnvelope className="icon" />
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
                                             onChange={(e) =>
                                                  setPassword(e.target.value)
                                             }
                                        />
                                        <FaLock className="icon" />
                                   </Form.Group>
                                   <Form.Group
                                        controlId="confirmPassword"
                                        className="my-4.5 input-box"
                                   >
                                        {/* <Form.Label>Confirm Password</Form.Label> */}
                                        <Form.Control
                                             className="ip"
                                             type="password"
                                             value={confirmpassword}
                                             placeholder="Confirm password"
                                             onChange={(e) =>
                                                  setConfirmPassword(
                                                       e.target.value
                                                  )
                                             }
                                        />
                                        <FaUserLock className="icon" />
                                   </Form.Group>
                                   {picMessage && (
                                        <ErrorMessage variant="danger">
                                             {picMessage}
                                        </ErrorMessage>
                                   )}
                                   <Form.Group
                                        controlId="pic"
                                        className="input-box"
                                   >
                                        {/* <Form.Label>Profile Picture</Form.Label> */}
                                        <Form.Control
                                             className="ip"
                                             onChange={(e) =>
                                                  postDetails(e.target.files[0])
                                             }
                                             type="file"
                                             accept="image/png, image/jpeg"
                                             label="Upload Profile Picture"
                                        />
                                        <FaImage className="icon" />
                                   </Form.Group>
                                   <Form.Group
                                        controlId="adminOption"
                                        className="my-4.5 input-box"
                                   >
                                        <Form.Check
                                             className="ip"
                                             type="checkbox"
                                             label="Want to give a house for rent?"
                                             checked={isAdmin}
                                             onChange={handleChange}
                                        />
                                   </Form.Group>
                                   <Button
                                        variant=""
                                        className="custom-btn poppins-semibold"
                                        type="submit"
                                   >
                                        Register
                                   </Button>
                                   <Row className="new-customer">
                                        <Col>
                                             Already a user?{" "}
                                             <Link
                                                  className="new-customer-link"
                                                  to="/login"
                                             >
                                                  Login Here
                                             </Link>
                                        </Col>
                                   </Row>
                              </Form>
                         </div>
                    </Col>
               </Row>
          </div>
     );
};

export default RegisterScreen;
