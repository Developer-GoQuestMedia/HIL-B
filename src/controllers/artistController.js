// controllers/artistController.js
import { Dialogue } from '../models/Dialogue';
import { uploadToR2 } from '../services/storageService';
import { notifyUsers } from '../services/notificationService';
import { createError } from '../utils/errors';

// Transcriptor Functions
export const updateTranscription = async (req, res, next) => {
  try {
    const { text } = req.body;
    const dialogue = await Dialogue.findByIdAndUpdate(
      req.params.id,
      {
        'transcription.text': text,
        'transcription.status': 'completed',
        'transcription.submittedAt': new Date(),
        'transcription.assignedTo': req.user.id
      },
      { new: true }
    );
    
    await notifyUsers('DIRECTOR', 'Transcription ready for review');
    res.json(dialogue);
  } catch (error) {
    next(createError(400, error.message));
  }
};

// Translator Functions
export const updateLiteralTranslation = async (req, res, next) => {
    try {
      const { text, sourceLanguage } = req.body;
      
      if (!sourceLanguage) {
        throw createError(400, 'Source language is required for literal translation');
      }
  
      const dialogue = await Dialogue.findById(req.params.id);
      if (!dialogue) {
        throw createError(404, 'Dialogue not found');
      }
  
      // Check if transcription is completed
      if (dialogue.transcription.status !== 'completed') {
        throw createError(400, 'Cannot translate before transcription is completed');
      }
  
      const updatedDialogue = await Dialogue.findByIdAndUpdate(
        req.params.id,
        {
          'translation.literalText': text,
          'translation.literalStatus': 'completed',
          'translation.sourceLanguage': sourceLanguage,
          'translation.targetLanguage': 'english', // Literal always translates to English
          'translation.literalSubmittedAt': new Date(),
          'translation.literalAssignedTo': req.user.id
        },
        { new: true }
      );
      
      await notifyUsers('DIRECTOR', 
        `Literal translation from ${sourceLanguage} to English ready for review`);
  
      // Notify translators who work on adapted translations
      await notifyUsers('TRANSLATOR', 
        `Literal translation to English available for adaptation`);
      
      res.json(updatedDialogue);
    } catch (error) {
      next(error);
    }
  };
  
  export const updateAdaptedTranslation = async (req, res, next) => {
    try {
      const { text, targetLanguage } = req.body;
      
      if (!targetLanguage) {
        throw createError(400, 'Target language is required for adapted translation');
      }
  
      const dialogue = await Dialogue.findById(req.params.id);
      if (!dialogue) {
        throw createError(404, 'Dialogue not found');
      }
  
      // Check if literal translation is completed
      if (dialogue.translation.literalStatus !== 'completed') {
        throw createError(400, 'Cannot create adapted translation before literal translation is completed');
      }
  
      const updatedDialogue = await Dialogue.findByIdAndUpdate(
        req.params.id,
        {
          'translation.adaptedText': text,
          'translation.adaptedStatus': 'completed',
          'translation.adaptedLanguage': targetLanguage,
          'translation.adaptedSubmittedAt': new Date(),
          'translation.adaptedAssignedTo': req.user.id
        },
        { new: true }
      );
      
      await notifyUsers('DIRECTOR', 
        `Adapted translation to ${targetLanguage} ready for review`);
      
      res.json(updatedDialogue);
    } catch (error) {
      next(error);
    }
  };

// Voice Artist Functions
export const uploadVoiceOver = async (req, res, next) => {
  try {
    const audioFile = req.file;
    const audioUrl = await uploadToR2(audioFile, `voice-over/${req.params.id}`);
    
    const dialogue = await Dialogue.findByIdAndUpdate(
      req.params.id,
      {
        'voiceOver.audioUrl': audioUrl,
        'voiceOver.status': 'completed',
        'voiceOver.submittedAt': new Date(),
        'voiceOver.assignedTo': req.user.id
      },
      { new: true }
    );
    
    await notifyUsers('DIRECTOR', 'Voice-over ready for review');
    res.json(dialogue);
  } catch (error) {
    next(createError(400, error.message));
  }
};