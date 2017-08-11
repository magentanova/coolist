import React from 'react'
import request from 'superagent'

import ItemsContainer from './itemsContainer.js'
import loader from './loader.js'
import * as utils from '../utils.js'

class List extends React.Component {

	handleDeletePrompt = e => {
		this.props.dispatch({
			type: "OPEN_MODAL",
			modalData: {
				list: this.props.list,
				name: 'deleteList'
			}
		})
	}

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
						className='delete-button delete-list-button' 
						onClick={this.handleDeletePrompt} >
						X
					</button>
				</div>
				<ItemsContainer {...this.props} loaded={this.props.itemsLoaded} />
			</div>
			)
	}
}

export default List