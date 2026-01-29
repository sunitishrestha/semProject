const express = require("express");
const router = express.Router();
const sponsorController = require("../controllers/sponsorController");

router.post("/", sponsorController.createSponsor);
router.get("/", sponsorController.getAllSponsors);
router.get("/event/:eventId", sponsorController.getSponsorsByEvent);
router.put("/:id", sponsorController.updateSponsor);
router.delete("/:id", sponsorController.deleteSponsor);

module.exports = router;
