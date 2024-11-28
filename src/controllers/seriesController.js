// controllers/seriesController.js
import { Series } from '../models/Series';
import { createError } from '../utils/errors';

// Create new series
export const createSeries = async (req, res, next) => {
  try {
    const { title, description, totalEpisodes, targetLanguages } = req.body;
    const series = await Series.create({
      title,
      description,
      totalEpisodes,
      targetLanguages,
      director: req.user.id,
      status: 'active'
    });
    res.status(201).json(series);
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Get all series
export const getAllSeries = async (req, res, next) => {
  try {
    const series = await Series.find()
      .populate('director', 'name email')
      .sort({ createdAt: -1 });
    res.json(series);
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Get series by ID
export const getSeriesById = async (req, res, next) => {
  try {
    const series = await Series.findById(req.params.id)
      .populate('director', 'name email');
    if (!series) throw createError(404, 'Series not found');
    res.json(series);
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Update series
export const updateSeries = async (req, res, next) => {
  try {
    const series = await Series.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!series) throw createError(404, 'Series not found');
    res.json(series);
  } catch (error) {
    next(createError(400, error.message));
  }
};