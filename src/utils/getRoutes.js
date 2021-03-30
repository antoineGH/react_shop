import { Route } from 'react-router-dom'

export default function getRoute(routes, type) {
	return routes.map((prop, key) => {
		if (prop.layout === type) {
			return <Route path={prop.layout + prop.path} exact component={prop.component} key={key} />
		} else {
			return null
		}
	})
}
