const express = require("express");
const { FollowModel } = require("../Models");
const router = express.Router();

router.get("/", (req, res) => {
    FollowModel.find({}, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(results);
        }
    });
})

router.post("/regis", async (req, res) => {
    const { email, password, name, surname, age } = req.body;
    const candidate = await EmailModel.findOne({ email });
    if (candidate) {
        return res.status(500).json({ message: "Пользователь с таким именем уже существует" });
    }
    const newUser = new EmailModel({ email, password, name, surname, age });
    newUser.save((err) => {
        if (err) {
            res.status(500).send("Registration error");
        } else {
            res.status(201).send("Пользователь успешно зарегистрирован");
        }

    });
})

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    EmailModel.findByIdAndDelete(id, (err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send("deleted");
        }
    });
})

module.exports = router;