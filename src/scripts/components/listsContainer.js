import React from 'react'
import List from './list.js'
import loader from './loader.js'
import * as utils from '../utils.js'


const LoaderList = loader(List)

const handleListCreate = dispatch =>
		dispatch({
			type: "OPEN_MODAL",
			modalData: {
				name: "addList"
			}
		})

const AddListButton = props =>
		<div className="add-button-container add-list-button-container">
			<button className="add-button add-list-button" onClick={()=>handleListCreate(props.dispatch)}>+</button>
		</div>

const LoaderAddListButton = loader(AddListButton)

const ListsContainer = props => {
	// iterate once for the number of items, organizing them by list
	const itemsByList = {}
	Object.values(props.items).forEach(item => {
		if (itemsByList[item.listId]) itemsByList[item.listId].push(item)
		else itemsByList[item.listId] = [item]
	})

	return (
		<div className='lists-container'>
			{utils.sortBy(Object.values(props.lists),'index').map(list =>
				<LoaderList 
					{...props}
					loaded={props.listBeingDeleted !== list._id}
					key={list._id}
					list={list}
					items={itemsByList[list._id] || []}
				/>
			)}
			<LoaderAddListButton dispatch={props.dispatch} loaded={props.newListConfirmed} />
		</div>
		)
}
	

export default loader(ListsContainer)