const { profile } = require("../models");

exports.updateProfile = async (req, res) => {
  try {
    const { bio, location } = req.body;

    let profile = await Profile.findOne({ where: { userId: req.user.id } });
    if (!profile) {
      profile = await Profile.create({ userId: req.user.id });
    }

    if (bio !== undefined) profile.bio = bio;
    if (location !== undefined) profile.location = location;

    await profile.save();

    res.status(200).json({ message: "Profile updated successfully", profile });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    let profile = await Profile.findOne({ where: { userId: req.user.id } });
    if (!profile) {
      profile = await Profile.create({ userId: req.user.id });
    }

    profile.avatar = `/uploads/avatars/${req.file.filename}`;
    await profile.save();
    res
      .status(200)
      .json({ message: "Avatar updated successfully", avatar: profile.avatar });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePreferences = async (req, res) => {
  try {
    const preferences = req.body;

    let profile = await Profile.findOne({
      where: { userId: req.user.id },
    });

    if (!profile) {
      profile = await Profile.create({
        userId: req.user.id,
        preferences,
      });
    } else {
      profile.preferences = preferences;
      await profile.save();
    }

    res.json({
      message: "Preferences updated",
      preferences: profile.preferences,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
