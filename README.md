# HIL-B
User Role Structure:

javascript
const UserRoles = {
  ADMIN: 'admin',
  DIRECTOR: 'director',
  ARTIST: {
    TRANSCRIPTOR: 'transcriptor',
    TRANSLATOR: 'translator',
    VOICE_ARTIST: 'voice_artist'
  }
}

Database Schema (using Mongoose as example):

javascript
// User Schema
const userSchema = {
  email: String,
  password: String, // hashed
  role: String,
  artistType: String, // only for artists
  status: String, // active/inactive
  createdAt: Date,
  updatedAt: Date
}

// Project Schema
const projectSchema = {
  title: String,
  status: String,
  director: { type: ObjectId, ref: 'User' },
  assignments: [{
    role: String,
    artist: { type: ObjectId, ref: 'User' },
    status: String,
    deadline: Date
  }]
}

Access Control System:

javascript
const Permissions = {
  ADMIN: [
    'manage_users',
    'manage_projects',
    'view_all_reports',
    'manage_system_settings'
  ],
  DIRECTOR: [
    'create_projects',
    'assign_artists',
    'view_project_reports',
    'manage_own_projects'
  ],
  ARTIST: {
    TRANSCRIPTOR: [
      'view_assigned_projects',
      'submit_transcriptions',
      'update_work_status'
    ],
    TRANSLATOR: [
      'view_assigned_projects',
      'submit_translations',
      'update_work_status'
    ],
    VOICE_ARTIST: [
      'view_assigned_projects',
      'submit_voice_recordings',
      'update_work_status'
    ]
  }
}

Workflow Structure:

javascript
// Project Workflow States
const WorkflowStates = {
  TRANSCRIPTION: {
    PENDING: 'pending_transcription',
    IN_PROGRESS: 'transcribing',
    COMPLETED: 'transcribed'
  },
  TRANSLATION: {
    PENDING: 'pending_translation',
    IN_PROGRESS: 'translating',
    COMPLETED: 'translated'
  },
  VOICE_RECORDING: {
    PENDING: 'pending_recording',
    IN_PROGRESS: 'recording',
    COMPLETED: 'recorded'
  }
}

API Endpoints Structure:

javascript
// Series Management
POST /api/series
GET /api/series
GET /api/series/:id
PUT /api/series/:id

// Episode Management
POST /api/series/:seriesId/episodes
GET /api/series/:seriesId/episodes
GET /api/episodes/:id
PUT /api/episodes/:id

// Dialogue Management
POST /api/episodes/:episodeId/dialogues
GET /api/episodes/:episodeId/dialogues
PUT /api/dialogues/:id

// Artist-specific endpoints
// Transcriptor
PUT /api/dialogues/:id/transcription
// Translator
PUT /api/dialogues/:id/translation/literal
PUT /api/dialogues/:id/translation/adapted
// Voice Artist
POST /api/dialogues/:id/voice-over

// Director Approval
PUT /api/dialogues/:id/approve/transcription
PUT /api/dialogues/:id/approve/translation
PUT /api/dialogues/:id/approve/voice-over

Middleware Considerations:

javascript
// Authentication Middleware
const authMiddleware = (req, res, next) => {
  // Verify JWT token
}

// Permission Middleware
const checkPermission = (permission) => {
  return (req, res, next) => {
    // Check if user has required permission
  }
}

Additional Features to Consider:


File upload system for different types of media
Notification system for assignments and deadlines
Real-time status updates using WebSocket
Progress tracking and reporting
Feedback and revision system
Payment/billing system if required


Security Measures:


JWT for authentication
Role-based access control (RBAC)
Input validation and sanitization
Rate limiting
Password hashing
Audit logging


Technical Stack Recommendations:

javascript
{
  "backend": {
    "framework": "Express.js",
    "database": "MongoDB",
    "authentication": "JWT",
    "fileStorage": "AWS S3",
    "caching": "Redis",
    "realtime": "Socket.io"
  },
  "tools": {
    "validation": "Joi",
    "logging": "Winston",
    "documentation": "Swagger",
    "testing": "Jest"
  }
}