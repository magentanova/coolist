import React from 'react'
import request from 'superagent'

class Item extends React.Component {
	constructor(props) {
		super(props)
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
						item: this.props.item
					})
				}
			})
	}

	render() {
		return (
			<div className='list-item'>
				<h3>{this.props.item.name}</h3>
				<button onClick={this.handleDelete} className="delete-button">X</button>
			</div>
		)
		
	}
}

export default Item