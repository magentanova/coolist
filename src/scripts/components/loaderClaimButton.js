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

export default LoaderClaimButton