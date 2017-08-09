import React from 'react'
import request from 'superagent'

import * as utils from '../utils.js'

class AddList extends React.Component {
	constructor(props) {
		super(props)
		this.handleClose = this.handleClose.bind(this)
		this.handleSubmitList = this.handleSubmitList.bind(this)
	}

	componentDidUpdate() {
		if (this.props.modal) this.inputEl.focus()
	}

	handleClose() {
		this.props.dispatch({
			type: "CLOSE_MODAL"
		})
	}

	handleSubmitList(e){
		e.preventDefault()
		request
			.post('/api/list')
			.send({
				title: e.target.listName.value,
				groupId: utils.getCurrentUser().group_id
			})
			.set('Accept','application/json')
			.end((err,res) => {
				if (err) {
					console.log(err)
					alert('error loggin in')
				}
				else {
					this.handleClose()
					this.props.dispatch({
						type: 'ADD_LIST',
						list: res.body
					})
				}
			})

	}

	render() {		
		return (
			<div className="modal">
				<button className="close-button" onClick={this.handleClose}>X</button>
				<h2>Name Your List</h2>
				<form onSubmit={this.handleSubmitList} className="add-list-form">
					<input ref={el=>this.inputEl = el} name="listName" placeholder="shitlist" />
					<button type="submit">Submit</button>
				</form>
			</div>
			)
	}
}

export {AddList}