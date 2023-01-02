const express = require('express');
const bodyParser = require('body-parser');
//const client = require("@mailchimp/mailchimp_marketing");
const https = require('https')

app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', function(req, res) {
    res.sendFile(__dirname + "/signup.html");
})
app.post('/', function(req, res) {
    const fname = req.body.Fname;
    const lname = req.body.Lname;
    const eml = req.body.email;
    const data = {
        members: [{
            email_address: eml,
            status: "subscribed",
            merge_fields: {
                FNAME: fname,
                LNAME: lname
            }
        }]

    };
    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/e0c9f26025"
    const options = {
        method: "POST",
        auth: "alam:03ba7c5c0534ea3a5a77de90ea23717c-us21"
    }
    const request = https.request(url, options, function(response) {
        console.log("Response: " + response.statusCode);
        if (response.statusCode == 200)
            res.sendFile(__dirname + "/success.html");
        else
            res.sendFile(__dirname + "/failure.html")


        response.on("data", function(data) {
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
});
app.post('/failure',function(req,res){
	res.redirect('/');
})
app.listen(process.env.PORT||3000, function(res, req) {
    console.log("Server is running on port 3000");
})

//api key : 03ba7c5c0534ea3a5a77de90ea23717c-us21
//audience id: e0c9f26025

//         client.setConfig({
//             apiKey: "03ba7c5c0534ea3a5a77de90ea23717c-us21",
//             server: "us21",
//         });

//     const run = async () => {
//         const response = await client.lists.addListMember("e0c9f26025", {
//             email_address: eml,
//             status: "subscribed",
//             merge_fields: {
// 	FNAME: fname,
// 	LNAME: lname

// }

//         });
//         console.log(response);
//     };

//     run();