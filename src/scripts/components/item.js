import React from 'react'
import request from 'superagent'
import * as utils from '../utils.js'

import loader from './loader.js'


class ClaimButton extends React.Component {
	constructor(props) {
		super(props)
		this.handleClaim = this.handleClaim.bind(this)
	}

	handleClaim(e) {
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

			this.props.dispatch({
				type: "CLAIMING",
				itemId: this.props.item._id
			})

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
					this.props.dispatch({
						type: "CLAIMED"
					})
				})
		}

	render() {
		return (
			<button 
				onClick={this.handleClaim} 
				value={this.props.claimAction}
				className="claim-button">
				{this.props.claimAction}
			</button>
			)
	}
}

const LoaderClaimButton = loader(ClaimButton)

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
				<div className="flex-wrapper-item-name"><p>{this.props.item.name}</p></div>
				<div className="flex-wrapper-claim-button">
					{console.log(this.props.itemBeingClaimed)}
					<LoaderClaimButton {...this.props} claimAction={claimAction} loaded={this.props.itemBeingClaimed !== this.props.item._id} />
					}
				</div>
				<div className="flex-wrapper-delete-button"><button onClick={this.handleDelete} className="delete-button">X</button></div>
			</div>
		)
		
	}
}

export default Item