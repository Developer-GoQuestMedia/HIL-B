// controllers/episodeController.js
import { Episode } from '../models/Episode';

// Create episode
export const createEpisode = async (req, res, next) => {
  try {
    const { seriesId } = req.params;
    const { title, episodeNumber } = req.body;
    
    const episode = await Episode.create({
      seriesId,
      title,
      episodeNumber,
      status: 'draft'
    });
    res.status(201).json(episode);
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Get episodes by series
export const getEpisodesBySeries = async (req, res, next) => {
  try {
    const episodes = await Episode.find({ seriesId: req.params.seriesId })
      .sort({ episodeNumber: 1 });
    res.json(episodes);
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Get episode by ID
export const getEpisodeById = async (req, res, next) => {
  try {
    const episode = await Episode.findById(req.params.id);
    if (!episode) throw createError(404, 'Episode not found');
    res.json(episode);
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Update episode
export const updateEpisode = async (req, res, next) => {
  try {
    const episode = await Episode.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!episode) throw createError(404, 'Episode not found');
    res.json(episode);
  } catch (error) {
    next(createError(400, error.message));
  }
};