import React, { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../../language/LanguageContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import myCountry from "country-list-js";
import {
  Container,
  Form,
  FormGroup,
  Row,
  Col,
  InputGroup,
  Button,
  Card,
} from "react-bootstrap";
import ClipLoader from "react-spinners/ClipLoader";
import { useHistory } from "react-router-dom";
import fetchUserDetails from "../../utils/fetchUserDetails";

import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

export default function Checkout(props) {
  const {
    cart,
    total,
    email,
    first_name,
    last_name,
    address,
    setAddress,
    city,
    setCity,
    state,
    setState,
    postcode,
    setPostcode,
    country,
    setCountry,
    phone,
    setPhone,
    userDetails,
    hasUserDetail,
    editUserDetail,
    updateUserInfo,
    addUserInfo,
    deleteUserDetail,
    addUserDetail,
    isDisabled,
    deliveryOption,
    setDeliveryOption,
    hasAddDetail,
    handleProceed,
  } = props;
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
  const history = useHistory();

  useEffect(() => {
    if (cart.length === 0 || total.length === 0) {
      history.push("/admin/cart");
    }
  }, [cart, total, history]);

  const regexChar = /^[a-zA-Z ]*$/;
  const regexCharInteger = /^[A-Za-z0-9 ]*$/;
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validationSchema = Yup.object({
    address: Yup.string()
      .min(2, dictionary.too_short)
      .max(100, dictionary.too_long)
      .matches(regexCharInteger, dictionary.not_special_char)
      .required(dictionary.required),
    city: Yup.string()
      .min(2, dictionary.too_short)
      .max(40, dictionary.too_long)
      .matches(regexChar, dictionary.not_special_char_number)
      .required(dictionary.required),
    state: Yup.string()
      .min(2, dictionary.too_short)
      .max(40, dictionary.too_long)
      .required(dictionary.required),
    postcode: Yup.number()
      .integer(dictionary.not_valid)
      .positive(dictionary.not_valid)
      .min(1, dictionary.too_short)
      .max(1000000, dictionary.too_long)
      .required(dictionary.required),
    phone: Yup.string()
      .matches(phoneRegExp, dictionary.not_valid)
      .required(dictionary.required),
  });

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        address: titleCase(address),
        city: titleCase(city),
        state: titleCase(state),
        postcode: postcode,
        phone: phone,
      },
      validationSchema,
      onSubmit(values) {
        if (!deliveryOption) {
          fetchUserDetails()
            .then((response) => {
              updateUserInfo(
                values,
                response[0].user_details_id,
                selectedOption.value
              );
              return;
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          hasAddDetail
            ? addUserInfo(values, selectedOption.value)
            : updateUserInfo(values, deliveryOption, selectedOption.value);
        }
      },
    });

  function checkUserDetail() {
    if (
      address === null ||
      city === null ||
      country === null ||
      phone === null ||
      state === null ||
      postcode === null
    ) {
      return false;
    }
    return true;
  }

  function chooseDelivery(event) {
    setDeliveryOption(parseInt(event.target.value));
    const selectedUserDetail = userDetails.filter(
      (userDetail) =>
        userDetail.user_details_id === parseInt(event.target.value)
    );
    setAddress(selectedUserDetail[0].address);
    setCity(selectedUserDetail[0].city);
    setState(selectedUserDetail[0].state);
    setPostcode(selectedUserDetail[0].postcode);
    setCountry(selectedUserDetail[0].country);
    setPhone(selectedUserDetail[0].phone);
  }

  function titleCase(str) {
    str = str.toLowerCase().split(" ");
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(" ");
  }

  if (hasUserDetail) {
    return (
      <>
        <Container fluid>
          <Row>
            <Col
              xs={{ span: 12, order: 2 }}
              lg={{ span: 8, order: 1 }}
              style={{ backgroundColor: "#f6f5f3" }}
            >
              <Container style={{ minHeight: "90vh" }}>
                <Row>
                  <Col md={12}>
                    <Row className="d-none d-lg-block header_cart ml-md-2">
                      <Col xs={12} sm={12} md={5} lg={4} xl={3}>
                        <Button
                          onClick={() => history.push("/admin/cart")}
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
                          {dictionary.my_cart}
                        </Button>
                      </Col>
                      <Col xs={12} sm={12} md={7} lg={8} xl={9}></Col>
                    </Row>
                    <Row>
                      <Col>
                        <p
                          className={
                            language === "zh-CN"
                              ? "modal_title_CN mt-3 mt-md-0 text-center text-lg-left "
                              : "modal_title mt-3 mt-md-0 text-center text-lg-left"
                          }
                          style={{ marginBottom: "0rem" }}
                        >
                          {dictionary.my_adresses.toUpperCase()}
                        </p>
                        <p
                          className={
                            language === "zh-CN"
                              ? "font_normal_size_CN text-center text-md-left"
                              : "font_normal_size text-center text-md-left"
                          }
                          style={{ marginBottom: "0rem" }}
                        >
                          {dictionary.adresses_section_description}
                        </p>
                      </Col>
                    </Row>

                    <Card
                      className="mx-auto mb-3 card_cart_product"
                      style={{
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                        borderRadius: ".3rem",
                      }}
                    >
                      <Form
                        role="form"
                        onSubmit={(event) =>
                          editUserDetail(event, deliveryOption)
                        }
                      >
                        <Row style={{ padding: "3rem 1rem", gap: "1rem" }}>
                          <Col xs={12} sm={12} md={9} lg={8} xl={8}>
                            <Form.Control
                              as="select"
                              className="custom_dropdown"
                              onChange={(event) => chooseDelivery(event)}
                            >
                              {userDetails.map((userDetail, count) => {
                                count += 1;
                                return (
                                  <option
                                    value={userDetail.user_details_id}
                                    key={count}
                                  >
                                    {`${count} - ${titleCase(
                                      userDetail.address
                                    )}, ${userDetail.postcode} ${titleCase(
                                      userDetail.city
                                    )}, ${titleCase(
                                      userDetail.state
                                    )}, ${titleCase(userDetail.country)}.`}
                                  </option>
                                );
                              })}
                            </Form.Control>
                          </Col>

                          <Button
                            size="sm"
                            variant="secondary"
                            style={{
                              height: "2.5rem",
                              borderRadius: ".3rem",
                              minWidth: "100px",
                            }}
                            className={
                              language === "zh-CN"
                                ? "mt-3 mt-md-0 button_address font_normal_size_CN"
                                : "mt-3 mt-md-0 button_address font_normal_size"
                            }
                            onClick={() => addUserDetail()}
                          >
                            {dictionary.add}
                          </Button>

                          <Button
                            size="sm"
                            variant="secondary"
                            style={{
                              height: "2.5rem",
                              borderRadius: ".3rem",
                              minWidth: "100px",
                            }}
                            type="submit"
                            className={
                              language === "zh-CN"
                                ? "mt-3 mt-md-0 button_address font_normal_size_CN"
                                : "mt-3 mt-md-0 button_address font_normal_size"
                            }
                          >
                            {dictionary.edit}
                          </Button>

                          {userDetails.length > 1 && (
                            <Button
                              size="sm"
                              variant="secondary"
                              style={{
                                height: "2.5rem",
                                borderRadius: ".3rem",
                                minWidth: "100px",
                              }}
                              className={
                                language === "zh-CN"
                                  ? "mt-3 mt-md-0 button_address font_normal_size_CN"
                                  : "mt-3 mt-md-0 button_address font_normal_size"
                              }
                              onClick={() => deleteUserDetail(deliveryOption)}
                            >
                              {dictionary.delete}
                            </Button>
                          )}
                        </Row>
                      </Form>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </Col>
            <Col xs={{ span: 12, order: 1 }} lg={{ span: 4, order: 2 }}>
              <Container>
                <Row>
                  <Col md={11} className="mb-4 mb-lg-3">
                    <Row className="header_cart_right justify-content-center">
                      <Col
                        md={8}
                        lg={12}
                        xl={6}
                        style={{ paddingTop: "2.4rem" }}
                      >
                        <Button
                          onClick={handleProceed}
                          className={
                            language === "zh-CN"
                              ? "button_cart font_normal_size_CN"
                              : "button_cart font_normal_size"
                          }
                          style={{ height: "3.4rem" }}
                        >
                          {dictionary.proceed}
                          {"  "}
                          <FontAwesomeIcon
                            className="mr-2"
                            size="1x"
                            icon={["fas", "chevron-right"]}
                            style={{ paddingLeft: ".5rem", width: "17px" }}
                          />
                        </Button>
                      </Col>
                    </Row>
                    <Col md={12} className="mx-auto">
                      <Row>
                        <Col md={12}>
                          <p
                            className={
                              language === "zh-CN"
                                ? "font_normal_size_plus_CN text-center text-md-center"
                                : "font_normal_size_plus text-center text-md-center"
                            }
                            style={{ marginBottom: "0rem", paddingTop: "1rem" }}
                          >
                            {dictionary.delivery}
                          </p>
                          <p
                            className={
                              language === "zh-CN"
                                ? "font_normal_size_CN text-center text-md-center"
                                : "font_normal_size text-center text-md-center"
                            }
                            style={{ marginBottom: "0.5rem" }}
                          >
                            {dictionary.selected_address}
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={12}>
                          <Card.Text
                            className={
                              language === "zh-CN"
                                ? "font_normal_size_CN text-center"
                                : "font_normal_size text-center"
                            }
                            style={{ marginBottom: "0rem", fontSize: "1.3rem" }}
                          >
                            {first_name && titleCase(first_name)}{" "}
                            {last_name && titleCase(last_name)}
                          </Card.Text>
                        </Col>
                        <Col xs={12}>
                          <Card.Text
                            className={
                              language === "zh-CN"
                                ? "font_normal_size_CN text-center"
                                : "font_normal_size text-center"
                            }
                            style={{ marginBottom: "0rem", fontSize: "1.3rem" }}
                          >
                            {phone}
                          </Card.Text>
                        </Col>
                        <Col xs={12}>
                          <Card.Text
                            className={
                              language === "zh-CN"
                                ? "font_normal_size_CN text-center"
                                : "font_normal_size text-center"
                            }
                            style={{ marginBottom: "0rem", fontSize: "1.3rem" }}
                          >
                            {email}
                          </Card.Text>
                        </Col>
                        <Col xs={12}>
                          <Card.Text
                            className={
                              language === "zh-CN"
                                ? "font_normal_size_CN text-center"
                                : "font_normal_size text-center"
                            }
                            style={{ marginBottom: "0rem", fontSize: "1.3rem" }}
                          >
                            {address && titleCase(address)}
                            {", "}
                            {city &&
                              postcode &&
                              postcode + " " + titleCase(city)}
                            {", "}
                            {state && titleCase(state)},{" "}
                            {country && titleCase(country)}.
                          </Card.Text>
                        </Col>
                      </Row>
                    </Col>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </>
    );
  } else {
    return (
      <>
        <Container
          fluid
          style={{ minHeight: "90vh", backgroundColor: "#f6f5f3" }}
        >
          <Container>
            <Row>
              <Col md={12}>
                <Row className="header_cart ml-md-2">
                  <Col xs={12} sm={5} md={5} lg={4} xl={3}>
                    {checkUserDetail() ? (
                      <Button
                        onClick={() => props.setHasUserDetail(true)}
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
                        {dictionary.back_to_my_addresses}
                      </Button>
                    ) : (
                      <Button
                        onClick={() => history.push("/admin/cart")}
                        className={
                          language === "zh-CN"
                            ? "button_cancel_cart_CN"
                            : "button_cancel_cart"
                        }
                        style={{ background: "white", borderRadius: ".3rem" }}
                      >
                        <FontAwesomeIcon
                          size="1x"
                          icon={["fas", "chevron-left"]}
                          style={{ paddingLeft: "0.5rem" }}
                        />
                        {dictionary.back_to_my_cart}
                      </Button>
                    )}
                  </Col>
                  <Col xs={2} sm={2} md={2} lg={4} xl={6}></Col>
                  <Col
                    className="mt-2 mt-sm-0"
                    xs={12}
                    sm={5}
                    md={5}
                    lg={4}
                    xl={3}
                  >
                    <Button
                      className="button_cart"
                      style={{ height: "3.3rem" }}
                      onClick={handleSubmit}
                      size="sm"
                      disabled={isDisabled}
                    >
                      {isDisabled && (
                        <ClipLoader
                          css="margin-bottom: -1.5%; margin-right: 5%"
                          color={"white"}
                          size={15}
                        />
                      )}
                      {hasAddDetail
                        ? dictionary.add_address
                        : dictionary.update_address}
                      {"  "}
                      <FontAwesomeIcon
                        size="1x"
                        icon={["fas", "chevron-right"]}
                        style={{ paddingLeft: ".5rem", width: "17px" }}
                      />
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p
                      className={
                        language === "zh-CN" ? "modal_title_CN" : "modal_title"
                      }
                      style={{ marginBottom: "0rem" }}
                    >
                      {dictionary.my_adress.toUpperCase()}{" "}
                      <span className="product_details_count"></span>
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col style={{ paddingBottom: "1rem" }}>
                    <Card className="mx-auto mb-3 card_cart_product">
                      <Form
                        role="form"
                        onSubmit={handleSubmit}
                        style={{ padding: "1rem" }}
                      >
                        <Row>
                          <Col md={6}>
                            <Row>
                              <p
                                className={
                                  language === "zh-CN"
                                    ? "label_form_CN ml-3"
                                    : "label_form ml-3"
                                }
                                htmlFor="input-birthday"
                              >
                                {dictionary.address}
                              </p>
                            </Row>
                            <FormGroup className="mb-3">
                              <InputGroup className="input-group-alternative">
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
                          <Col md={6}>
                            <Row>
                              <p
                                className={
                                  language === "zh-CN"
                                    ? "label_form_CN ml-3"
                                    : "label_form ml-3"
                                }
                                htmlFor="input-birthday"
                              >
                                {dictionary.city}
                              </p>
                            </Row>
                            <FormGroup className="mb-3">
                              <InputGroup className="input-group-alternative">
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
                                <div className="error_field">{errors.city}</div>
                              )}
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={6}>
                            <Row>
                              <p
                                className={
                                  language === "zh-CN"
                                    ? "label_form_CN ml-3"
                                    : "label_form ml-3"
                                }
                                htmlFor="input-birthday"
                              >
                                {dictionary.state}
                              </p>
                            </Row>
                            <FormGroup className="mb-3">
                              <InputGroup className="input-group-alternative">
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
                          <Col md={6}>
                            <Row>
                              <p
                                className={
                                  language === "zh-CN"
                                    ? "label_form_CN ml-3"
                                    : "label_form ml-3"
                                }
                                htmlFor="input-birthday"
                              >
                                {dictionary.postcode}
                              </p>
                            </Row>
                            <FormGroup className="mb-3">
                              <InputGroup className="input-group-alternative">
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
                        </Row>
                        <Row>
                          <Col md={6}>
                            <Row>
                              <p
                                className={
                                  language === "zh-CN"
                                    ? "label_form_CN ml-3"
                                    : "label_form ml-3"
                                }
                                htmlFor="input-birthday"
                              >
                                {dictionary.country}
                              </p>
                            </Row>
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
                          <Col md={6}>
                            <Row>
                              <p
                                className={
                                  language === "zh-CN"
                                    ? "label_form_CN ml-3"
                                    : "label_form ml-3"
                                }
                                htmlFor="input-birthday"
                              >
                                {dictionary.phone}
                              </p>
                            </Row>
                            <FormGroup className="mb-3">
                              <InputGroup className="input-group-alternative">
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
                      </Form>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Container>
      </>
    );
  }
}
