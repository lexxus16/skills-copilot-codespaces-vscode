// Create web server

// 2. Create a route for the home page
// 3. Create a route for the about page
// 4. Create a route for the contact page
// 5. Create a route for the 404 page
// 6. Listen on port 3000
// 7. Create a route for the comments page
// 8. Create a route for the comments form
// 9. Create a route for the comments form submission
// 10. Create a route for the comments API

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const comments = require('./comments.json');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('<h1>Welcome to the home page!</h1>');
});

app.get('/about', (req, res) => {
    res.send('<h1>Welcome to the about page!</h1>');
});

app.get('/contact', (req, res) => {
    res.send('<h1>Welcome to the contact page!</h1>');
});

app.get('/comments', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'comments.html'));
});

app.get('/comments-form', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'comments-form.html'));
});

app.post('/comments', (req, res) => {
    const comment = req.body;
    comments.push(comment);
    fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
        if (err) {
            res.status(500).send('Unable to save comment');
        } else {
            res.status(201).send('Comment created successfully');
        }
    });
});

app.get('/api/comments', (req, res) => {
    res.json(comments);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
```

### 5. Create a route for the comments page

```javascript
app.get('/comments', (req, res) => {
    res.sendFile(path