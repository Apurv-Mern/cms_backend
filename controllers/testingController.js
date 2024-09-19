const testingModel = require("../models/testingModel");

// Get all records
exports.getAll = async (req, res) => {
  try {
    const data = await testingModel.findAll();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Create a new record
exports.create = async (req, res) => {
  try {
    const newData = await testingModel.create({
      testId: req.body.testId,
      deletedAt: req.body.deletedAt,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt,
      email: req.body.email,
      name: req.body.name,
    });
    res.status(201).json({ success: true, data: newData });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

// Update a record by ID
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await testingModel.update(
      {
        testId: req.body.testId,
        deletedAt: req.body.deletedAt,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt,
        email: req.body.email,
        name: req.body.name,
      },
      {
        where: { id },
      }
    );

    if (updated) {
      const updatedData = await testingModel.findOne({ where: { id } });
      res.status(200).json({ success: true, data: updatedData });
    } else {
      res.status(404).json({ success: false, message: "Data not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

// Delete a record by ID
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await testingModel.destroy({
      where: { id },
    });

    if (deleted) {
      res.status(200).json({ success: true, message: "Data deleted" });
    } else {
      res.status(404).json({ success: false, message: "Data not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};
