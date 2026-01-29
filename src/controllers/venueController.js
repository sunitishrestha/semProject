const { Venue, Event } = require("../models");
const { Op } = require("sequelize");

exports.createVenue = async (req, res) => {
  try {
    const venue = await Venue.create(req.body);
    res.status(201).json(venue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllVenues = async (req, res) => {
  try {
    const venues = await Venue.findAll({
      order: [["venue_name", "ASC"]],
    });

    res.json(venues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getVenueById = async (req, res) => {
  try {
    const venue = await Venue.findByPk(req.params.id);

    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }

    res.json(venue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateVenue = async (req, res) => {
  try {
    const venue = await Venue.findByPk(req.params.id);

    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }

    await venue.update(req.body);
    res.json(venue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteVenue = async (req, res) => {
  try {
    const venue = await Venue.findByPk(req.params.id);

    if (!venue) {
      return res.status(404).json({ message: "Venue not found" });
    }

    await venue.destroy();
    res.json({ message: "Venue deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAvailableVenues = async (req, res) => {
  try {
    const { date } = req.query;

    const bookedVenues = await Event.findAll({
      where: { date },
      attributes: ["venueId"],
    });

    const bookedIds = bookedVenues.map((e) => e.venueId);

    const venues = await Venue.findAll({
      where: {
        id: { [Op.notIn]: bookedIds },
      },
    });

    res.json(venues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.checkVenueAvailability = async (req, res) => {
  try {
    const { date } = req.query;

    const event = await Event.findOne({
      where: {
        venueId: req.params.id,
        date,
      },
    });

    res.json({
      available: !event,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
