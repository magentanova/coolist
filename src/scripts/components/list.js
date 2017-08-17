import React from 'react'
import request from 'superagent'
import {DragSource, DropTarget} from 'react-dnd'

import ItemsContainer from './itemsContainer.js'
import loader from './loader.js'
import {componentTypes} from '../constants.js'
import {dispatch} from '../state/'
import * as utils from '../utils.js'

const listSource = {
	beginDrag(props) {
		return {
			listId: props.list._id
		}
	},

	endDrag(props) {
		return {
			listId: props.list._id
		}
	}
}

function sourceCollect(connect,monitor) {
	return {
		connectDragPreview: connect.dragPreview(),
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}
}


const listTarget = {
	canDrop(props,monitor) {
		return monitor.getItem().listId !== props.list._id
	},

	drop(props, monitor) {
		if (monitor.getItemType() === componentTypes.ITEM) {
			dispatch({
				type: "SAVING_ITEM"
			})
			var droppedItem = monitor.getItem()
			request
				.put(`/api/item/${droppedItem.itemId}`)
				.send({
					listId: droppedItem.newListId
				})
				.end(function() {
					dispatch({
						type: "CHANGE_PARENT_LIST",
						itemId: droppedItem.itemId,
						newListId: props.list._id
					})
					dispatch({
						type: "ITEM_SAVED"
					})
				})
		}
		if (monitor.getItemType() === componentTypes.LIST) {
			dispatch({
				type: "SWAP_LISTS",
				id1: monitor.getItem().listId,
				id2: props.list._id
			})
		}
	}
}

function targetCollect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop()
	}
}

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
		const classes = utils.getClassName('list',{
			dragging: this.props.isDragging,
			'drop-zone': this.props.canDrop && this.props.isOver
		})
		return this.props.connectDropTarget(
			<div className={classes}>
				<div className='list-header'>
					{this.props.connectDragSource(
						<h2 onClick={this.handleExpandList} >{this.props.list.name}</h2>
					)}
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

export default DropTarget(/*accepts multiple types -->*/[componentTypes.LIST, componentTypes.ITEM], listTarget, targetCollect)(
		DragSource(componentTypes.LIST,listSource,sourceCollect)(List))