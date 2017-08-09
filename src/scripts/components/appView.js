import React from 'react'
import LoginPage from './loginPage'
import HomePage from './homePage'
import store from '../state'

import {AddList} from './modals'


class AppView extends React.Component {
	constructor(props) {
		super(props)
		this.state = store.getState()
		this['login'] = LoginPage
		this['home'] = HomePage
		this.modals = {
			addList: AddList
		}
		store.subscribe(() => {
			this.setState(store.getState())
		})
	}

	 render() {
	 	const modal = this.state.modal ? React.createElement(this.modals[this.state.modal.name], {...this.state, dispatch: store.dispatch}) 
	 		: null
	 	return (
	 		<div className='app-view' >
	 			<div className={`modal-container ${this.state.modal ? '' : 'not-there'}`}>
	 				{modal}	 			
	 			</div>
	 			{React.createElement(this[location.hash.substr(1)], {...this.state, dispatch: store.dispatch})}
	 		</div>
	 	)
 	}
}

export default AppView