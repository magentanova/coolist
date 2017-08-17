import React from 'react'
import request from 'superagent'
import {DragSource} from 'react-dnd'

import {componentTypes} from '../constants.js'
import * as utils from '../utils.js'
import LoaderClaimButton from './loaderClaimButton.js'


const itemSource = {
	beginDrag(props) {
		return {
			itemId: props.item._id,
			origListId: props.item.listId
		}
	},

	endDrag(props) {
		return {
			itemId: props.item._id,
			origListId: props.item.listId
		}
	}
}

function sourceCollect(connect,monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}
}

class Item extends React.Component {
	constructor(props) {
		super(props)
	}

	handleDelete = e => {
		this.props.dispatch({
			type: "DELETING_ITEM",
			itemId: this.props.item._id
		})
		request
			.delete(`/api/item/${this.props.item._id}`)
			.end((err,resp) => {
				if (err) {
					alert('problem deleting item')
					console.log(err)
				}
				else {
					this.props.dispatch({
						type: 'REMOVE_ITEM',
						itemId: this.props.item._id
					})
					this.props.dispatch({
						type: 'DELETED_ITEM'
					})
				}
			})
	}

	render() {
		var claimClass = '',
			claimAction = 'claim'
		if (this.props.item.claimedBy) {
			// set class/color
			if (this.props.item.claimedBy.name === 'justin') claimClass = 'his'
			if (this.props.item.claimedBy.name === 'luba') claimClass = 'hers'

			// set claim function
			if (utils.getCurrentUser()._id === this.props.item.claimedBy._id) claimAction = 'unclaim'
			else claimAction = 'steal'
		}
		return (
			<div className={'list-item ' + claimClass} >
				{this.props.connectDragSource(
					<div className="flex-wrapper-item-name"><p>{this.props.item.name}</p></div>
					)}
				<div className="flex-wrapper-claim-button">
					<LoaderClaimButton {...this.props} claimAction={claimAction} loaded={this.props.itemBeingClaimed !== this.props.item._id} />
					}
				</div>
				<div className="flex-wrapper-delete-button"><button onClick={this.handleDelete} className="delete-button">X</button></div>
			</div>
		)
		
	}
}

export default DragSource(componentTypes.ITEM,itemSource,sourceCollect)(Item)