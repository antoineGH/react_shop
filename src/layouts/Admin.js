import React, { Component } from 'react'
import AdminNavbar from '../views/admin/AdminNavbar'
import Footer from '../views/components/Footer'
import { routes } from '../routes.js'
import getRoutes from '../utils/getRoutes'
import { Switch, Redirect, Route } from 'react-router-dom'
import LoadProfile from '../views/admin/LoadProfile'
import Product from '../views/components/Product'
import Products from '../views/components/Products'
import postCart from '../utils/postCart'
import LoadCheckout from '../views/admin/LoadCheckout'
import Cart from '../views/admin/Cart'
import Payment from '../views/admin/Payment'
import OrderSuccessful from '../views/admin/OrderSuccessful'
import fetchCart from '../utils/fetchCart'
import Women from '../views/components/Women'
import Men from '../views/components/Men'
import toast from '../utils/toast'
import { dictionaryList } from '../language/languages'

export default class Admin extends Component {
	constructor(props) {
		super(props)
		this.handleUpdateLanguage = this.props.handleUpdateLanguage.bind(this)
		this.addToCart = this.addToCart.bind(this)
		this.updateDelivery = this.updateDelivery.bind(this)
		this.updateCartTotal = this.updateCartTotal.bind(this)
		this.setCartItem = this.setCartItem.bind(this)
		this.state = {
			delivery: {},
			cart: [],
			total: '',
			totalItem: 0,
			isDisabled: false,
		}
	}

	updateDelivery(delivery) {
		this.setState({ delivery: {} })
		this.setState({ delivery: delivery })
	}

	updateCartTotal(cart, total) {
		this.setState({ cart: [] })
		this.setState({ total: '' })
		this.setState({ cart: cart })
		this.setState({ total: total })
	}

	addToCart(product_id, quantity, product) {
		this.setState({ isDisabled: true })

		fetchCart()
			.then((response) => {
				if (response.length >= 1) {
					response.pop()
					let totalQuantity = 0
					response.forEach((item) => {
						if (item.product_name === product.product_name) {
							totalQuantity += item.quantity
						}
					})
					let toAdd = 5 - totalQuantity
					if (toAdd <= 0) {
						toast(dictionaryList[this.props.language].maximum_reached)
						toAdd = 0
						this.setState({ isDisabled: false })
					} else if (totalQuantity + quantity <= 5) {
						toAdd = quantity
					}
					if (toAdd !== 0) {
						postCart(toAdd, product_id)
							.then(() => {
								toast(dictionaryList[this.props.language].product_added_cart)
								const totalItemCart = Number(this.state.totalItem) + Number(toAdd)
								this.setCartItem(String(totalItemCart))
								this.setState({ isDisabled: false })
							})
							.catch((error) => {
								toast(error)
								this.setState({ isDisabled: false })
							})
					}
				} else if (response.message === 'Cart is empty') {
					postCart(quantity, product_id)
						.then(() => {
							toast(dictionaryList[this.props.language].product_added_cart)
							this.setCartItem(quantity)
							this.setState({ isDisabled: false })
						})
						.catch((error) => {
							toast(error)
							this.setState({ isDisabled: false })
						})
				}
			})
			.catch((error) => {
				console.log(error)
				this.setState({ isDisabled: false })
			})
		this.setState({ isDisabled: false })
	}

	setCartItem(myTotalItem) {
		this.setState({ totalItem: myTotalItem })
	}

	render() {
		return (
			<div className='site_app'>
				<div className='site_body'>
					<AdminNavbar
						language={this.props.language}
						handleUpdateLanguage={this.props.handleUpdateLanguage}
						totalItem={this.state.totalItem}
						setCartItem={this.setCartItem}
					/>
					<Switch>
						{getRoutes(routes, '/admin')}
						<Route path='/admin/profile' render={(props) => <LoadProfile updateProfilePicture={this.updateProfilePicture} {...props} />} />
						<Route
							path='/admin/cart'
							render={(props) => (
								<Cart updateCartTotal={this.updateCartTotal} setCartItem={this.setCartItem} totalItem={this.state.totalItem} {...props} />
							)}
						/>
						<Route path='/products' render={(props) => <Products addToCart={this.addToCart} {...props} />} />
						<Route path='/women' render={(props) => <Women addToCart={this.addToCart} {...props} />} />
						<Route path='/men' render={(props) => <Men addToCart={this.addToCart} {...props} />} />
						<Route
							path='/product/:id'
							render={(props) => (
								<Product
									addToCart={this.addToCart}
									isDisabled={this.state.isDisabled}
									setCartItem={this.setCartItem}
									totalItem={this.state.totalItem}
									{...props}
								/>
							)}
						/>
						<Route
							path='/admin/checkout'
							render={(props) => <LoadCheckout updateDelivery={this.updateDelivery} cart={this.state.cart} total={this.state.total} {...props} />}
						/>
						<Route
							path='/admin/payment'
							render={(props) => <Payment delivery={this.state.delivery} cart={this.state.cart} total={this.state.total} {...props} />}
						/>
						<Route
							path='/admin/successful'
							render={(props) => <OrderSuccessful delivery={this.state.delivery} cart={this.state.cart} total={this.state.total} {...props} />}
						/>
						<Redirect from='*' to='/products' />
					</Switch>
				</div>
				<Footer language={this.props.language} />
			</div>
		)
	}
}
