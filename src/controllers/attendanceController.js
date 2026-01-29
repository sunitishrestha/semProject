exports.markAttendance = async (req, res) => {
  try {
    const { part_id, lead_id, volunteer_id, status } = req.body;

    // ensure only ONE role is marked
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
