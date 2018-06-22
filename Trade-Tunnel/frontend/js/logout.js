// Common Code for logout of the session of the website

$(document).ready(function() {
    $("#logout").click(function() {
        document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    });
});
