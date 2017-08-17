import React from 'react'
import request from 'superagent'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import ListsContainer from './listsContainer.js'
import loader from './loader.js'
import * as utils from '../utils.js'

class Page extends React.Component {
	constructor(props) {
		super(props)
		this.loadItems = this.loadItems.bind(this)
	}

	componentWillMount() {
		this.loadItems()
	}

	loadItems() {
		this.props.dispatch({
			type: 'START_ITEMS_LOADING'
		})
		this.props.dispatch({
			type: 'START_LISTS_LOADING'
		})
		request
			.get('/api/item')
			.query({groupId: utils.getCurrentUser().groupId})
			.end((err,res)=>{
				this.props.dispatch({
					type: 'END_ITEMS_LOADING'
				})
				this.props.dispatch({
					type: "SET_ALL_ITEMS",
					items: res.body
				})
			})


		request
			.get('/api/list')
			.query({groupId: utils.getCurrentUser().groupId})
			.end((err,res)=>{
				this.props.dispatch({
					type: 'END_LISTS_LOADING'
				})
				this.props.dispatch({
					type: "SET_ALL_LISTS",
					lists: res.body
				})
			})
	} 
	


	render() {
		return (
			<div className='home-page' >
				<header>
					{utils.getCurrentUser().name}'s coolist
					<button onClick={utils.logout}>logout</button>
				</header>
				<ListsContainer {...this.props} loaded={this.props.listsLoaded} />
			</div>
			)
	}
}
	
var HomePage = DragDropContext(HTML5Backend)(Page)

export default HomePage
