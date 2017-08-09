import React from 'react'
import request from 'superagent'

import List from './list.js'
import * as utils from '../utils.js'

class HomePage extends React.Component {
	constructor(props) {
		super(props)
		this.handleListCreate = this.handleListCreate.bind(this)
		this.loadLists = this.loadLists.bind(this)
	}

	componentWillMount() {
		this.loadLists()
	}

	handleListCreate() {
		this.props.dispatch({
			type: "OPEN_MODAL",
			modalData: {
				name: "addList"
			}
		})
	}

	loadLists() {
		this.props.dispatch({
			type: 'START_LOADING'
		})
		request
			.get('/api/list')
			.query({
				groupId: utils.getCurrentUser().group_id
			})
			.end((err,res)=>{
				this.props.dispatch({
					type: 'END_LOADING'
				})
				res.body.forEach(list=>
					this.props.dispatch({
						type: "ADD_LIST",
						list: list
					})
				)
			})
	} 
	


	render() {
		console.log(this.props)
		return (
			<div className='home-page' >
				<header>
					{utils.getCurrentUser().name}'s coolist
					<button onClick={utils.logout}>logout</button>
				</header>
				<div className={`${this.props.listsLoaded ? '' : 'not-there'} lists-container`}>
					{utils.map(this.props.lists,
						list =>
							<List 
								key={list._id} 
								list={list} 
								addingItem={this.props.listBeingAddedTo === list._id}
								{...this.props} 
							/>
						)
					}
					<div className="add-button-container add-list-button-container">
						<button className="add-button add-list-button" onClick={this.handleListCreate}>+</button>
					</div>
				</div>
				<div className={`${this.props.listsLoaded ? 'not-there' : ''} loader`}>
					<p>getting some nice lists for you...</p>
				</div>
			</div>
			)
	}
}
	

export default HomePage
