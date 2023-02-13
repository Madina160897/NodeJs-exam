const express = require("express");
const { EmailModel } = require("../Models");
const router = express.Router();

router.get("/", (req, res) => {
    EmailModel.find({}, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(results);
        }
    });
})

router.get("/:id", (req, res) => {
    const id = req.params.id;
    EmailModel.findById(id, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    })
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

// router.post("/login", async (req, res) => {
//     const { email, password } = req.body;
//     const user = await EmailModel.findOne({ email });
//     if (!user) {
//         return res.status(400).send(`Пользователь ${email} не найден`);
//     }
//     const passUser = await EmailModel.findOne({ password });
//     if (!passUser) {
//         return res.status(400).send('Введен неверный пароль');
//     };
// })

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

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const { name, surname, age } = req.body;
    EmailModel.findByIdAndUpdate(id, { name, surname, age }, (err) =>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send("ok")

        }
    });
})

router.post("/follow", async (req, res) => {
    const { userId, followedUserId } = req.body;
    const user = await EmailModel.findById(userId);

    user.follows.push(followedUserId)
    user.save((err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send("User followed");
        }
    });
});


router.post("/unfollow", async (req, res) => {
    const { userId, followedUserId } = req.body;
    const user = await EmailModel.findById(userId);

    await EmailModel.findByIdAndUpdate(userId,{follows: user.follows.filter((user) => user != followedUserId)})
    res.status(201).send("User unfollowed");

});

module.exports = router;