const { Attendance, Participation, Lead, Volunteer } = require("../models");

exports.markAttendance = async (req, res) => {
  try {
    const { part_id, lead_id, volunteer_id, status } = req.body;
    const count = [part_id, lead_id, volunteer_id].filter(Boolean).length;

    if (count !== 1) {
      return res.status(400).json({
        message: "Attendance must belong to ONE role only",
      });
    }

    const attendance = await Attendance.create({
      part_id,
      lead_id,
      volunteer_id,
      status,
    });

    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.participantAttendanceReport = async (req, res) => {
  try {
    const data = await Attendance.findAll({
      include: [
        {
          model: Participation,
          as: "participation",
          where: { event_id: req.params.eventId },
          required: true,
        },
      ],
    });

    res.json({ type: "participants", total: data.length, data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.leadAttendanceReport = async (req, res) => {
  try {
    const data = await Attendance.findAll({
      include: [
        {
          model: Lead,
          as: "lead",
          where: { event_id: req.params.eventId },
          required: true,
        },
      ],
    });

    res.json({ type: "leads", total: data.length, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// required true---> INNEr join if false ----> Left outer join
exports.volunteerAttendanceReport = async (req, res) => {
  try {
    const data = await Attendance.findAll({
      include: [
        {
          model: Volunteer,
          as: "volunteer",
          where: { event_id: req.params.eventId },
          required: true,
        },
      ],
    });

    res.json({ type: "volunteers", total: data.length, data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
