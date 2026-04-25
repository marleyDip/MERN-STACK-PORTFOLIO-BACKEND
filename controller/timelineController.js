import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Timeline } from "../models/timelineSchema.js";

// ================
// Add New Timeline
// ================
export const postTimeline = catchAsyncErrors(async (req, res, next) => {
  const { title, description, from, to } = req.body;

  // Validation
  if (!title || !description || !from) {
    return next(new ErrorHandler("All fields are required!", 400));
  }

  // Date validation (optional but good)
  // if (new Date(from) > new Date(to)) {
  //   return next(
  //     new ErrorHandler("'from' date cannot be after 'to' date!", 400),
  //   );
  // }

  const newTimeline = await Timeline.create({
    title,
    description,
    timeline: { from, to },
  });

  res.status(201).json({
    success: true,
    message: "Timeline Added!",
    newTimeline,
  });
});

// ===============
// Delete Timeline
// ===============
export const deleteTimeline = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  let timeline = await Timeline.findById(id);
  if (!timeline) {
    return next(new ErrorHandler("Timeline not found", 404));
  }

  await timeline.deleteOne();

  res.status(200).json({
    success: true,
    message: "Timeline Deleted!",
  });
});

// ================
// Get All Timeline
// ================
export const getAllTimelines = catchAsyncErrors(async (req, res, next) => {
  const timelines = await Timeline.find();

  res.status(200).json({
    success: true,
    timelines,
  });
});

// ===============
// Update Timeline
// ===============
export const updateTimeline = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { title, description, from, to } = req.body;

  const timeline = await Timeline.findById(id);

  if (!timeline) {
    return next(new ErrorHandler("Timeline not found!", 404));
  }

  // Update fields only if provided
  if (title) timeline.title = title;
  if (description) timeline.description = description;

  if (from) timeline.timeline.from = from || timeline.timeline.from;
  if (to !== undefined) timeline.timeline.to = to || timeline.timeline.to;

  await timeline.save();

  res.status(200).json({
    success: true,
    message: "Timeline Updated Successfully!",
    timeline,
  });
});

export const updateTimeline1 = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const updatedTimeline = await Timeline.findByIdAndUpdate(
    id,
    {
      $set: {
        title: req.body.title,
        description: req.body.description,
        "timeline.from": req.body.from,
        "timeline.to": req.body.to,
      },
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updatedTimeline) {
    return next(new ErrorHandler("Timeline not found!", 404));
  }

  res.status(200).json({
    success: true,
    message: "Timeline updated successfully!",
    timeline: updatedTimeline,
  });
});
