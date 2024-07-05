import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";

import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createHouseAction } from "../../actions/houseActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useNavigate } from "react-router-dom";

function CreateHouse({ history }) {
  const [houseName, setHouseName] = useState("");
  const [houseRent, setHouseRent] = useState("");
  const [houseVacancies, setHouseVacancies] = useState("");
  const [houseLocation, setHouseLocation] = useState("");
  const [houseContact, setHouseContact] = useState("");
  // const [pic, setPic] = useState("");
  const [housePic, setHousePic] = useState("");
  const [picMessage, setPicMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const houseCreate = useSelector((state) => state.houseCreate);
  const { loading, error, house } = houseCreate;

  console.log(house);

  const resetHandler = () => {
    setHouseName("");
    setHouseRent("");
    setHouseVacancies("");
    setHouseLocation("");
    setHouseContact("");
    setHousePic(
      "https://t4.ftcdn.net/jpg/06/32/19/51/240_F_632195151_xTnjr4xGYG3oGyHiSWeCLLdWTKIVCpfY.jpg"
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      !houseName ||
      !houseRent ||
      !houseVacancies ||
      !houseLocation ||
      !houseContact ||
      !housePic
    )
      return;
    dispatch(
      createHouseAction(
        houseName,
        houseRent,
        houseVacancies,
        houseLocation,
        houseContact,
        housePic
      )
    );

    resetHandler();
    navigate("/myhouses");
  };

  useEffect(() => {}, []);

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
          setHousePic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please select an Image");
    }
  };

  return (
    <MainScreen title="Create a House">
      <Card>
        <Card.Header>Create a new House</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="housename" className="my-3">
              <Form.Label>House Name</Form.Label>
              <Form.Control
                type="houseName"
                value={houseName}
                placeholder="Enter the house name"
                onChange={(e) => setHouseName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="houseRent" className="my-3">
              <Form.Label>House Rent</Form.Label>
              <Form.Control
                type="houseRent"
                value={houseRent}
                placeholder="Enter the house rent"
                onChange={(e) => setHouseRent(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="housevacancies" className="my-3">
              <Form.Label>House Vacancies</Form.Label>
              <Form.Control
                type="houseVacancies"
                value={houseVacancies}
                placeholder="Enter the house vacancies"
                onChange={(e) => setHouseVacancies(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="houselocation" className="my-3">
              <Form.Label>House Location</Form.Label>
              <Form.Control
                type="houseLocation"
                value={houseLocation}
                placeholder="Enter the house location"
                onChange={(e) => setHouseLocation(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="housecontact" className="my-3">
              <Form.Label>House Contact</Form.Label>
              <Form.Control
                type="houseContact"
                value={houseContact}
                placeholder="Enter the house contact no."
                onChange={(e) => setHouseContact(e.target.value)}
              />
            </Form.Group>

            {picMessage && (
              <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
            )}
            <Form.Group controlId="housePic" className="my-3">
              <Form.Label>House Picture</Form.Label>
              <Form.Control
                onChange={(e) => postDetails(e.target.files[0])}
                type="file"
                accept="image/png, image/jpeg"
                label="Upload House Picture"
                custom
              />
            </Form.Group>

            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary">
              Create House
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </MainScreen>
  );
}

export default CreateHouse;
