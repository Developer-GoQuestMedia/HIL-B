// src/routes/admin.routes.js
import express from 'express';
import { auth, checkRole } from '../middleware/auth';
import * as adminController from '../controllers/adminController';
import { validateProject } from '../middleware/validation';

const router = express.Router();

// All routes require admin authentication
router.use(auth, checkRole(['ADMIN']));

// User Management
router.get('/users', adminController.getAllUsers);
router.get('/users/:id', adminController.getUserById);
router.patch('/users/:id/status', adminController.updateUserStatus);
router.delete('/users/:id', adminController.deleteUser);

// Artist Management
router.get('/artists', adminController.getAllArtists);
router.get('/artists/transcriptors', adminController.getTranscriptors);
router.get('/artists/translators', adminController.getTranslators);
router.get('/artists/voice-artists', adminController.getVoiceArtists);
router.patch('/artists/:id/type', adminController.updateArtistType);

// Project (Series) Management
router.post('/projects', validateProject, adminController.createProject);
router.get('/projects', adminController.getAllProjects);
router.get('/projects/:id', adminController.getProjectById);
router.put('/projects/:id', validateProject, adminController.updateProject);
router.delete('/projects/:id', adminController.deleteProject);

// Bulk Operations for Project Creation
router.post('/projects/bulk-create', adminController.bulkCreateProject);
router.post('/projects/:id/bulk-upload-episodes', adminController.bulkUploadEpisodes);
router.post('/projects/:id/episodes/:episodeId/bulk-upload-dialogues', adminController.bulkUploadDialogues);

// Video Management
router.post('/projects/:id/episodes/:episodeId/upload-video', adminController.uploadEpisodeVideo);
router.post('/projects/:id/episodes/:episodeId/dialogues/:dialogueId/upload-clip', adminController.uploadDialogueClip);

// Assignment Management
router.post('/assign/director/:projectId', adminController.assignDirectorToProject);
router.post('/assign/artist/:dialogueId', adminController.assignArtistToDialogue);
router.patch('/assign/bulk-dialogues', adminController.bulkAssignDialogues);

// Status Management
router.patch('/projects/:id/status', adminController.updateProjectStatus);
router.patch('/projects/:id/episodes/:episodeId/status', adminController.updateEpisodeStatus);
router.patch('/projects/:id/episodes/:episodeId/dialogues/:dialogueId/status', adminController.updateDialogueStatus);

// Analytics & Reports
router.get('/analytics/projects', adminController.getProjectAnalytics);
router.get('/analytics/artists', adminController.getArtistPerformance);
router.get('/analytics/progress', adminController.getProjectProgress);

// Export Data
router.get('/export/project/:id', adminController.exportProjectData);
router.get('/export/analytics', adminController.exportAnalytics);

export default router;