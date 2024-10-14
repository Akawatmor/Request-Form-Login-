const { isUtf8 } = require('buffer');
const { json } = require('stream/consumers');

function APIRequest(){

  fetch("https://restapi.tu.ac.th/api/v1/auth/Ad/verify", {
    method: "POST",
    body: JSON.stringify({
      UserName: 6609681231,
      PassWord: 1839901890374
    }),
  headers: {
    "Content-type": "application/json; charset=UTF-8",
    "Application-Key" : "TUecac773883f2433fc71a4432562774ce8872bf7fc11dfa548c5808ba62166ed387af71abcc56b4f6da1014ea0197c7d6"

  }

  })
  .then((response) => response.json())
  .then((json) =>console.log(json));
}


function call_RESTAPI(){
    const name = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    const url = (
        'http://localhost:8080/hello?' +
        new URLSearchParams({myName : name,lastName : pass}).toString()
    );

    fetch(url)
    .then(response => response.text())
    .then(text=>{
        console.log("Rest api text"+text);
        document.getElementById("output").innerText = text;
    })
    .catch(error => console.error("Error : ",error))

}

function call_API(){
	

var https = require('https');

var options = {
  'method': 'GET',
   'hostname': 'restapi.tu.ac.th',
  'path': '/api/v2/profile/std/info/?id=6609681231',
  'headers': {
    'Content-Type': 'application/json',
    'Application-Key': 'TUecac773883f2433fc71a4432562774ce8872bf7fc11dfa548c5808ba62166ed387af71abcc56b4f6da1014ea0197c7d6'
  }
};

var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

req.end();




}