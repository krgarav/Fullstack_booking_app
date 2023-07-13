const express = require("express");

const router = express.Router();

const adminController = require("../controller/admin")

router.post("/add-user", adminController.postAddUser);

router.get("/get-user", adminController.getData);

router.delete("/delete-user/:userId", adminController.deleteData);

router.put("/edit-user/:userId", adminController.editData)

module.exports = router