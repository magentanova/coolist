const mongoose = require('mongoose');
const createModel = mongoose.model.bind(mongoose);
const Schema = mongoose.Schema;

// ----------------------
// USERS
// ----------------------
const listSchema = new Schema({
	title: {type: String, required: true},
	groupId: {type: String, required: true},
	items: [{type: Schema.ObjectId, ref: 'Item'}]
})

module.exports = {
   List: createModel('List', listSchema),
}
