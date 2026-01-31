const express = require("express");
const { createSubmission, getSubmissions } = require("../controllers/formController");

const router = express.Router();

router.post("/form", createSubmission);
router.get("/form", getSubmissions);

module.exports = router;
