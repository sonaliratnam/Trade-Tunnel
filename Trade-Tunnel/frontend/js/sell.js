var catList;
var subcatList;
var prodresId;
var files;
var f;

function bs_input_file() {
    $(".input-file").before(
        function () {
            if (!$(this).prev().hasClass('input-ghost')) {
                var element = $("<input type='file' class='input-ghost' style='visibility:hidden; height:0'>");
                element.attr("name", $(this).attr("name"));
                element.change(function () {
                    element.next(element).find('input').val((element.val()).split('\\').pop());
                });
                $(this).find("button.btn-choose").click(function () {
                    element.click();
                });
                $(this).find("button.btn-reset").click(function () {
                    element.val(null);
                    $(this).parents(".input-file").find('input').val('');
                });
                $(this).find('input').css("cursor", "pointer");
                $(this).find('input').mousedown(function () {
                    $(this).parents('.input-file').prev().click();
                    return false;
                });
                return element;
            }
        }
    );
}
$(function () {
    bs_input_file();
});

var userData;

$(document).ready(function () {
    var user = getCookie("user");
    
    if (user === "") {
        window.location = "http://localhost:8080/main/frontend/login.html";
    }
    
    userData = JSON.parse(user);
    
    $("#usernameGreeting").html("Welcome, "+userData.firstName);



    // document.getElementById('files').addEventListener('change', handleFileSelect, false);
    document.getElementById('files').addEventListener('change', handleFileSelect, false);
    //getLocation();


    loadFilter();



    $("#sell-form").validate({
        rules: {
            pname: {
                required: true,
                required: true
            },


            pname1: {
                required: true,
                required: true
            },

            category: {
                required: true,
                required: true
            },

            subcategory: {
                required: true,
                required: true
            },

            price: {
                required: true,
                number: true
            },


            desc: {
                required: true,
                required: true
            },

            file2: {
                required: true,
                required: true,
                accept: "png|jpe?g|gif"
            },


            file1: {
                required: true,
                required: true,
                accept: "png|jpe?g|gif"
            }




        }
    });

    document.getElementById("sell-form").addEventListener('submit', function (event) {
 
                    if (document.getElementById('sell-form').checkValidity() == false) {

                        event.preventDefault();
                        event.stopPropagation();
                    } else {
                        event.preventDefault();

                        sendsell();
                    }
                    document.getElementById('sell-form').classList.add('was-validated');
                });


});


function resetpage() {
    location.reload();
}



function loadFilter() {
    var request = new XMLHttpRequest();
    var url = "http://localhost:8080/tradetunnel-api-0.0.1-SNAPSHOT/categorieses";
    //var url= "data.json";
    //   openModal();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            //    closeModal();
            var data = JSON.parse(this.responseText);
            //   alert(data._embedded.categorieses[0].categoryName);
            populateCategory(data);
            catList = data;
        }
    };
    request.open("GET", url, true);
    request.send();
}

var populateCategory = function (categorieses) {
    var i = 0;

    for (i = 0; i < categorieses._embedded.categorieses.length; i = i + 1) {
        //  for (i=0;i<categorieses.length;i=i+1) {

        console.log(categorieses._embedded.categorieses[i].categoryName);
        $('select#category').append('<option>' + categorieses._embedded.categorieses[i].categoryName + '</option>');

        /*    console.log(categorieses[i].categoryName);            
            $('select').append( '<option>' + categorieses[i].categoryName + '</option>' ); */
    }
};



function populateSubCategory(category) {
    var catReference;

    $("#subcategory").empty();
    $("#subcategory").html(`<option value="" selected disabled hidden>Select Subcategory</option>`);
    
    for (var i = 0; i < catList._embedded.categorieses.length; i = i + 1) {
        //  for (var i=0;i<categorieses.length;i=i+1) {  
        if (catList._embedded.categorieses[i].categoryName === category) {
            catReference = catList._embedded.categorieses[i]._links.subCategory.href;
            console.log(catReference);
            break;
        }
    }

    var request = new XMLHttpRequest();
    //var url2 = "subcat.json";
    var url2 = catReference;

    //   openModal();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            //    closeModal();
            var data = JSON.parse(this.responseText);
            subcatList = data;
            for (i = 0; i < data._embedded.subCategorieses.length; i = i + 1) {

                console.log(data._embedded.subCategorieses[i].subcategoryName);
                $('select#subcategory').append('<option>' + data._embedded.subCategorieses[i].subcategoryName + '</option>');
            }
        }
    };
    request.open("GET", url2, true);
    request.send();

};



