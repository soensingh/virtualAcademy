const FormSubmission = require("../models/FormSubmission");

const createSubmission = async (req, res) => {
  try {
    const { experience, topic, name, phone, email } = req.body;

    if (!experience || !topic || !name || !phone || !email) {
      return res.status(400).json({
        message: "experience, topic, name, phone, and email are required",
      });
    }

    const submission = await FormSubmission.create({
      experience,
      topic,
      name,
      phone,
      email,
    });

    return res.status(201).json({
      message: "Submission saved",
      data: submission,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to save submission",
      error: error.message,
    });
  }
};

const getSubmissions = async (_req, res) => {
  try {
    const submissions = await FormSubmission.find().sort({ createdAt: -1 });
    return res.status(200).json({
      message: "Submissions fetched",
      data: submissions,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch submissions",
      error: error.message,
    });
  }
};

module.exports = {
  createSubmission,
  getSubmissions,
};
