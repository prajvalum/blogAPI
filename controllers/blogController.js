
const mongoose = require('mongoose')
const BlogModel = mongoose.model('Blog')
const shortid = require('shortid')

let getAllBlog = (req, res) => {
	BlogModel.find().select('-__v -_id').lean().exec((err, result) => {
		if (err) {
			res.send(err);
		}
		else if (result == undefined || result == null || result == '') {
			res.send('No Blog Found');
		}
		else {
			res.send(result);
		}
	});
}

let viewByBlogId = (req, res) => {
	BlogModel.findOne({'blogId':req.params.blogId}).select('-__v -_id').lean().exec((err, result) => {
		if (err) {
			res.send(err);
		}
		else if (result == undefined || result == null || result == '') {
			res.send('No Blog Found');
		}
		else {
			res.send(result);
		}
	});

}
let viewByAuthor = (req, res) => {
	BlogModel.find({'author':req.params.authorId}).select('-__v -_id').lean().exec((err, result) => {
		if (err) {
			res.send(err);
		}
		else if (result == undefined || result == null || result == '') {
			res.send('No Blog Found');
		}
		else {
			res.send(result);
		}
	});

}
let viewByCategory = (req, res) => {
	BlogModel.find({'category':req.params.category}).select('-__v -_id').lean().exec((err, result) => {
		if (err) {
			res.send(err);
		}
		else if (result == undefined || result == null || result == '') {
			res.send('No Blog Found');
		}
		else {
			res.send(result);
		}
	});

}
let deleteBlog = (req, res) => {

}
let editBlog = (req, res) => {

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
			res.send(err);
		}
		else {
			res.send(result);
		}
	})
}	
let increaseBlogView = (req, res) => {
	
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