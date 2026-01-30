const express = require("express");
const router = express.Router();
const venueController = require("../controllers/venueController");

router.post("/", venueController.createVenue);
router.get("/", venueController.getAllVenues);
router.get("/available", venueController.getAvailableVenues);

router.get("/:id", venueController.getVenueById);
router.put("/:id", venueController.updateVenue);
router.delete("/:id", venueController.deleteVenue);
router.get("/:id/availability", venueController.checkVenueAvailability);

module.exports = router;
