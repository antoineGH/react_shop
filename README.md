# React Shop

# Table of contents

1. [Project description](#description)
2. [References](#references)
3. [General Features](#features)
4. [Technical Implementation](#implementation)
5. [Technologies](#tech)
6. [System Features](#sys-features)
7. [Software Interfaces](#soft-interfaces)
8. [Installation instructions](#installation)
9. [Project structure](#structure)
10. [Screenshots](#screenshots)

## 1. Project description<a name="description"></a>

Shop is an eCommerce solution caters to the exchange of goods for electronic transaction of money. This solution would help prospects in purchasing the products that are displayed in the product lists. People can visit the website, choose the products they like, enter the required details, make a payment, and purchase goods in a short amount of time. An eCommerce website facilitates online transactions with the use of data and fund transfer.

Our solution is Business to Consumer (B2C) oriented, in our case goods and services are sold by one business to a consumer.

### [> View Technical Specifications Shop](https://templars.guru/app/github/react_shop/Specifications_Project_Shop.pdf)

### Project Scope

Shop is targeting small businesses that just start selling online.

We currently identified five essential features that this platform would need to have :

1. The main goal of the platform is to allow the customer to sell exactly what they want, where they want, and how they want. This means the platform should be able to deal with both digital and physical goods. Especially for small businesses with physical premises that plans to sell internationally. The application should be able to be accessible in multiple languages. And can in the near-future evolve with the following versions including ways to handle international sales taxes and currencies.

2. Another important point is the ability to build a good looking, modern store that works on any device. It would need to include customization options that allow the customer to fit their existing brand and design charters.

3. The platform has to be able to manage orders, ship goods, and track inventory. In simple words, handle the running back-end without the hassle of using other apps and spreadsheets.

4. The platform also has to offer ways to integrate with other services, marketplaces, and apps.

5. All these features have to be offered at a reasonable price in a fully customized, done-for-you solution.

## 2. References<a name="references"></a>

-   React - https://reactjs.org/
-   React Router - https://reactrouter.com/web/guides/quick-start
-   React Bootstrap - https://react-bootstrap.github.io/
-   React Spinners - http://www.davidhu.io/react-spinners/
-   React Toastify - https://www.npmjs.com/package/react-toastify/v/1.4.3
-   Country List JS - https://www.npmjs.com/package/country-list-js
-   Country Flag Icon - https://www.npmjs.com/package/country-flag-icons
-   Formik - https://www.npmjs.com/package/formik
-   Yup - https://www.npmjs.com/package/yup
-   React Token Auth - https://www.npmjs.com/package/react-token-auth
-   Flask - https://flask.palletsprojects.com/en/1.1.x/
-   Flask Mail - https://flask-mail.readthedocs.io/en/latest/
-   ItsDangerous - https://pypi.org/project/itsdangerous/
-   Flask SQLalchemy - https://flask-sqlalchemy.palletsprojects.com/en/2.x/
-   Flask JWT Extended - https://flask-jwt-extended.readthedocs.io/en/stable/
-   Flask Bcrypt - https://flask-bcrypt.readthedocs.io/en/latest/
-   Moment - https://www.npmjs.com/package/moment

## 3. General Features<a name="features"></a>

The Shop platform system provides a simple mechanism for users to acquire information.

The following are the main features that are included in the system:

### Products

-   Products Display
-   Filter Category
-   Price Ordering
-   Collection Products Page
-   Single Product Display
-   Stock Verification
-   Select Quantity Modal
-   Place in Cart
-   Constraint 5 Similar Products

### Cart

-   Add new Product to the Cart
-   Change Quantity for Product in the Cart
-   Delete Product from the Cart
-   Recalculate subtotal for each Product on change
-   Recalculate total Cart on change

### Delivery Management

-   Force Add address if no address
-   Add new address during Checkout
-   Edit existing address
-   Delete existing address
-   Select address from customer address list

### Payment

-   Summary with address, products list, total Order
-   Credit Card verification
-   Payment handle by Stripe API

### Performance

-   Async Data Loading
-   Each page as a loading state to handle API delay
-   Each page as an Error state if no data is returned from the API
-   Disable Buttons while loading
-   Async Image Loading for images components
-   IntersectionObserver to load images component within 200px of the current viewport

### Security

-   HTTPS use to transmit sensitive data (credit card numbers, login credentials)
-   JSON Web Token to Authenticate user and transmit information in payload
-   Use remote API with Cross-Origin Resource Sharing (CORS) to allow communication origin
-   Data validation in Front-end (Formik & Yup)
-   Data validation in Back-end
-   Verify user email to activate account

### User Management

-   Login, Register, Logout
-   Forgot Password Functionality
-   Set Password Page from Email verification Link
-   Profile Management
-   Customer Graphical Personal Card
-   Edit Information functionality
-   Update Password functionality
-   Delete Account functionality

### Language

-   Website is completely translatable into English or Mandarin Chinese
-   Use Context to handle Language Management
-   Store Language Preferences in User browser (localStorage)
-   Store Translation in JSON object

### Order Tracking

-   Order tracking functionality
-   Transporter information summary
-   Order Number for customer service

### Design Chart

-   Use strict graphic charter to create consistency and uniformity on the Website (colors, font, graphics)
-   Responsive - Website design will automatically adjust for different screen sizes and viewports.
-   Using CSS to hide, shrink or enlarge Website elements
-   Using Bootstrap for element positionning

## 4. Technical Implementation<a name="implementation"></a>

![Communication Screenshot](https://github.com/antoineratat/github_docs/blob/main/react_shop/1.png?raw=true)

Application Communication Schema

## 5. Technologies<a name="tech"></a>

This system is provisioned to be built in JavaScript using React library which is highly flexible.

The browser will be in charge of rendering this application in its final form, HTML. Some of the logic involved in creating the web page, especially the one in charge of dealing with presentation logic is handled on the client-side.

List of frontend dependencies and version used:

-   react-fontawesome: V0.1.11,
-   bootstrap: V4.5.3,
-   chart.js: V2.9.3,
-   formik: V2.2.5,
-   jwt-decode: V3.1.2,
-   react: 16.12.0,
-   react-bootstrap: V1.4.0,
-   react-chartjs-2: 2.9.0,
-   react-dark-mode-toggle: 0.0.10,
-   react-datetime: 2.16.3,
-   react-dom: 16.12.0,
-   react-dropdown-select: V4.6.0,
-   react-helmet: V6.1.0,
-   react-js-pagination: V3.0.3,
-   react-router-dom: 5.1.2,
-   react-scripts: V3.4.4,
-   react-spinners: V0.9.0,
-   react-toastify: V6.1.0,
-   react-token-auth: V1.1.7,
-   reactstrap: V8.4.1,
-   styled-components: V5.2.1,
-   yup: V0.29.3

## 6. System Features<a name="sys-features"></a>

### Not Authenticated Features

-   Create an account
-   Login
-   Forget Password
-   Reset Password
-   Browse Products
-   Use Filter on Products
-   Open single product for details
-   Change Language

### Authenticated Features

Navigation Experience

-   Browse Products
-   Apply Filter on Products
-   Open single product for details
-   Change Language

### User Information

-   Edit Profile Information
-   Update Password
-   Delete Account
-   Logout

### Cart

-   Add Products to Cart
-   Edit Products in Cart
-   Delete Products in Cart
-   Increase quantity Products in Cart
-   Decrease quantity Products in Cart
-   Preview Product in Cart

### Delivery Information

-   Consult existing address
-   Add new address
-   Edit existing address
-   Delete existing address
-   Select existing address from list

### Payment

-   Consult Order Delivery summary
-   Consult Order Product summary
-   Consult Order Product SubTotal
-   Consult Order Total
-   Pay

### Orders

-   Consult previous orders
-   Track order status
-   Consult order advanced details

## 7. Software Interfaces<a name="soft-interfaces"></a>

Software is designed in small fragmented atomic components. Each component has specific functionality and assembled together creates our application.

This is easier to maintain, replace, and re-use. 

Communication is assured to external interfaces. The system is connected to several APIs using REST (representational state transfer), The payload is defined in the request itself and is formatted in JSON. Most of the operations are directed to a custom-made API.

This API is a CRUD API created with Python and Flask technology in order to handle the Front-End requests and communicate safely with a PostgreSQL database.

## 8. Installation instructions<a name="installation"></a>

Versions:

-   Node: 14.15.1
-   Npm: 6.14.8
-   React: 17.0.1

Download code from Github:

```shell
git clone https://github.com/antoineratat/react_shop.git
```

Navigate to project directory.

```shell
cd react_shop
```

Install node modules.

```shell
npm install
```

Run the app in development mode. Open http://localhost:3000 to view it in the browser.

```shell
npm start
```

## 9. Project structure<a name="structure"></a>

![Components Screenshot](https://github.com/antoineratat/github_docs/blob/main/react_shop/2.png?raw=true)

## 10. Screenshots<a name="screenshots"></a>

Main Pages Full-Screen Desktop Mockup ![Components Screenshot](https://github.com/antoineratat/github_docs/blob/main/react_shop/3.png?raw=true)

Product Detail – Mobile Version English ![Components Screenshot](https://github.com/antoineratat/github_docs/blob/main/react_shop/4.png?raw=true)

Login Modal – Product Browsing – My Order – My Cart – My Delivery Information - Mobile ![Components Screenshot](https://github.com/antoineratat/github_docs/blob/main/react_shop/5.png?raw=true)
