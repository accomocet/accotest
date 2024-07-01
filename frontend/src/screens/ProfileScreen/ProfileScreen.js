import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Col, Row, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../actions/userActions";
import Loading from "../../components/Loading";
import "./ProfileScreen.css";

const ProfileScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
  }, [navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateProfile({ name, email, password, pic }));
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
      fetch("http://api.cloudinary.com/v1_1/abhijithrajeevcloud/image/upload", {
        method: "post",
        body: data,
      })
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
    <MainScreen title="EDIT PROFILE">
      <div>
        <Row className="profileContainer">
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              {loading && <Loading />}
              {success && (
                <ErrorMessage variant="success">
                  Updated Successfully
                </ErrorMessage>
              )}

              <Form.Group controlId="name" className="my-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  value={name}
                  placeholder="Enter name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="email" className="my-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="password" className="my-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="confirmPassword" className="my-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  placeholder="Confirm password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
              {picMessage && (
                <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
              )}
              <Form.Group controlId="pic" className="my-3">
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control
                  // id="custom-file"
                  onChange={(e) => postDetails(e.target.files[0])}
                  type="file"
                  accept="image/png"
                  label="Upload Profile Picture"
                  custom
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Update
              </Button>
            </Form>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={pic} alt={name} className="profilePic"></img>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default ProfileScreen;
