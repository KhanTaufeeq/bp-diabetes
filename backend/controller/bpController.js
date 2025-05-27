import { BP } from "../models/bpModel.js";
import mongoose from "mongoose";

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
    const userId = req.userId;
    console.log("===GET BP DEBUG ===");
    console.log("Getting bp data for userId:", userId);
    console.log("data type of userId:", typeof userId);
    console.log("length of userId:", userId?.length);

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // convert string to objectId for MongoDB query
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const queryUserId = new mongoose.Types.ObjectId(userId);
    console.log("Query UserId (ObjectId):", queryUserId);
    console.log("Query UserId (String):", userId);

    // Debug: What's in the database?
    console.log("Checking all bp records in the database");
    const allBP = await BP.find({}).limit(5);
    console.log(
      "Sample bp records:",
      allBP.map((s) => ({
        _id: s._id,
        user: s.user,
        userTypeof: typeof s.user,
        createdAt: s.createdAt,
      }))
    );

    // execute the query with objectId
    console.log("Executing query with ObjectId:", { user: queryUserId });
    const bp = await BP.find({ user: queryUserId }).sort({ createdAt: -1 });

    console.log("Found BP records", bp.length);

    if (bp.length > 0) {
      console.log(
        "First few records:",
        bp.slice(0, 2).map((s) => ({
          _id: s._id,
          user: s.user,
          createdAt: s.createdAt,
        }))
      );
      return res
        .status(200)
        .json({ bp, message: "BP data fetched successfully" });
    }

    console.log("===========================");

    if (bp.length === 0) {
      return res.status(200).json({
        bp: [],
        message: "No bp data available for this user",
      });
    }
  } catch (error) {
    console.log("Error getting bp data", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
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
    return res.status(200).json({
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