function sendsell() {

//    alert("inside sendsell");
    // openModal();

    var request = new XMLHttpRequest();   
    
    
    var url = "http://localhost:8080/tradetunnel-api-0.0.1-SNAPSHOT/products";

    var formData = new FormData();
    var subcatId,catId;
    var pname = $("#pname1").val();
    var category = $("#category").val();
    var subcategory = $("#subcategory").val();
    var price = $("#price").val();
    var desc1 = $("#desc1").val();
    
    for (var i = 0; i < subcatList._embedded.subCategorieses.length; i = i + 1) { 
        if (subcatList._embedded.subCategorieses[i].subcategoryName === subcategory) {
            subcatId = subcatList._embedded.subCategorieses[i].resourceID;
            break;
        }
    }
    
   for (var i = 0; i < catList._embedded.categorieses.length; i = i + 1) {
        if (catList._embedded.categorieses[i].categoryName === category) {
            catId = catList._embedded.categorieses[i].resourceID;
            break;
        }
    }

    //  alert("in send sell");
    var jsonString = "{\"productName\":\"" + pname + "\",\"productDescription\":\"" + desc1 + "\",\"price\":\"" + price + "\",\"stat\":\"unsold\",\"userProfile\":\"\/userProfiles\/"+userData.resourceID+"\",\"category\":\"categorieses\/"+catId+"\",\"subcategory\":\"subCategorieses\/"+ subcatId +"\"}";


    var jsonObj = JSON.parse(jsonString)

    request.onreadystatechange = function () {//
        if (this.readyState == 4) {

            var data = JSON.parse(this.responseText);
            // console.log(data);
            if (request.status === 201) {
                prodresId = data.resourceID;
                //event.preventDefault();
                
                formData.append("prodId",prodresId);

                for (var i = 0; f = files[i]; i++) {
                    formData.append("file",f);
                } 
                
                sendImage(formData);
                
                alert("Product has been registered!");
                resetpage();

            } else {
                var errorMessage = data.message;
                //     alert("Send errorMessage");       
            }

        }
    };


     
    request.open("POST", url, true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.send(JSON.stringify(jsonObj));

           
}





function sendImage(formData) {

    // openModal();

    var xmlHttpRequest = new XMLHttpRequest();       
    var url = "http://localhost:8080/tradetunnel-api-0.0.1-SNAPSHOT/persistImage/single";

    xmlHttpRequest.open("POST", url, true);

    // Sending FormData automatically sets the Content-Type header to multipart/form-data
    xmlHttpRequest.send(formData);       

                        
    xmlHttpRequest.onreadystatechange = function () {

        if (this.readyState == 4) {

            if (xmlHttpRequest.status === 200) {
                   
                resetpage();
            }

        }
    };




           
}


function getAvg(subcategory) {
    var subcatId;

    for (var i = 0; i < subcatList._embedded.subCategorieses.length; i = i + 1) { 
        if (subcatList._embedded.subCategorieses[i].subcategoryName === subcategory) {
            subcatId = subcatList._embedded.subCategorieses[i].resourceID;
            break;
        }
    }


    var request = new XMLHttpRequest();       
    var url = "http://localhost:8080/tradetunnel-api-0.0.1-SNAPSHOT/average/"+subcatId;



    request.onreadystatechange = function () {
        if (this.readyState == 4) {


            var data = JSON.parse(this.responseText);
            console.log(data);
            if (request.status === 200) {
                var errorMessage = data.message;
                //  alert("Avg Successful!");
                //   alert(data._embedded.floats[0]);


                var avgDb=data._embedded.floats[0].toFixed(2);

                if(avgDb>0)
                {
    
                    $("#price").attr('data-content', "Average Price for this item is " + avgDb);

                    $("#price").popover({
                        trigger: 'hover'
                    });
                    $("#price").popover({
                        trigger: 'focus'
                    });
                } else {
                    $("#price").attr('data-content', "New Item");

                    $("#price").popover({
                        trigger: 'hover'
                    });
                    $("#price").popover({
                        trigger: 'focus'
                    });
                }


            } else {
                //   var errorMessage = data.message;
                //    alert("Avg errorMessage");       
            }

        }
    }; 
    request.open("GET", url, true);
    //  request.setRequestHeader('Content-Type', 'application/json');

    request.send();


}



function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    map.setCenter(new google.maps.LatLng(lat, lng));
}



function handleFileSelect(evt) {
    // alert(evt.target.files);
    files = evt.target.files; // FileList object
    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0; f = files[i]; i++) {

    }
    //  document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';


    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f1; f1 = files[i]; i++) {

        // Only process image files.
        if (!f1.type.match('image.*')) {
            continue;
        }

        //sendImage(f);       

    }
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

