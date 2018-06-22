// Check for the cookie if available or not

function checkCookie(userDetail) {
    var user = getCookie("user");
    
    if (user == "") {
           setCookie("user", userDetail, 30);
       }
} 

function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    console.log(name);
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


$(document).ready(function() {

    // Login Form validation event handler
    
    document.getElementById("signin-form").addEventListener('submit', function(event) {
        if (document.getElementById("signin-form").checkValidity() == false) {
            event.preventDefault();
            event.stopPropagation();

        } else {
            //signup call
            event.preventDefault();
            signin();

        }

        document.getElementById("signin-form").classList.add('was-validated');
    });
    
    // Login Form validation event handler
    document.getElementById("registration-form").addEventListener('submit', function(event) {
        if (document.getElementById("registration-form").checkValidity() == false) {

                event.preventDefault();
                event.stopPropagation();

        } else {
            //signin call
                event.preventDefault();
                signup();
        }

        document.getElementById("registration-form").classList.add('was-validated');

    });
    
    // Logic for toggle of the registration and 
     $(".register").hide();
     
     $("#loginLink").click(function() {
         $(".login").show();
         $(".register").hide();
     });
     
    $("#register").click(function(){
        $(".login").hide();
        $(".register").show();  
    });

    $("#back").click(function() {
        $(".register").hide();
        $(".login").show();
    });
     
    
    // Validation rules for the Signin form
    $("#signin-form").validate({
        rules: {
            email: {
            required: true,
            email: true
          },
          password : {
                required: true,
                minlength: 6
            }
        }
    });
    
    
     // Validation rules for the registration form
$("#registration-form").validate({
    rules: {
       fname: {
        required: true,
       required: true
      },

        lname: {
        required: true,
       required: true
      },

         addr1: {
        required: true,
       required: true
      },

         addr2: {
        required: true,
       required: true
      },


         city: {
        required: true,
       required: true
      },

         zip: {
        required: true,
       required: true,
        number:true
      },
        
        phone: {
            number: true
        },
        
      registrationPassword : {
            required: true,
            minlength: 6
        },

        confirm_password: {
            required: true,
            minlength: 6,
            equalTo: "#registrationPassword"
        },

      registrationEmail: {
        required: true,
        email: true
      }

    }
});
      
     
});


// Signs in the user code by doing proper authentication

function signin() {
    var request = new XMLHttpRequest();
     var username = $("#emailField").val();
     var password = $("#passwordField").val();

     var url = "http://localhost:8080/tradetunnel-api-0.0.1-SNAPSHOT/login/user/" + username + "/" + password;

     request.onreadystatechange = function () {
         if (this.readyState == 4) {

             var data = JSON.parse(this.responseText); 

             if (request.status === 200) {
//                 closeModal();
                 
                 //set the cookie for operation
                 console.log(JSON.stringify(data));
                 checkCookie(JSON.stringify(data));
                 
                 window.location = "http://localhost:8080/main/frontend/home.html";
             } else {
                 //closeModal();

                 var errorMessage = data.message;
                 alert(errorMessage);
             }

         }
     };

     request.open("POST", url, true);
     request.send();
}

// Signs up the user for the product

function signup() {
    var request = new XMLHttpRequest();       
     var url = "http://localhost:8080/tradetunnel-api-0.0.1-SNAPSHOT/register";


     var firstName1 = $("#fname").val();
     var lastName1 = $("#lname").val();
     var phonee1 = $("#phone").val();
     var email1 = $("#registrationEmail").val();
     var passWord1 = $("#registrationPassword").val();




     var jsonString = "{\"firstName\":\"" + firstName1 + "\",\"lastName\":\"" + lastName1 + "\",\"emailId\":\"" + email1 + "\",\"passWord\":\"" + passWord1 + "\",\"phoneNumber\":\"" + phonee1 + "\"}";

     var jsonObj = JSON.parse(jsonString);




     request.onreadystatechange = function () {
         if (this.readyState == 4) {

             var data = JSON.parse(this.responseText);

             if (request.status === 200) {
                    console.log(JSON.stringify(data));
                    checkCookie(JSON.stringify(data));
                    sendAddress(data.resourceID);
             } else {
                 var errorMessage = data.message;
                    alert(errorMessage);       
             }

         }
     };



     request.open("POST", url, true);
     request.setRequestHeader('Content-Type', 'application/json');

     request.send(JSON.stringify(jsonObj));
}

// During the registration the address of the user is passed here to store in database

function sendAddress(userId) {

     var request = new XMLHttpRequest();       
     var url = "http://localhost:8080/tradetunnel-api-0.0.1-SNAPSHOT/addresses";




     var addr1 = $("#address1").val();
     var addr2 = $("#address2").val();
     var country = $("#country").val();
     var state = $("#state").val();
     var city = $("#city").val();
     var zip = $("#zip").val();



     var jsonString = "{\"streetAddress1\":\"" + addr1 + "\",\"streetAddress2\":\"" + addr2 + "\",\"city\": \"" + city + "\",\"state\":\"" + state + "\",\"country\": \"" + country + "\",\"postalCode\": \"" + zip + "\",\"userProfile\":\"\/userProfiles\/"+userId+"\"}";

     var jsonObj = JSON.parse(jsonString);




     request.onreadystatechange = function () {
         if (this.readyState == 4) {

             var data = JSON.parse(this.responseText);

             if (request.status === 200 || request.status === 201) {
//                 closeModal();

                 window.location = "http://localhost:8080/main/frontend/home.html";
             } else {
//                 closeModal();

                 var errorMessage = data.message;
                alert(errorMessage);       
             }

         }
     };



     request.open("POST", url, true);
     request.setRequestHeader('Content-Type', 'application/json');

     request.send(JSON.stringify(jsonObj));



 }