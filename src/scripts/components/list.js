import React from 'react'
import request from 'superagent'

import ItemsContainer from './itemsContainer.js'
import loader from './loader.js'
import * as utils from '../utils.js'

class List extends React.Component {
	handleDeleteList = e => {
		request
			.delete(`/api/list/${this.props.list._id}`)
			.end((err,res) => {
				this.props.dispatch({
					type: 'REMOVE_LIST',
					listId: res.body._id
				})
			})
	};

	handleExpandList = e => {
		this.props.dispatch({
			type: this.props.expandedList === this.props.list._id ? 'COLLAPSE_ALL' : 'EXPAND_LIST',
			listId: this.props.list._id
		})
	};

	render() {
		return (
			<div className='list'>
				<div className='list-header'>
					<h2 onClick={this.handleExpandList} >{this.props.list.name}</h2>
					<button 
						className='delete-button' 
						onClick={this.handleDeleteList} >
						X
					</button>
				</div>
				<ItemsContainer {...this.props} loaded={this.props.itemsLoaded} />
			</div>
			)
	}
}

export default List