import React from 'react'
import request from 'superagent'
import * as utils from '../utils.js'

class Item extends React.Component {
	constructor(props) {
		super(props)
	}

	handleClaim = e => {
		var buttonVal = e.target.value,
			actionType,
			claimingEntity,
			claimed
		if (buttonVal === 'unclaim') {
			claimingEntity = null
			actionType = 'UNCLAIM_ITEM'
			claimed = false
		}
		else {
			claimingEntity = utils.getCurrentUser()
			actionType = 'CLAIM_ITEM'
			claimed = true
		}

		request
			.put(`/api/item/${this.props.item._id}`)
			.send({
				claimedBy: claimingEntity,
				claimed: claimed
			})
			.end((err,resp) => {
				if (err) {
					alert('problem claiming item')
					console.log(err)
				}
				else {
					this.props.dispatch({
						type: actionType,
						itemId: this.props.item._id
					})
				}
			})
	}

	handleDelete = e => {
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
				<div className="flex-wrapper"><p>{this.props.item.name}</p></div>
				<div className="flex-wrapper-center">
					<button 
						onClick={this.handleClaim} 
						value={claimAction}
						className="claim-button">
						{claimAction}
					</button>
				</div>
				<div className="flex-wrapper"><button onClick={this.handleDelete} className="delete-button">X</button></div>
			</div>
		)
		
	}
}

export default Item