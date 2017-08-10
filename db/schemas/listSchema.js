const mongoose = require('mongoose');
const createModel = mongoose.model.bind(mongoose);
const Schema = mongoose.Schema;

// ----------------------
// USERS
// ----------------------
const listSchema = new Schema({
	name: {type: String, required: true},
	groupId: {type: String, required: true}
})

module.exports = {
   List: createModel('List', listSchema),
}
