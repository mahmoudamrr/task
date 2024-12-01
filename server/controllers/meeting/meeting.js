const MeetingHistory = require("../../model/schema/meeting");

const add = async (req, res) => {    
  try {
    const meetingData = req.body;

    const newMeeting = new MeetingHistory({
      agenda: meetingData.agenda,
      attendes: meetingData.attendes,
      attendesLead: meetingData.attendesLead,
      location: meetingData.location,
      related: meetingData.related,
      dateTime: meetingData.dateTime,
      notes: meetingData.notes,
      createBy: req.user.userId,
    });

    await newMeeting.save();
    res.status(201).json({ success: true, meeting: newMeeting });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding meeting",
      error: error.message,
    });
  }
};

const index = async (req, res) => {
  try {
    const meetings = await MeetingHistory.find({ deleted: false }).populate(
      ""
    );
    res.status(200).json({ success: true, meetings });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching meetings",
      error: error.message,
    });
  }
};

const view = async (req, res) => {
  try {
    const { id } = req.params;

    const meeting = await MeetingHistory.findOne({
      _id: id,
      deleted: false,
    }).populate("");

    if (!meeting) {
      return res
        .status(404)
        .json({ success: false, message: "Meeting not found" });
    }

    res.status(200).json({ success: true, meeting });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching meeting",
      error: error.message,
    });
  }
};

const deleteData = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedMeeting = await MeetingHistory.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );

    if (!updatedMeeting) {
      return res
        .status(404)
        .json({ success: false, message: "Meeting not found" });
    }

    res.status(200).json({
      success: true,
      message: "Meeting deleted",
      meeting: updatedMeeting,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting meeting",
      error: error.message,
    });
  }
};

const deleteMany = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid IDs provided" });
    }

    await MeetingHistory.updateMany({ _id: { $in: ids } }, { deleted: true });

    res.status(200).json({ success: true, message: "Meetings deleted" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting meetings",
      error: error.message,
    });
  }
};

module.exports = { add, index, view, deleteData, deleteMany };
