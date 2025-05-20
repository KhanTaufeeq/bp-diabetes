import { BP } from "../models/bpModel.js";

export const addBP = async (req, res) => {
  const { systolic, diastolic, timing } = req.body;

  try {
    if (!systolic || !diastolic) {
      return res
        .status(400)
        .json({ message: "Both systolic and diastolic must be given" });
    }
    if (
      (systolic && typeof systolic !== "number") ||
      !Number.isInteger(systolic) ||
      systolic <= 0
    ) {
      return res.status(400).json({
        error: "Systolic BP data must be given in postive integer form",
      });
    }
    if (
      (diastolic && typeof diastolic !== "number") ||
      !Number.isInteger(diastolic) ||
      diastolic <= 0
    ) {
      return res.status(400).json({
        error: "Diastolic BP data must be given in postive integer form",
      });
    }

    const bp = new BP({ user: req.userId, systolic, diastolic, timing });
    await bp.save();
    return res
      .status(200)
      .json({ message: "BP data has been saved successfully", bp });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getBP = async (req, res) => {
  try {
    const user = req.userId;
    console.log(user);
    const bp = await BP.find({ user }).sort({ createdAt: -1 });
    console.log(bp);

    if (!bp) {
      return res.status(401).json({ error: "BP data not found for this user" });
    }
    return res
      .status(200)
      .json({ message: "The BP data has been fetched successfully", bp });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong", error: error.message });
  }
};

export const editBP = async (req, res) => {
  const { systolic, diastolic, timing } = req.body;
  // req.params is an object containing all URL parameters, not just the id value
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({ error: "bp id is required" });
    }
    if (!req.userId) {
      return res.status(401).json({ error: "User is not authorized" });
    }
    const bpRecord = await BP.findOne({ _id: id, user: req.userId });
    if (!bpRecord) {
      return res.status(404).json({ error: "BP data is not found" });
    }
    if (systolic !== undefined) {
      if (
        (systolic && typeof systolic !== "number") ||
        !Number.isInteger(systolic) ||
        systolic <= 0
      ) {
        return res.status(400).json({
          error: "Systolic BP data must be given in postive integer form",
        });
      } else {
        bpRecord.systolic = systolic;
      }
    }
    if (diastolic !== undefined) {
      if (
        (diastolic && typeof diastolic !== "number") ||
        !Number.isInteger(diastolic) ||
        diastolic <= 0
      ) {
        return res.status(400).json({
          error: "Diastolic BP data must be given in postive integer form",
        });
      } else {
        bpRecord.diastolic = diastolic;
      }
    }
    if (timing !== undefined) {
      bpRecord.timing = timing;
    }
    await bpRecord.save();
    return res
      .status(200)
      .json({
        message: "BP record has been updated successfully",
        data: bpRecord,
      });
  } catch (error) {
    console.error("Error updating BP record", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteBP = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(404).json({ error: "bp id is not found" });
    }
    const bp = await BP.findOne({ _id: id, user: req.userId });

    if (!bp) {
      return res.status(404).json({ error: "BP data is not found!" });
    } else {
      await BP.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ message: "BP object has been deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting BP record", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
