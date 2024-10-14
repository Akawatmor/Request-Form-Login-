const { isUtf8 } = require('buffer');
const { json } = require('stream/consumers');

function startFunction(){
  toggleStudentForm(0);
  toggleTeacherForm(0);
  toggleAdminForm(0);
}
function APIRequest(){
  const name = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  const utype = document.getElementById("utype").value;
  var json2;

  if(checkField()){

    fetch("https://restapi.tu.ac.th/api/v1/auth/Ad/verify", {
      method: "POST",
      body: JSON.stringify({
        UserName: name,
        PassWord: pass
      }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Application-Key" : "TUecac773883f2433fc71a4432562774ce8872bf7fc11dfa548c5808ba62166ed387af71abcc56b4f6da1014ea0197c7d6"
    }

    })
    .then(response => response.json())
    .then(json => {

    console.log(json);
    
    if (json.status == true){
      if(json.type == utype){

        console.log(json.displayname_th);
        document.getElementById("output").innerText = "ยินดีต้อนรับ " + json.displayname_th;
        if (json.type == "student")
          isStudent();

        if (json.type == "teacher")
          isTeacher();
        
      }
      else if(utype == "auto"){
        document.getElementById("utype_detect").innerText = "Detected : "+json.type;
        console.log(json.displayname_th);
        document.getElementById("output").innerText = "ยินดีต้อนรับ " + json.displayname_th;
      }
      else if (0 & utype != "none"){
        console.warn("Config of mismatch type is set to 1, this mismatch type will must be unset in later date!");
        console.log(json.displayname_th);
        document.getElementById("output").innerText = "ยินดีต้อนรับ " + json.displayname_th;
      }
      else{
        console.error("Type mismatch! please change to correct type!");
        document.getElementById("output").innerText = "Error : Type mismatch";
      }

      stu = 1;
      tea = 0;
      adm = 0;
      
      
    }
    else{
      document.getElementById("output").innerText = "Error : " + json.message;
    }
    


    })
    .catch(error => console.error("Error : ",error));
  }

  else{
    console.error("Error : Username or Password Cannot be blank!");
  }
  
}

function isStudent(){
  toggleStudentForm(1);
  toggleTeacherForm(0);
  toggleAdminForm(0);
}

function isTeacher(){
  toggleStudentForm(0);
  toggleTeacherForm(1);
  toggleAdminForm(0);
}

function isNone(){
  toggleStudentForm(0);
  toggleTeacherForm(0);
  toggleAdminForm(0);
}

function showPassword(){
  var passfield = document.getElementById("password");
  if (passfield.type == "password"){
    passfield.type = "text";
  }
  else{
    passfield.type = "password";
  }
}

function checkField(){
  const name = document.getElementById("username").value == "";
  const pass = document.getElementById("password").value == "";
  if (name+pass){
    if(name)document.getElementById("username").style.border = "5px solid red";
    else document.getElementById("username").style.border = "none";
    if(pass)document.getElementById("password").style.border = "5px solid red";
    else document.getElementById("password").style.border = "none";

    text = "User or Password cannot be blank";
    alert(text);
    document.getElementById("output").innerText = text;
  }
  else
    return 1;
}

function toggleStudentForm(argument){
  var argform = document.getElementById("studentlogin");
  if (argument)
    argform.style.display = "block";
  else
    argform.style.display = "none";
  
}

function toggleTeacherForm(argument){
  var argform = document.getElementById("teacherlogin");
  if (argument)
    argform.style.display = "block";
  else
    argform.style.display = "none";
  
}

function toggleAdminForm(argument){
  var argform = document.getElementById("adminlogin");
  if (argument)
    argform.style.display = "block";
  else
    argform.style.display = "none";
  
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
