const router = require("express").Router();
const ChecklistController = require("../controllers/ChecklistController");

// Define routes and link them to the controller methods
router.post("/addchecklist", ChecklistController.addChecklist);
router.get("/getchecklist/:id", ChecklistController.getChecklists);
router.delete("/deletechecklist/:id", ChecklistController.deleteChecklist);
router.patch("/updatechecklist/:id", ChecklistController.updateChecklist);
router.get("/getsinglechecklist/:id", ChecklistController.getSingleChecklist);

// Export the router
module.exports = router;
