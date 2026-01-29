const { Sponsor, Event } = require("../models");

exports.createSponsor = async (req, res) => {
  try {
    const sponsor = await Sponsor.create(req.body);
    res.status(201).json(sponsor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSponsorsByEvent = async (req, res) => {
  try {
    const sponsors = await Sponsor.findAll({
      where: { event_id: req.params.eventId },
      include: [{ model: Event, as: "event" }],
    });

    res.json(sponsors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSponsor = async (req, res) => {
  try {
    const sponsor = await Sponsor.findByPk(req.params.id);

    if (!sponsor) {
      return res.status(404).json({ message: "Sponsor not found" });
    }

    await sponsor.update(req.body);
    res.json(sponsor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSponsor = async (req, res) => {
  try {
    const sponsor = await Sponsor.findByPk(req.params.id);

    if (!sponsor) {
      return res.status(404).json({ message: "Sponsor not found" });
    }

    await sponsor.destroy();
    res.json({ message: "Sponsor deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
