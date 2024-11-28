// controllers/dialogueController.js
import { Dialogue } from '../models/Dialogue';
import { createError } from '../utils/errors';

export const createDialogue = async (req, res, next) => {
  try {
    const { episodeId } = req.params;
    const { timeCode, sequenceNumber } = req.body;
    
    const dialogue = await Dialogue.create({
      episodeId,
      timeCode,
      sequenceNumber,
      status: 'pending_transcription'
    });
    
    res.status(201).json(dialogue);
  } catch (error) {
    next(createError(400, error.message));
  }
};

export const getDialoguesByEpisode = async (req, res, next) => {
  try {
    const dialogues = await Dialogue.find({ episodeId: req.params.episodeId })
      .sort({ sequenceNumber: 1 });
    res.json(dialogues);
  } catch (error) {
    next(createError(400, error.message));
  }
};

export const updateDialogue = async (req, res, next) => {
  try {
    const dialogue = await Dialogue.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!dialogue) throw createError(404, 'Dialogue not found');
    res.json(dialogue);
  } catch (error) {
    next(createError(400, error.message));
  }
};