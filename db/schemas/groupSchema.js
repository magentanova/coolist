const mongoose = require('mongoose');
const createModel = mongoose.model.bind(mongoose);
const Schema = mongoose.Schema;

// ----------------------
// USERS
// ----------------------
const groupSchema = new Schema({
	name: {type: String, required: true}
})

module.exports = {
   Group: createModel(' Group', groupSchema),
}
