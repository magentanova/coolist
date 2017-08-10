const mongoose = require('mongoose');
const createModel = mongoose.model.bind(mongoose);
const Schema = mongoose.Schema;

// ----------------------
// USERS
// ----------------------
const itemSchema = new Schema({
	name: {type: String, required: true},
	claimed: {type: Boolean, default: false},
	acquired: {type: Boolean, default: false},
	listId: {type: String, required: true},
	listName: {type: String, required: true},
	groupId: {type: String, required: true},
	claimedBy: {type: Schema.ObjectId, ref: 'User'}
})

module.exports = {
   Item: createModel('Item', itemSchema),
}
