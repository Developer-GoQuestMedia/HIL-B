// src/routes/index.js
import authRoutes from './auth.routes.js';
import adminRoutes from './admin.routes.js';
import seriesRoutes from './series.routes.js';
import episodeRoutes from './episode.routes.js';
import dialogueRoutes from './dialogue.routes.js';
import artistRoutes from './artist.routes.js';
import directorRoutes from './director.routes.js';

export default {
  auth: authRoutes,
  admin: adminRoutes,
  series: seriesRoutes,
  episodes: episodeRoutes,
  dialogues: dialogueRoutes,
  artist: artistRoutes,
  director: directorRoutes
};