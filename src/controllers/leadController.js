const { Lead, Participation, User, Requirement, Event } = require("../models");

exports.createLead = async (req, res) => {
  try {
    const { user_id, req_id, event_id, role } = req.body;
    const lead = await Lead.create({
      user_id,
      req_id,
      event_id,
      role,
    });
    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLeadByEvent = async (req, res) => {
  try {
    const leads = await Lead.findAll({
      where: { event_id: req.params.eventId },
      include: [
        { model: User, as: "user" },
        { model: Requirement, as: "requirement" },
        { model: Event, as: "event" },
      ],
    });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const lead = await Lead.findByPk(id);
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    await lead.update(req.body);
    res.json(lead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
