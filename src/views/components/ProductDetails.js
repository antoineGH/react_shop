import React, { useState, useContext } from "react";
import { LanguageContext } from "../../language/LanguageContext";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import InStock from "../components/InStock";
import ConfirmQuantityModal from "../../utils/ConfirmQuantityModal";
import LoginModal from "../../utils/LoginModal";
import RegisterModal from "../../utils/RegisterModal";
import ForgotModal from "../../utils/ForgotModal";
import formatMoney from "../../utils/formatMoney";
import getDescription from "../../utils/getDescription";
import { useHistory } from "react-router-dom";

export default function ProductDetails(props) {
  const { product, addToCart, logged, isDisabled } = props;
  const { dictionary, language } = useContext(LanguageContext);
  const [modalShow, setModalShow] = useState(false);
  const [modalLoginShow, setModalLoginShow] = useState(false);
  const [modalRegisterShow, setModalRegisterShow] = useState(false);
  const [modalForgotShow, setModalForgotShow] = useState(false);
  const history = useHistory();

  return (
    <>
      <Container fluid>
        <Row className="justify-content-center row_header_filter">
          <Col md={12}>
            <Row>
              <Col
                className="product_details_image justify-content-center"
                md={8}
              >
                <Row>
                  <Button
                    onClick={() => history.goBack()}
                    variant="dark"
                    size="lg"
                    className="button_back"
                    style={{ paddingTop: ".5rem" }}
                  >
                    <span
                      style={{
                        fontSize: "1.8rem",
                        color: "black",
                        marginBottom: "1rem",
                        paddingBottom: "1rem",
                      }}
                    >
                      &#8592;
                    </span>
                  </Button>
                </Row>
                <Image
                  className="product_image_single"
                  src={product.images_url}
                />
              </Col>
              <Col md={4}>
                <Row className="mx-auto mt-1">
                  <Col className="product_title_single">
                    {product.product_name}
                  </Col>
                </Row>
                <Row className="mx-auto">
                  <Col className="product_price_single">
                    ${formatMoney(product.price)}
                  </Col>
                  <Col>
                    <Card.Text
                      className={
                        language === "zh-CN"
                          ? "font_CN_normal"
                          : "product_stock_single mt-1"
                      }
                    >
                      {InStock(product.stock)}
                    </Card.Text>
                  </Col>
                </Row>
                <Row className="mx-auto mt-0">
                  <Col
                    style={{
                      marginTop: "0",
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Button
                      onClick={
                        logged
                          ? () => setModalShow(true)
                          : () => setModalLoginShow(true)
                      }
                      className={
                        language === "zh-CN"
                          ? "button_cart font_CN_normal"
                          : "button_cart"
                      }
                      disabled={product.stock > 0 ? false : true}
                      variant="secondary"
                      size="sm"
                    >
                      {dictionary.place_in_cart}
                    </Button>
                    <LoginModal
                      product={product}
                      show={modalLoginShow}
                      handleLoginChange={setModalLoginShow}
                      handleRegisterChange={setModalRegisterShow}
                      handleForgotChange={setModalForgotShow}
                      onHide={() => setModalLoginShow(false)}
                    />
                    <RegisterModal
                      product={product}
                      show={modalRegisterShow}
                      handleLoginChange={setModalLoginShow}
                      handleRegisterChange={setModalRegisterShow}
                      onHide={() => setModalRegisterShow(false)}
                    />
                    <ForgotModal
                      product={product}
                      show={modalForgotShow}
                      handleLoginChange={setModalLoginShow}
                      handleForgotChange={setModalForgotShow}
                      handleRegisterChange={setModalRegisterShow}
                      onHide={() => setModalForgotShow(false)}
                    />
                    <ConfirmQuantityModal
                      className="confirm_quantity_modal"
                      addToCart={addToCart}
                      product={product}
                      show={modalShow}
                      isDisabled={isDisabled}
                      onHide={() => setModalShow(false)}
                    />
                  </Col>
                </Row>
                <Row className="mx-auto mt-0">
                  <Col className="product_description_single">
                    <p
                      className={
                        language === "zh-CN" ? "font_CN_description" : ""
                      }
                    >
                      {
                        getDescription(
                          dictionary[product.product_description]
                        )[0]
                      }
                    </p>
                  </Col>
                </Row>
                {getDescription(dictionary[product.product_description])[1] !==
                  undefined && (
                  <>
                    <Row className="mx-auto mb-0">
                      <Col
                        style={{ marginBottom: "0px", color: "#19110b" }}
                        className="product_description_single"
                      >
                        <p
                          className={
                            language === "zh-CN" ? "font_CN_description" : ""
                          }
                        >
                          {dictionary.detailed_features}
                        </p>
                      </Col>
                    </Row>

                    <Row className="mx-auto mt-0">
                      <Col className="product_description_single ml-3 ml-md-4">
                        <ul
                          style={{
                            type: "square",
                            paddingRight: "0rem",
                          }}
                        >
                          {getDescription(
                            dictionary[product.product_description]
                          )[1]
                            .split("\n")
                            .map((entry) => {
                              return (
                                <li
                                  className={
                                    language === "zh-CN"
                                      ? "font_CN_description_small ml-2"
                                      : ""
                                  }
                                  key={entry}
                                >
                                  {entry}
                                </li>
                              );
                            })}
                        </ul>
                      </Col>
                    </Row>
                  </>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
