// Check for the cookie if available

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
    var user = getCookie("user");
    
    if (user === "") {
        window.location = "http://localhost:8080/main/frontend/login.html";
    }
    
    var userData = JSON.parse(user);
    
    
    // Print greeting of the user
    
    $("#usernameGreeting").html("Welcome, "+userData.firstName);
    
    
    // Redirection to appropriate pages
    
    $(".buy").click(function() {
       window.location = "http://localhost:8080/main/frontend/buy.html";
   });
    
    $(".sell").click(function() {
        window.location = "http://localhost:8080/main/frontend/sell.html";
    });
});