import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";
// import Badge from "react-bootstrap/esm/Badge";
import Accordion from "react-bootstrap/esm/Accordion";
import axios from "axios";
// import houses from "../../../../backend/data/houses";

const MyHouses = () => {
  const [houses, setHouses] = useState([]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
    }
  };

  console.log(houses);

  const fetchHouses = async () => {
    const { data } = await axios.get("/api/houses");

    setHouses(data);
  };

  useEffect(() => {
    fetchHouses();
  }, []);

  return (
    <MainScreen title="Welcome back UserName..">
      <Link to="createhouse">
        <Button style={{ marginLeft: 10, marginbottom: 6 }} size="lg">
          Add New House
        </Button>
      </Link>
      {houses.map((house) => (
        <Accordion key={house._id}>
          <Card style={{ margin: 10 }}>
            <Card.Header style={{ display: "flex" }}>
              <span
                style={{
                  color: "black",
                  textDecoration: "none",
                  flex: 1,
                  cursor: "pointer",
                  alignSelf: "center",
                  fontSize: 18,
                }}
              >
                <Accordion.Header as={Card.Text} eventKey="0">
                  {house.houseName}
                </Accordion.Header>
              </span>

              <div>
                <Button href={`/house/${house._id}`}>Edit</Button>
                <Button
                  className="mx-2"
                  variant="danger"
                  onClick={() => deleteHandler(house._id)}
                >
                  Delete
                </Button>
              </div>
            </Card.Header>
            <Accordion.Body eventKey="0">
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <p>
                    <strong>Vacancies:</strong> {house.houseVacancies}
                  </p>
                  <p>
                    <strong>Rent:</strong> {house.houseRent}
                  </p>
                  <p>
                    <strong>Location:</strong> {house.houseLocation}
                  </p>
                  <p>
                    <strong>Contact:</strong> {house.houseContact}
                  </p>

                  {/* <footer className="blockquote-footer">
                    ----------------
                  </footer> */}
                </blockquote>
              </Card.Body>
            </Accordion.Body>
          </Card>
        </Accordion>
      ))}
    </MainScreen>
  );
};

export default MyHouses;
