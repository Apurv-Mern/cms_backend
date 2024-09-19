const testTwo = require("../models/testTwo ");

// Get all records
exports.getAlltestTwo = async (req, res) => {
  try {
    const data = await testTwo.findAll();
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Create a new record
exports.createtestTwo = async (req, res) => {
  try {
    const newData = await testTwo.create({
      id: req.body.id,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt,
      deletedAt: req.body.deletedAt,
    });
    res.status(201).json({ success: true, data: newData });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
};

// Update a record by ID
exports.updatetestTwo = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await testTwo.update(
      {
        id: req.body.id,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt,
        deletedAt: req.body.deletedAt,
      },
      {
        where: { id },
      }
    );

    if (updated) {
      const updatedData = await testTwo.findOne({ where: { id } });
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
exports.deletetestTwo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await testTwo.destroy({
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
