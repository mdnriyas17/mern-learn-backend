const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users");

const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb+srv://mdnriyas:mdnriyas@website.jda6y4x.mongodb.net/newone"
);
app.get(
    "/getUsers", (async (req, res) => {
        const user = await UserModel.find({});

        if (user) {
            res.status(200);
            res.json(user);
        } else {
            res.status(500);
            throw new Error("There are no users");
        }
    })
);
app.post("/createUser", async (req, res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();

    res.json(user);
});

app.listen(3001, () => {
    console.log("SERVER RUNS PERFECTLY!");
});