import React, { useState, useContext } from "react";
import { LanguageContext } from "../../language/LanguageContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import myCountry from "country-list-js";
import ClipLoader from "react-spinners/ClipLoader";
import {
  Row,
  Col,
  Button,
  FormGroup,
  Form,
  InputGroup,
  Container,
  NavLink,
  Modal,
  Dropdown,
} from "react-bootstrap";
import Select from "react-select";
import ProfileCard from "../components/ProfileCard";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

export default function Profile(props) {
  const {
    email,
    firstName,
    lastName,
    address,
    city,
    postcode,
    state,
    country,
    phone,
    handleDelete,
    handleUpdate,
    isDisabled,
    changePassword,
    setChangePassword,
    changeInfo,
    setChangeInfo,
  } = props;
  const [show, setShow] = useState(false);
  const history = useHistory();
  const { dictionary, language } = useContext(LanguageContext);

  var country_names = myCountry.names();
  const options = [];
  country_names.forEach((country_name) => {
    options.push({ value: country_name, label: country_name });
  });
  const [selectedOption, setSelectedOption] = useState({
    value: country,
    label: country,
  });

  const regexChar = /^[a-zA-Z ]*$/;
  const regexCharInteger = /^[A-Za-z0-9 ]*$/;
  const regexPassword = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,24}$/;
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(2, dictionary.too_short)
      .max(15, dictionary.too_long)
      .matches(regexChar, dictionary.not_special_char_number)
      .required(dictionary.required),
    lastName: Yup.string()
      .min(2, dictionary.too_short)
      .max(15, dictionary.too_long)
      .matches(regexChar, dictionary.not_special_char_number)
      .required(dictionary.required),
    password: Yup.string()
      .min(6, dictionary.too_short)
      .max(24, dictionary.too_long)
      .matches(regexPassword, dictionary.password_regex),
    confirm_password: Yup.string()
      .min(6, dictionary.too_short)
      .max(24, dictionary.too_long)
      .oneOf([Yup.ref("password"), null], dictionary.password_match),
    address: Yup.string()
      .min(2, dictionary.too_short)
      .max(100, dictionary.too_long)
      .matches(regexCharInteger, dictionary.no_special_char),
    city: Yup.string()
      .min(2, dictionary.too_short)
      .max(40, dictionary.too_long)
      .matches(regexChar, dictionary.not_special_char_number),
    state: Yup.string()
      .min(2, dictionary.too_short)
      .max(40, dictionary.too_long),
    postcode: Yup.number()
      .integer(dictionary.not_valid)
      .positive(dictionary.not_valid)
      .min(1, dictionary.too_short)
      .max(1000000, dictionary.too_long),
    phone: Yup.string().matches(phoneRegExp, dictionary.not_valid),
  });

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        email: email,
        password: "",
        confirm_password: "",
        firstName: titleCase(firstName),
        lastName: titleCase(lastName),
        address: titleCase(address),
        city: titleCase(city),
        state: titleCase(state),
        postcode: postcode,
        phone: phone,
        profilePicture: "",
      },
      validationSchema,
      onSubmit(values) {
        handleUpdate(values, selectedOption.value);
      },
    });

  const handleShow = () => setShow(true);

  const handleClose = () => setShow(false);

  const handleChangePassword = () => {
    setChangePassword(!changePassword);
    setChangeInfo(false);
  };

  const handleChangeInfo = () => {
    setChangeInfo(!changeInfo);
    setChangePassword(false);
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
            sm={{ span: 12, order: 2 }}
            md={{ span: 6, order: 1 }}
            lg={{ span: 7, order: 1 }}
            xl={{ span: 8, order: 1 }}
            style={{ backgroundColor: "#f6f5f3" }}
          >
            <Container style={{ minHeight: "90vh" }}>
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
                      >
                        <FontAwesomeIcon
                          size="1x"
                          icon={["fas", "chevron-left"]}
                          style={{ paddingRight: ".5rem" }}
                        />
                        {"  "}
                        {dictionary.back_to_shopping}
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
                        {dictionary.my_profile_card.toUpperCase()}
                      </p>
                    </Col>
                  </Row>
                  <ProfileCard
                    email={email}
                    firstName={firstName}
                    lastName={lastName}
                    address={address}
                    city={city}
                    postcode={postcode}
                    country={country}
                    phone={phone}
                  />
                </Col>
              </Row>
            </Container>
          </Col>
          <Col
            xs={{ span: 12, order: 1 }}
            sm={{ span: 12, order: 1 }}
            md={{ span: 6, order: 2 }}
            lg={{ span: 5, order: 2 }}
            xl={{ span: 4, order: 2 }}
          >
            <Container>
              <Row>
                <Col md={11}>
                  <Row className="header_cart_right ml-md-2 justify-content-center">
                    <Col md={6} style={{ paddingTop: "2.4rem" }}>
                      <Dropdown>
                        <Dropdown.Toggle
                          className={
                            language === "zh-CN"
                              ? "button_cart font_normal_size_CN"
                              : "button_cart font_normal_size"
                          }
                          variant="secondary"
                          style={{
                            height: "3.3rem",
                            width: "100%",
                            color: "white",
                          }}
                        >
                          {dictionary.settings}
                          {"  "}
                          <FontAwesomeIcon
                            size="1x"
                            className="mt-2 ml-1"
                            icon={["fas", "cog"]}
                          />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            className={
                              language === "zh-CN"
                                ? "dropdown_item font_CN_normal"
                                : "dropdown_item"
                            }
                            as="button"
                            onClick={handleChangeInfo}
                          >
                            <FontAwesomeIcon
                              className="mr-2"
                              size="1x"
                              icon={["fas", "edit"]}
                            />
                            {dictionary.edit_information}
                          </Dropdown.Item>
                          <Dropdown.Item
                            className={
                              language === "zh-CN"
                                ? "dropdown_item font_CN_normal"
                                : "dropdown_item"
                            }
                            as="button"
                            onClick={handleChangePassword}
                          >
                            <FontAwesomeIcon
                              className="mr-2"
                              size="1x"
                              icon={["fas", "lock"]}
                            />
                            {dictionary.change_password}
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item
                            className={
                              language === "zh-CN"
                                ? "dropdown_item font_CN_normal"
                                : "dropdown_item"
                            }
                            as="button"
                            onClick={handleShow}
                          >
                            <FontAwesomeIcon
                              className="mr-2"
                              size="1x"
                              icon={["fas", "trash-alt"]}
                            />
                            {dictionary.delete_account}
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col>
                  {/* Account Information */}
                  {changePassword && (
                    <Container>
                      <Row className="justify-content-center mt-5">
                        <Col md={11}>
                          <p
                            className={
                              language === "zh-CN"
                                ? "modal_subtitle_CN"
                                : "modal_subtitle"
                            }
                          >
                            {dictionary.change_password.toUpperCase()}
                          </p>
                          <Row>
                            <Col className="mx-auto">
                              <Form role="form" onSubmit={handleSubmit}>
                                <Row>
                                  <Col xs={12}>
                                    <FormGroup className="mb-3">
                                      <InputGroup className="input-group-alternative">
                                        <InputGroup.Prepend>
                                          <InputGroup.Text>
                                            <i className="fas fa-user-circle"></i>
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
                                        <div className="error_field">
                                          {errors.password}
                                        </div>
                                      )}
                                    </FormGroup>
                                  </Col>
                                  <Col xs={12}>
                                    <FormGroup className="mb-3">
                                      <InputGroup className="input-group-alternative">
                                        <InputGroup.Prepend>
                                          <InputGroup.Text>
                                            <i className="fas fa-user-circle"></i>
                                          </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                          id="confirm_password"
                                          name="confirm_password"
                                          type="password"
                                          placeholder={
                                            dictionary.confirm_password
                                          }
                                          onBlur={handleBlur}
                                          value={values.confirm_password}
                                          onChange={handleChange}
                                        />
                                      </InputGroup>
                                      {errors.confirm_password &&
                                        touched.confirm_password && (
                                          <div className="error_field">
                                            {errors.confirm_password}
                                          </div>
                                        )}
                                    </FormGroup>
                                  </Col>
                                </Row>

                                <div className="text-center">
                                  <Button
                                    onClick={handleSubmit}
                                    className={
                                      language === "zh-CN"
                                        ? "mt-1 mb-4 button_cart button_modal font_CN_normal"
                                        : "mt-1 mb-4 button_cart button_modal"
                                    }
                                    variant="secondary"
                                    type="submit"
                                    size="sm"
                                    disabled={isDisabled || !values.password}
                                  >
                                    {dictionary.update_password}
                                    {isDisabled && (
                                      <ClipLoader
                                        css="margin-bottom: -3%; margin-left: 5%"
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
                  )}
                  {/* Personal Information */}
                  {changeInfo && (
                    <Container>
                      <Row className="justify-content-center mt-5">
                        <Col md={11}>
                          <p
                            className={
                              language === "zh-CN"
                                ? "modal_subtitle_CN"
                                : "modal_subtitle"
                            }
                          >
                            {dictionary.edit_information.toUpperCase()}
                          </p>
                          <Row>
                            <Col className="mx-auto">
                              <Form role="form" onSubmit={handleSubmit}>
                                <Row>
                                  <Col xs={12}>
                                    <FormGroup className="mb-3">
                                      <InputGroup className="input-group-alternative">
                                        <InputGroup.Prepend>
                                          <InputGroup.Text>
                                            <i className="fas fa-user-circle"></i>
                                          </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                          id="firstName"
                                          name="firstName"
                                          type="text"
                                          placeholder={dictionary.email}
                                          onBlur={handleBlur}
                                          value={values.firstName}
                                          onChange={handleChange}
                                        />
                                      </InputGroup>
                                      {errors.firstName &&
                                        touched.firstName && (
                                          <div className="error_field">
                                            {errors.firstName}
                                          </div>
                                        )}
                                    </FormGroup>
                                  </Col>
                                  <Col xs={12}>
                                    <FormGroup className="mb-3">
                                      <InputGroup className="input-group-alternative">
                                        <InputGroup.Prepend>
                                          <InputGroup.Text>
                                            <i className="fas fa-user-circle"></i>
                                          </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                          id="lastName"
                                          name="lastName"
                                          type="text"
                                          placeholder={dictionary.last_name}
                                          onBlur={handleBlur}
                                          value={values.lastName}
                                          onChange={handleChange}
                                        />
                                      </InputGroup>
                                      {errors.lastName && touched.lastName && (
                                        <div className="error_field">
                                          {errors.lastName}
                                        </div>
                                      )}
                                    </FormGroup>
                                  </Col>
                                  <Col xs={12}>
                                    <FormGroup className="mb-3">
                                      <InputGroup className="input-group-alternative">
                                        <InputGroup.Prepend>
                                          <InputGroup.Text>
                                            <i className="fas fa-user-circle"></i>
                                          </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                          id="address"
                                          name="address"
                                          type="text"
                                          placeholder={dictionary.address}
                                          onBlur={handleBlur}
                                          value={values.address}
                                          onChange={handleChange}
                                        />
                                      </InputGroup>
                                      {errors.address && touched.address && (
                                        <div className="error_field">
                                          {errors.address}
                                        </div>
                                      )}
                                    </FormGroup>
                                  </Col>
                                  <Col xs={12}>
                                    <FormGroup className="mb-3">
                                      <InputGroup className="input-group-alternative">
                                        <InputGroup.Prepend>
                                          <InputGroup.Text>
                                            <i className="fas fa-user-circle"></i>
                                          </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                          id="postcode"
                                          name="postcode"
                                          type="text"
                                          placeholder={dictionary.postcode}
                                          onBlur={handleBlur}
                                          value={values.postcode}
                                          onChange={handleChange}
                                        />
                                      </InputGroup>
                                      {errors.postcode && touched.postcode && (
                                        <div className="error_field">
                                          {errors.postcode}
                                        </div>
                                      )}
                                    </FormGroup>
                                  </Col>
                                  <Col xs={12}>
                                    <FormGroup className="mb-3">
                                      <InputGroup className="input-group-alternative">
                                        <InputGroup.Prepend>
                                          <InputGroup.Text>
                                            <i className="fas fa-user-circle"></i>
                                          </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                          id="city"
                                          name="city"
                                          type="text"
                                          placeholder={dictionary.city}
                                          onBlur={handleBlur}
                                          value={values.city}
                                          onChange={handleChange}
                                        />
                                      </InputGroup>
                                      {errors.city && touched.city && (
                                        <div className="error_field">
                                          {errors.city}
                                        </div>
                                      )}
                                    </FormGroup>
                                  </Col>
                                  <Col xs={12}>
                                    <FormGroup className="mb-3">
                                      <InputGroup className="input-group-alternative">
                                        <InputGroup.Prepend>
                                          <InputGroup.Text>
                                            <i className="fas fa-user-circle"></i>
                                          </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                          id="state"
                                          name="state"
                                          type="text"
                                          placeholder={dictionary.state}
                                          onBlur={handleBlur}
                                          value={values.state}
                                          onChange={handleChange}
                                        />
                                      </InputGroup>
                                      {errors.state && touched.state && (
                                        <div className="error_field">
                                          {errors.state}
                                        </div>
                                      )}
                                    </FormGroup>
                                  </Col>
                                  <Col xs={12}>
                                    <FormGroup className="mb-3">
                                      <Select
                                        id="country"
                                        name="country"
                                        type="text"
                                        placeholder={dictionary.country}
                                        onBlur={handleBlur}
                                        value={selectedOption}
                                        onChange={(selectedOption) =>
                                          setSelectedOption(selectedOption)
                                        }
                                        options={options}
                                      />
                                      {errors.country && touched.country && (
                                        <div className="error_field">
                                          {errors.country}
                                        </div>
                                      )}
                                    </FormGroup>
                                  </Col>
                                  <Col xs={12}>
                                    <FormGroup className="mb-3">
                                      <InputGroup className="input-group-alternative">
                                        <InputGroup.Prepend>
                                          <InputGroup.Text>
                                            <i className="fas fa-user-circle"></i>
                                          </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                          id="phone"
                                          name="phone"
                                          type="text"
                                          placeholder={dictionary.phone}
                                          onBlur={handleBlur}
                                          value={values.phone}
                                          onChange={handleChange}
                                        />
                                      </InputGroup>
                                      {errors.phone && touched.phone && (
                                        <div className="error_field">
                                          {errors.phone}
                                        </div>
                                      )}
                                    </FormGroup>
                                  </Col>
                                </Row>

                                <div className="text-center">
                                  <Button
                                    onClick={handleSubmit}
                                    className={
                                      language === "zh-CN"
                                        ? "mt-1 mb-4 button_cart button_modal font_CN_normal"
                                        : "mt-1 mb-4 button_cart button_modal"
                                    }
                                    color="secondary"
                                    type="submit"
                                    size="sm"
                                    disabled={isDisabled}
                                  >
                                    {dictionary.update_profile}
                                    {isDisabled && (
                                      <ClipLoader
                                        css="margin-bottom: -3%; margin-left: 5%"
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
                  )}
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>

      {/* Delete Account */}
      <Modal
        size="sm"
        show={show}
        onHide={handleClose}
        animation={false}
        centered
      >
        <Container style={{ borderBottom: "1px solid #eae8e4" }}>
          <Row className="justify-content-center">
            <Col
              xs={9}
              style={{
                borderRight: "1px solid #eae8e4",
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
                {dictionary.delete_account.toUpperCase()}
              </Modal.Title>
            </Col>
            <Col
              xs={2}
              onClick={handleClose}
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
          <Row>
            <Col>
              <Button
                size="sm"
                variant="secondary"
                className={
                  language === "zh-CN"
                    ? "button_cancel font_CN_normal"
                    : "button_cancel font_CN_normal"
                }
                onClick={handleClose}
              >
                {dictionary.cancel}
              </Button>
            </Col>
            <Col>
              <Button
                className={
                  language === "zh-CN"
                    ? "button_cart font_CN_normal"
                    : "button_cart font_CN_normal"
                }
                style={{ height: "2.7rem" }}
                size="sm"
                color="danger"
                variant="primary"
                onClick={handleDelete}
              >
                {dictionary.delete}
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}
