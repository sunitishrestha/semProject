const { Volunteer, User, Department, Event } = require("../models"); // Adjust the path as necessary

exports.createVolunteer = async (req, res) => {
  try {
    const { volunteer_name, user_id, department_id, event_id } = req.body;

    const newVolunteer = await Volunteer.create({
      volunteer_name,
      user_id: req.user.id,
      department_id,
      event_id,
      status: pending,
    });
    res.status(201).json({
      success: true,
      message: "Volunteer registered successfully",
      data: newVolunteer,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getAllVolunteers = async (req, res) => {
  try {
    const volunteer = await Volunteer.findAll({
      where: { event_id: eventId },
      include: [
        { model: User, as: "user" },
        { model: Department, as: "department" },
        { model: Event, as: "event" },
      ],
    });
    res.status(200).json({ success: true, data: volunteer });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateVolunteer = async (req, res) => {
  try {
    const { id } = req.params;

    const volunteer = await Volunteer.findByPk(id);
    if (!volunteer) {
      return res
        .status(404)
        .json({ success: false, error: "Volunteer not found" });
    }

    await volunteer.update(req.body);

    res.status(200).json({ success: true, data: volunteer });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteVolunteer = async (req, res) => {
  try {
    const { id } = req.params;
    const volunteer = await Volunteer.findByPk(id);

    if (!volunteer) {
      return res
        .status(404)
        .json({ success: false, error: "Volunteer not found" });
    }

    await volunteer.destroy();
    res
      .status(200)
      .json({ success: true, message: "Volunteer deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//Assign task for volunteer

exports.taskAssign = async (req, res) => {
  try {
    const { id } = req.params;
    const { task } = req.body;

    const volunteer = await Volunteer.findByPk(id);
    if (!volunteer) {
      return res
        .status(404)
        .json({ success: false, error: "Volunteer not found" });
    }
    volunteer.task = task;
    await volunteer.save();
    res.status(200).json({ success: true, data: volunteer });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
