$(document).ready(function(){
   
   document.getElementById('submitpassword').addEventListener('click', sendPassword);
});



/*function for sending the updated password*/

function sendPassword(){
    var email = $('#recover_email').val();
    var password = $('#password').val();
     var confirmpassword = $('#confirmpassword').val();
     var request = new XMLHttpRequest();
    var url = "http://localhost:8080/tradetunnel-api-0.0.1-SNAPSHOT/userprofile/recover";
        
    if(password !== confirmpassword){
        alert("Passwords do not match");
        return;
    }
    
    var jsonString = "{\"userEmailId\":\""+ email + "\",\"newPassword\":\"" + password  + "\"}";
    
     request.onreadystatechange = function() {
        if (this.readyState == 4) {
           var data =  JSON.parse(this.responseText);
            
            console.log(data);  //202 - accepted, 400- bad request
            alert("Password is changed!!");
            window.location = "http://localhost:8080/main/frontend/login.html";
        }
         
    };
    
    var jsonObj = JSON.parse(jsonString);
    console.log(jsonObj);

    request.open("POST", url, true);
	request.setRequestHeader('Content-Type', 'application/json');
	
    request.send(JSON.stringify(jsonObj));
    
}