const express = require('express'),
    app = express(),
    request = require('request')
const querystring = require('querystring')

app.get("/", (req,res,next) => {
    res.send("Welcome google dns")
})

app.get("/get_video_info", (req,res,next) => {
    let txt = ""
    request.get("https://docs.google.com/get_video_info?docid=" + req.query.docid + "&format=android", (err, resp, body) => {
        if (err) throw err;
        if (resp.statusCode == 200) {
            txt = body
            res.redirect("/e/get_video_info?" + txt)
        }
    })
})

app.get("/e/get_video_info", (req,res,next) => {
    let url = "http://player3.fullhdfilmizlesene.org/gdd/fgo/get.php?url=https://drive.google.com/file/d/" + req.query.docid + "/view"
    let data = req.query
    request(url, (err, response, body) => {
        if (err) throw err;
        if (response.statusCode == 200) {
            let hasilGrab = JSON.parse(body)
            let label = {
                "1080p" : "37",
                "720p" : "22",
                "480p" : "59",
                "360p" : "18"
            }
            let fmt_stream_map = ""
            hasilGrab.forEach((doc) => {
                if (label[doc.label]) {
                    fmt_stream_map += label[doc.label] + "|" + encodeURIComponent(doc.file.replace(new RegExp("redirector", "gi"), "r1---sn-o097zne7")) + ","
                }
            })
            data.fmt_stream_map = fmt_stream_map
            let hasilurl = querystring.stringify(data)
            res.send(hasilurl)
        }
    })
})
app.listen(8087, () => console.log("Application listen on port 8087"))