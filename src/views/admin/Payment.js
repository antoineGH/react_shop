import React, { useEffect, useState, useContext } from "react";
import { LanguageContext } from "../../language/LanguageContext";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CardSection from "./CardSection";
import { authFetch } from "../../utils/authHooks";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import country from "country-list-js";
import InStock from "../components/InStock";
import { useHistory } from "react-router-dom";
import formatMoney from "../../utils/formatMoney";
import ClipLoader from "react-spinners/ClipLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
library.add(fas);

export default function Payment(props) {
  const { delivery, cart, total, email } = props;
  const { dictionary, language } = useContext(LanguageContext);
  const [isDisabled, setIsDisabled] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  useEffect(() => {
    if (Object.entries(props.delivery).length === 0) {
      history.push("/admin/checkout");
    }
    if (props.cart.length === 0 || props.total.length === 0) {
      history.push("/admin/cart");
    }
  }, [props.delivery, props.cart, props.total, history]);

  function countItemCart(cart) {
    if (cart.length === 0) {
      return <span>({dictionary.no_item})</span>;
    } else if (cart.length === 1) {
      return (
        <span>
          ({cart.length} {dictionary.item})
        </span>
      );
    } else {
      return (
        <span>
          ({cart.length} {dictionary.items})
        </span>
      );
    }
  }

  const getCountryCode = (countryParam) => {
    let country_code = "";
    const country_name = country.names();
    country_name.every((country_list) => {
      if (country_list.toLowerCase() === countryParam.toLowerCase()) {
        country_code = country.findByName(country_list).code.iso2;
        return false;
      }
      return true;
    });
    return country_code;
  };

  const handlePayment = async (event) => {
    setIsDisabled(true);
    if (!stripe || !elements) {
      return;
    }
    const paymentDetail = { delivery, cart, total };
    authFetch("https://antoineratat.online/api_shop/api/pay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentDetail),
    })
      .then(function (response) {
        return response.json();
      })
      .then(async function (responseJson) {
        var clientSecret = responseJson.client_secret;
        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              email: email,
              name: delivery.first_name + " " + delivery.last_name,
              phone: delivery.phone,
              address: {
                line1: delivery.address,
                city: delivery.city,
                state: delivery.state,
                postal_code: delivery.postal_code,
                country: getCountryCode(delivery.country),
              },
            },
          },
        });

        if (result.error) {
          toast(dictionary.error_payment_card);
          setIsDisabled(false);
        } else {
          console.log(result);
          if (result.paymentIntent.status === "succeeded") {
            const payment = result.paymentIntent;
            const orderInfo = { cart, total, payment };
            authFetch("https://antoineratat.online/api_shop/api/order", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(orderInfo),
            })
              .then(async function (response) {
                const responseJson = await response.json();
                setIsDisabled(false);
                history.push({
                  pathname: "/admin/successful",
                  state: { responseJson },
                });
              })
              .catch((error) => {
                setIsDisabled(false);
                console.log(error);
                toast(dictionary.error_payment_failed);
              });
          }
        }
      });
  };

  function titleCase(str) {
    str = str.toLowerCase().split(" ");
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(" ");
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col
            xs={{ span: 12, order: 2 }}
            xl={{ span: 8, order: 1 }}
            style={{
              backgroundColor: "#f6f5f3",
              height: "calc(100vh - 60px)",
              overflowY: "auto",
            }}
          >
            <Container style={{ minHeight: "90vh" }}>
              <Row>
                <Col md={12}>
                  <Row className="header_cart ml-md-2">
                    <Col xs={12} sm={12} md={5} lg={4} xl={3}>
                      <Button
                        onClick={() => history.push("/admin/checkout")}
                        className={
                          language === "zh-CN"
                            ? "button_cancel_cart_CN"
                            : "button_cancel_cart"
                        }
                      >
                        <FontAwesomeIcon
                          size="1x"
                          icon={["fas", "chevron-left"]}
                          style={{ paddingRight: ".5rem", width: "17px" }}
                        />
                        {"  "}
                        {dictionary.delivery_options}
                      </Button>
                    </Col>
                    <Col xs={12} sm={12} md={7} lg={8} xl={9}></Col>
                  </Row>
                  <Row>
                    <Col>
                      <p
                        className={
                          language === "zh-CN"
                            ? "modal_title_CN"
                            : "modal_title"
                        }
                        style={{ marginBottom: "0rem" }}
                      >
                        {dictionary.my_orders.toUpperCase().slice(0, -1)}{" "}
                        <span
                          className={
                            language
                              ? "font_CN_normal"
                              : "product_details_count"
                          }
                        >
                          {countItemCart(cart)}
                        </span>
                      </p>
                    </Col>
                  </Row>

                  <Card
                    className="mx-auto mb-3 card_cart_product"
                    style={{
                      borderRadius: "0.3rem",
                      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    }}
                  >
                    <Row style={{ padding: "1rem" }}>
                      <Col
                        xs={12}
                        sm={12}
                        md={{ span: 6, order: 2 }}
                        lg={{ span: 4, order: 1 }}
                        className="my-auto"
                        style={{ marginBottom: "0" }}
                      >
                        <Card.Text
                          className={
                            language === "zh-CN"
                              ? "font_normal_size_CN"
                              : "font_normal_size"
                          }
                          style={{ marginBottom: "0rem", textAlign: "center" }}
                        >
                          {delivery.first_name &&
                            titleCase(delivery.first_name)}{" "}
                          {delivery.last_name && titleCase(delivery.last_name)}
                        </Card.Text>
                      </Col>
                      <Col
                        xs={12}
                        sm={12}
                        md={{ span: 6, order: 4 }}
                        lg={{ span: 4, order: 4 }}
                        className="my-auto"
                        style={{ marginBottom: "0" }}
                      >
                        <Card.Text
                          className={
                            language === "zh-CN"
                              ? "font_normal_size_CN"
                              : "font_normal_size"
                          }
                          style={{ marginBottom: "0rem", textAlign: "center" }}
                        >
                          {delivery.phone}
                        </Card.Text>
                      </Col>

                      <Col
                        xs={12}
                        sm={12}
                        md={{ span: 6, order: 5 }}
                        lg={{ span: 4, order: 5 }}
                        className="my-auto"
                        style={{ marginBottom: "0" }}
                      >
                        <Card.Text
                          className={
                            language === "zh-CN"
                              ? "font_normal_size_CN"
                              : "font_normal_size"
                          }
                          style={{ marginBottom: "0rem" }}
                        ></Card.Text>
                      </Col>

                      <Col
                        xs={12}
                        sm={12}
                        md={{ span: 6, order: 1 }}
                        lg={{ span: 4, order: 2 }}
                        className="my-auto"
                        style={{ marginBottom: "0" }}
                      >
                        <Card.Text
                          className={
                            language === "zh-CN"
                              ? "font_normal_size_CN"
                              : "font_normal_size"
                          }
                          style={{ marginBottom: "0rem", textAlign: "center" }}
                        >
                          {delivery.address && titleCase(delivery.address)}
                          {", "}
                          {delivery.city &&
                            delivery.postcode + " " + titleCase(delivery.city)}
                          {", "}
                          {delivery.state && titleCase(delivery.state)}{" "}
                          {delivery.country && titleCase(delivery.country)}
                        </Card.Text>
                      </Col>
                    </Row>
                  </Card>

                  <Row>
                    {cart.map((cartdetail) => {
                      return (
                        <div key={cartdetail.cart_id}>
                          <Card
                            className="mx-auto mb-3 card_cart_product"
                            style={{
                              borderRadius: "0.3rem",
                              boxShadow:
                                "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                            }}
                          >
                            <Row className="no-gutters">
                              <Col md={3} className="my-auto">
                                <Image
                                  className="card_product_image_payment"
                                  src={cartdetail.images_url}
                                />
                              </Col>
                              <Col md={5} className="text-left">
                                <Card.Body>
                                  <Row>
                                    <Col style={{ marginBottom: "0" }}>
                                      <Card.Text
                                        className="card_cart_product_title text-center text-md-left"
                                        style={{
                                          marginBottom: "0rem",
                                          fontSize: "1.2rem",
                                        }}
                                      >
                                        {cartdetail.product_name}
                                      </Card.Text>
                                    </Col>
                                  </Row>
                                  <Row className="text-center text-md-left">
                                    <Col
                                      style={{
                                        marginTop: "0",
                                        marginBottom: "0",
                                      }}
                                    >
                                      <Card.Text
                                        className={
                                          language === "zh-CN"
                                            ? "font_CN_normal"
                                            : ""
                                        }
                                      >
                                        {InStock(cartdetail.stock)}
                                      </Card.Text>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col
                                      style={{ margin: "1rem 1rem 0rem 1rem" }}
                                    >
                                      <Card.Text className="card_cart_product_price text-center text-md-left">
                                        <span
                                          className={
                                            language === "zh-CN"
                                              ? "font_normal_size_CN"
                                              : "font_normal_size"
                                          }
                                          style={{ fontWeight: "500" }}
                                        >
                                          {dictionary.unit_price}:
                                        </span>{" "}
                                        ${formatMoney(cartdetail.unit_price)}
                                      </Card.Text>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col style={{ margin: "0 1rem" }}>
                                      <Card.Text className="card_cart_product_price text-center text-md-left">
                                        <span
                                          className={
                                            language === "zh-CN"
                                              ? "font_normal_size_CN"
                                              : "font_normal_size"
                                          }
                                          style={{ fontWeight: "500" }}
                                        >
                                          {dictionary.quantity}:
                                        </span>{" "}
                                        {cartdetail.quantity}
                                      </Card.Text>
                                    </Col>
                                  </Row>
                                  <Row className="mb-4 ">
                                    <Col style={{ margin: "0 1rem" }}>
                                      <Card.Text className="card_cart_product_price text-center text-md-left">
                                        <span
                                          className={
                                            language === "zh-CN"
                                              ? "font_normal_size_CN"
                                              : "font_normal_size"
                                          }
                                          style={{ fontWeight: "500" }}
                                        >
                                          {dictionary.total_product}:
                                        </span>{" "}
                                        ${formatMoney(cartdetail.total_product)}
                                      </Card.Text>
                                    </Col>
                                  </Row>
                                </Card.Body>
                              </Col>
                            </Row>
                          </Card>
                        </div>
                      );
                    })}
                  </Row>
                </Col>
              </Row>
              <br />
            </Container>
          </Col>
          <Col xs={{ span: 12, order: 1 }} xl={{ span: 4, order: 2 }}>
            <Container>
              <Row>
                <Col md={11}>
                  <Row className="ml-md-2 justify-content-center">
                    <Col
                      md={6}
                      className={
                        language === "zh-CN"
                          ? "font_normal_size_plus_CN"
                          : "font_normal_size_plus"
                      }
                      style={{ paddingTop: "4rem" }}
                    >
                      {"  "}
                      {dictionary.total}: ${formatMoney(total)}
                    </Col>
                  </Row>
                  <Row className="ml-md-2 justify-content-center">
                    <Col
                      md={12}
                      className={
                        language === "zh-CN"
                          ? "font_normal_size_CN"
                          : "font_normal_size"
                      }
                    >
                      <CardSection />
                    </Col>
                  </Row>
                  <Row className="header_cart_right ml-md-2 justify-content-center">
                    <Col md={6} className="mt-2">
                      <Button
                        disabled={isDisabled}
                        onClick={handlePayment}
                        variant="secondary"
                        className={
                          language === "zh-CN"
                            ? "button_cart font_normal_size_CN"
                            : "button_cart font_normal_size"
                        }
                        style={{ height: "3.2rem" }}
                      >
                        {dictionary.pay}
                        {"  "}
                        {isDisabled && (
                          <ClipLoader
                            css="margin-bottom: -0.8%; margin-left: 1.5%"
                            color={"white"}
                            size={15}
                          />
                        )}
                      </Button>
                    </Col>
                  </Row>
                  <Row className="ml-md-2 mb-4 mb-xl-0 justify-content-center">
                    <Col
                      md={6}
                      className={
                        language === "zh-CN"
                          ? "font_normal_size_CN"
                          : "font_normal_size"
                      }
                    >
                      <FontAwesomeIcon
                        size="1x"
                        icon={["fas", "lock"]}
                        style={{ paddingRight: ".5rem", width: "17px" }}
                      />
                      {"  "}
                      {dictionary.secure_payment}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}
