// Require Node modules and packages needed by the server
var express = require('express'); // the Express web framework
var path = require('path'); // utility for working with file/directory paths
var http = require('http'); // Node's built-in HTTP server
var bodyParser = require('body-parser'); // parses incoming request bodies
var cookieParser = require('cookie-parser'); // parses cookies in requests
var logger = require('morgan'); // logs HTTP requests to the console

// Create the Express application
var app = express();

// Get the defined routing files
var index = require('./server/routes/app'); // default route (renders the index page)
var messageRoutes = require('./server/routes/messages'); // CRUD routes for messages
var contactRoutes = require('./server/routes/contacts'); // CRUD routes for contacts
var documentsRoutes = require('./server/routes/documents'); // CRUD routes for documents

// Tell Express where the views are and which engine to use.
// The Angular application is built into dist/cms/browser, so we render
// the generated index.html from there as the single page of our app.
app.set('views', path.join(__dirname, 'dist/cms/browser'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// Log every request to the console
app.use(logger('dev'));

// Parse JSON and url-encoded request bodies (needed for POST/PUT requests)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Parse cookies sent with requests
app.use(cookieParser());

// Serve the static files that make up the built Angular application
app.use(express.static(path.join(__dirname, 'dist/cms/browser')));

// Tell Express to map the default route ("/") to the index route
app.use('/', index);

// Map the RESTful resource URLs to their routing files
app.use('/messages', messageRoutes);
app.use('/contacts', contactRoutes);
app.use('/documents', documentsRoutes);

// Tell Express to map all other non-defined routes back to the index page
app.use(function (req, res, next) {
  res.render('index');
});

// Define the port the server will listen on
const port = process.env.PORT || '3000';
app.set('port', port);

// Create the HTTP server and have it listen on the configured port
const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));
