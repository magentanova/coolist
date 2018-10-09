const initialState = {
	autoscrollDirection: null,
	currentUser: null,
	dragSourceList: null,
	dropZoneList: null,
	items: {},
	itemDrop: {},
	itemsLoading: false,
	listWithItemSaving: null, // has form {listId: boolean}
	lists: {},
	listsLoading: false,
	listRegions: {},
	listSaving: false,
	listViewScrollable: true
}

const loadingReducer = function(attrName, asyncAction="Load") {
	var titleCase = function(str) {
		var words = str.split(/\s/g),
			newWords = words.map( word => word[0].toUpperCase() + word.slice(1))
		return newWords.join(' ')
	}

	var camelCaseName = attrName[0] + titleCase(attrName).slice(1).replace(/\s/g,''),
		snakeCaseName = attrName.replace(/\s/g,'_')
	return (state = initialState[`${camelCaseName}${asyncAction}ing`], action) => {
		switch(action.type) {
			case (`${snakeCaseName}_${asyncAction.toUpperCase()}ING`).toUpperCase():
				return true
			case (`${snakeCaseName}_${asyncAction.toUpperCase()}ED`).toUpperCase():
				return false
			default: 
				return state
		}
	}
}

export const autoscrollDirection = (state = initialState.currentUser, action) => {
	switch (action.type) {
		case 'START_AUTOSCROLL':
			return action.payload
		case 'STOP_AUTOSCROLL':
			return null 
		default: 
			return state
	}
}

export const currentUser = (state = initialState.currentUser, action) => {
	switch (action.type) {
		case 'SET_USER': 
			return action.payload 
		default: 
			return state
	}
}

export const dragSourceList = (state = initialState.dragSourceList, action) => {
	switch (action.type) {
		case "BEGIN_ITEM_DRAG":
			return action.payload 
		case "DROP_ITEM_TO_LIST":
			return null 
		default: 
			return state
	}
}

export const dropZoneList = (state = initialState.dropZoneList, action) => {
	switch (action.type) {
		case "ASSIGN_DROP_ZONE":
			return action.payload 
		case "DROP_ITEM_TO_LIST":
			return null 
		default: 
			return state
	}
}

export const itemDrop = (state = initialState.itemDrop, action) => {
	switch (action.type) {
		case 'DROP_ITEM_TO_LIST':
			return action.payload 
		default: 
			return state
	}
}

export const items = (state=initialState.items, action) => {
	switch (action.type) {
		case 'ITEMS_LOADED':
			return action.payload
		case 'ITEM_SAVED': 
			const newitems = {
				...action.payload.item,
				...state
			}
			return newitems
		default: 
			return state
	}
}

export const lists = (state=initialState.lists, action) => {
	switch (action.type) {
		case 'LISTS_LOADED':
			return action.payload
		case 'LIST_SAVED': 
			const newLists = {
				...action.payload,
				...state
			}
			return newLists
		default: 
			return state
	}
}

export const listWithItemSaving = (state = initialState.listWithItemSaving, action) => {
	switch (action.type) {
		case 'ITEM_SAVING':
			return action.payload
		case 'ITEM_SAVED': 
			return null
		default: 
			return state
	}
}

export const listRegions = (state = initialState.listRegions, action) => {
	switch (action.type) {
		case "LIST_LAYOUT":
			const newState = {...state}
			newState[action.payload.listId] = action.payload.layout
			return newState
		default:
			return state
	}
}

export const listViewScrollable = (state = initialState.listViewScrollable, action) => {
	switch (action.type) {
		case "ENABLE_SCROLL":
			return true
		case "DISABLE_SCROLL":
			return false
		default: 
			return state
	}
}

export const itemsLoading = loadingReducer('items');
export const listsLoading = loadingReducer('lists');
export const listSaving = loadingReducer('list', actionType="Sav");