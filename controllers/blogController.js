
const mongoose = require('mongoose')
const BlogModel = mongoose.model('Blog')
const shortid = require('shortid')
const response = require('./../libs/responseLib')
const check = require('./../libs/checkLib')
const logger = require('./../libs/loggerLib')


let getAllBlog = (req, res) => {
	BlogModel.find().select('-__v -_id').lean().exec((err, result) => {
		if (err) {
			logger.error(err.message, 'blcgController: getAllBlog', 10)
			let apiResponse = response.generate(true, "Failed To Find Blog Details", 500, null);
			console.log(apiResponse)
			res.send(apiResponse);
		}
		else if (check.isEmpty(result)) {
			let apiResponse = response.generate(true, "No Blog Found", 404, null);
			console.log(apiResponse)
			res.send(apiResponse);
		}
		else {
			logger.info('All Blog Details Found', 'blcgController: getAllBlog', 10)
			let apiResponse = response.generate(false, "All Blog Details Found", 200, result);
			console.log(apiResponse)
			res.send(apiResponse);
		}
	});
}

let viewByBlogId = (req, res) => {
	BlogModel.findOne({'blogId':req.params.blogId}).select('-__v -_id').lean().exec((err, result) => {
		if (err) {
			let apiResponse = response.generate(true, "Failed To Find Blog Details", 500, null);
			res.send(apiResponse);
		}
		else if (check.isEmpty(result)) {
			let apiResponse = response.generate(true, "No Blog Found", 404, null);
			res.send(apiResponse);
		}
		else {
			let apiResponse = response.generate(false, "Blog Details Found", 200, result);
			res.send(apiResponse);
		}
	});

}

let viewByAuthor = (req, res) => {
	BlogModel.find({'author':req.params.author}).select('-__v -_id').lean().exec((err, result) => {
		if (err) {
			let apiResponse = response.generate(true, "Failed To Find Blog Details", 500, null);
			res.send(apiResponse);
		}
		else if (check.isEmpty(result)) {
			let apiResponse = response.generate(true, "No Blog Found", 404, null);
			res.send(apiResponse);
		}
		else {
			let apiResponse = response.generate(false, "Blog Details Found", 200, result);
			res.send(apiResponse);
		}
	});
}

let viewByCategory = (req, res) => {
	BlogModel.find({'category':req.params.category}).select('-__v -_id').lean().exec((err, result) => {
		if (err) {
			let apiResponse = response.generate(true, "Failed To Find Blog Details", 500, null);
			res.send(apiResponse);
		}
		else if (check.isEmpty(result)) {
			let apiResponse = response.generate(true, "No Blog Found", 404, null);
			res.send(apiResponse);
		}
		else {
			let apiResponse = response.generate(false, "Blog Details Found", 200, result);
			res.send(apiResponse);
		}
	});

}

let deleteBlog = (req, res) => {
	BlogModel.remove({'blogId': req.params.blogId}).exec((err, result) => {
		if (err) {
			let apiResponse = response.generate(true, "Failed To Find Blog Details By Given BlogId", 500, null);
			res.send(apiResponse);
		}
		else if (check.isEmpty(result)) {
			let apiResponse = response.generate(true, "No Blog Found", 404, null);
			res.send(apiResponse);
		}
		else {
			let apiResponse = response.generate(false, "Blog Deleted succesfully", 200, result);
			res.send(apiResponse);
		}
	});
}

let editBlog = (req, res) => {
	let options = req.body;
	console.log(req.params.blogId);
	console.log(options);
	BlogModel.update({'blogId': req.params.blogId}, options, {multi: true}).exec((err, result) => {
		if (err) {
			let apiResponse = response.generate(true, "Failed To Edit Blog", 500, null);
			res.send(apiResponse);
		}
		else if (check.isEmpty(result)) {
			let apiResponse = response.generate(true, "No Blog Found", 404, null);
			res.send(apiResponse);
		}
		else {
			let apiResponse = response.generate(false, "Blog Edit Succesfully", 200, result);
			res.send(apiResponse);
		}
	});
}

let createBlog = (req, res) => {
	var today = new Date();
	let blogId = shortid.generate()
	let newBlog = new BlogModel({
		blogId: blogId,
		title: req.body.title,
		description: req.body.description,
		bodyHtml: req.body.bodyHtml,
		category: req.body.category,
		author: req.body.author
	})
	let tags = (req.body.tags != undefined && req.body.tags != null && req.body.tags != '') ? req.body.tags.split(',') : []
	newBlog.tags = tags
	newBlog.save((err, result) => {
		if(err) {
			let apiResponse = response.generate(true, "Failed To Create Blog", 500, null);
			res.send(apiResponse);
		}
		else {
			let apiResponse = response.generate(false, "Blog Created Succesfully", 200, result);
			res.send(apiResponse);
		}
	})
}	

let increaseBlogView = (req, res) => {
	BlogModel.findOne({'blogId': req.params.blogId}).exec((err, result) => {
		if (err) {
			res.send(err);
		}
		else if (check.isEmpty(result)) {
			let apiResponse = response.generate(true, "No Blog Found", 404, null);
			res.send(apiResponse);
		}
		else {
			result.views += 1;
			result.save((err, result) => {
				if(err) {
					let apiResponse = response.generate(true, "Failed To Incremented Blog views", 500, null);
					res.send(apiResponse);
				}
				else {
					let apiResponse = response.generate(false, "Blog Views Incremented Succesfully", 200, result);
					res.send(apiResponse);	
				}
			}) 
		}
	});
	
}

module.exports = {
	getAllBlog: getAllBlog,
	viewByBlogId: viewByBlogId,
	viewByAuthor: viewByAuthor,
	viewByCategory: viewByCategory,
	deleteBlog: deleteBlog,
	editBlog: editBlog,
	createBlog: createBlog,
	increaseBlogView: increaseBlogView
}