import Submission from "../models/submission.js";
import colors from "colors";

export const submitForm = async (req, res) => {
  try {
    const { formId, data } = req.body;

    if (!data || typeof data !== "object")
      return res.status(400).json({
        error: "true",
        message: "Invalid form data",
      });

    const submission = new Submission({ formId, data });
    await submission.save();
    res.status(201).json({
      error: "false",
      message: "Form Data saved successfuly",
      data: submission,
    });
  } catch (error) {
    console.log("Submit Error".bgRed, error);
    res.status(500).json({
      error: "true",
      message: "Form submit API failed",
    });
  }
};

export const fetchSpecificSubmissions = async (req, res) => {
  try {
    const { formId } = req.body;
    if (!formId)
      return res.status(400).json({
        error: "false",
        message: "Specify which submission to be fetched",
      });
    //PENDING
  } catch (error) {
    console.log("Error Fetching".bgRed, error);
    res.status(500).json({
      error: "false",
      message: "Fetch specific API failed",
    });
  }
};
