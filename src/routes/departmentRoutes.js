const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/departmentController");
const { authenticate } = require("../middleware/auth");

router.post("/", authenticate, departmentController.createDepartment);
router.get("/", authenticate, departmentController.getAllDepartment);
router.get("/:id", authenticate, departmentController.getDepartmentById);
router.get(
  "/:id/events",
  authenticate,
  departmentController.getDepartmentWithEvents,
);
router.put("/:id", authenticate, departmentController.updateDepartment);
router.delete("/:id", authenticate, departmentController.deleteDepartment);

module.exports = router;
