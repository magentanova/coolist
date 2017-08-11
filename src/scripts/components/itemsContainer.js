import React from 'react'
import request from 'superagent'

import Item from './item.js'
import loader from './loader.js'
import * as utils from '../utils.js'


class ItemsContainer extends React.Component {
	handleOpenAdder = e => {
		this.props.dispatch({
			type: "SHOW_ADDER",
			listId: this.props.list._id
		})
	}

	render() {
		var styleObj = {
			"maxHeight": this.props.expandedList === this.props.list._id ? 60 * (this.props.items.length + 2) + 'px' : '0px',
			"borderTopWidth": this.props.expandedList === this.props.list._id ? '.5px' : '0px'
		}
		return (
			<div style={styleObj} className='list-items-container'>
				{utils.map(
					this.props.items, 
					item => 
						<Item 	
							{...this.props} 
							key={item._id} 
							item={item} 
						/>
					)}
				<ItemAdder 
					{...this.props} 
					addingItem={this.props.list._id === this.props.listBeingAddedTo}
					/>
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
				listName: this.props.list.name,
				name: e.target.itemName.value,
				groupId: utils.getCurrentUser().groupId
			})
			.end((err,resp) => {
				if (err) {
					alert('problem saving your item!')
					return console.log(err)
				}
				this.props.dispatch({
					type: "ADD_ITEM",
					item: resp.body
				})
			})
		this.props.dispatch({
			type: "STOP_ADDING"
		})
		e.target.itemName.value = ''
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

export default loader(ItemsContainer)