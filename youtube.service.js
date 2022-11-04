const google = require('googleapis').google;
const credentials = require('./zuhaib-367615-e7443966834b.json');
const scopes = ['https://www.googleapis.com/auth/youtube'];

const auth = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    scopes
  );

const youtube = google.youtube({ version: 'v3', auth });


const youtube_parser= (url) =>{
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    let match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}

const youtubeVideoDeatils = async (url)=>{
    let obj = {}
    const id = youtube_parser(url)
    const res = await youtube.videos.list(
        {
            "part": [
              "snippet"
            ],
            "id": [
              id
            ]
          }
    )
    obj.Videotitle = res.data.items[0].snippet.title
    obj.channelTitle = res.data.items[0].snippet.channelTitle
    obj.channelId = res.data.items[0].snippet.channelId
    const {data} = await youtube.channels.list({
        "part": [
          "statistics"
        ],
        "id": [
            res.data.items[0].snippet.channelId
        ]
      })
    obj.viewCount = data.items[0].statistics.viewCount;
    obj.subscriberCount = data.items[0].statistics.subscriberCount;
    obj.videoCount = data.items[0].statistics.videoCount;
    
    return obj;
}



module.exports = {
    youtube_parser,
    youtubeVideoDeatils
}