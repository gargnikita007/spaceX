function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}
//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/space-x'));

app.get('/*', (req, res) => 
     //   res.sendFile(root: '/dist/space-x/index.html'));
   res.sendFile('index.html', {root: 'dist/space-x/'}),
  
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
