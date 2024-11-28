// controllers/approvalController.js
import { Dialogue } from '../models/Dialogue';
import { notifyUsers } from '../services/notificationService';

export const approveTranscription = async (req, res, next) => {
  try {
    const { approved, notes } = req.body;
    const status = approved ? 'approved' : 'rejected';
    
    const dialogue = await Dialogue.findByIdAndUpdate(
      req.params.id,
      {
        'transcription.status': status,
        'transcription.directorNotes': notes,
        'transcription.approvedAt': approved ? new Date() : null
      },
      { new: true }
    );
    
    await notifyUsers(['TRANSCRIPTOR'], 
      `Transcription ${status}${notes ? ': ' + notes : ''}`);
    res.json(dialogue);
  } catch (error) {
    next(createError(400, error.message));
  }
};

export const approveTranslation = async (req, res, next) => {
  try {
    const { approved, notes } = req.body;
    const status = approved ? 'approved' : 'rejected';
    
    const dialogue = await Dialogue.findByIdAndUpdate(
      req.params.id,
      {
        'translation.status': status,
        'translation.directorNotes': notes,
        'translation.approvedAt': approved ? new Date() : null
      },
      { new: true }
    );
    
    await notifyUsers(['TRANSLATOR'], 
      `Translation ${status}${notes ? ': ' + notes : ''}`);
    res.json(dialogue);
  } catch (error) {
    next(createError(400, error.message));
  }
};

export const approveVoiceOver = async (req, res, next) => {
  try {
    const { approved, notes } = req.body;
    const status = approved ? 'approved' : 'rejected';
    
    const dialogue = await Dialogue.findByIdAndUpdate(
      req.params.id,
      {
        'voiceOver.status': status,
        'voiceOver.directorNotes': notes,
        'voiceOver.approvedAt': approved ? new Date() : null
      },
      { new: true }
    );
    
    await notifyUsers(['VOICE_ARTIST'], 
      `Voice-over ${status}${notes ? ': ' + notes : ''}`);
    res.json(dialogue);
  } catch (error) {
    next(createError(400, error.message));
  }
};