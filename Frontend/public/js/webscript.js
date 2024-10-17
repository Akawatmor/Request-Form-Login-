

function startFunction(){

  toggleStudentForm(0);
  toggleTeacherForm(0);
  toggleAdminForm(0);

}

  function togglePass(){
  var hideicon = document.getElementById("hideicon");
  var showicon = document.getElementById("showicon");
  var passfield = document.getElementById("password");

  if (passfield.type == "password"){
    passfield.type = "text";
    hideicon.style.display = "none";
    showicon.style.display = "inline";
  }
  else{
    passfield.type = "password";
    hideicon.style.display = "inline";
    showicon.style.display = "none";
  }

}

function printMessage(errorcode, messageinput){
  var name = document.getElementById("username").value;
  var pass = document.getElementById("password").value;
  const utype = document.getElementById("utype").value;
  var output = document.getElementById("output");
  var output2 = document.getElementById("message2");
  var output3 = document.getElementById("message3");

  const error1 = "Error 1 : Username or Password can't be empty!";
  const error2 = "Error 2 : User Role isn't selected, please select your role"
  const error3 = "Error 3 : User Role mismatch with the user credential"
  const error4 = "Error 4 : Password is invalid! Please Re-enter Password"
  const error5 = "Error 5 : Cannot Request API"
  const error6 = "Error 6 : Username is invaild! Please Re-enter Username & Password"
  const error7 = "Error 7 : API Key Invalid! Please check API Key"
  const error8 = "Error 8 : Request header is wrongly define! Cannot Continue"


  const warning1 = "Warning 1 : User Role is mismatch with current user credential, but can allowed on"

  const normal1 = "Welcome "
  const normal2 = "ยินดีต้อนรับ "
  const normal5 = "ระบบยังไม่ได้ Implement เนื่องด้วยเกินขอบเขตที่ได้บอกไว้ใน User Story"

  /* Input Error Code
  0X - 1X : Error ->
  1 : Username or password cannot be empty
  2 : User role isn't selected
  3 :
  4 :
  5 :

  2X : Warning ->
  1 :

  5X : Normal Message ->
  0 : {messageinput print}
  1 : ยินดีต้อนรับ {messageinput print}
  5 : ระบบยังไม่ได้ Implement เนื่องด้วยเกินขอบเขตที่ได้บอกไว้

  */

  switch (errorcode){
    case 1:
      console.error(error1)
      output.innerText = error1;
      output.style.color = "red";

      break;
    case 2:
      console.error(error2);
      output.innerText = error2;
      output.style.color = "red";

      break;

    case 3:
      console.error(error3);
      output.innerText = error3;
      output.style.color = "red";
  
      break;

    case 4:
      console.error(error4);
      output.innerText = error4;
      output.style.color = "red";
  
      break;

    case 5:
      console.error(error5);
      output.innerText = error5;
      output.style.color = "red";
  
      break;

    case 6:
      console.error(error6);
      output.innerText = error6;
      output.style.color = "red";
  
      break;

    case 7:
      console.error(error7);
      output.innerText = error7;
      output.style.color = "red";
  
      break;

    case 8:
      console.error(error8);
      output.innerText = error8;
      output.style.color = "red";
  
      break;

    case 51:
      var messagefunc = "ยินดีต้อนรับ " + messageinput;
      console.log(messagefunc);
      output.innerText = messagefunc;
      output.style.color = "black";

      break;
    case 55:
      var messagefunc = normal5;
      console.log(messagefunc);
      output2.innerText = messagefunc;
      output2.style.color = "red";
      output2.style.fontSize = "24px";
      output3.innerText = messagefunc;
      output3.style.color = "red";
      output3.style.fontSize = "24px";

  }


}

function isEmpty(){
  const user = document.getElementById("username").value == "";
  const pass = document.getElementById("password").value == "";


    if (user+pass){
      printMessage(1,null);
      return 1;
    }
    else{
      return 0;
    }
}

function APIRequest(){
  const name = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  const utype = document.getElementById("utype").value;
  var name1 = document.getElementById("username");
  var pass1 = document.getElementById("password");
  var utype1 = document.getElementById("utype");


  if(checkField()){

    fetch("https://restapi.tu.ac.th/api/v1/auth/Ad/verify", {
      method: "POST",
      body: JSON.stringify({
        UserName: name,
        PassWord: pass
      }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Application-Key" : "{Your Api key here!}"
    }

    })
    .then(response => response.json())
    .then(json => {
    console.log(json);

    // can be request api without error
    if (json.status == true){

      // if type is the same
      if(json.type == utype){
        printMessage(51,json.displayname_th);

        if (utype == "student"){
          isStudent();
          disableLogin();
        }

        if (utype == "employee"){
          isTeacher();
          disableLogin();
        }
        
      }

      else{
        utype1.style.border = "5px solid rgba(256, 96, 0, 1)";
        printMessage(3,null);
      }

    }

    // cannot be requested api (Wrong name)
    else{
      if (json.message == "Password Invalid!"){
      printMessage(4,null);
      pass1.style.border = "5px solid rgba(256, 96, 0, 1)";
      }

      else if (json.message == "Users or Password Invalid!"){
      printMessage(6,null);
      pass1.style.border = "5px solid rgba(256, 96, 0, 1)";
      name1.style.border = "5px solid rgba(256, 96, 0, 1)";

      }

      
      else if (json.error == "Authentication failed due to the following reason: invalid token. Confirm that the access token in the authorization header is valid."){
        printMessage(7,null);
      }

    }

    })
    // catch other error
    .catch(error => {
      console.error("Error : ",error);
      printMessage(8,null);
    });
    

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

function disableLogin(){
  document.getElementById("username").disabled = true;
  document.getElementById("password").disabled = true;
  document.getElementById("utype").disabled = true;
  document.getElementById("submitbutton").disabled = true;
  document.getElementById("submitbutton").style.cursor = "not-allowed";

  if (document.getElementById("password").type == "text"){
    togglePass();
  }

  document.getElementById("hideicon").style.cursor = "not-allowed";
  document.getElementById("showicon").style.cursor = "not-allowed";
  document.getElementById("hideicon").setAttribute( "onclick", "javascript: doNothing();" );
  document.getElementById("showicon").setAttribute( "onclick", "javascript: doNothing();" );

}

function doNothing(){

}

//check all field include utype
function checkField(){
  const name = document.getElementById("username").value == "";
  const pass = document.getElementById("password").value == "";
  const usertype = document.getElementById("utype").value == "none";

  if (name){
    document.getElementById("username").style.border = "5px solid red";
    printMessage(1,null);
  }
  else{
    document.getElementById("username").style.border = "5px solid rgba(0, 0, 0, 0.3)";
  }

  if (pass){
    document.getElementById("password").style.border = "5px solid red";
    printMessage(1,null);
  }
  else{
    document.getElementById("password").style.border = "5px solid rgba(0, 0, 0, 0.3)";
  }

  if (usertype){
    document.getElementById("utype").style.border = "5px solid red";
    printMessage(2,null);
  }
  else{
    document.getElementById("utype").style.border = "5px solid rgba(0, 0, 0, 0.3)";
  }

  return (name+pass+usertype) == 0;

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

function unImplement(){

  printMessage(55,null);
}

function logOut(){
  var text = "Do you want to logout?";
  if (confirm(text) == true) {
    location.reload();
  } else {}
  
}

/*
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
  'path': '/api/v2/profile/std/info/?id=',
  'headers': {
    'Content-Type': 'application/json',
    'Application-Key': ''
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
*/