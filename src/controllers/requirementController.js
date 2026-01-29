const { Requirement, Department, Event } = require("../models");

exports.createRequirement = async (req, res) => {
  try {
    const { year, semester, address, department_id } = req.body;

    const newRequirement = await Requirement.create({
      year,
      semester,
      address,
      department_id,
    });
    res.status(201).json(newRequirement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllRequirements = async (req, res) => {
  try {
    const requirements = await Requirement.findAll({
      include: [{ model: Department, as: "department" }],
    });
    res.status(200).json(requirements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRequirement = async (req, res) => {
  try {
    const { id } = req.params;

    const requirements = await Requirement.findByPk(id);
    if (!requirements) {
      return res.status(404).json({ error: "Requirement not found" });
    }

    await requirements.update(req.body);
    res.status(200).json(requirements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteRequirement = async (req, res) => {
  try {
    const { id } = req.params;
    const requirement = await Requirement.findByPk(id);

    if (!requirement) {
      return res.status(404).json({ error: "Requirement not found" });
    }
    await requirement.destroy();
    res.status(200).json({ message: "Requirement deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
