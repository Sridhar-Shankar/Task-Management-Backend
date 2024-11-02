// controllers/ChecklistController.js

const Checklistmodel = require("../model/Checklistmodel");

const addChecklist = async (req, res) => {
    const { priority, name, duedate, createdAt, markedval, checklistarr, userid, sectiontype } = req.body;
    try {
        const checklist = new Checklistmodel({ priority, name, createdAt, duedate, checklistarr, markedval, userid, sectiontype });
        const newchecklist = await checklist.save();
        res.json({ newchecklist });
    } catch (err) {
        res.json({ message: "something went wrong" });
    }
};

const getChecklists = async (req, res) => {
    const { id } = req.params;
    const { time } = req.query;
    try {
        const query = { userid: id };
        if (time !== "all") {
            query.createdAt = time;
        }
        const allchecklist = await Checklistmodel.find(query);
        res.json({ allchecklist });
    } catch (err) {
        res.json({ message: "something went wrong" });
    }
};

const deleteChecklist = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedchecklist = await Checklistmodel.findByIdAndDelete(id);
        res.json({ deletedchecklist });
    } catch (err) {
        res.json({ message: "something went wrong" });
    }
};

const updateChecklist = async (req, res) => {
    const { id } = req.params;
    const { priority, name, duedate, markedval, checklistarr, sectiontype } = req.body;
    try {
        const updateData = { priority, name, duedate, markedval, checklistarr, sectiontype };
        const updatedchecklist = await Checklistmodel.findByIdAndUpdate(id, updateData, { new: true });
        res.json({ updatedchecklist });
    } catch (err) {
        res.json({ message: "something went wrong" });
    }
};

const getSingleChecklist = async (req, res) => {
    const { id } = req.params;
    try {
        const singlechecklist = await Checklistmodel.findById(id);
        res.json({ singlechecklist });
    } catch (err) {
        res.json({ message: "something went wrong" });
    }
};

// Exporting controller functions
module.exports = {
    addChecklist,
    getChecklists,
    deleteChecklist,
    updateChecklist,
    getSingleChecklist
};
