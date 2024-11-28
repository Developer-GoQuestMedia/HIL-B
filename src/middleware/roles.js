// middleware/roles.js
const checkRole = (allowedRoles) => {
    return (req, res, next) => {
      const { role, artistType } = req.user;
      
      if (!allowedRoles.includes(role) && 
          !(role === 'ARTIST' && allowedRoles.includes(artistType))) {
        return res.status(403).json({ message: 'Access denied' });
      }
      next();
    };
  };
  
  export { checkRole };