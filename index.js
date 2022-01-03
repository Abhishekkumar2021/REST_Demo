const express = require("express");
const path = require("path");
const { v4: uuid } = require("uuid");
const methodOverride = require("method-override");
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "/public")));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(methodOverride("_method"));
app.listen(PORT, function () {
	console.log("Express server listening on port ", PORT);
});

// Our fake database:
let comments = [
	{
		id: uuid(),
		username: "Todd",
		comment: "lol that is so funny!",
	},
	{
		id: uuid(),
		username: "Skyler",
		comment: "I like to go birdwatching with my dog",
	},
	{
		id: uuid(),
		username: "Sk8erBoi",
		comment: "Plz delete your account, Todd",
	},
	{
		id: uuid(),
		username: "onlysayswoof",
		comment: "woof woof woof",
	},
];
//showing all existing comments
app.get("/comments", (req, res) => {
	res.render("comments/index", { comments });
});

//creating a new comment
app.get("/comments/new", (req, res) => {
	res.render("comments/new", {});
});

app.post("/comments", (req, res) => {
	console.log(req.body);
	const { username, comment } = req.body;
	comments.push({ username, comment });
	res.redirect("/comments");
});

//the show route
app.get("/comments/:id", (req, res) => {
	const { id } = req.params;
	const data = comments.find((comment) => comment.id == id);
	res.render("comments/show", { ...data });
});

//update a comment

app.get("/comments/:id/edit", (req, res) => {
	const { id } = req.params;
	const comment = comments.find((comment) => comment.id == id);
	res.render("comments/edit", { comment });
});

app.patch("/comments/:id", (req, res) => {
	const { id } = req.params;
	const text = req.body.comment;
	const found = comments.find((comment) => comment.id == id);
	found.comment = text;
	res.redirect("/comments");
});

//delete a comment
app.delete("/comments/:id", (req, res) => {
	const { id } = req.params;
	const filterArray = comments.filter((comment) => comment.id !== id);
	comments = filterArray;
	res.redirect("/comments");
});
