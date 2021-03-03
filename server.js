//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/space-x'));

app.get('/*', (req, res) => 
        res.sendFile(root: path.join(__dirname+'/dist/space-x/index.html'));
  // res.sendFile('index.html', {root: __dirname + 'dist/space-x/'}),
  
);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
