const { Department, Event } = require("../models");

exports.createDepartment = async (req, res) => {
  try {
    const { department_name, faculty_name } = req.body;

    const newDepartment = await Department.create({
      department_name,
      faculty_name,
    });
    res.status(201).json(newDepartment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllDepartment = async (req, res) => {
  try {
    const department = await Department.findAll({
      order: [["department_name", "ASC"]],
    });
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDepartment = async (req, res) => {
  try {
    const { department_name, faculty_name } = req.body;

    const department = await Department.findByPk(req.params.id);

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    if (department_name !== undefined)
      department.department_name = department_name;
    if (faculty_name !== undefined) department.faculty_name = faculty_name;
    await department.save();

    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    await department.destroy();
    res.status(200).json({ message: "Department deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDepartmentWithEvents = async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id, {
      include: [{ model: Event, as: "events" }],
    });
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
