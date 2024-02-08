import React, { useEffect, useState, useContext } from "react";
import { LanguageContext } from "../../language/LanguageContext";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Checkout from "./Checkout";
import fetchProfile from "../../utils/fetchProfile";
import fetchUserDetails from "../../utils/fetchUserDetails";
import updateUserDetail from "../../utils/updateUserDetail";
import createUserDetail from "../../utils/createUserDetail";
import deleteUserDetails from "../../utils/deleteUserDetails";
import BarLoader from "react-spinners/BarLoader";
import toast from "../../utils/toast";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

export default function LoadCheckout(props) {
  const { dictionary, language } = useContext(LanguageContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");

  const [userDetails, setUserDetails] = useState("");

  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [hasUserDetail, setHasUserDetail] = useState(false);
  const [hasAddDetail, setHasAddDetail] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState("");
  const history = useHistory();

  const { updateDelivery, cart, total } = props;

  useEffect(() => {
    let mounted = true;
    fetchProfile()
      .then((response) => {
        if (mounted) {
          setEmail(response.email);
          setFirstName(response.first_name);
          setLastName(response.last_name);
          fetchUserDetails()
            .then((response) => {
              if (checkUserDetail(response)) {
                if (mounted) {
                  setIsLoaded(true);
                  setHasUserDetail(false);
                }
              } else {
                if (mounted) {
                  setHasUserDetail(true);
                  setDeliveryOption(response[0].user_details_id);
                  setUserDetails(response);
                  setAddress(response[0].address);
                  setCity(response[0].city);
                  setState(response[0].state);
                  setPostcode(response[0].postcode);
                  setCountry(response[0].country);
                  setPhone(response[0].phone);
                  setTimeout(() => {
                    setIsLoaded(true);
                  }, 50);
                }
              }
            })
            .catch((error) => {
              console.log(error);
              if (mounted) {
                setHasError(true);
                toast(dictionary.error_impossible_fetch_profile_details);
              }
            });
        }
      })
      .catch((error) => {
        console.log(error);
        if (mounted) {
          setHasError(true);
          toast(dictionary.error_impossible_fetch_profile);
        }
      });
    return () => {
      mounted = false;
    };
  }, []); // eslint-disable-line

  function handleTryAgain() {
    setHasError(false);
    setIsLoaded(false);
    let mounted = true;
    fetchProfile()
      .then((response) => {
        if (mounted) {
          setEmail(response.email);
          setFirstName(response.first_name);
          setLastName(response.last_name);
          fetchUserDetails()
            .then((response) => {
              if (checkUserDetail) {
                if (mounted) {
                  setHasUserDetail(false);
                  setIsLoaded(true);
                }
              } else {
                if (mounted) {
                  setDeliveryOption(response[0].user_details_id);
                  setUserDetails(response);
                  setAddress(response[0].address);
                  setCity(response[0].city);
                  setState(response[0].state);
                  setPostcode(response[0].postcode);
                  setCountry(response[0].country);
                  setPhone(response[0].phone);
                  setTimeout(() => {
                    setIsLoaded(true);
                  }, 50);
                }
              }
            })
            .catch((error) => {
              console.log(error);
              if (mounted) {
                setHasError(true);
                toast(dictionary.error_impossible_fetch_profile_details);
              }
            });
        }
      })
      .catch((error) => {
        console.log(error);
        if (mounted) {
          setHasError(true);
          toast(dictionary.error_impossible_fetch_profile);
        }
      });
  }

  function updateUserInfo(values, user_details_id, country) {
    console.log("updateUserInfo");
    setIsDisabled(true);
    const address = values.address;
    const city = values.city;
    const state = values.state;
    const postcode = values.postcode;

    const phone = values.phone;

    updateUserDetail(
      user_details_id,
      address,
      city,
      state,
      postcode,
      country,
      phone
    )
      .then((response) => {
        setIsLoaded(false);
        setAddress(address);
        setCity(city);
        setState(state);
        setPostcode(postcode);
        setCountry(country);
        setPhone(phone);
        toast(dictionary.address_updated);

        let userDetailsCopy = JSON.parse(JSON.stringify(userDetails));
        if (userDetailsCopy.length >= 1) {
          userDetailsCopy.forEach((userDetailCopy) => {
            if (userDetailCopy.user_details_id === user_details_id) {
              userDetailCopy.address = address;
              userDetailCopy.city = city;
              userDetailCopy.state = state;
              userDetailCopy.postcode = postcode;
              userDetailCopy.country = country;
              userDetailCopy.phone = phone;
            }
            setUserDetails(userDetailsCopy);
          });
        } else {
          setUserDetails([
            {
              address: address,
              city: city,
              state: state,
              postcode: postcode,
              country: country,
              phone: phone,
            },
          ]);
        }

        setTimeout(() => {
          setHasUserDetail(true);
          setIsLoaded(true);
          setIsDisabled(false);
        }, 500);
      })
      .catch((error) => {
        console.log(error);
        setIsDisabled(false);
      });
  }

  function addUserInfo(values, country) {
    console.log("addUserInfo");
    setIsDisabled(true);
    const address = values.address;
    const city = values.city;
    const state = values.state;
    const postcode = values.postcode;
    const phone = values.phone;

    createUserDetail(address, city, state, postcode, country, phone)
      .then((response) => {
        setIsLoaded(false);
        setAddress(address);
        setCity(city);
        setState(state);
        setPostcode(postcode);
        setCountry(country);
        setPhone(phone);

        let userDetailsCopy = JSON.parse(JSON.stringify(userDetails));
        userDetailsCopy.push({
          address: address,
          city: city,
          country: country,
          phone: phone,
          postcode: postcode,
          state: state,
          user_details_id: response.user_details_id,
          user_id: response.user_id,
        });
        setUserDetails(userDetailsCopy);
        setHasAddDetail(false);
        setTimeout(() => {
          setHasUserDetail(true);
          setIsLoaded(true);
          setIsDisabled(false);
        }, 300);
        toast(dictionary.address_added);
      })
      .catch((error) => {
        console.log(error);
        setIsDisabled(false);
        toast(dictionary.error_impossible_add_address);
      });
  }

  function deleteUserDetail(user_details_id) {
    setIsLoaded(false);
    setDeliveryOption(user_details_id);

    const userDetailsUpdated = userDetails.filter(
      (userDetail) => userDetail.user_details_id !== parseInt(user_details_id)
    );
    setUserDetails(userDetailsUpdated);
    deleteUserDetails(user_details_id)
      .then((response) => {
        setIsLoaded(true);
        toast(dictionary.address_deleted);
        setAddress(userDetailsUpdated[0].address);
        setCity(userDetailsUpdated[0].city);
        setState(userDetailsUpdated[0].state);
        setPostcode(userDetailsUpdated[0].postcode);
        setCountry(userDetailsUpdated[0].country);
        setPhone(userDetailsUpdated[0].phone);
      })
      .catch((error) => {
        setHasError(true);
        toast(dictionary.error_impossible_delete_address);
      });
  }

  function addUserDetail() {
    console.log("addUserDetail");
    setIsLoaded(false);
    setAddress("");
    setCity("");
    setState("");
    setPostcode("");
    setCountry("");
    setPhone("");
    setHasUserDetail(false);
    setHasAddDetail(true);
    setTimeout(() => {
      setIsLoaded(true);
    }, 50);
  }

  function checkUserDetail(response) {
    if (
      response[0].address === null ||
      response[0].city === null ||
      response[0].country === null ||
      response[0].phone === null ||
      response[0].state === null ||
      response[0].postcode === null
    ) {
      return true;
    }
    return false;
  }

  function editUserDetail(event, user_details_id) {
    console.log("editUserDetail");
    event.preventDefault();
    setIsLoaded(false);
    userDetails.forEach((userDetail) => {
      if (userDetail.user_details_id === parseInt(user_details_id)) {
        setAddress(userDetail.address);
        setCity(userDetail.city);
        setState(userDetail.state);
        setPostcode(userDetail.postcode);
        setCountry(userDetail.country);
        setPhone(userDetail.phone);
      }
    });
    setTimeout(() => {
      setIsLoaded(true);
      setHasUserDetail(false);
    }, 1500);
  }

  function handleProceed() {
    const delivery = {
      first_name: first_name,
      last_name: last_name,
      address: address,
      city: city,
      state: state,
      postcode: postcode,
      country: country,
      phone: phone,
    };
    updateDelivery(delivery);
    history.push("/admin/payment");
  }

  if (hasError) {
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
                          style={{ background: "white", borderRadius: ".3rem" }}
                        >
                          <FontAwesomeIcon
                            size="1x"
                            icon={["fas", "chevron-left"]}
                            style={{ paddingRight: ".5rem" }}
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
                              ? "modal_title_CN mt-3 mt-md-0 text-center "
                              : "modal_title mt-3 mt-md-0 text-center"
                          }
                          style={{ marginBottom: "0rem" }}
                        >
                          {dictionary.my_adresses.toUpperCase()}
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col style={{ marginTop: "0rem", marginBottom: "0rem" }}>
                        <p
                          className={
                            language
                              ? "font_normal_size_CN text-center"
                              : "font_normal_size text-center"
                          }
                        >
                          {dictionary.error_impossible_load_address}
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col
                        className="text-center"
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
                          disabled
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
                            style={{ paddingLeft: ".5rem" }}
                          />
                        </Button>
                      </Col>
                    </Row>
                    <Col md={8} lg={12} xl={6} className="mx-auto">
                      <Row>
                        <Col md={12}>
                          <p
                            className={
                              language
                                ? "font_normal_size_plus_CN text-center"
                                : "font_normal_size_plus text-center"
                            }
                            style={{ marginBottom: "0rem", paddingTop: "1rem" }}
                          >
                            {dictionary.delivery}
                          </p>
                          <p
                            className={
                              language
                                ? "font_normal_size_CN text-center"
                                : "font_normal_size text-center"
                            }
                            style={{ marginBottom: "0rem" }}
                          >
                            {dictionary.selected_address}
                          </p>
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
  }
  if (!isLoaded) {
    return (
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
                        style={{ background: "white", borderRadius: ".3rem" }}
                      >
                        <FontAwesomeIcon
                          size="1x"
                          icon={["fas", "chevron-left"]}
                          style={{ paddingRight: ".5rem" }}
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
          <Col xs={{ span: 12, order: 1 }} lg={{ span: 4, order: 2 }}>
            <Container>
              <Row>
                <Col md={11} className="mb-4 mb-lg-3">
                  <Row className="header_cart_right justify-content-center">
                    <Col md={8} lg={12} xl={6} style={{ paddingTop: "2.4rem" }}>
                      <Button
                        onClick={handleProceed}
                        disabled
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
                          style={{ paddingLeft: ".5rem" }}
                        />
                      </Button>
                    </Col>
                  </Row>
                  <Col md={8} lg={12} xl={6} className="mx-auto">
                    <Row>
                      <Col md={12}>
                        <p
                          className={
                            language
                              ? "font_normal_size_plus_CN text-center"
                              : "font_normal_size_plus text-center"
                          }
                          style={{ marginBottom: "0rem", paddingTop: "1rem" }}
                        >
                          {dictionary.delivery}
                        </p>
                        <p
                          className={
                            language
                              ? "font_normal_size_CN text-center"
                              : "font_normal_size text-center"
                          }
                          style={{ marginBottom: "0rem" }}
                        >
                          {dictionary.selected_address}
                        </p>
                      </Col>
                    </Row>
                  </Col>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    );
  }
  if (isLoaded && !hasError) {
    return (
      <Checkout
        cart={cart}
        total={total}
        email={email}
        first_name={first_name}
        last_name={last_name}
        address={address}
        setAddress={setAddress}
        city={city}
        setCity={setCity}
        state={state}
        setState={setState}
        postcode={postcode}
        setPostcode={setPostcode}
        country={country}
        setCountry={setCountry}
        phone={phone}
        setPhone={setPhone}
        userDetails={userDetails}
        hasUserDetail={hasUserDetail}
        setHasUserDetail={setHasUserDetail}
        addUserDetail={addUserDetail}
        updateUserInfo={updateUserInfo}
        addUserInfo={addUserInfo}
        editUserDetail={editUserDetail}
        deleteUserDetail={deleteUserDetail}
        isDisabled={isDisabled}
        deliveryOption={deliveryOption}
        setDeliveryOption={setDeliveryOption}
        hasAddDetail={hasAddDetail}
        handleProceed={handleProceed}
      />
    );
  }
}
