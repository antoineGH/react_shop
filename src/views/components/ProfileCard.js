import React from "react";
import "./ProfileCard.css";
import { Col, Row } from "react-bootstrap";
import lv_logo from "../../img/lv_logo.png";

export default function ProfileCard(props) {
  const { firstName, lastName, address, city, postcode, country, phone } =
    props;

  function titleCase(str) {
    str = str.toLowerCase().split(" ");
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(" ");
  }

  return (
    <>
      <Row
        style={{
          minHeight: "50vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Col
          xs={12}
          md={12}
          lg={12}
          className="my-auto"
          style={{ padding: "0", maxWidth: "507px" }}
        >
          <div className="wrapper">
            <div className="cols">
              <div
                className="container"
                style={{ paddingRight: "12px", paddingLeft: "12px" }}
              >
                <div className="front">
                  <div className="inner">
                    <Row>
                      <Col
                        className="d-none d-lg-block"
                        lg={4}
                        xl={4}
                        style={{
                          overflow: "hidden",
                          maxHeight: "18rem",
                          marginBottom: "-0.1rem",
                        }}
                      >
                        <Row>
                          <Col>
                            <img
                              alt="profile"
                              className="logo_lv"
                              src={lv_logo}
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col
                        xs={12}
                        sm={12}
                        md={12}
                        lg={8}
                        xl={8}
                        className="mt-5 my-auto"
                      >
                        <Row>
                          <Col>
                            <p style={{ fontSize: "2rem" }}>{`${titleCase(
                              firstName
                            )} ${titleCase(lastName)}`}</p>
                            <p> {phone && phone}</p>
                            <p>
                              {address && titleCase(address)}
                              {postcode && postcode}
                            </p>
                            <p>
                              {" "}
                              {city && titleCase(city)}{" "}
                              {country && titleCase(country)}
                            </p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className="back">
                  <div className="inner">
                    <Row>
                      <Col
                        className="d-none d-lg-block"
                        lg={4}
                        xl={4}
                        style={{
                          overflow: "hidden",
                          maxHeight: "18rem",
                          marginBottom: "0.6rem",
                        }}
                      >
                        <Row>
                          <Col>
                            <img
                              alt="profile"
                              className="logo_lv"
                              src={lv_logo}
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col
                        xs={12}
                        sm={12}
                        md={12}
                        lg={8}
                        xl={8}
                        className="mt-3 my-auto"
                      >
                        <Row>
                          <Col className="">
                            <p
                              style={{
                                fontSize: "2.5rem",
                                margin: "0rem 1rem",
                              }}
                            >{`${titleCase(firstName)} ${titleCase(
                              lastName
                            )}`}</p>
                          </Col>
                        </Row>
                        <Row>
                          <Col style={{ margin: "0rem 1rem" }} className="">
                            <p style={{ fontSize: "1.2rem" }}>
                              Privileged Member
                            </p>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
}
