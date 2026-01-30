const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketController");

router.post("/", ticketController.createTicket);
router.get("/event/:eventId", ticketController.getTicketsByEvent);
router.put("/:id/validate", ticketController.validateTicket);
router.delete("/:id", ticketController.cancelTicket);

module.exports = router;
