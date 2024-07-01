import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";
// import Badge from "react-bootstrap/esm/Badge";
import Accordion from "react-bootstrap/esm/Accordion";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteHouseAction, listHouses } from "../../actions/houseActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

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

  // console.log(houses);

  useEffect(() => {
    dispatch(listHouses());
    if (!userInfo) {
      navigate("/");
    }
  }, [dispatch, successCreate, userInfo, successUpdate, successDelete]);

  return (
    <MainScreen title={`Welcome ${userInfo.name}..`}>
      <Link to="/createhouse">
        <Button style={{ marginLeft: 10, marginbottom: 6 }} size="lg">
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
