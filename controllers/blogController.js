
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
	BlogModel.find({'author':req.params.author}).select('-__v -_id').lean().exec((err, result) => {
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
	BlogModel.remove({'blogId': req.params.blogId}).exec((err, result) => {
		if (err) {
			req.send(err);
		}
		else if (result == undefined && result == null && result == '') {
			res.send('No Blog Found');
		}
		else {
			res.send(result);
		}
	});
}

let editBlog = (req, res) => {
	let options = req.body;
	console.log(req.params.blogId);
	console.log(options);
	BlogModel.update({'blogId': req.params.blogId}, options, {multi: true}).exec((err, result) => {
		if (err) {
			req.send(err);
		}
		else if (result == undefined && result == null && result == '') {
			res.send('No Blog Found');
		}
		else {
			res.send(result);
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
			res.send(err);
		}
		else {
			res.send(result);
		}
	})
}	

let increaseBlogView = (req, res) => {
	BlogModel.findOne({'blogId': req.params.blogId}).exec((err, result) => {
		if (err) {
			res.send(err);
		}
		else if (result == undefined && result == null && result == '') {
			res.send('No Blog Found');
		}
		else {
			result.views += 1;
			result.save((err, result) => {
				if(err) {
					res.send(err);
				}
				else {
					res.send(result)
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