import React, { useEffect } from "react";
import MainScreen from "../../components/MainScreen";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";
import Accordion from "react-bootstrap/esm/Accordion";
import { useDispatch, useSelector } from "react-redux";
import { deleteHouseAction, listHouses } from "../../actions/houseActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { Col, Row } from "react-bootstrap";

const MyHouses = ({ search }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const houseList = useSelector((state) => state.houseList);
  const { loading, houses, error } = houseList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const houseCreate = useSelector((state) => state.houseCreate);
  const { success: successCreate } = houseCreate;

  const houseUpdate = useSelector((state) => state.houseUpdate);
  const { success: successUpdate } = houseUpdate;

  const houseDelete = useSelector((state) => state.houseDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = houseDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteHouseAction(id));
    }
  };

  useEffect(() => {
    dispatch(listHouses());
    if (!userInfo) {
      navigate("/");
    }
  }, [
    dispatch,
    successCreate,
    userInfo,
    successUpdate,
    successDelete,
    navigate,
  ]);

  const getGoogleMapsUrl = (location) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      location
    )}`;
  };

  return (
    <MainScreen title={`Welcome ${userInfo.name}..`}>
      <Link to="/createhouse">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Add New House
        </Button>
      </Link>
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loadingDelete && <Loading />}
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

export default MyHouses;
