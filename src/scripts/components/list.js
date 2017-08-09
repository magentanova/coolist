import React from 'react'
import request from 'superagent'

import Item from './item.js'
import * as utils from '../utils.js'

class List extends React.Component {
	handleDeleteList = e => {
		request
			.delete(`/api/list/${this.props.list._id}`)
			.end((err,res) => {
				this.props.dispatch({
					type: 'REMOVE_LIST',
					listId: res.body._id
				})
			})
	};

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
					<h2 onClick={this.handleExpandList} >{this.props.list.title}</h2>
					<button 
						className='delete-button' 
						onClick={this.handleDeleteList} >
						X
					</button>
				</div>
				<ListItems {...this.props} />
			</div>
			)
	}
}


class ListItems extends React.Component {
	handleOpenAdder = e => {
		this.props.dispatch({
			type: "SHOW_ADDER",
			listId: this.props.list._id
		})
	}

	render() {
		var styleObj = {
			"maxHeight": this.props.expandedList === this.props.list._id ? 60 * (this.props.list.items.length + 1) + 'px' : '0px',
			"borderTopWidth": this.props.expandedList === this.props.list._id ? '.5px' : '0px'
		}
		return (
			<div style={styleObj} className='list-items-container'>
				{utils.map(this.props.list.items, item => <Item item={item} />)}
				<ItemAdder {...this.props} />
				<div className='add-button-container add-item-button-container'>
					<button 
						onClick={this.handleOpenAdder} 
						className='add-button add-item-button'>
						+
					</button>
				</div>
			</div>
			)
	}
}


class ItemAdder extends React.Component {
	handleItemAdd = e => {
		e.preventDefault()
		request
			.post('/api/item')
			.send({
				listId: this.props.list._id,
				name: e.target.itemName.value,
				groupId: utils.getCurrentUser().group_id
			})
			.end((err,resp) => {
				if (err) {
					alert('problem saving your item!')
					return console.log(err)
				}
				this.props.dispatch({
					type: "ADD_ITEM",
					listId: this.props.list._id,
					item: resp.body.savedItem
				})
			})
	}

	componentDidUpdate() {
		if (this.props.addingItem) this.inputEl.focus()
	}

	render() {
		return (
			<form 
				className={`${this.props.addingItem ? '' : 'not-there'} list-item item-adder`}
				onSubmit={this.handleItemAdd} >
				<input 
					name="itemName"
					ref={input=>this.inputEl = input} 
					className="item-name" 
					placeholder="give your item a name" 
					/>
			</form>
		)
	}
}

export default List