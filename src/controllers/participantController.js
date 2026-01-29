const { Participation, Event } = require("../models");

exports.createParticipant = async (req, res) => {
  try {
    const {
      full_name,
      email,
      phone_number,
      address,
      date,
      group_number,
      event_id,
    } = req.body;

    const newParticipant = await Participation.create({
      full_name,
      email,
      phone_number,
      address,
      date,
      group_number,
      event_id,
    });
    res.status(201).json({
      success: true,
      message: "Participant registered successfully",
      data: newParticipant,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getAllParticipants = async (req, res) => {
  try {
    const participants = await Participation.findAll({
      where: { event_id: req.params.eventId },
      include: [{ model: Event, as: "event" }],
    });
    res.status(200).json({ success: true, data: participants });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateParticipant = async (req, res) => {
  try {
    const participant = await Participation.findByPk(req.params.id);
    if (!participant) {
      return res
        .status(404)
        .json({ success: false, error: "Participant not found" });
    }
    await participant.update(req.body);
    res.status(200).json({ success: true, data: participant });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteParticipant = async (req, res) => {
  try {
    const participant = await Participation.findByPk(req.params.id);
    if (!participant) {
      return res
        .status(404)
        .json({ success: false, error: "Participant not found" });
    }
    await participant.destroy();
    res
      .status(200)
      .json({ success: true, message: "Participant deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.checkInParticipant = async (req, res) => {
  try {
    const participation = await Participation.findByPk(req.params.id);

    if (!participation) {
      return res.status(404).json({ message: "Participation not found" });
    }

    participation.date = new Date();
    await participation.save();

    res.json({ message: "Participant checked in", participation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
