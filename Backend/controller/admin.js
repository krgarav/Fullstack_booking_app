const Users = require("../model/users")

exports.postAddUser = (req, res, next) => {
    const enteredUsername = req.body.name;
    const enteredMail = req.body.email;
    Users.create({ user: enteredUsername, email: enteredMail }).then(() => {
        res.json();
        console.log("USER CREATED")
    }).catch((err) => { console.log(err) })

};

exports.getData = (req, res, next) => {
    Users.findAll().then((users) => {
        res.json(users);
    }).catch((err) => {
        console.log(err)
    })
}
exports.deleteData = (req, res, next) => {
    const userId = req.params.userId;

    Users.findByPk(userId).then((product) => {
        product.destroy()
    }).then(() => { console.log("PRODUCT DELETED"); res.json() }).catch((err) => { console.log(err) })
}

exports.editData = (req, res, next) => {
    const userId = req.params.userId;
    const updatedName = req.body.user;
    const updatedEmail = req.body.email;
    Users.findByPk(userId).then((item) => {
        item.user = updatedName;
        item.email = updatedEmail;
        return item.save();
    }).then(() => {
        console.log("ITEM UPDATED");
        res.json();
    }).catch((err) => { console.log(err) })
}