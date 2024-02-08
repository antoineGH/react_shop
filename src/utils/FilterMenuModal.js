import React, { useContext, useState } from "react";
import { LanguageContext } from "./../language/LanguageContext";
import { Modal, Col, Row, NavLink, Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

export default function FilterMenuModal(props) {
  const { categories, filterItem, SortItem } = props;
  const { dictionary, language } = useContext(LanguageContext);
  const [hovered1, setHovered1] = useState(false);
  const [hovered2, setHovered2] = useState(false);

  const handleFilter = (filter) => {
    filterItem(filter);
  };

  return (
    <>
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
                {dictionary.filter_products.toUpperCase()}
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

        <Container>
          <Row className="justify-content-center mt-4">
            <Col md={11}>
              <p
                className={
                  language === "zh-CN"
                    ? "modal_subtitle text-center text-md-left"
                    : "modal_subtitle_CN text-center text-md-left"
                }
                style={{ fontSize: ".9rem", fontWeight: 550 }}
              >
                {dictionary.by_product_category}
              </p>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={11}>
              <Row className="mt-0 gap-1 px-3">
                {categories &&
                  categories.map((category) => {
                    return (
                      <Button
                        key={category}
                        onClick={() => handleFilter(category)}
                        style={{
                          width: "auto",
                          borderRadius: "15px",
                          textTransform: "capitalize",
                          padding: "2px 12px",
                        }}
                        className="button_address font_normal_size mr-1"
                        variant="secondary"
                      >
                        {category}
                      </Button>
                    );
                  })}
              </Row>
            </Col>
          </Row>
          <Row className="justify-content-center mt-4">
            <Col md={11}>
              <p
                className={
                  language === "zh-CN"
                    ? "modal_subtitle text-left text-md-left mb-3"
                    : "modal_subtitle_CN text-center text-md-left mb-3"
                }
                style={{ fontSize: ".9rem", fontWeight: 550 }}
              >
                {dictionary.by_price}
              </p>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={11}>
              <Row className="gap-1, px-3">
                <Button
                  onClick={() => SortItem("Low to High")}
                  onMouseEnter={() => setHovered1(true)}
                  onMouseLeave={() => setHovered1(false)}
                  style={{
                    width: "auto",
                    borderRadius: "15px",
                    textTransform: "capitalize",
                    padding: "2px 12px",
                  }}
                  className="button_address font_normal_size my-auto"
                  variant="secondary"
                >
                  {dictionary.low_to_high}
                  <FontAwesomeIcon
                    className="ml-2"
                    style={{ color: hovered1 ? "black" : "white" }}
                    size="1x"
                    icon={["fas", "caret-up"]}
                  />
                </Button>
                <Button
                  onClick={() => SortItem("High to Low")}
                  onMouseEnter={() => setHovered2(true)}
                  onMouseLeave={() => setHovered2(false)}
                  style={{
                    width: "auto",
                    borderRadius: "15px",
                    textTransform: "capitalize",
                    padding: "2px 12px",
                    marginLeft: ".5rem",
                  }}
                  className={
                    language === "zh-CN"
                      ? "mb-4 my-auto button_address button_modal font_CN_normal"
                      : "mb-4 my-auto button_address button_modal font_normal_size"
                  }
                  variant="secondary"
                >
                  {dictionary.high_to_low}
                  <FontAwesomeIcon
                    className="ml-2"
                    style={{ color: hovered2 ? "black" : "white" }}
                    size="1x"
                    icon={["fas", "caret-down"]}
                  />
                </Button>
              </Row>
            </Col>
          </Row>
        </Container>
      </Modal>
    </>
  );
}
