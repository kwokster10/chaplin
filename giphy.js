// input a given product or a brand and see some gifs from giphy.com that match my search term. 
// This way I can get a snapshot of how people are relating to my client's products.

var express = require("express");
var app = express();
var ejs = require("ejs");
app.set("view_engine", "ejs");
var request = require("request");
var api_key = "dc6zaTOxFJmzC";
var fs = require("fs");
var saved_collection = [];

app.get("/", function(req, resp){
	resp.render("index.ejs")
});

app.get("/search", function(req, resp){
	var keywords = req.query.search_words;
	var limit_amt = req.query.quantity;
	request("http://api.giphy.com/v1/gifs/search?q=" + keywords + "&limit="+limit_amt+"&api_key="+ api_key, function(err, response, body) {
		var jsonBody = JSON.parse(body).data;
		var gifs = []
		for (var i = 0; i < jsonBody.length; i++) {
			gifs.push(jsonBody[i].images.original.url)
		}
		resp.render("show.ejs", {words: keywords.toUpperCase(), gifs: gifs});
	});
});

app.get("/search/saved", function(req, resp) {
	if (req.query.save != undefined) {
		var save_gifs = req.query.save;
		if (typeof save_gifs != "string") {
			for (var i = 0; i < save_gifs.length; i++) {
				saved_collection.push(save_gifs[i]);
			}
		} else {
			saved_collection.push(save_gifs);
		}
		resp.render("save.ejs", {save_gifs : saved_collection});
	} else {
		resp.render("save.ejs", {save_gifs : saved_collection});
	} 
});


var server = app.listen(3000, function(){
	console.log("Listening on port 3000");
});


