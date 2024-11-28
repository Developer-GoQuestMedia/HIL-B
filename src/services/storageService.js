// services/storageService.js
class StorageService {
    async uploadVideo(file, dialogueId) {
      try {
        const r2Client = this.getR2Client();
        const key = `dialogues/${dialogueId}/video`;
        
        const result = await r2Client.upload({
          Bucket: process.env.R2_BUCKET,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype
        });
        
        return result.Location;
      } catch (error) {
        logger.error('Video upload failed', error);
        throw error;
      }
    }
  
    getSignedUrl(key) {
      const r2Client = this.getR2Client();
      return r2Client.getSignedUrl('getObject', {
        Bucket: process.env.R2_BUCKET,
        Key: key,
        Expires: 3600 // URL expires in 1 hour
      });
    }
  }