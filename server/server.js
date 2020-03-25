const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(publicPath,'dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(publicPath, 'index.html'));
    });
}

app.listen(port, () => {
    console.log('Server is up!');
});
