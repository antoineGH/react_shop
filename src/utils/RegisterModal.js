import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Modal,
  Button,
  FormGroup,
  Form,
  InputGroup,
  Col,
  Row,
  NavLink,
  Container,
  Card,
} from "react-bootstrap";
import ClipLoader from "react-spinners/ClipLoader";
import { LanguageContext } from "./../language/LanguageContext";
import createUser from "./../utils/createUser";
import toast from "./../utils/toast";

export default function RegisterModal(props) {
  const { handleLoginChange, handleRegisterChange } = props;
  const [isDisabled, setIsDisabled] = useState(false);
  const { dictionary, language } = useContext(LanguageContext);

  const regexNoSpecial = /^[a-zA-Z. ]*$/;
  const validationSchema = Yup.object({
    first_name: Yup.string()
      .min(2, dictionary.too_short)
      .max(12, dictionary.too_long)
      .matches(regexNoSpecial, dictionary.no_special_char)
      .required(dictionary.required),
    last_name: Yup.string()
      .min(2, dictionary.too_short)
      .max(12, dictionary.too_long)
      .matches(regexNoSpecial, dictionary.no_special_char)
      .required(dictionary.required),
    email: Yup.string()
      .min(6, dictionary.too_short)
      .max(40, dictionary.too_long)
      .email(dictionary.invalid_email)
      .required(dictionary.required),
  });

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        first_name: "",
        last_name: "",
        email: "",
      },
      validationSchema,
      onSubmit(values) {
        handleRegister(values);
      },
    });

  function handleRegister() {
    setIsDisabled(true);
    const first_name = values.first_name.toLowerCase();
    const last_name = values.last_name.toLowerCase();
    const email = values.email.toLowerCase();
    createUser(email, first_name, last_name)
      .then((response) => {
        console.log(response);
        toast(dictionary.user_created + email);
        setIsDisabled(false);
      })
      .catch((error) => {
        console.log(error);
        toast(dictionary.error_not_user_created);
        setIsDisabled(false);
      });
  }

  function handleLogin() {
    handleRegisterChange(false);
    handleLoginChange(true);
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
          <Col xs={9} style={{ padding: "1.2rem 0rem 1rem 0rem" }}>
            <Modal.Title
              className={
                language === "zh-CN"
                  ? "modal_title_CN ml-md-3"
                  : "modal_title ml-md-3"
              }
            >
              {dictionary.create_account.toUpperCase()}
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
        <Row className="justify-content-center mt-5">
          <Col md={11}>
            <p
              className={
                language === "zh-CN" ? "modal_subtitle_CN" : "modal_subtitle"
              }
            >
              {dictionary.login_information}
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
                        id="first_name"
                        name="first_name"
                        type="text"
                        placeholder={dictionary.first_name}
                        onBlur={handleBlur}
                        value={values.first_name}
                        onChange={handleChange}
                      />
                    </InputGroup>
                    {errors.first_name && touched.first_name && (
                      <div className="error_field">{errors.first_name}</div>
                    )}
                  </FormGroup>

                  <FormGroup className="mb-3">
                    <InputGroup className="input-group-alternative">
                      <InputGroup.Prepend>
                        <InputGroup.Text>
                          <i className="fas fa-user-circle"></i>
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        id="last_name"
                        name="last_name"
                        type="text"
                        placeholder={dictionary.last_name}
                        onBlur={handleBlur}
                        value={values.last_name}
                        onChange={handleChange}
                      />
                    </InputGroup>
                    {errors.last_name && touched.last_name && (
                      <div className="error_field">{errors.last_name}</div>
                    )}
                  </FormGroup>

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
                  <p className="text-light" onClick={handleLogin}>
                    <small
                      style={{ color: "rgba(83,103,125,0.75)" }}
                      className={language === "zh-CN" ? "font_CN_normal" : ""}
                    >
                      {dictionary.already_have_account}{" "}
                      <span
                        className={language === "zh-CN" ? "font_CN_normal" : ""}
                        style={{ color: "black" }}
                      >
                        {dictionary.log_in}
                      </span>
                    </small>
                  </p>
                  <div className="text-center">
                    <Button
                      className={
                        language === "zh-CN"
                          ? "mt-1 mb-4 button_cart button_modal font_CN_normal"
                          : "mt-1 mb-4 button_cart button_modal"
                      }
                      variant="secondary"
                      type="submit"
                      disabled={isDisabled}
                    >
                      {dictionary.register}{" "}
                      {isDisabled && (
                        <ClipLoader
                          css="margin-bottom: -0.4%; margin-left: 1.5%"
                          color={"white"}
                          size={15}
                        />
                      )}
                    </Button>
                  </div>
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
            <Card className="modal_register_card">
              <Card.Body>
                <Card.Title
                  className={
                    language === "zh-CN" ? "modal_register_title_CN" : ""
                  }
                >
                  {dictionary.what_you_find_account}
                </Card.Title>
                <Row
                  className="mx-auto mb-1"
                  style={{ borderBottom: "1px solid #eae8e4" }}
                >
                  <Card.Text
                    className={
                      language === "zh-CN"
                        ? "modal_register_text_CN"
                        : "modal_register_text"
                    }
                  >
                    {dictionary.order_history_description}
                  </Card.Text>
                </Row>
                <Row
                  className="mx-auto mb-1"
                  style={{ borderBottom: "1px solid #eae8e4" }}
                >
                  <Card.Text
                    className={
                      language === "zh-CN"
                        ? "modal_register_text_CN"
                        : "modal_register_text"
                    }
                  >
                    {dictionary.manage_personal_information}
                  </Card.Text>
                </Row>
                <Row
                  className="mx-auto mb-1"
                  style={{ borderBottom: "1px solid #eae8e4" }}
                >
                  <Card.Text
                    className={
                      language === "zh-CN"
                        ? "modal_register_text_CN"
                        : "modal_register_text"
                    }
                  >
                    {dictionary.receive_digital_communications}
                  </Card.Text>
                </Row>
                <Row
                  className="mx-auto mb-1"
                  style={{ borderBottom: "1px solid #eae8e4" }}
                >
                  <Card.Text
                    className={
                      language === "zh-CN"
                        ? "modal_register_text_CN"
                        : "modal_register_text"
                    }
                  >
                    {dictionary.register_wishlist}
                  </Card.Text>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Modal>
  );
}
