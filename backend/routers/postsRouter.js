const express = require("express");
const { NewPostModel } = require("../Models");
const router = express.Router();

router.get("/", (req, res) => {
    NewPostModel.find({}, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    });
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    NewPostModel.find(id, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    });
});


router.post("/", (req, res) => {
    const { name, surname, title, post } = req.body;
    const newPost = new NewPostModel({ name, surname, title, post, like: 0 });
    newPost.save((err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send("Added new post");
        }
    });
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const { title, post } = req.body;
    await NewPostModel.findByIdAndUpdate(id, { title, post }
    );
    res.send("ok")
})

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    NewPostModel.findByIdAndDelete(id, (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send("deleted");
        }
    });
});
module.exports = router