import React from 'react'
import LoginPage from './loginPage'
import HomePage from './homePage'
import store from '../state'

import Modals from './modals'


class AppView extends React.Component {
	constructor(props) {
		super(props)
		this.state = store.getState()
		this['login'] = LoginPage
		this['home'] = HomePage
		store.subscribe(() => {
			this.setState(store.getState())
		})
	}

	 render() {
	 	return (
	 		<div className='app-view' >
	 			<Modals {...this.state} dispatch={store.dispatch} />
	 			{React.createElement(this[location.hash.substr(1)], {...this.state, dispatch: store.dispatch})}
	 		</div>
	 	)
 	}
}

export default AppView