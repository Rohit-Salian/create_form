import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    // TODO something could be incorrect
    formId: {
      type: String,
      // type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
      // ref: "Form",
    },
    data: { type: Object, required: true },
  },
  { timestamps: true }
);

const Submission = mongoose.model("submissions", submissionSchema);

export default Submission;
