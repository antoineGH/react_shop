import { useContext } from 'react'
import { NavLink as NavLinkRRD, useHistory } from 'react-router-dom'
import { NavLink, NavItem } from 'react-bootstrap'
import { LanguageContext } from '../language/LanguageContext'

export default function GetLinks(routes, type) {
	const history = useHistory()
	const { dictionary } = useContext(LanguageContext)

	return routes.map((prop, key) => {
		if (prop.layout === type) {
			if (prop.name === 'checkout' || prop.name === 'forgot' || prop.name === 'register') {
				return null
			}
			return (
				<NavItem key={key}>
					<NavLink tag={NavLinkRRD} onClick={() => history.push(prop.layout + prop.path)} activeclassname='active'>
						{dictionary[prop.name]}
					</NavLink>
				</NavItem>
			)
		} else {
			return null
		}
	})
}
