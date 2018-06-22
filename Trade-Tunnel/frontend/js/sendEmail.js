$(document).ready(function(){
    document.getElementById('submitemail').addEventListener('click', sendEmailId);
});

/* Function to Send Email to recover the password */

function sendEmailId(){
   
   var email = $('#email').val();
    var request = new XMLHttpRequest();
    
    var password = "";
   
   var url = "http://localhost:8080/tradetunnel-api-0.0.1-SNAPSHOT/sendEmail/";
    
    var jsonString = "{\"userEmailId\":\"" + email +"\",\"newPassword\":\"" + password + "\"}";
    
    
    request.onreadystatechange = function() {
        
        if(this.readyState == 4){
              if(this.status == 202)
            {
                alert("Email has been sent to the email" + email);
            }
        else if(this.status == 400){
                alert("Couldn't send a recovery mail... Try again!");
            }
        else{  
                console.log(this.status);
                alert("Email has been sent to the email: " + email);
                window.location = "http://localhost:8080/main/frontend/login.html";
            }
        }
           
       
    };
    
    var jsonObj = JSON.parse(jsonString);
    console.log(jsonObj);

    request.open("POST", url, true);
	request.setRequestHeader('Content-Type', 'application/json');
   request.send(JSON.stringify(jsonObj));
    
}