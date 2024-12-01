const express = require("express");
const router = express.Router();
const authenticate = require("../../middelwares/auth");
const {
  add,
  index,
  view,
  deleteData,
  deleteMany,
} = require("../../controllers/meeting/meeting");

router.get("/view", authenticate, index);
router.post("/", authenticate, add);
router.get("/:id", authenticate, view);
router.delete("/:id", authenticate, deleteData);
router.delete("/", authenticate, deleteMany);

module.exports = router;
