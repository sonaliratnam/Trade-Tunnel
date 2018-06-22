// Checkt the cookie if its available

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




$(document).ready(function(){
    
    var user = getCookie("user");
    
    if (user === "") {
        window.location = "http://localhost:8080/main/frontend/login.html";
    }
    
    var userData = JSON.parse(user);
    
    // greeting for the user on the page
    
    $("#usernameGreeting").html("Welcome, "+userData.firstName);
    
  products();
  
})
    
    
// Populate all the data for the particular product
function products() {
    var currentUrlString = window.location.href;
    var url = new URL(currentUrlString);
    var productId = url.searchParams.get("id");
    console.log(productId);
    
    var requestProd = new XMLHttpRequest();
    var urlProd = "http://localhost:8080/tradetunnel-api-0.0.1-SNAPSHOT/products/"+productId;

    requestProd.onreadystatechange = function() {
        if (this.readyState == 4) {
            var dataProd = JSON.parse(this.responseText);
            
            console.log(dataProd.productName);
            console.log(dataProd.productDescription);
            console.log(dataProd.price);
            console.log(dataProd.stat);
            $('#prod1').html(dataProd.productName);
            $('#prod2').html(dataProd.productDescription);
            $('#prod3').html("$ "+dataProd.price);
            $('#prod4').html(dataProd.stat);
            var user = dataProd._links.userProfile.href;
            var imageUrl = dataProd._links.image.href;
            displayImage(imageUrl);
            userDetails(user);
        }
    };
            
  requestProd.open("GET", urlProd, true);
    requestProd.send();
} 

// This function displays the image in the carousel for the particular product

var displayImage = function(imageUrl) {
    
    var xhttpRequest = new XMLHttpRequest();
    xhttpRequest.open("GET",imageUrl,true);
    xhttpRequest.send();
    
    xhttpRequest.onreadystatechange = function() {
        if (xhttpRequest.readyState === 4) {
            var data = JSON.parse(xhttpRequest.responseText);
           // alert(data._embedded.images.length);
            var image64 = null;
            var imgArrLen=data._embedded.images.length;
            if (imgArrLen > 0) {

                for(var j=0;j<imgArrLen;j++)
                    {
                         image64 = data._embedded.images[j].data;
                        
                            var elem = document.createElement("img");
                            elem.setAttribute("src", 'data:image/*;base64,'+image64);
                            elem.setAttribute("height", "450px");
                            elem.setAttribute("width", "450px");
                            elem.setAttribute("class", "mySlides");
                            if(j!=0)
                            {
                                elem.setAttribute("style", "display:none;");
                            }
                            document.getElementById("carouselimg").appendChild(elem);
                       
                    }
      
               
            } 
        }
    }
    
}
   
// Gather all the user details and populate on page

function userDetails(user){
    //Address
    var request = new XMLHttpRequest();
    var url = user;

    request.onreadystatechange = function() {
        if (this.readyState == 4) {
            var data = JSON.parse(this.responseText);

            //$('#demo').html(data.emailId);
            
           $("#demo").append( "<a href=\"mailto:"+data.emailId + "\">"+data.emailId+"</a>" );
            $('#demo1').html(data.firstName + " " + data.lastName);
            //$('#demo2').html(data.location);
            $('#demo3').html(data.phoneNumber);
            var addr = data._links.address.href;
            console.log(addr);
            address(addr);

   }
  };
        request.open("GET", url, true);
        request.send();   
}

// Display the address of the user + Show it on the map with markers
    
function address(addr){
    
    //Address
    var request = new XMLHttpRequest();
    var url = addr;

    request.onreadystatechange = function() {
        if (this.readyState == 4) {
            var data = JSON.parse(this.responseText);
            data = data._embedded.addresses[0];
            console.log(data);
            var userAddress = data.streetAddress1+","+data.streetAddress2+","+data.city+","+data.state+","+data.postalCode+","+data.country;
            console.log(userAddress);
            $('#demo2').html(userAddress);

        
            
    var map;
    var infowindow;
    var markers = [];
     var geocoder = new google.maps.Geocoder();
     var address= userAddress; //document.getElementById("demo2").innerHTML;
     var geocoder = new google.maps.Geocoder();
            
     geocoder.geocode( { 'address': address}, function(results, status) {

  if (status == google.maps.GeocoderStatus.OK) {
    
        var latitude = results[0].geometry.location.lat();
    var longitude = results[0].geometry.location.lng();
     console.log(latitude,longitude);
      var cordStr= latitude+","+longitude;
    initMap(cordStr);
  }
          infowindow = new google.maps.InfoWindow();

    });
            
    function initMap(latLng) {
        var res = latLng.split(",").map(Number);
        var lat = res[0];
        var lng = res[1];
        console.log("lat:" + lat + " lng:" + lng);
        
        
        var property = {lat: lat, lng: lng};
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: property
        });
        var marker = new google.maps.Marker({
            position: property,
            map: map,
            mapTypeId: google.maps.MapTypeId.ROADMAP,

        });
        markers.push(marker);
        google.maps.event.addListener(marker, 'mouseover', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });

    }

    google.maps.event.addDomListener(window, 'load', initMap);
            
        }
    };
    request.open("GET", url, true);
    request.send();
}
