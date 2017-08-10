let Router = require('express').Router;
const listRouter = Router()

let	List = require('../../db/schemas/listSchema.js').List,
	Item = require('../../db/schemas/itemSchema.js').Item

listRouter
	.get(`/list`, function(req, res){
		List.find(req.query)
			.populate('items')
			.exec(
				function(err, lists){
					if(err) return res.status(400).json(err) 
					res.json(lists)
				})
	})

	.get(`/list/:_id`, function(req, res){
		List.findById(req.params._id, "-password", function(err, record){
			if(err || !record ) return res.json(err) 
			res.json(record)
		})
	})

	.post(`/list`, function(req,res) {
		let newRecord = new List(req.body)
		newRecord.save(function(err) {
			if (err) {
				res.status(500).send(err)
			}
			else {  
				res.json(newRecord)
			}
		})
	})

	.put(`/list/:_id`, function(req, res){
		List.findByIdAndUpdate(req.params._id, req.body, {new: true}, function(err, record){
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

	.delete(`/list/:_id`, function(req, res){
		// delete all items belonging to the list, then delete the list itself.
		Item.remove({listid: req.params._id}, (err) => {
			if (err) return res.json(err)
			List.remove({ _id: req.params._id}, (err) => {
				if(err) return res.json(err)
				res.json({
					msg: `record ${req.params._id} successfully deleted`,
					_id: req.params._id
				})
			})
		})
		
	})

module.exports = listRouter
