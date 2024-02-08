import React, { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../../language/LanguageContext";
import { Container, Row, Col, Button } from "react-bootstrap";
import fetchOrder from "../../utils/fetchOrder";
import OrderDetails from "./OrderDetails";
import BarLoader from "react-spinners/BarLoader";
import OrderInformationModal from "../../utils/OrderInformationModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

export default function Orders() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [orders, setOrders] = useState("");
  const [hasOrder, setHasOrder] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [orderModal, setOrderModal] = useState(false);
  const { dictionary, language } = useContext(LanguageContext);

  useEffect(() => {
    let mounted = true;
    fetchOrder()
      .then((response) => {
        if (mounted) {
          setOrders(response);
          checkHasOrder(response);
          setIsLoaded(true);
        }
      })
      .catch((error) => {
        console.log(error);
        if (mounted) {
          setHasError(true);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  const handleTryAgain = () => {
    setHasError(false);
    setIsLoaded(false);
    let mounted = true;
    fetchOrder()
      .then((response) => {
        if (mounted) {
          setOrders(response);
          checkHasOrder(response);
          setIsLoaded(true);
        }
      })
      .catch((error) => {
        console.log(error);
        if (mounted) {
          setHasError(true);
        }
      });
    return () => {
      mounted = false;
    };
  };

  const checkHasOrder = (orders) => {
    if (orders.length >= 1) {
      setHasOrder(true);
    } else {
      setHasOrder(false);
    }
  };

  function countOrders(orders) {
    if (orders.length === 0) {
      return <span>({dictionary.no_item})</span>;
    } else if (orders.length === 1) {
      return (
        <span>
          ({orders.length} {dictionary.item})
        </span>
      );
    } else {
      return (
        <span>
          ({orders.length} {dictionary.items})
        </span>
      );
    }
  }

  function MoreInformation(order_number) {
    orders.forEach((order) => {
      if (order.order_number === order_number) {
        setOrderModal(order);
      }
    });
    setModalShow(true);
  }

  if (hasError) {
    return (
      <>
        <Container fluid>
          <Row>
            <Col
              xs={{ span: 12, order: 1 }}
              lg={{ span: 8, order: 1 }}
              style={{ backgroundColor: "#f6f5f3" }}
            >
              <Container className="order_vh">
                <Row>
                  <Col md={12}>
                    <Row>
                      <Col>
                        <p
                          className={
                            language === "zh-CN"
                              ? "modal_title_CN mt-3 mt-md-0 text-center text-lg-left"
                              : "modal_title mt-3 mt-md-0 text-center text-lg-left"
                          }
                          style={{ marginBottom: "0rem", paddingTop: "2.4rem" }}
                        >
                          {dictionary.my_orders.toUpperCase()}
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <p className="font_normal_size text-center text-md-left">
                          {dictionary.error_loading_orders}
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col
                        className="text-center text-md-left"
                        style={{ marginTop: "0rem" }}
                      >
                        <Button
                          onClick={handleTryAgain}
                          className="font_normal_size button_address"
                          variant="secondary"
                        >
                          {dictionary.try_again}
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
            </Col>
            <Col xs={{ span: 12, order: 2 }} lg={{ span: 4, order: 2 }}>
              <Container>
                <Row>
                  <Col
                    md={8}
                    lg={12}
                    xl={12}
                    style={{ paddingTop: "2.4rem" }}
                    className="mb-4 mb-lg-3 text-center justify-content-center mx-auto"
                  >
                    <Row
                      style={{
                        marginLeft: "1rem",
                        marginRight: "1rem",
                      }}
                    >
                      <Col md={10} className="mb-md-4 mx-auto">
                        <p
                          className={
                            language === "zh-CN"
                              ? "font_normal_size_CN text-center"
                              : "font_normal_size text-center"
                          }
                          style={{ marginBottom: "0rem", paddingTop: "1.4rem" }}
                        >
                          <FontAwesomeIcon
                            className="mr-1"
                            size="1x"
                            icon={["fas", "mobile-alt"]}
                            style={{ paddingRight: ".5rem" }}
                          />
                          {dictionary.call_us}
                        </p>
                      </Col>
                    </Row>

                    <Row style={{ borderBottom: "#eae8e4 1px solid" }}>
                      <Col
                        xs={1}
                        sm={1}
                        md={1}
                        lg={1}
                        className="my-auto"
                        style={{ marginBottom: "1rem" }}
                      ></Col>
                      <Col
                        xs={10}
                        sm={10}
                        md={10}
                        lg={10}
                        className="my-auto"
                        style={{ marginBottom: "1rem" }}
                      >
                        <p
                          className={
                            language === "zh-CN"
                              ? "font_normal_size_CN"
                              : "font_normal_size"
                          }
                          style={{
                            fontSize: "1.1rem",
                            marginBottom: "0rem",
                            padding: "1rem",
                          }}
                        >
                          {dictionary.packaging}
                        </p>
                      </Col>
                    </Row>
                    <Row style={{ borderBottom: "#eae8e4 1px solid" }}>
                      <Col
                        xs={1}
                        sm={1}
                        md={1}
                        lg={1}
                        className="my-auto"
                        style={{ marginBottom: "1rem" }}
                      ></Col>
                      <Col
                        xs={10}
                        sm={10}
                        md={10}
                        lg={10}
                        className="my-auto"
                        style={{ marginBottom: "1rem" }}
                      >
                        <p
                          className={
                            language === "zh-CN"
                              ? "font_normal_size_CN"
                              : "font_normal_size"
                          }
                          style={{
                            fontSize: "1.1rem",
                            marginBottom: "0rem",
                            padding: "1rem",
                          }}
                        >
                          {dictionary.shipping_delivery}
                        </p>
                      </Col>
                    </Row>
                    <Row style={{ borderBottom: "#eae8e4 1px solid" }}>
                      <Col
                        xs={1}
                        sm={1}
                        md={1}
                        lg={1}
                        className="my-auto"
                        style={{ marginBottom: "1rem" }}
                      ></Col>
                      <Col
                        xs={10}
                        sm={10}
                        md={10}
                        lg={10}
                        className="my-auto"
                        style={{ marginBottom: "1rem" }}
                      >
                        <p
                          className={
                            language === "zh-CN"
                              ? "font_normal_size_CN"
                              : "font_normal_size"
                          }
                          style={{
                            fontSize: "1.1rem",
                            marginBottom: "0rem",
                            padding: "1rem",
                          }}
                        >
                          {dictionary.collect_in_store}
                        </p>
                      </Col>
                    </Row>

                    <Row style={{ borderBottom: "#eae8e4 1px solid" }}>
                      <Col
                        xs={1}
                        sm={1}
                        md={1}
                        lg={1}
                        className="my-auto"
                        style={{ marginBottom: "1rem" }}
                      ></Col>
                      <Col
                        xs={10}
                        sm={10}
                        md={10}
                        lg={10}
                        className="my-auto"
                        style={{ marginBottom: "1rem" }}
                      >
                        <p
                          className={
                            language === "zh-CN"
                              ? "font_normal_size_CN"
                              : "font_normal_size"
                          }
                          style={{
                            fontSize: "1.1rem",
                            marginBottom: "0rem",
                            padding: "1rem",
                          }}
                        >
                          {dictionary.returns_exchanges}
                        </p>
                      </Col>
                    </Row>
                    <Row style={{ borderBottom: "#eae8e4 1px solid" }}>
                      <Col
                        xs={1}
                        sm={1}
                        md={1}
                        lg={1}
                        className="my-auto"
                        style={{ marginBottom: "1rem" }}
                      ></Col>
                      <Col
                        xs={10}
                        sm={10}
                        md={10}
                        lg={10}
                        className="my-auto"
                        style={{ marginBottom: "1rem" }}
                      >
                        <p
                          className={
                            language === "zh-CN"
                              ? "font_normal_size_CN"
                              : "font_normal_size"
                          }
                          style={{
                            fontSize: "1.1rem",
                            marginBottom: "0rem",
                            padding: "1rem",
                          }}
                        >
                          {dictionary.payment}
                        </p>
                      </Col>
                    </Row>
                  </Col>
                  <Row className="mx-auto mt-0">
                    <Col style={{ marginTop: "0" }}>
                      <OrderInformationModal
                        className="confirm_quantity_modal"
                        order={orderModal}
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                      />
                    </Col>
                  </Row>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </>
    );
  } else if (!isLoaded) {
    return (
      <Container fluid>
        <Row>
          <Col
            xs={{ span: 12, order: 1 }}
            lg={{ span: 8, order: 1 }}
            style={{ backgroundColor: "#f6f5f3" }}
          >
            <Container className="order_vh">
              <Row>
                <Col md={12}>
                  <Row>
                    <Col>
                      <p
                        className={
                          language === "zh-CN"
                            ? "modal_title_CN mt-3 mt-md-0 text-center text-lg-left"
                            : "modal_title mt-3 mt-md-0 text-center text-lg-left"
                        }
                        style={{ marginBottom: "0rem", paddingTop: "2.4rem" }}
                      >
                        {dictionary.my_orders.toUpperCase()}
                      </p>
                    </Col>
                  </Row>
                  <Row className="justify-content-center text-center text-lg-left mx-auto">
                    <Col xs={4} lg={4}></Col>
                    <Col xs={4} className="mx-auto" lg={4}>
                      <BarLoader css={{ margin: "auto" }} height={3} />
                    </Col>
                    <Col xs={4} lg={4}></Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col xs={{ span: 12, order: 2 }} lg={{ span: 4, order: 2 }}>
            <Container>
              <Row>
                <Col
                  md={8}
                  lg={12}
                  xl={12}
                  style={{ paddingTop: "2.4rem" }}
                  className="mb-4 mb-lg-3 text-center justify-content-center mx-auto"
                >
                  <Row
                    style={{
                      marginLeft: "1rem",
                      marginRight: "1rem",
                    }}
                  >
                    <Col md={10} className="mb-md-4 mx-auto ">
                      <p
                        className={
                          language === "zh-CN"
                            ? "font_normal_size_CN text-center"
                            : "font_normal_size text-center"
                        }
                        style={{ marginBottom: "0rem", paddingTop: "1.4rem" }}
                      >
                        <FontAwesomeIcon
                          className="mr-1"
                          size="1x"
                          icon={["fas", "mobile-alt"]}
                          style={{ paddingRight: ".5rem" }}
                        />
                        {"    "}
                        {dictionary.call_us}
                      </p>
                    </Col>
                  </Row>

                  <Row style={{ borderBottom: "#eae8e4 1px solid" }}>
                    <Col
                      xs={1}
                      sm={1}
                      md={1}
                      lg={1}
                      className="my-auto"
                      style={{ marginBottom: "1rem" }}
                    ></Col>
                    <Col
                      xs={10}
                      sm={10}
                      md={10}
                      lg={10}
                      className="my-auto"
                      style={{ marginBottom: "1rem" }}
                    >
                      <p
                        className={
                          language === "zh-CN"
                            ? "font_normal_size_CN"
                            : "font_normal_size"
                        }
                        style={{
                          fontSize: "1.1rem",
                          marginBottom: "0rem",
                          padding: "1rem",
                        }}
                      >
                        {dictionary.packaging}
                      </p>
                    </Col>
                    <Col
                      xs={1}
                      sm={1}
                      md={1}
                      lg={1}
                      className="my-auto"
                      style={{ marginBottom: "1rem" }}
                    >
                      <FontAwesomeIcon
                        size="1x"
                        icon={["fas", "chevron-right"]}
                      />
                    </Col>
                  </Row>
                  <Row style={{ borderBottom: "#eae8e4 1px solid" }}>
                    <Col
                      xs={1}
                      sm={1}
                      md={1}
                      lg={1}
                      className="my-auto"
                      style={{ marginBottom: "1rem" }}
                    ></Col>
                    <Col
                      xs={10}
                      sm={10}
                      md={10}
                      lg={10}
                      className="my-auto"
                      style={{ marginBottom: "1rem" }}
                    >
                      <p
                        className={
                          language === "zh-CN"
                            ? "font_normal_size_CN"
                            : "font_normal_size"
                        }
                        style={{
                          fontSize: "1.1rem",
                          marginBottom: "0rem",
                          padding: "1rem",
                        }}
                      >
                        {dictionary.shipping_delivery}
                      </p>
                    </Col>
                    <Col
                      xs={1}
                      sm={1}
                      md={1}
                      lg={1}
                      className="my-auto"
                      style={{ marginBottom: "1rem" }}
                    >
                      <FontAwesomeIcon
                        size="1x"
                        icon={["fas", "chevron-right"]}
                      />
                    </Col>
                  </Row>
                  <Row style={{ borderBottom: "#eae8e4 1px solid" }}>
                    <Col
                      xs={1}
                      sm={1}
                      md={1}
                      lg={1}
                      className="my-auto"
                      style={{ marginBottom: "1rem" }}
                    ></Col>
                    <Col
                      xs={10}
                      sm={10}
                      md={10}
                      lg={10}
                      className="my-auto"
                      style={{ marginBottom: "1rem" }}
                    >
                      <p
                        className={
                          language === "zh-CN"
                            ? "font_normal_size_CN"
                            : "font_normal_size"
                        }
                        style={{
                          fontSize: "1.1rem",
                          marginBottom: "0rem",
                          padding: "1rem",
                        }}
                      >
                        {dictionary.collect_in_store}
                      </p>
                    </Col>
                    <Col
                      xs={1}
                      sm={1}
                      md={1}
                      lg={1}
                      className="my-auto"
                      style={{ marginBottom: "1rem" }}
                    >
                      <FontAwesomeIcon
                        size="1x"
                        icon={["fas", "chevron-right"]}
                      />
                    </Col>
                  </Row>

                  <Row style={{ borderBottom: "#eae8e4 1px solid" }}>
                    <Col
                      xs={1}
                      sm={1}
                      md={1}
                      lg={1}
                      className="my-auto"
                      style={{ marginBottom: "1rem" }}
                    ></Col>
                    <Col
                      xs={10}
                      sm={10}
                      md={10}
                      lg={10}
                      className="my-auto"
                      style={{ marginBottom: "1rem" }}
                    >
                      <p
                        className={
                          language === "zh-CN"
                            ? "font_normal_size_CN"
                            : "font_normal_size"
                        }
                        style={{
                          fontSize: "1.1rem",
                          marginBottom: "0rem",
                          padding: "1rem",
                        }}
                      >
                        {dictionary.returns_exchanges}
                      </p>
                    </Col>
                    <Col
                      xs={1}
                      sm={1}
                      md={1}
                      lg={1}
                      className="my-auto"
                      style={{ marginBottom: "1rem" }}
                    >
                      <FontAwesomeIcon
                        size="1x"
                        icon={["fas", "chevron-right"]}
                      />
                    </Col>
                  </Row>
                  <Row style={{ borderBottom: "#eae8e4 1px solid" }}>
                    <Col
                      xs={1}
                      sm={1}
                      md={1}
                      lg={1}
                      className="my-auto"
                      style={{ marginBottom: "1rem" }}
                    ></Col>
                    <Col
                      xs={10}
                      sm={10}
                      md={10}
                      lg={10}
                      className="my-auto"
                      style={{ marginBottom: "1rem" }}
                    >
                      <p
                        className={
                          language === "zh-CN"
                            ? "font_normal_size_CN"
                            : "font_normal_size"
                        }
                        style={{
                          fontSize: "1.1rem",
                          marginBottom: "0rem",
                          padding: "1rem",
                        }}
                      >
                        {dictionary.payment}
                      </p>
                    </Col>
                    <Col
                      xs={1}
                      sm={1}
                      md={1}
                      lg={1}
                      className="my-auto"
                      style={{ marginBottom: "1rem" }}
                    >
                      <FontAwesomeIcon
                        size="1x"
                        icon={["fas", "chevron-right"]}
                      />
                    </Col>
                  </Row>
                </Col>
                <Row className="mx-auto mt-0">
                  <Col style={{ marginTop: "0" }}>
                    <OrderInformationModal
                      className="confirm_quantity_modal"
                      order={orderModal}
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                    />
                  </Col>
                </Row>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  } else if (hasOrder) {
    return (
      <>
        <Container fluid>
          <Row>
            <Col
              xs={{ span: 12, order: 1 }}
              lg={{ span: 8, order: 1 }}
              style={{ backgroundColor: "#f6f5f3" }}
            >
              <Container className="order_vh">
                <Row>
                  <Col md={12}>
                    <Row>
                      <Col>
                        <p
                          className={
                            language === "zh-CN"
                              ? "modal_title_CN mt-3 mt-md-0 text-center text-lg-left"
                              : "modal_title mt-3 mt-md-0 text-center text-lg-left"
                          }
                          style={{ marginBottom: "0rem", paddingTop: "2.4rem" }}
                        >
                          {dictionary.my_orders.toUpperCase()}{" "}
                          <span
                            className={
                              language === "zh-CN"
                                ? "font_CN_normal"
                                : "product_details_count"
                            }
                          >
                            {countOrders(orders)}
                          </span>
                        </p>
                        <p
                          className={
                            language === "zh-CN"
                              ? "text-center text-lg-left font_normal_size_CN"
                              : "text-center text-lg-left font_normal_size"
                          }
                          style={{ marginBottom: "0rem" }}
                        >
                          {dictionary.previous_orders_section}
                        </p>
                      </Col>
                    </Row>

                    {orders.map((order) => {
                      return (
                        <OrderDetails
                          key={order.order_number}
                          order={order}
                          MoreInformation={MoreInformation}
                        />
                      );
                    })}
                  </Col>
                </Row>
              </Container>
              <br />
            </Col>
            <Col xs={{ span: 12, order: 2 }} lg={{ span: 4, order: 2 }}>
              <Container>
                <Row>
                  <Col
                    md={8}
                    lg={12}
                    xl={12}
                    style={{ paddingTop: "2.4rem" }}
                    className="mb-4 mb-lg-3 text-center justify-content-center mx-auto"
                  >
                    <Row
                      style={{
                        marginLeft: "1rem",
                        marginRight: "1rem",
                      }}
                    >
                      <Col md={10} className="mb-md-4 mx-auto ">
                        <p
                          className={
                            language === "zh-CN"
                              ? "font_normal_size_CN text-center"
                              : "font_normal_size text-center"
                          }
                          style={{ marginBottom: "0rem", paddingTop: "1.4rem" }}
                        >
                          <FontAwesomeIcon
                            className="mr-1"
                            size="1x"
                            icon={["fas", "mobile-alt"]}
                            style={{ paddingRight: ".5rem" }}
                          />
                          {"    "}
                          {dictionary.call_us}
                        </p>
                      </Col>
                    </Row>

                    <Row style={{ borderBottom: "#eae8e4 1px solid" }}>
                      <Col
                        xs={1}
                        sm={1}
                        md={1}
                        lg={1}
                        className="my-auto"
                        style={{ marginBottom: "1rem" }}
                      ></Col>
                      <Col
                        xs={10}
                        sm={10}
                        md={10}
                        lg={10}
                        className="my-auto"
                        style={{ marginBottom: "1rem" }}
                      >
                        <p
                          className={
                            language === "zh-CN"
                              ? "font_normal_size_CN"
                              : "font_normal_size"
                          }
                          style={{
                            fontSize: "1.1rem",
                            marginBottom: "0rem",
                            padding: "1rem",
                          }}
                        >
                          {dictionary.packaging}
                        </p>
                      </Col>
                    </Row>
                    <Row style={{ borderBottom: "#eae8e4 1px solid" }}>
                      <Col
                        xs={1}
                        sm={1}
                        md={1}
                        lg={1}
                        className="my-auto"
                        style={{ marginBottom: "1rem" }}
                      ></Col>
                      <Col
                        xs={10}
                        sm={10}
                        md={10}
                        lg={10}
                        className="my-auto"
                        style={{ marginBottom: "1rem" }}
                      >
                        <p
                          className={
                            language === "zh-CN"
                              ? "font_normal_size_CN"
                              : "font_normal_size"
                          }
                          style={{
                            fontSize: "1.1rem",
                            marginBottom: "0rem",
                            padding: "1rem",
                          }}
                        >
                          {dictionary.shipping_delivery}
                        </p>
                      </Col>
                    </Row>
                    <Row style={{ borderBottom: "#eae8e4 1px solid" }}>
                      <Col
                        xs={1}
                        sm={1}
                        md={1}
                        lg={1}
                        className="my-auto"
                        style={{ marginBottom: "1rem" }}
                      ></Col>
                      <Col
                        xs={10}
                        sm={10}
                        md={10}
                        lg={10}
                        className="my-auto"
                        style={{ marginBottom: "1rem" }}
                      >
                        <p
                          className={
                            language === "zh-CN"
                              ? "font_normal_size_CN"
                              : "font_normal_size"
                          }
                          style={{
                            fontSize: "1.1rem",
                            marginBottom: "0rem",
                            padding: "1rem",
                          }}
                        >
                          {dictionary.collect_in_store}
                        </p>
                      </Col>
                    </Row>

                    <Row style={{ borderBottom: "#eae8e4 1px solid" }}>
                      <Col
                        xs={1}
                        sm={1}
                        md={1}
                        lg={1}
                        className="my-auto"
                        style={{ marginBottom: "1rem" }}
                      ></Col>
                      <Col
                        xs={10}
                        sm={10}
                        md={10}
                        lg={10}
                        className="my-auto"
                        style={{ marginBottom: "1rem" }}
                      >
                        <p
                          className={
                            language === "zh-CN"
                              ? "font_normal_size_CN"
                              : "font_normal_size"
                          }
                          style={{
                            fontSize: "1.1rem",
                            marginBottom: "0rem",
                            padding: "1rem",
                          }}
                        >
                          {dictionary.returns_exchanges}
                        </p>
                      </Col>
                    </Row>
                    <Row style={{ borderBottom: "#eae8e4 1px solid" }}>
                      <Col
                        xs={1}
                        sm={1}
                        md={1}
                        lg={1}
                        className="my-auto"
                        style={{ marginBottom: "1rem" }}
                      ></Col>
                      <Col
                        xs={10}
                        sm={10}
                        md={10}
                        lg={10}
                        className="my-auto"
                        style={{ marginBottom: "1rem" }}
                      >
                        <p
                          className={
                            language === "zh-CN"
                              ? "font_normal_size_CN"
                              : "font_normal_size"
                          }
                          style={{
                            fontSize: "1.1rem",
                            marginBottom: "0rem",
                            padding: "1rem",
                          }}
                        >
                          {dictionary.payment}
                        </p>
                      </Col>
                    </Row>
                  </Col>
                  <Row className="mx-auto mt-0">
                    <Col style={{ marginTop: "0" }}>
                      <OrderInformationModal
                        className="confirm_quantity_modal"
                        order={orderModal}
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                      />
                    </Col>
                  </Row>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </>
    );
  } else if (!hasOrder) {
    return (
      <Container fluid>
        <Row>
          <Col
            xs={{ span: 12, order: 1 }}
            lg={{ span: 8, order: 1 }}
            style={{ backgroundColor: "#f6f5f3" }}
          >
            <Container className="order_vh">
              <Row>
                <Col md={12}>
                  <Row>
                    <Col>
                      <p
                        className={
                          language === "zh-CN"
                            ? "modal_title_CN mt-3 mt-md-0 text-center text-lg-left"
                            : "modal_title mt-3 mt-md-0 text-center text-lg-left"
                        }
                        style={{ marginBottom: "0rem", paddingTop: "2.4rem" }}
                      >
                        {dictionary.my_orders.toUpperCase()}
                        <span className="product_details_count">
                          ({dictionary.no_item})
                        </span>
                      </p>
                      <p
                        className={
                          language === "zh-CN"
                            ? "text-center text-lg-left font_normal_size_CN"
                            : "text-center text-lg-left font_normal_size"
                        }
                        style={{ marginBottom: "0rem" }}
                      >
                        {dictionary.no_orders}
                      </p>
                    </Col>
                  </Row>
                  <Row className="justify-content-center text-center text-lg-left mx-auto">
                    <Col xs={4} lg={4}></Col>
                    <Col xs={4} className="mx-auto" lg={4}></Col>
                    <Col xs={4} lg={4}></Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col xs={{ span: 12, order: 2 }} lg={{ span: 4, order: 2 }}>
            <Container>
              <Row>
                <Col
                  md={8}
                  lg={12}
                  xl={12}
                  style={{ paddingTop: "2.4rem" }}
                  className="mb-4 mb-lg-3 text-center justify-content-center mx-auto"
                >
                  <Row
                    style={{
                      marginLeft: "1rem",
                      marginRight: "1rem",
                    }}
                  >
                    <Col md={12} className="mb-md-4 ">
                      <p
                        className={
                          language === "zh-CN"
                            ? "font_normal_size_CN text-center ml-lg-5"
                            : "font_normal_size text-center ml-lg-5"
                        }
                        style={{ marginBottom: "0rem", paddingTop: "1.4rem" }}
                      >
                        <FontAwesomeIcon
                          className="mr-1"
                          size="1x"
                          icon={["fas", "mobile-alt"]}
                          style={{ paddingRight: ".5rem" }}
                        />
                        {"    "}
                        {dictionary.call_us}
                      </p>
                    </Col>
                  </Row>

                  <Row style={{ borderBottom: "#eae8e4 1px solid" }}>
                    <Col
                      xs={1}
                      sm={1}
                      md={1}
                      lg={1}
                      className="my-auto"
                      style={{ marginBottom: "1rem" }}
                    ></Col>
                    <Col
                      xs={10}
                      sm={10}
                      md={10}
                      lg={10}
                      className="my-auto"
                      style={{ marginBottom: "1rem" }}
                    >
                      <p
                        className={
                          language === "zh-CN"
                            ? "font_normal_size_CN ml-5"
                            : "font_normal_size ml-5"
                        }
                        style={{
                          fontSize: "1.1rem",
                          marginBottom: "0rem",
                          padding: "1rem",
                        }}
                      >
                        {dictionary.packaging}
                      </p>
                    </Col>
                    <Col
                      xs={1}
                      sm={1}
                      md={1}
                      lg={1}
                      className="my-auto"
                      style={{ marginBottom: "1rem" }}
                    >
                      <FontAwesomeIcon
                        size="1x"
                        icon={["fas", "chevron-right"]}
                      />
                    </Col>
                  </Row>
                  <Row style={{ borderBottom: "#eae8e4 1px solid" }}>
                    <Col
                      xs={1}
                      sm={1}
                      md={1}
                      lg={1}
                      className="my-auto"
                      style={{ marginBottom: "1rem" }}
                    ></Col>
                    <Col
                      xs={10}
                      sm={10}
                      md={10}
                      lg={10}
                      className="my-auto"
                      style={{ marginBottom: "1rem" }}
                    >
                      <p
                        className={
                          language === "zh-CN"
                            ? "font_normal_size_CN ml-5"
                            : "font_normal_size ml-5"
                        }
                        style={{
                          fontSize: "1.1rem",
                          marginBottom: "0rem",
                          padding: "1rem",
                        }}
                      >
                        {dictionary.shipping_delivery}
                      </p>
                    </Col>
                    <Col
                      xs={1}
                      sm={1}
                      md={1}
                      lg={1}
                      className="my-auto"
                      style={{ marginBottom: "1rem" }}
                    >
                      <FontAwesomeIcon
                        size="1x"
                        icon={["fas", "chevron-right"]}
                      />
                    </Col>
                  </Row>
                  <Row style={{ borderBottom: "#eae8e4 1px solid" }}>
                    <Col
                      xs={1}
                      sm={1}
                      md={1}
                      lg={1}
                      className="my-auto"
                      style={{ marginBottom: "1rem" }}
                    ></Col>
                    <Col
                      xs={10}
                      sm={10}
                      md={10}
                      lg={10}
                      className="my-auto"
                      style={{ marginBottom: "1rem" }}
                    >
                      <p
                        className={
                          language === "zh-CN"
                            ? "font_normal_size_CN ml-5"
                            : "font_normal_size ml-5"
                        }
                        style={{
                          fontSize: "1.1rem",
                          marginBottom: "0rem",
                          padding: "1rem",
                        }}
                      >
                        {dictionary.collect_in_store}
                      </p>
                    </Col>
                    <Col
                      xs={1}
                      sm={1}
                      md={1}
                      lg={1}
                      className="my-auto"
                      style={{ marginBottom: "1rem" }}
                    >
                      <FontAwesomeIcon
                        size="1x"
                        icon={["fas", "chevron-right"]}
                      />
                    </Col>
                  </Row>

                  <Row style={{ borderBottom: "#eae8e4 1px solid" }}>
                    <Col
                      xs={1}
                      sm={1}
                      md={1}
                      lg={1}
                      className="my-auto"
                      style={{ marginBottom: "1rem" }}
                    ></Col>
                    <Col
                      xs={10}
                      sm={10}
                      md={10}
                      lg={10}
                      className="my-auto"
                      style={{ marginBottom: "1rem" }}
                    >
                      <p
                        className={
                          language === "zh-CN"
                            ? "font_normal_size_CN ml-5"
                            : "font_normal_size ml-5"
                        }
                        style={{
                          fontSize: "1.1rem",
                          marginBottom: "0rem",
                          padding: "1rem",
                        }}
                      >
                        {dictionary.returns_exchanges}
                      </p>
                    </Col>
                    <Col
                      xs={1}
                      sm={1}
                      md={1}
                      lg={1}
                      className="my-auto"
                      style={{ marginBottom: "1rem" }}
                    >
                      <FontAwesomeIcon
                        size="1x"
                        icon={["fas", "chevron-right"]}
                      />
                    </Col>
                  </Row>
                  <Row style={{ borderBottom: "#eae8e4 1px solid" }}>
                    <Col
                      xs={1}
                      sm={1}
                      md={1}
                      lg={1}
                      className="my-auto"
                      style={{ marginBottom: "1rem" }}
                    ></Col>
                    <Col
                      xs={10}
                      sm={10}
                      md={10}
                      lg={10}
                      className="my-auto"
                      style={{ marginBottom: "1rem" }}
                    >
                      <p
                        className={
                          language === "zh-CN"
                            ? "font_normal_size_CN ml-5"
                            : "font_normal_size ml-5"
                        }
                        style={{
                          fontSize: "1.1rem",
                          marginBottom: "0rem",
                          padding: "1rem",
                        }}
                      >
                        {dictionary.payment}
                      </p>
                    </Col>
                    <Col
                      xs={1}
                      sm={1}
                      md={1}
                      lg={1}
                      className="my-auto"
                      style={{ marginBottom: "1rem" }}
                    >
                      <FontAwesomeIcon
                        size="1x"
                        icon={["fas", "chevron-right"]}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
}
