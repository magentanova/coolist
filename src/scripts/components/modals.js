import React from 'react'
import request from 'superagent'

import ZoomInput from './zoomInput.js'
import loader from './loader.js'
import * as utils from '../utils.js'

class Modals extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				<AddList {...this.props} active={this.props.modal.name === 'addList'}  />
				<DeleteList {...this.props} active={this.props.modal.name === 'deleteList'} />
				<EnterPin {...this.props} active={this.props.modal.name === 'enterPin'} />
			</div>
			)
	}
}

const AddButton = props =>
	<button type="submit">Submit</button>

const LoaderAddButton = loader(AddButton)

class AddList extends React.Component {
	constructor(props) {
		super(props)
		this.handleClose = this.handleClose.bind(this)
		this.handleSubmitList = this.handleSubmitList.bind(this)
	}

	componentDidMount() {
		if (this.props.modal) document.querySelector('.main-modal-input').focus()
	}

	handleClose() {
		this.props.dispatch({
			type: "CLOSE_MODAL"
		})
	}

	handleSubmitList(e){
		e.preventDefault()
		this.props.dispatch({
			type: "LIST_SAVING"
		})
		this.props.dispatch({
			type: "CLOSE_MODAL"
		})
		e.target.value = ''
		request
			.post('/api/list')
			.send({
				name: e.target.listName.value,
				groupId: utils.getCurrentUser().groupId,
				index: Object.values(this.props.lists).length
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
					this.props.dispatch({
						type: "LIST_SAVED"
					})
				}
			})

	}

	render() {		
		return (
			<div className={this.props.active ? 'modal-container' : 'modal-container not-there'}>
				<div className="modal">
					<button className="close-button" onClick={this.handleClose}>X</button>
					<h2>Name Your List</h2>
					<form onSubmit={this.handleSubmitList} className="add-list-form">
						<ZoomInput className='main-modal-input' name="listName" placeholder="shitlist" />
						<AddButton />
					</form>
				</div>
			</div>
			)
	}
}

const handleDeleteList = props => {
	props.dispatch({
		type: "DELETING_LIST",	
		listId: props.modal.list._id
	})
	props.dispatch({
		type: "CLOSE_MODAL"
	})
	request	
		.delete(`/api/list/${props.modal.list._id}`)
		.end((err,res) => {
			props.dispatch({
				type: 'REMOVE_LIST',
				listId: res.body._id
			})
			
			props.dispatch({
				type: "DELETED_LIST"
			})
		})
	}

const DeleteList = props =>
	<div className={props.active ? 'modal-container' : 'modal-container not-there'}>
		<div className="modal">
			<h2>sure you want to delete list {props.active ? props.modal.list.name : ''}?</h2>
			<button className="submit-button" onClick={()=>handleDeleteList(props)}>yes</button>
			<button className="cancel-button" onClick={()=>props.dispatch({type:'CLOSE_MODAL'})}>never mind</button>
		</div>
	</div>


var count = 0,
	pin = ''

class EnterPin extends React.Component {
	constructor(props) {
		super(props)
		this.receiveNum = this.receiveNum.bind(this)
		this.state = {
			pinballs: 0
		}
	}

	receiveNum(e) {
		pin += e.target.value
		count += 1
		if (count < 5) {
			this.setState({
				pinballs: this.state.pinballs + 1
			})
		}
		if (count === 4) {
			request
				.post('/auth/checkPin')
				.send({
					code: pin
				})
				.end((err,res) => {
					count = 0
					pin = ''
					this.setState({
						pinballs: count
					})
					if (err) {
						alert('bad pin! try again.')
					}
					else {
						utils.updateCurrentUser(this.props.modal.userData)
						this.props.dispatch({
							type: "CLOSE_MODAL"
						})
						location.hash = 'home'
					}
				})
		}
		if (count > 3) {
			e.preventDefault()
		}
	}
	
	render() {
		return (
			<div className={this.props.active ? 'modal-container' : 'modal-container not-there'}>
				<div className="modal pin">
					<h2>enter your pin code</h2>
					<h4>{Array(this.state.pinballs).fill(<div className="pinball"></div>)}</h4>
					<div className="pin-nums">
						{[1,2,3,4,5,6,7,8,9,0].map(num => 
							<button 
								onClick={this.receiveNum} 
								value={num}>
								{num}
							</button>)}
					</div>
				</div>
			</div>
		)
	}
} 

export default Modals