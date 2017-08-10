import React from 'react'
import List from './list.js'
import loader from './loader.js'
import * as utils from '../utils.js'

const handleListCreate = dispatch =>
		dispatch({
			type: "OPEN_MODAL",
			modalData: {
				name: "addList"
			}
		})

const ListsContainer = props => {
	// iterate once for the number of items, organizing them by list
	const itemsByList = {}
	Object.values(props.items).forEach(item => {
		if (itemsByList[item.listId]) itemsByList[item.listId].push(item)
		else itemsByList[item.listId] = [item]
	})

	return (
		<div className='lists-container'>
			{utils.map(props.lists, list =>
				<List
					{...props}
					key={list._id}
					list={list}
					items={itemsByList[list._id] || []}
				/>
			)}
			<div className="add-button-container add-list-button-container">
				<button className="add-button add-list-button" onClick={()=>handleListCreate(props.dispatch)}>+</button>
			</div>
		</div>
		)
}
	

export default loader(ListsContainer)