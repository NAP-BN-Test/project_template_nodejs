var fs = require('fs');
var { google } = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var readline = require('readline');
var SCOPES = ['https://www.googleapis.com/auth/youtube.readonly'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'youtube-nodejs-quickstart.json';
const axios = require('axios');

function getNewToken(oauth2Client, callback) {
    var authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    });
    console.log('Authorize this app by visiting this url: ', authUrl);
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('Enter the code from that page here: ', function (code) {
        rl.close();
        oauth2Client.getToken(code, function (err, token) {
            if (err) {
                console.log('Error while trying to retrieve access token', err);
                return;
            }
            oauth2Client.credentials = token;
            storeToken(token);
            callback(oauth2Client);
        });
    });
}
function getChannel(auth) {
    var service = google.youtube('v3');
    service.channels.list({
        auth: auth,
        part: 'snippet,contentDetails,statistics',
        forUsername: 'GoogleDevelopers'
    }, function (err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }
        var channels = response.data.items;
        if (channels.length == 0) {
            console.log('No channel found.');
        } else {
            console.log('This channel\'s ID is %s. Its title is \'%s\', and ' +
                'it has %s views.',
                channels[0].id,
                channels[0].snippet.title,
                channels[0].statistics.viewCount);
        }
    });
}
const { YoutubeDataAPI } = require("youtube-v3-api")
const API_KEY = 'AIzaSyAtCI4qXGCuc4OfZbqYPjH0QCXWFnNwCPA';
const api = new YoutubeDataAPI(API_KEY);
var search = require('youtube-search');
var ypi = require('youtube-channel-videos');
const getYoutubeChannelId = require('get-youtube-channel-id');

const passport = require('passport')
module.exports = {
    youtube: (res, req) => {
        // Load client secrets from a local file.
        fs.readFile('C:/images_services/ageless_sendmail/client_secret.json', function processClientSecrets(err, content) {
            if (err) {
                console.log('Error loading client secret file: ' + err);
                return;
            }
            console.log(JSON.parse(content));
            // Authorize a client with the loaded credentials, then call the YouTube API.
            // authorize(JSON.parse(content), getChannel);
        });
    },
    youtubev2: (res, req) => {
        // var opts = {
        //     maxResults: 100,
        //     key: 'AIzaSyAtCI4qXGCuc4OfZbqYPjH0QCXWFnNwCPA'
        // };
        // search('8291129582155939458 ', opts, function (err, results) {
        //     if (err) return console.log(err);

        //     // console.dir(results.length);
        //     req.json(results)
        // });
        var url = 'https://www.youtube.com/channel/UCqIkpLdlBmqk1JTKSMUdJFw';
        // var url = 'https://www.youtube.com/channel/UCFW28bvTsD-a9HKTuLHqepQ';
        // AIzaSyCwwxGuObftytgmOoogEoAyNC0TMZwnOKI:  Cao Nguyen
        var result = false;
        // ypi.channelVideos("AIzaSyCwwxGuObftytgmOoogEoAyNC0TMZwnOKI", 'UCGALuZglid2HUDS859HifOg', function (channelItems) {
        //     console.log(channelItems, 1);
        // });
        (async function () {
            result = await getYoutubeChannelId(url);
            console.log(result);

            if (result !== false) {
                if (result.error) {
                    console.log(`Have a error, try again`);
                } else {

                    ypi.channelVideos("AIzaSyCwwxGuObftytgmOoogEoAyNC0TMZwnOKI", result.id, function (channelItems) {
                        console.log(channelItems, 1);
                    });
                    console.log(`Channel ID: ${result.id}`);
                }
            } else {
                console.log('Invalid youtube channel URL');
            }
        })();
    },
    youtubev3: (res, req) => {
        const { google } = require('googleapis');
        const youtube = google.youtube('v3');

        youtube.playlistItems.list({
            key: 'AIzaSyAtCI4qXGCuc4OfZbqYPjH0QCXWFnNwCPA',
            part: 'id,snippet',
            playlistId: 'PLvxLmGsmqdZc-GYVeLhS0N_6jfrzEleQm',
            maxResult: 10,
        }, (err, results) => {
            console.log(err ? err.message : results.items[0].snippet);
        });
    },
    // &order=viewCount
    // "nextPageToken": "CAIQAA", thay đổi vào pageToken=CAIQAA sẽ next trang
    // "prevPageToken": "CAEQAQ",
    youtubev4: async (req, res) => {
        await axios.get(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyCwwxGuObftytgmOoogEoAyNC0TMZwnOKI&channelId=UC7tPk1F9H5e2vGUmTDlz9nQ&part=snippet,id&order=date&maxResults=10&type=video&pageToken=CAIQAA`).then(data => {
            if (data) {
                var result = {
                    array: data.data,
                    all: data.data.items.length
                }
                res.json(result);
            }
            else {
                res.json(Result.SYS_ERROR_RESULT)
            }
        })
    },

    googleLogin: async (req, res) => {
        passport.authenticate('google', { scope: ['profile', 'email'] })
    },
    googleCallback: async (req, res) => {
        passport.authenticate('google', { failureRedirect: '/failed' }),
            function (req, res) {
                // Successful authentication, redirect home.
                res.redirect('/good');
            }
    },
    dataScraping: async (req, res) => {
        const request = require('request');
        const cheerio = require('cheerio');
        for (let i = 0; i < 1000; i++) {
            await request('https://www.anphatpc.com.vn/laptop-acer-nitro-5-an515-56-79u2-nh.qbzsv.001-core-i7-11370h-8gb-512gb-gtx-1650-4gb-15.6-inch-fhd-win-10-den_id37137.html', async function (error, response, body) {
                console.error('error:', error); // Print the error if one occurred
                const $ = cheerio.load(body);
                let ds = $(body).find("b.js-pro-total-price")
                ds.each(function (i, e) {
                    console.log($(this).text().trim());
                })
                // console.log(ds);
            });
        }
        var result = {
            // body: body,
            // response: response,
            message: 'test'
        }
        res.json(result);
    }
}