module.exports = function (app) {
    // var checkToken = require('./constants/token');
    var youtube = require('./controllers/youtube');

    app.route('/youtube').post(youtube.youtubev4);

    app.route('/youtube3').post(youtube.youtubev3);

}