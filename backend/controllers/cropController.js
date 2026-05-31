const Crop = require('../models/Crop');
exports.getCrops = async (req, res) => { try { res.json(await Crop.find({ owner: req.user._id }).populate('farm')); } catch (e) { res.status(500).json({ message: e.message }); } };
exports.createCrop = async (req, res) => { try { res.status(201).json(await Crop.create({ ...req.body, owner: req.user._id })); } catch (e) { res.status(500).json({ message: e.message }); } };
exports.updateCropStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['planted', 'growing', 'flowering', 'maturing', 'ready', 'harvested'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid growth stage' });
    }

    const crop = await Crop.findByIdAndUpdate(
      req.params.id,
      { status },
      { returnDocument: 'after', runValidators: true }
    );

    if (!crop) return res.status(404).json({ message: 'Crop not found' });
    res.json(crop);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};