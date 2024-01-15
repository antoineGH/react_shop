import React, { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../../language/LanguageContext";
import {
  Row,
  Col,
  Navbar,
  Nav,
  Button,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import LoginModal from "../../utils/LoginModal";
import RegisterModal from "../../utils/RegisterModal";
import ForgotModal from "../../utils/ForgotModal";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

export default function AuthNavbar(props) {
  const { dictionary, language } = useContext(LanguageContext);
  const [modalLoginShow, setModalLoginShow] = useState(false);
  const [modalRegisterShow, setModalRegisterShow] = useState(false);
  const [modalForgotShow, setModalForgotShow] = useState(false);

  useEffect(() => {}, [props.language]);

  return (
    <>
      <Row
        className="row_admin_navbar justify-content-center"
        style={{ marginRight: "0px" }}
      >
        <Col xs={12} md={11}>
          <Row>
            <Col md={7} lg={8} xl={9} style={{ paddingRight: "0px" }}>
              <Navbar
                className="admin_navbar ml-sm-2"
                bg="light"
                variant="light"
                expand="lg"
              >
                <Link to="/">
                  <Navbar.Brand className="logo_font">Luxury Shop</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="mr-auto">
                    <NavLink
                      to="/products"
                      className={
                        language === "zh-CN"
                          ? "navbar_menu_items_CN"
                          : "navbar_menu_items"
                      }
                    >
                      {dictionary.collection.toUpperCase()}
                    </NavLink>
                    <NavLink
                      to="/women"
                      className={
                        language === "zh-CN"
                          ? "navbar_menu_items_CN"
                          : "navbar_menu_items"
                      }
                    >
                      {dictionary.women.toUpperCase()}
                    </NavLink>
                    <NavLink
                      to="/men"
                      className={
                        language === "zh-CN"
                          ? "navbar_menu_items_CN"
                          : "navbar_menu_items"
                      }
                    >
                      {dictionary.men.toUpperCase()}
                    </NavLink>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </Col>
            <Col
              sm={12}
              md={4}
              lg={3}
              xl={3}
              className="my-auto ml-0 ml-md-5 ml-xl-0"
              style={{ paddingRight: "0px" }}
            >
              <Navbar
                className="admin_navbar"
                expand="lg"
                variant="light"
                bg="light"
                style={{
                  marginRight: "0",
                  boxShadow: "none",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <DropdownButton
                  className="my-auto"
                  id="dropdown_user_button"
                  title={<FontAwesomeIcon size="1x" icon={["fas", "user"]} />}
                >
                  <Dropdown.Item
                    className={
                      language === "zh-CN"
                        ? "navbar_menu_subitems_CN"
                        : "navbar_menu_subitems"
                    }
                    onClick={() => setModalLoginShow(true)}
                  >
                    {dictionary.login}
                  </Dropdown.Item>
                  <Dropdown.Item
                    className={
                      language === "zh-CN"
                        ? "navbar_menu_subitems_CN"
                        : "navbar_menu_subitems"
                    }
                    onClick={() => setModalRegisterShow(true)}
                  >
                    {dictionary.register}
                  </Dropdown.Item>
                </DropdownButton>
                {props.language !== "en-US" ? (
                  <Button
                    className="button_language"
                    size="sm"
                    onClick={() => props.handleUpdateLanguage("en-US")}
                  >
                    <span className="ml-2 font_CN_normal">中文</span>
                  </Button>
                ) : (
                  <Button
                    className="button_language"
                    size="sm"
                    onClick={() => props.handleUpdateLanguage("zh-CN")}
                  >
                    <span className="ml-2">EN</span>
                  </Button>
                )}
              </Navbar>
            </Col>
          </Row>
        </Col>
      </Row>
      <LoginModal
        show={modalLoginShow}
        handleLoginChange={setModalLoginShow}
        handleRegisterChange={setModalRegisterShow}
        handleForgotChange={setModalForgotShow}
        onHide={() => setModalLoginShow(false)}
      />
      <RegisterModal
        show={modalRegisterShow}
        handleLoginChange={setModalLoginShow}
        handleRegisterChange={setModalRegisterShow}
        onHide={() => setModalRegisterShow(false)}
      />
      <ForgotModal
        show={modalForgotShow}
        handleLoginChange={setModalLoginShow}
        handleForgotChange={setModalForgotShow}
        handleRegisterChange={setModalRegisterShow}
        onHide={() => setModalForgotShow(false)}
      />
    </>
  );
}
