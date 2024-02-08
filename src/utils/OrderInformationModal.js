import React, { useContext } from "react";

import { LanguageContext } from "./../language/LanguageContext";
import {
  Modal,
  Col,
  Row,
  NavLink,
  Container,
  Card,
  Image,
} from "react-bootstrap";
import formatMoney from "../utils/formatMoney";
import moment from "moment";

export default function OrderInformationModal(props) {
  const { order } = props;
  const { dictionary, language } = useContext(LanguageContext);

  const getDate = (dateString) => {
    const today = moment(dateString);
    return today.format("YYYY-MM-DD");
  };

  const getStatus = (status) => {
    if (status === "pending") {
      return (
        <span>
          <span
            className="dot_limited"
            style={{ marginLeft: ".5rem", marginRight: ".5rem" }}
          ></span>{" "}
          {dictionary.pending}
        </span>
      );
    } else if (status === "transit") {
      return (
        <span>
          <span
            className="dot_limited"
            style={{ marginLeft: ".5rem", marginRight: ".5rem" }}
          ></span>{" "}
          {dictionary.transit}
        </span>
      );
    }
    return (
      <span>
        <span className="dot_stock"></span> {dictionary.date}
      </span>
    );
  };

  function titleCase(str) {
    str = str.toLowerCase().split(" ");
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(" ");
  }

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      className="modal"
      animation={false}
      centered
    >
      <Container style={{ borderBottom: "1px solid #eae8e4" }}>
        <Row className="justify-content-center">
          <Col
            xs={9}
            style={{
              padding: "1.2rem 0rem 1rem 0rem",
            }}
          >
            <Modal.Title
              className={
                language === "zh-CN"
                  ? "modal_title_CN ml-md-3"
                  : "modal_title ml-md-3"
              }
            >
              {dictionary.order_information.toUpperCase()}
            </Modal.Title>
          </Col>
          <Col
            xs={2}
            onClick={props.onHide}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              padding: 0,
              margin: 0,
              fontSize: "1.2rem",
            }}
            className="text-center"
          >
            <NavLink className="cross_close">&#x2715;</NavLink>
          </Col>
        </Row>
      </Container>
      <Modal.Body>
        <Container>
          <Row className="justify-content-center mt-5">
            <Col md={11}>
              <Row>
                <Col xs={12}>
                  <p
                    className={
                      language === "zh-CN"
                        ? "modal_subtitle_CN text-center text-lg-left mx-auto "
                        : "modal_subtitle text-center text-lg-left mx-auto "
                    }
                  >
                    {dictionary.order_number}: {order.order_number}
                  </p>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col xs={12} className="mx-auto text-center text-lg-left ">
                  <span
                    className={
                      language === "zh-CN"
                        ? "mx-auto text-center text-lg-left font_CN_normal"
                        : "mx-auto text-center text-lg-left"
                    }
                  >
                    {getDate(order.payment_date)}
                  </span>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={6}
                  xl={6}
                  className={
                    language === "zh-CN"
                      ? "mx-auto text-center text-lg-left font_CN_normal"
                      : "mx-auto text-center text-lg-left"
                  }
                >
                  {dictionary.status}: {getStatus(order.delivery_status)}{" "}
                </Col>
                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={6}
                  xl={6}
                  className={
                    language === "zh-CN"
                      ? "mx-auto text-center text-lg-left font_CN_normal"
                      : "mx-auto text-center text-lg-left"
                  }
                >
                  {dictionary.transporter}: {order.delivery_company}{" "}
                </Col>
              </Row>
              <Row className="mb-4">
                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={6}
                  xl={6}
                  className={
                    language === "zh-CN"
                      ? "mx-auto text-center text-lg-left font_CN_normal"
                      : "mx-auto text-center text-lg-left"
                  }
                >
                  {dictionary.total}: ${formatMoney(order.total_order)}{" "}
                </Col>
                <Col
                  xs={12}
                  sm={12}
                  md={12}
                  lg={6}
                  xl={6}
                  className={
                    language === "zh-CN"
                      ? "mx-auto text-center text-lg-left font_CN_normal"
                      : "mx-auto text-center text-lg-left"
                  }
                >
                  {dictionary.via}:{" "}
                  {order.payment_method && titleCase(order.payment_method)}{" "}
                </Col>
              </Row>
              <Row className="mt-2">
                {order.products &&
                  order.products.map((product) => {
                    return (
                      <Col
                        md={12}
                        lg={6}
                        key={product.product_name}
                        className="mx-auto"
                      >
                        <Card
                          className="mx-auto mb-3 card_cart_product text-left"
                          key={product.product_name}
                        >
                          <Image
                            className="product_image_quantity"
                            style={{ width: "100%" }}
                            src={product.image_url}
                          />
                          <p
                            className={
                              language === "zh-CN"
                                ? "text-center text_product_details_CN mt-2"
                                : "text-center text_product_details mt-2"
                            }
                            style={{
                              paddingTop: ".5rem",
                              fontWeight: "bold",
                              fontSize: "1.2rem",
                            }}
                          >
                            {product.product_name}
                          </p>
                          <p
                            className={
                              language === "zh-CN"
                                ? "text-center text_product_details_CN mt-2"
                                : "text-center text_product_details mt-2"
                            }
                            style={{
                              fontWeight: "normal",
                              fontSize: "1rem",
                            }}
                          >
                            {" "}
                            ${formatMoney(product.unit_price)} x{" "}
                            {product.quantity}
                          </p>
                          <p
                            className={
                              language === "zh-CN"
                                ? "text-center text_product_details_CN mt-2"
                                : "text-center text_product_details mt-2"
                            }
                            style={{
                              marginBottom: "0.4rem",
                              fontWeight: "normal",
                              fontSize: "1rem",
                            }}
                          >
                            {dictionary.total_product}: $
                            {formatMoney(product.total_product)}
                          </p>
                        </Card>
                      </Col>
                    );
                  })}
              </Row>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
