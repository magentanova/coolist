let Router = require('express').Router;
const groupRouter = Router()

let Group = require('../../db/schemas/groupSchema.js').Group

groupRouter
	.get(`/group`, function(req, res){
		Group.find(req.query , "-password", function(err, results){
			if(err) return res.json(err) 
		res.json(results)
		})
	})

	.get(`/group/:_id`, function(req, res){
		Group.findById(req.params._id, "-password", function(err, record){
			if(err || !record ) return res.json(err) 
			res.json(record)
		})
	})

	.post(`/group`, function(req,res) {
		let newRecord = new Group(req.body)
		newRecord.save(function(err) {
			if (err) {
				res.status(500).send(err)
			}
			else {  
				res.json(newRecord)
			}
		})
	})

	.put(`/group/:_id`, function(req, res){
		Group.findByIdAndUpdate(req.params._id, req.body, {new: true}, function(err, record){
			if (err) {
				res.status(500).send(err)
			}
			else if (!record) {
				res.status(400).send(`no record found with that id`)
			}
			else {
				res.json(record)
			}
		})
	})

	.delete(`/group/:_id`, function(req, res){
		Group.remove({ _id: req.params._id}, (err) => {
			if(err) return res.json(err)
			res.json({
				msg: `record ${req.params._id} successfully deleted`,
				_id: req.params._id
			})
		})
	})

module.exports = groupRouter
