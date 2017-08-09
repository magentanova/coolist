let Router = require('express').Router;
const itemRouter = Router()

let Item = require('../../db/schemas/itemSchema.js').Item,
	List = require('../../db/schemas/listSchema.js').List

itemRouter
	.get(`/item`, function(req, res){
		Item.find(req.query , "-password", function(err, results){
			if(err) return res.json(err) 
		res.json(results)
		})
	})

	.get(`/item/:_id`, function(req, res){
		Item.findById(req.params._id, "-password", function(err, record){
			if(err || !record ) return res.json(err) 
			res.json(record)
		})
	})

	.post(`/item`, function(req,res) {
		let itemRecord = new Item(req.body)
		itemRecord.save(function(err) {
			if (err) {
				res.status(400).send(err)
			}
			else { // save a new item and update the list it belonged to.
				List.findById(req.body.listId, function(err,listRecord){
					if(err || !listRecord ) return res.json(err)
					listRecord.items.push(itemRecord)
					listRecord.save(function(err){
						if (err) return res.json(err)
						res.json({
							updatedList: listRecord,
							savedItem: itemRecord
						})
					})
				})
			}
		})
	})

	.put(`/item/:_id`, function(req, res){
		Item.findByIdAndUpdate(req.params._id, req.body, {new: true}, function(err, record){
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

	.delete(`/item/:_id`, function(req, res){
		Item.remove({ _id: req.params._id}, (err) => {
			if(err) return res.json(err)
			res.json({
				msg: `record ${req.params._id} successfully deleted`,
				_id: req.params._id
			})
		})
	})

module.exports = itemRouter
