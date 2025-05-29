/**
 * CrossOriginMW Middleware
 *
 * Cross-origin middleware handles requests between different origins (domains, schemes, or ports)
 * on the web, ensuring secure communication between web pages and APIs. It's a security feature
 * that allows a server to specify which origins are permitted to access its resources.
 */
export default class CrossOriginMW {
  middleware = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('X-Frame-Options', 'DENY');

    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  };
}
