import React from 'react'
import request from 'superagent'

import * as utils from '../utils.js'

class AddList extends React.Component {
	constructor(props) {
		super(props)
		this.handleClose = this.handleClose.bind(this)
		this.handleSubmitList = this.handleSubmitList.bind(this)
	}

	componentDidMount() {
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
				name: e.target.listName.value,
				groupId: utils.getCurrentUser().groupId
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

const handleDeleteList = props => 
		request
			.delete(`/api/list/${props.modal.list._id}`)
			.end((err,res) => {
				props.dispatch({
					type: 'REMOVE_LIST',
					listId: res.body._id
				})
				props.dispatch({
					type: "CLOSE_MODAL"
				})
			})



const DeleteList = props =>
	<div className="modal">
		<h2>sure you want to delete list {props.modal.list.name}?</h2>
		<button className="submit-button" onClick={()=>handleDeleteList(props)}>yes</button>
		<button className="cancel-button" onClick={()=>props.dispatch({type:'CLOSE_MODAL'})}>never mind</button>
	</div>

export {AddList, DeleteList}