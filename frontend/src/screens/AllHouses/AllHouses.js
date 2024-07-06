import React, { useEffect } from "react";
import MainScreen from "../../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { Accordion, Card, Col, Row } from "react-bootstrap";
import { listAllHouses } from "../../actions/houseActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const AllHouses = ({ search }) => {
  const dispatch = useDispatch();

  const houseAllList = useSelector((state) => state.houseAllList);
  const { loading, houses, error } = houseAllList;

  useEffect(() => {
    dispatch(listAllHouses());
  }, [dispatch]);

  const getGoogleMapsUrl = (location) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      location
    )}`;
  };

  return (
    <MainScreen title="All Houses">
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {houses
        ?.reverse()
        .filter((filteredHouse) =>
          filteredHouse.houseName.toLowerCase().includes(search.toLowerCase())
        )
        .map((house) => (
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
              </Card.Header>
              <Accordion.Body eventKey="0">
                <Card.Body>
                  <Row>
                    <Col md={6}>
                      <blockquote className="blockquote mb-0">
                        <p>
                          <strong>Vacancies:</strong> {house.houseVacancies}
                        </p>
                        <p>
                          <strong>Rent:</strong> {house.houseRent}
                        </p>
                        <p>
                          <strong>Location:</strong>{" "}
                          <a
                            href={getGoogleMapsUrl(house.houseLocation)}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              textDecoration: "underline",
                              color: "blue",
                            }}
                          >
                            {house.houseLocation}
                          </a>
                        </p>
                        <p>
                          <strong>Contact:</strong> {house.houseContact}
                        </p>
                      </blockquote>
                    </Col>
                    <Col
                      md={6}
                      className="d-flex align-items-center justify-content-center"
                    >
                      <img
                        src={house.housePic}
                        alt={house.houseName}
                        style={{
                          width: "100%",
                          maxHeight: "300px",
                          objectFit: "cover",
                          padding: "20px",
                        }}
                      />
                    </Col>
                  </Row>
                </Card.Body>
              </Accordion.Body>
            </Card>
          </Accordion>
        ))}
    </MainScreen>
  );
};

export default AllHouses;
