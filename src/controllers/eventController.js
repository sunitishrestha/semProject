const { Event, Venue, Department } = require("../models");

// -----student-------
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      include: [
        { model: Venue, as: "venue" },
        { model: Department, as: "department" },
      ],
      order: [["date", "ASC"]],
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ----single event get student+organizer-----

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id, {
      include: [
        { model: Venue, as: "venue" },
        { model: Department, as: "department" },
      ],
    });

    if (!event) {
      return res.status(400).json({ message: "Event not fount" });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//----organizer/Admin-----

exports.createEvent = async (req, res) => {
  if (!["organizer", "admin"].includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  if (!["organizer", "admin"].includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const event = await Event.findByPk(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await event.update(req.body);
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  if (!["organizer", "admin"].includes(req.user.role)) {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const event = await Event.findByPk(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await event.destroy();
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
