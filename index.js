import 'dotenv/config'
import cors from 'cors'
import express from 'express'
const app = express();

import connectDb from './config/connectDb.js'
import shortUrlRouter from './routers/shorturl_router.js'

// Basic Configuration
const port = process.env.PORT || 3000;
connectDb()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});
app.use('/api', shortUrlRouter)


app.listen(port, function() {
  console.log(`Listening on port ${port}`);
  console.log(`http://localhost:${port}`);
});
