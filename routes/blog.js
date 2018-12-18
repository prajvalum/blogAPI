const express = require("express");
const blogController = require("./../controllers/blogController")
const appConfig = require('./../config/appConfig')
const auth = require('./../middlewares/auth')

let setRouter = (app) => {
	let baseUrl = appConfig.apiVersion + 'blogs';
	console.log(baseUrl+"/all");
	app.get(baseUrl + "/all", auth.isAuthenticated, blogController.getAllBlog);
	app.get(baseUrl + "/view/:blogId", auth.isAuthenticated, blogController.viewByBlogId);
	app.get(baseUrl + "/view/by/author/:author", auth.isAuthenticated, blogController.viewByAuthor);
	app.get(baseUrl + "/view/by/category/:category", auth.isAuthenticated, blogController.viewByCategory);
	app.post(baseUrl + "/:blogId/delete", auth.isAuthenticated, blogController.deleteBlog);
	app.put(baseUrl + "/:blogId/edit",auth.isAuthenticated, blogController.editBlog);
	app.post(baseUrl + "/create",auth.isAuthenticated, blogController.createBlog);
	app.get(baseUrl + "/:blogId/count/view",auth.isAuthenticated, blogController.increaseBlogView);
}

module.exports = {
	setRouter: setRouter
} 