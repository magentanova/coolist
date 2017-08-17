import * as utils from '../utils.js'

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

export const itemBeingClaimed = (state = null, action) => {
	switch (action.type) {
		case 'CLAIMING': 
			return action.itemId 
		case 'CLAIMED':
			return null
		default: 
			return state
	}
}

export const itemBeingDeleted = (state = null, action) => {
	switch (action.type) {
		case 'DELETING_ITEM': 
			return action.itemId 
		case 'DELETED_ITEM':
			return null
		default: 
			return state
	}
}


export const items = (state={},action) => {
	switch (action.type) {
		case 'ADD_ITEM':
			var newState = {...state}
			newState[action.item._id] = action.item
			return newState
		case 'CHANGE_PARENT_LIST': 
			var newState = {...state}
			newState[action.itemId].listId = action.newListId
			return newState
		case 'CLAIM_ITEM':
			var newState = {...state},
				oldItem = state[action.itemId]
			newState[action.itemId] = {
				...oldItem,
				claimedBy: utils.getCurrentUser()
			}
			return newState
		case 'REMOVE_ITEM':
			var newState = {...state}
			delete newState[action.itemId]
			return newState
		case 'SET_ALL_ITEMS': 
			var state = {}
			action.items.forEach(item => {
				state[item._id] = item
			})
			return state
		case 'UNCLAIM_ITEM': 
			var newState = {...state},
				oldItem = state[action.itemId]
			newState[action.itemId] = {
				...oldItem,
				claimedBy: null
			}
			return newState
		default: 
			return state
	}
}

export const itemsLoaded = (state = false, action) => {
	switch (action.type) {
		case 'START_ITEMS_LOADING':
			return false
		case 'END_ITEMS_LOADING': 
			return true
		default: 
			return state
	}
}


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

export const listBeingDeleted = (state = null, action) => {
	switch (action.type) {
		case 'DELETING_LIST': 
			return action.listId 
		case 'DELETED_LIST':
			return null
		default: 
			return state
	}
}



export const listSavingNewItem = (state = null, action) => {
	switch (action.type) {
		case "ITEM_SAVING": 
			return action.listId
		case "ITEM_SAVED": 
		console.log('item saved action dispatched')
			return null
		default: 
			return state
	}
}

export const lists = (state={},action) => {
	switch (action.type) {
		case 'ADD_LIST':
			var newState = {...state}
			newState[action.list._id] = action.list
			return newState
		case 'REMOVE_LIST':
			var newState = {...state}
			delete newState[action.listId]
			return newState
		case 'SET_ALL_LISTS': 
			var state = {}
			action.lists.forEach(list => {
				state[list._id] = list
			})
			return state
		case 'SWAP_LISTS': 
			var newState = {...state}
			newState[action.id1] = {
				...state[action.id1],
				index: state[action.id2].index
			}
			newState[action.id2] = {
				...state[action.id2],
				index: state[action.id1].index
			}
			return newState
		default: 
			return state
	}
}

export const listsLoaded = (state = false, action) => {
	switch (action.type) {
		case 'START_LISTS_LOADING':
			return false
		case 'END_LISTS_LOADING': 
			return true
		default: 
			return state
	}
}


export const modal = (state= {name: null} ,action) => {
	switch (action.type) {
		case 'OPEN_MODAL': 
			return {...action.modalData}
		case 'CLOSE_MODAL': 
			return {
				name: null
			}
		default: 
			return state
	}
}

export const newListConfirmed = (state = true, action) => {
	switch (action.type) {
		case 'LIST_SAVING':
			return false
		case 'LIST_SAVED':
			return true
		default: 
			return state
	}
}