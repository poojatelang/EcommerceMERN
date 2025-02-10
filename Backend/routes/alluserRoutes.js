const express = require("express");
const {
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/allUserController");
const router = express.Router();

router.get("/", getUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
