const { Ticket, Event } = require("../models");

exports.createTicket = async (req, res) => {
  try {
    const ticket = await Ticket.create(req.body);
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTicketsByEvent = async (req, res) => {
  try {
    const tickets = await Ticket.findAll({
      where: { event_id: req.params.eventId },
      include: [{ model: Event, as: "event" }],
    });

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.validateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    ticket.payment = "paid";
    ticket.date = new Date();
    await ticket.save();

    res.json({ message: "Ticket validated", ticket });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.cancelTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    await ticket.destroy();
    res.json({ message: "Ticket cancelled / refunded" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
