import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    formId: { type: String, required: true },
    data: { type: Object, required: true },
  },
  { timestamps: true }
);

const Submission = mongoose.model("submissions", submissionSchema);

export default Submission;
