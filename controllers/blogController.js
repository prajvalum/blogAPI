
const mongoose = require('mongoose')
const BlogModel = mongoose.model('Blog')

let getAllBlog = (req, res) => {
	console.log("success")
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

}
let viewByAuthor = (req, res) => {

}
let viewByCategory = (req, res) => {

}
let deleteBlog = (req, res) => {

}
let editBlog = (req, res) => {

}
let createBlog = (req, res) => {
	res.send(req.body);
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