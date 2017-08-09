import * as utils from '../utils.js'

export const listBeingAddedTo = (state = null, action) => {
	switch (action.type) {
		case "SHOW_ADDER":
			return action.listId
		case "STOP_ADDING":
			return null
		default: 
			return state
	}
}

export const expandedList = (state = null, action) => {
	switch (action.type) {
		case "EXPAND_LIST":
			return action.listId
		case "COLLAPSE_ALL":
			return null
		default: 
			return state
	}
}

export const lists = (state={},action) => {
	switch (action.type) {
		case 'ADD_ITEM': 
			

		case 'REMOVE_ITEM': 
			return utils.removeById()
		case 'ADD_LIST':
			action.list.itemsById = {}
			action.list.items.forEach(item => action.list.itemsById[item._id] = item)
			return utils.getUpdatedObj(state,action.list._id,action.list)
		case 'REMOVE_LIST':
			return utils.removeById(state,action.list._id)
		default: 
			return state
	}
}

export const listsLoaded = (state = false, action) => {
	switch (action.type) {
		case 'START_LOADING':
			return false
		case 'END_LOADING': 
			return true
		default: 
			return state
	}
}

export const modal = (state=null,action) => {
	switch (action.type) {
		case 'OPEN_MODAL': 
			return action.modalData
		case 'CLOSE_MODAL': 
			return null
		default: 
			return state
	}
}