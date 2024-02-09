import React, { useContext } from "react";
import { LanguageContext } from "../../language/LanguageContext";
import CartDetail from "./CartDetail";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import formatMoney from "../../utils/formatMoney";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

export default function CartList(props) {
  const {
    total,
    cart,
    handleDelete,
    decrementCount,
    incrementCount,
    updateCartTotal,
  } = props;
  const { dictionary, language } = useContext(LanguageContext);
  const history = useHistory();

  function handleProceed() {
    updateCartTotal(cart, total);
    history.push("/admin/checkout");
  }

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

  function hasItemCart(cart) {
    if (cart.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col
            xs={12}
            sm={12}
            md={8}
            lg={8}
            xl={8}
            className="order-md-1 order-2"
            style={{
              backgroundColor: "#f6f5f3",
              height: "calc(100vh - 60px)",
              overflowY: "auto",
            }}
          >
            <Container>
              <Row>
                <Col md={12}>
                  <Row className="header_cart ml-md-2">
                    <Col xs={12} sm={12} md={5} lg={4} xl={3}>
                      <Button
                        onClick={() => history.push("/admin/collection")}
                        className={
                          language === "zh-CN"
                            ? "button_cancel_cart_CN"
                            : "button_cancel_cart"
                        }
                        style={{
                          borderRadius: ".3rem",
                          background: "white",
                          maxWidth: "175px",
                        }}
                      >
                        <FontAwesomeIcon
                          size="1x"
                          icon={["fas", "chevron-left"]}
                          style={{ marginRight: "0.5rem" }}
                        />
                        {"  "}
                        {dictionary.continue_shopping}
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
                        {dictionary.my_shopping_bag.toUpperCase()}{" "}
                        <span
                          className={
                            language === "zh-CN"
                              ? "font_CN_normal"
                              : "product_details_count"
                          }
                        >
                          {countItemCart(cart)}
                        </span>
                      </p>
                    </Col>
                    <Row>
                      {cart.map((cartdetail) => {
                        return (
                          <CartDetail
                            key={cartdetail.product_name}
                            cartdetail={cartdetail}
                            handleDelete={handleDelete}
                            decrementCount={decrementCount}
                            incrementCount={incrementCount}
                          />
                        );
                      })}
                    </Row>
                  </Row>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col
            xs={12}
            sm={12}
            md={4}
            lg={4}
            xl={4}
            className="order-md-2 order-1"
          >
            <Container>
              <Row>
                <Col md={11}>
                  <Row className="header_cart_right ml-md-2 justify-content-center">
                    <Col xs={12} lg={6} style={{ paddingTop: "2.4rem" }}>
                      <Button
                        disabled={hasItemCart(cart)}
                        onClick={handleProceed}
                        className={
                          language === "zh-CN"
                            ? "button_cart font_normal_size_CN"
                            : "button_cart font_normal_size"
                        }
                        style={{ height: "3.3rem" }}
                      >
                        {dictionary.proceed}
                        {"  "}
                        <FontAwesomeIcon
                          size="1x"
                          icon={["fas", "chevron-right"]}
                          style={{ paddingLeft: ".5rem", width: "17px" }}
                        />
                      </Button>
                    </Col>
                  </Row>
                  <Row className="ml-md-2 justify-content-center">
                    <Col
                      xs={12}
                      lg={6}
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
                  <Row className="ml-md-2 justify-content-center mb-4 mb-md-1">
                    <Col
                      xs={12}
                      lg={6}
                      className={
                        language === "zh-CN"
                          ? "font_normal_size_plus_CN"
                          : "font_normal_size_plus"
                      }
                      style={{ paddingTop: "1rem" }}
                    >
                      {"  "}
                      {dictionary.total}: ${formatMoney(total)}
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
