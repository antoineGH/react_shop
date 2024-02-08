import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ClipLoader from "react-spinners/ClipLoader";
import { LanguageContext } from "./../language/LanguageContext";
import requestLogin from "./../utils/requestLogin";
import { login } from "./../utils/authHooks";
import toast from "../utils/toast";
import {
  Container,
  Modal,
  Button,
  Col,
  Row,
  Form,
  FormGroup,
  InputGroup,
  NavLink,
  Alert,
} from "react-bootstrap";

export default function LoginModal(props) {
  const { handleLoginChange, handleRegisterChange, handleForgotChange } = props;
  const [isDisabled, setIsDisabled] = useState(false);
  const { dictionary, language } = useContext(LanguageContext);

  const regexPassword = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,24}$/;
  const validationSchema = Yup.object({
    email: Yup.string()
      .min(6, dictionary.too_short)
      .max(40, dictionary.too_long)
      .email(dictionary.invalid_email)
      .required(dictionary.required),
    password: Yup.string()
      .min(6, dictionary.too_short)
      .max(12, dictionary.too_long)
      .matches(regexPassword, dictionary.password_regex)
      .required(dictionary.required),
  });

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema,
      onSubmit(values) {
        handleLogin(values);
      },
    });

  function handleLogin(values) {
    setIsDisabled(true);
    const email = values.email.toLowerCase();
    const password = values.password;
    requestLogin(email, password)
      .then((response) => {
        login(response);
        setIsDisabled(false);
      })
      .catch((error) => {
        console.log(error);
        toast(dictionary.error_wrong_username_password);
        setIsDisabled(false);
      });
  }

  function handleRegister() {
    handleLoginChange(false);
    handleRegisterChange(true);
  }

  function handleForgot() {
    handleLoginChange(false);
    handleForgotChange(true);
  }

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
          <Row className="justify-content-center ">
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
                {dictionary.identification.toUpperCase()}
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
          <Row className="justify-content-center mt-3">
            <Col md={11} className="mb-3 mt-2">
              <Alert
                variant="info"
                style={{
                  padding: "1rem",
                  paddingBottom: "0rem",
                  background: "#19110b",
                  color: "white",
                  borderRadius: ".3rem",
                }}
              >
                <Row>
                  <Col md={12}>
                    <p style={{ fontWeight: "bold", lineHeight: ".9rem" }}>
                      Demo App
                    </p>
                  </Col>
                  <Col md={12}>
                    <p style={{ fontSize: ".9rem" }}>
                      username:{" "}
                      <span style={{ fontWeight: "bold", fontSize: ".9rem" }}>
                        demo@demo.au
                      </span>
                    </p>
                  </Col>
                  <Col md={12}>
                    <p style={{ fontSize: ".9rem", lineHeight: ".9rem" }}>
                      password:{" "}
                      <span style={{ fontWeight: "bold", fontSize: ".9rem" }}>
                        demo1234
                      </span>
                    </p>
                  </Col>
                </Row>
              </Alert>
            </Col>
            <Col md={11}>
              <p
                className={
                  language === "zh-CN" ? "modal_subtitle_CN" : "modal_subtitle"
                }
              >
                {dictionary.members_sign_in}
              </p>
              <Row>
                <Col className="mx-auto">
                  <Form role="form" onSubmit={handleSubmit}>
                    <FormGroup className="mb-3">
                      <InputGroup className="input-group-alternative">
                        <InputGroup.Prepend>
                          <InputGroup.Text>
                            <i className="fas fa-user-circle"></i>
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                          id="email"
                          name="email"
                          type="text"
                          placeholder={dictionary.email}
                          onBlur={handleBlur}
                          value={values.email}
                          onChange={handleChange}
                        />
                      </InputGroup>
                      {errors.email && touched.email && (
                        <div className="error_field">{errors.email}</div>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="input-group-alternative">
                        <InputGroup.Prepend>
                          <InputGroup.Text>
                            <i className="fas fa-unlock-alt"></i>
                          </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                          id="password"
                          name="password"
                          type="password"
                          placeholder={dictionary.password}
                          onBlur={handleBlur}
                          value={values.password}
                          onChange={handleChange}
                        />
                      </InputGroup>
                      {errors.password && touched.password && (
                        <div className="error_field">{errors.password}</div>
                      )}
                    </FormGroup>

                    <div className="text-center">
                      <Button
                        className={
                          language === "zh-CN"
                            ? "mt-2 mb-3 button_cart button_modal font_CN_normal"
                            : "mt-2 mb-3 button_cart button_modal"
                        }
                        color="secondary"
                        type="submit"
                        disabled={isDisabled}
                      >
                        {dictionary.sign_in}{" "}
                        {isDisabled && (
                          <ClipLoader
                            css="margin-bottom: -0.3%; margin-left: 1.5%"
                            color={"white"}
                            size={15}
                          />
                        )}
                      </Button>
                    </div>
                    <p
                      className="text-light text-center"
                      onClick={handleForgot}
                    >
                      <small
                        style={{ color: "black" }}
                        className={language === "zh-CN" ? "font_CN_normal" : ""}
                      >
                        {dictionary.forgot_password}
                      </small>
                    </p>
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <hr />
        <Container>
          <Row className="justify-content-center">
            <Col md={11} className="mt-4">
              <p
                className={
                  language === "zh-CN" ? "modal_subtitle_CN" : "modal_subtitle"
                }
              >
                {dictionary.dont_have_account}
              </p>
              <p
                className={
                  language === "zh-CN" ? "modal_text_CN" : "modal_text"
                }
              >
                {dictionary.benefits_personal_account}
              </p>
              <div className="text-center">
                <Button
                  className={
                    language === "zh-CN"
                      ? "mt-1 mb-4 button_cart button_modal font_CN_normal"
                      : "mt-1 mb-4 button_cart button_modal"
                  }
                  color="secondary"
                  type="submit"
                  disabled={isDisabled}
                  onClick={handleRegister}
                >
                  {dictionary.create_account}
                </Button>
              </div>
              <Row className="mt-3 justify-content-center ">
                <Col className="mx-auto text-align-center"></Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Modal>
    </>
  );
}
