import React, { useEffect } from "react";
import MainScreen from "../../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row, Container } from "react-bootstrap";
import { listAllHouses } from "../../actions/houseActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import "./AllHouses.css";

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
          <div title="" className="">
               <h1 className="poppins-semibold" style={{ fontSize: "60px" }}>
                    All Houses
               </h1>
               {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
               {loading && <Loading />}
               <Container className="d-flex flex-column align-items-center">
                    {houses
                         ?.reverse()
                         .filter((filteredHouse) =>
                              filteredHouse.houseName
                                   .toLowerCase()
                                   .includes(search.toLowerCase())
                         )
                         .map((house) => (
                              <Card
                                   key={house._id}
                                   style={{ margin: 10, width: "100%" }}
                                   className="hostelContainer"
                              >
                                   <Card.Header style={{ display: "flex" }}>
                                        <span
                                             className="poppins-semibold"
                                             style={{
                                                  color: "black",
                                                  textDecoration: "none",
                                                  flex: 1,
                                                  cursor: "pointer",
                                                  alignSelf: "center",
                                                  fontSize: 20,
                                             }}
                                        >
                                             {house.houseName}
                                        </span>
                                   </Card.Header>
                                   <Card.Body>
                                        <Row>
                                             <Col md={6}>
                                                  <blockquote className="blockquote mb-0">
                                                       <p>
                                                            <strong>
                                                                 Vacancies:
                                                            </strong>{" "}
                                                            {
                                                                 house.houseVacancies
                                                            }
                                                       </p>
                                                       <p>
                                                            <strong>
                                                                 Rent:
                                                            </strong>{" "}
                                                            {house.houseRent}
                                                       </p>
                                                       <p>
                                                            <strong>
                                                                 Location:
                                                            </strong>{" "}
                                                            <a
                                                                 href={getGoogleMapsUrl(
                                                                      house.houseLocation
                                                                 )}
                                                                 className="house-location poppins-bold"
                                                                 target="_blank"
                                                                 rel="noopener noreferrer"
                                                                 style={{
                                                                      textDecoration:
                                                                           "none",
                                                                      color: "grey",
                                                                 }}
                                                            >
                                                                 {
                                                                      house.houseLocation
                                                                 }
                                                            </a>
                                                       </p>
                                                       <p>
                                                            <strong>
                                                                 Contact:
                                                            </strong>{" "}
                                                            {house.houseContact}
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
                                                            maxHeight: "250px",
                                                            objectFit: "cover",
                                                            padding: "20px",
                                                       }}
                                                  />
                                             </Col>
                                        </Row>
                                   </Card.Body>
                              </Card>
                         ))}
               </Container>
          </div>
     );
};

export default AllHouses;
