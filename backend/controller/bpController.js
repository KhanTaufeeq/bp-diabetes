import { BP } from '../models/bpModel.js';

export const addBP = async (req, res) => {
  const { systolic, diastolic, timing } = req.body;

  try {
    if (!systolic || !diastolic) {
      return res
        .status(409)
        .json({ message: "Both systolic and diastolic must be given" });
    }
    if (
      (systolic && typeof systolic !== "number") ||
      !Number.isInteger(systolic) ||
      systolic <= 0
    ) {
      return res.status(409).json({
        error: "Systolic BP data must be given in postive integer form",
      });
    }
    if (
      (diastolic && typeof diastolic !== "number") ||
      !Number.isInteger(diastolic) ||
      diastolic <= 0
    ) {
      return res.status(409).json({
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
  try {
    const { systolic, diastolic, timing } = req.body;
    const bp = BP.findOne({ user: req.userId });

    if (
      (systolic && typeof systolic !== "number") ||
      !Number.isInteger(systolic) ||
      systolic <= 0
    ) {
      return res.status(409).json({
        error: "Systolic BP data must be given in postive integer form",
      });
    } else {
      bp.systolic = systolic;
    }
    if (
      (diastolic && typeof diastolic !== "number") ||
      !Number.isInteger(diastolic) ||
      diastolic <= 0
    ) {
      return res.status(409).json({
        error: "Diastolic BP data must be given in postive integer form",
      });
    } else {
      bp.diastolic = diastolic;
    }
    bp.timing = timing;
    await bp.save();
  } catch (error) {
    return res.status(500).json({error: error})
  }
}

export const deleteBP = async (req, res) => {
  try {
    const bp = await BP.findByIdAndDelete(req.userId);
    console.log("delete_userid", req.userId);
    console.log("delete_bp",bp);

    if (!bp) {
      return res.status(404).json({ error: "BP data is not found!" });
    }
    else {
      return res.status(200).json({ message: "BP object has been deleted successfully" });
    }
  } catch (error) {
    return res.status(500).json({ error: error });
   }
}
