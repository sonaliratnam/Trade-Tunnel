// Check if the cookie is available or not

var user = getCookie("user");
    
if (user === "") {
    window.location = "http://localhost:8080/main/frontend/login.html";
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


// Intialize all the properties for the page

var userData;
var currentProductId = -1;
var dataProd; //user json
var dataAddr; //address json
var prodDetails; //product json
var catList;  //category list
var subcatList;  //subcategory list

// Place All the User Products
var userProductsList;

// Code for using input files in the form for the product Edit section
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

$(document).ready(function() {
    document.getElementById("profile").click();
    
    userData = JSON.parse(user);
    
    // Greet the user
    $("#usernameGreeting").html("Welcome, "+ userData.firstName);
    
    userProfile();
    
    productsSoldByUser();

    // Form Validation during the edits
    $("#formUser").validate({
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


            city: {
                required: true,
                required: true
            },

            postal: {
                required: true,
                required: true,
                number:true
            },


            email: {
                required: true,
                required:true,
                email: true
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

    // Actual call made from here for form validation
    (function() {
        'use strict';
        window.addEventListener('load', function() {
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.getElementsByClassName('needs-validation');

            // Loop over them and prevent submission
            var validation = Array.prototype.filter.call(forms, function(form) {
                form.addEventListener('submit', function(event) {
                    if (form.checkValidity() == false) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    form.classList.add('was-validated');
                }, false);
            });
        }, false);
    })();
});

// tabulate all data inside a list form from products that the user sells
var productsSoldByUser = function() {
    var xhttpRequest = new XMLHttpRequest();
    
    var url = "http://localhost:8080/tradetunnel-api-0.0.1-SNAPSHOT/userProfiles/"+userData.resourceID+"/product";

    xhttpRequest.onreadystatechange = function() {
        if (this.readyState == 4) {
            var data = JSON.parse(this.responseText);

            populateListUsingProducts(data._embedded.products);
        }
    };
    
    xhttpRequest.open("GET", url, true);
    xhttpRequest.send();
}

var populateListUsingProducts = function(products) {
    
    $(".productsList").empty();
    
    for (var i=0; i<products.length;i=i+1) {
        if (i==0) {
            var listItem = `<a class="list-group-item list-group-item-action active" id="list-home-list" data-toggle="list" role="tab" aria-controls="">`+products[i].productName+`<h6 class="productHiddenId">`+products[i].resourceID+`</h6></a>`;
            
            
            $(".productsList").append(listItem);
            productDetails(products[i].resourceID);
            currentProductId = products[i].resourceID;
            $(".productHiddenId").hide();
        } else {
            var listItem = `<a class="list-group-item list-group-item-action" id="list-home-list" data-toggle="list" role="tab" aria-controls="">`+products[i].productName+`<h6 class="productHiddenId">`+products[i].resourceID+`</h6></a>`;
            $(".productsList").append(listItem);
            
            $(".productHiddenId").hide();
        }
    }
    
    // Changing the product according to the selection
    $(".list-group-item").on('click', function() {
        var id = $(this).find("h6")[0].innerText;
        console.log(id);
        
        productDetails(id);
        currentProductId = id;
    });
    
    // Close the edit functionality 
    $("#cancelProduct").on('click', function() {
       $("#pname").prop("disabled", true);
        $("#category").prop("disabled", true);
        $("#subcategory").prop("disabled", true);
        $("#price").prop("disabled", true);
        $("#desc").prop("disabled", true);
        $("#browse").prop("disabled", true);
        $("#remove").prop("disabled", true);
        $("#files").prop("disabled", true);
        $('#editProduct').css('display', 'block');
        $('#saveProduct').css('display', 'none');
        $('#saveProduct').attr('disabled', 'disabled');
        $('#cancelProduct').css('display', 'none');
    });
    
    $("#cancelUser").on('click', function() {
        $("#firstName").prop("disabled", true);
        $("#lastName").prop("disabled", true);
        $("#email").prop("disabled", true);
        $("#ph").prop("disabled", true);
        $("#addr1").prop("disabled", true);
        $("#addr2").prop("disabled", true);
        $("#city").prop("disabled", true);
        $("#country").prop("disabled", true);
        $("#state").prop("disabled", true);
        $("#postal").prop("disabled", true);
        $("#editUser").css('display', 'block');
        $("#saveUser").css('display', 'none');
        $("#saveUser").attr('disabled', 'disabled');
        $("#cancelUser").css('display', 'none');
    });
    
}

// Enable the edit functionality 

$("#editUser").click(function(){
    $("#firstName").prop("disabled", false);
    $("#lastName").prop("disabled", false);
    $("#email").prop("disabled", true);
    $("#ph").prop("disabled", false);
    $("#addr1").prop("disabled", false);
    $("#addr2").prop("disabled", false);
    $("#city").prop("disabled", false);
    $("#country").prop("disabled", false);
    $("#state").prop("disabled", false);
    $("#postal").prop("disabled", false);
    $("#editUser").css('display', 'none');
    $("#saveUser").css('display', 'block');
    $("#saveUser").attr('disabled', 'disabled');
    $("#cancelUser").css('display', 'block');
});

$("#editProduct").click(function(){
    $("#pname").prop("disabled", false);
    $("#category").prop("disabled", false);
    $("#subcategory").prop("disabled", false);
    $("#price").prop("disabled", false);
    $("#desc").prop("disabled", false);
    $("#browse").prop("disabled", false);
    $("#remove").prop("disabled", false);
    $("#files").prop("disabled", false);
    $('#editProduct').css('display', 'none');
    $('#saveProduct').css('display', 'block');
    $('#saveProduct').attr('disabled', 'disabled');
    $('#cancelProduct').css('display', 'block');
});

// Getting default values set for the page

document.getElementById('sell-form').addEventListener('input', function(){
    $('#saveProduct').prop('disabled', false);
});

document.getElementById('formUser').addEventListener('input', function(){
    $("#saveUser").prop('disabled', false);
});

document.getElementById('saveUser').addEventListener('click', function(){
    var first = document.getElementById('firstName')
});

document.getElementById('orders').addEventListener('click', function(){
    $('.profileTab').css('display', 'none');
    $('.orderTab').css('display', 'block');
    productsSoldByUser();
    loadCategories();
});

document.getElementById('profile').addEventListener('click', function(){
    $('.profileTab').css('display', 'block');
    $('.orderTab').css('display', 'none');
});

document.getElementById('files').addEventListener('change', handleFileSelect, false);


// Update the status of the product each time the status is toggled

function updateStatus(){
    var updateReq = new XMLHttpRequest();
    var updateURl = "http://localhost:8080/tradetunnel-api-0.0.1-SNAPSHOT/product/"+currentProductId;
    
    

    updateReq.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (updateReq.status === 200) {
            } else {
                var errorMessage = dataProd.message;
                alert(errorMessage);
            }
        }
    };
    
    var string = `{ "stat": "" }`;
    
    updateReq.open("PATCH",updateURl,true);
    updateReq.setRequestHeader('Content-Type', 'application/json');
    updateReq.send();
}

// Update the user profile by editing it
function userProfile()
{
    var requestProf = new XMLHttpRequest();
    var urlprof="http://localhost:8080/tradetunnel-api-0.0.1-SNAPSHOT/userProfiles/"+userData.resourceID;

    requestProf.onreadystatechange = function() {
        if (this.readyState == 4) {
            dataProd = JSON.parse(this.responseText);

            console.log(dataProd.firstName);
            popuUserDetails(dataProd);
        }
    };

    requestProf.open("GET", urlprof, true);
    requestProf.send();
}

// Populate the User details on the form 

function popuUserDetails(dataProd){
    document.getElementById("firstName").value=dataProd.firstName;
    document.getElementById("firstName").disabled=true;

    document.getElementById("lastName").value=dataProd.lastName;
    document.getElementById("lastName").disabled=true;

    document.getElementById("email").value=dataProd.emailId;
    document.getElementById("email").disabled=true;

    document.getElementById("ph").value=dataProd.phoneNumber;
    document.getElementById("ph").disabled=true;
    var urlAddr = dataProd._links.address.href;
    address(urlAddr);
}

// populate the address for user details
// Query for the address

function address(address)
{
    var requestAddr = new XMLHttpRequest();
    requestAddr.onreadystatechange = function() {
        if (this.readyState == 4) {
            dataAddr = JSON.parse(this.responseText);
            dataAddr = dataAddr._embedded.addresses[0];
            popuAddrDetails(dataAddr);
        }
    };

    requestAddr.open("GET", address, true);
    requestAddr.send();
}

//  actual updation on screen

function popuAddrDetails(dataAddr){
    document.getElementById("addr1").value=dataAddr.streetAddress1;
    document.getElementById("addr1").disabled=true;

    document.getElementById("addr2").value=dataAddr.streetAddress2;
    document.getElementById("addr2").disabled=true;

    document.getElementById("city").value=dataAddr.city;
    document.getElementById("city").disabled=true;

    document.getElementById("country").value=dataAddr.country;
    document.getElementById("country").disabled=true;

    populateStates( "country","state" );
    document.getElementById("state").value=dataAddr.state;
    document.getElementById("state").disabled=true;

    document.getElementById("postal").value=dataAddr.postalCode;
    document.getElementById("postal").disabled=true;
    
    
}

// Query for selected product

function productDetails(id)
{
    var requestProf = new XMLHttpRequest();
    var urlprof="http://localhost:8080/tradetunnel-api-0.0.1-SNAPSHOT/products/"+id;

    requestProf.onreadystatechange = function() {
        if (this.readyState == 4) {
            prodDetails = JSON.parse(this.responseText);

            console.log(prodDetails.productName);
            populateProdDetails(prodDetails);

        }
    };

    requestProf.open("GET", urlprof, true);
    requestProf.send();
}

// populate the data for the specific product

function populateProdDetails(prodDetails){
    document.getElementById("pname").value=prodDetails.productName;

    document.getElementById("price").value=prodDetails.price;
    
    document.getElementById("desc").value=prodDetails.productDescription;
    
    var stats = prodDetails.stat;
    if(stats == "sold"){
        $("#soldUnsoldSwitch").prop('checked', false);
    }else{
       $("#soldUnsoldSwitch").prop('checked', true);
    }
    
    var catUrl = prodDetails._links.category.href;
    var subcatUrl = prodDetails._links.subcategory.href;
    var imageUrl = prodDetails._links.image.href;
    loadCategory(catUrl);
    loadSubCategory(subcatUrl);
    displayImage(imageUrl);
}


// category loading int the form
function loadCategory(catUrl)
{
    var getCategory = new XMLHttpRequest();
    getCategory.onreadystatechange = function() {
        if (this.readyState == 4) {
            var catData = JSON.parse(this.responseText);
            console.log(catData.categoryName);
            $('#category').val(catData.categoryName);
            populateSubCategory(catData.categoryName);
        }
    };

    getCategory.open("GET", catUrl, true);
    getCategory.send();
}

// subcategory loading in the form

function loadSubCategory(subcatUrl)
{
    var getSubCategory = new XMLHttpRequest();
    getSubCategory.onreadystatechange = function() {
        if (this.readyState == 4) {
            var subcatData = JSON.parse(this.responseText);
            console.log(subcatData.subcategoryName);
            $('#subcategory').val(subcatData.subcategoryName);
        }
    };

    getSubCategory.open("GET", subcatUrl, true);
    getSubCategory.send();
}

// Cancel Button Actions

function canceluser(){
    popuUserDetails(dataProd);
}

function cancelprod() {
    populateProdDetails(prodDetails);
}


// Save Button Actions

function saveProf(){
    var requestsave = new XMLHttpRequest();       

    var urlsave = "http://localhost:8080/tradetunnel-api-0.0.1-SNAPSHOT/userProfiles/"+userData.resourceID;

    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var email = $("#email").val();
    var phoneNumber = $("#ph").val();

    var jsonString = "{\"firstName\":\""+firstName+"\",\"lastName\":\""+lastName+"\",\"emailId\":\""+email +"\",\"phoneNumber\":\""+phoneNumber+"\"}";

    var jsonObj = JSON.parse(jsonString);

    requestsave.onreadystatechange = function () {
        if (this.readyState == 4) {


            dataProd = JSON.parse(this.responseText);

            if (requestsave.status === 200) {
                saveAddr(urlAddr);

            } else {
                var errorMessage = dataProd.message;
            }
        }
    };

    requestsave.open("PATCH", urlsave, true);
    requestsave.setRequestHeader('Content-Type', 'application/json');
    requestsave.send(JSON.stringify(jsonObj));
}

function saveAddr() 
{
    var urlAddr = "http://localhost:8080/tradetunnel-api-0.0.1-SNAPSHOT/addresses/"+dataAddr.resourceID;

    var requestSaveAddr = new XMLHttpRequest();       

    var streetAddress1 = $("#addr1").val();
    var streetAddress2 = $("#addr2").val();
    var city = $("#city").val();
    var state = $("#state").val();
    var country = $("#country").val();
    var postalCode = $("#postal").val();

    var jsonString = "{\"streetAddress1\":\"" +streetAddress1+"\",\"streetAddress2\":\""+streetAddress2+ "\",\"city\":\""+city+"\",\"state\":\""+state+"\",\"country\":\"" +country+"\",\"postalCode\":\""+postalCode+"\"}";

    var jsonObj = JSON.parse(jsonString);

    requestSaveAddr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var dataAddr = JSON.parse(this.responseText);

            if (requestSaveAddr.status === 200) {
                //  alert("Address change Successful!");

            } else {
                var errorMessage = dataAddr.message;
                //   alert("errorMessage");      
            }
        }
    };

    requestSaveAddr.open("PATCH", urlAddr, true);
    requestSaveAddr.setRequestHeader('Content-Type', 'application/json');
    requestSaveAddr.send(JSON.stringify(jsonObj));
}

function saveProductDetails() {
    var requestUpdate = new XMLHttpRequest();       
    var urlProduct= "http://localhost:8080/tradetunnel-api-0.0.1-SNAPSHOT/products/"+currentProductId;

    var pname = $("#pname").val();
    var category = $("#category").val();
    var subcategory = $("#subcategory").val();
    var price = $("#price").val();
    var desc1 = $("#desc").val();
    var status = $("input[name='view2']:checked").val();
    
    var catId;
    var subcatId;
    
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

    var jsonString = "{\"productName\":\"" + pname + "\",\"productDescription\":\"" + desc1 + "\",\"price\":\"" + price + "\",\"stat\":\""+status+"\",\"userProfile\":\"\/userProfiles\/"+userData.resourceID+"\",\"category\":\"categorieses\/"+catId+"\",\"subcategory\":\"subCategorieses\/"+subcatId+"\"}";

    var jsonObj = JSON.parse(jsonString);

    requestUpdate.onreadystatechange = function () {
        if (this.readyState == 4) {

            var data = JSON.parse(this.responseText);
            prodresId = data.resourceID;
            for (var i = 0; f = files[i]; i++) {
                sendImage(f);

            }
        }
    };     
    requestUpdate.open("PATCH", urlProduct, false);
    requestUpdate.setRequestHeader('Content-Type', 'application/json');
    requestUpdate.send(JSON.stringify(jsonObj));           
}

//to load category and sub-category

function loadCategories() {
    var request = new XMLHttpRequest();
    var url = "http://localhost:8080/tradetunnel-api-0.0.1-SNAPSHOT/categorieses";

    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            var data = JSON.parse(this.responseText);
            populateCategory(data);
            catList = data;
        }
    };
    request.open("GET", url, true);
    request.send();
}

// populate the data of the categories and sub categories in the editable form

var populateCategory = function (categorieses) {
    var i = 0;

    for (i = 0; i < categorieses._embedded.categorieses.length; i = i + 1) {
        $('select#category').append('<option>' + categorieses._embedded.categorieses[i].categoryName + '</option>');
    }
};

function populateSubCategory(category) {
    var catReference;

    for (var i = 0; i < catList._embedded.categorieses.length; i = i + 1) {
        if (catList._embedded.categorieses[i].categoryName === category) {
            catReference = catList._embedded.categorieses[i]._links.subCategory.href;
            break;
        }
    }

    var request = new XMLHttpRequest();
    var url2 = catReference;

    $('select#subcategory').empty();
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            var data = JSON.parse(this.responseText);
            subcatList = data;
            for (i = 0; i < data._embedded.subCategorieses.length; i = i + 1) {
                //console.log(data._embedded.subCategorieses[i].subcategoryName);
                
                $('select#subcategory').append('<option>' + data._embedded.subCategorieses[i].subcategoryName + '</option>');
            }
        }
    };
    request.open("GET", url2, true);
    request.send();
};

// display the image into the carousel according to the selected product
var displayImage = function(imageUrl) {

    var xhttpRequest = new XMLHttpRequest();
    xhttpRequest.open("GET",imageUrl,true);
    xhttpRequest.send();

    $("#carouselimg").empty();
    xhttpRequest.onreadystatechange = function() {
        if (xhttpRequest.readyState === 4) {
            var data = JSON.parse(xhttpRequest.responseText);
            var image64 = null;
            var imgArrLen=data._embedded.images.length;
            if (imgArrLen > 0) {

                for(var j=0;j<imgArrLen;j++)
                {
                    image64 = data._embedded.images[j].data;
                    var elem = document.createElement("img");
                    elem.setAttribute("src", 'data:image/*;base64,'+image64);
                    elem.setAttribute("width", "100%");
                    elem.setAttribute("max-width", "350px");
                    elem.setAttribute("class", "mySlides img-responsive");
                    if(j!=0)
                    {
                        elem.setAttribute("style", "display:none;");
                    }
                    document.getElementById("carouselimg").appendChild(elem);
                    var buttons = `<button class="w3-button w3-container w3-white w3-display-left" onclick="plusDivs(-1)">&#10094;</button><button class="w3-button w3-white w3-container w3-display-right" onclick="plusDivs(1)">&#10095;</button>`;
                    
                    $("#carouselimg").append(buttons);
                }
            } 
        }
    }
}

// Handle Multiple Files in the form for updation purpose

function sendImage(f) {
    var xmlHttpRequest = new XMLHttpRequest();       
    var url = "http://localhost:8080/tradetunnel-api-0.0.1-SNAPSHOT/persistImage/single";

    xmlHttpRequest.open("POST", url, true);
    var formData = new FormData();
    // This should automatically set the file name and type.
    formData.append("file", f);
    formData.append("prodId", prodresId);

    // Sending FormData automatically sets the Content-Type header to multipart/form-data
    xmlHttpRequest.send(formData);       

    alert("out of readystatechange reload");
    location.reload();
    request.onreadystatechange = function () {
        alert("before ready 4 reload");

        location.reload();

        if (this.readyState == 4) {

            alert("going to reload");
            location.reload();

            if (request.status === 200) {

                alert("Image Successful!");
            } else {
                alert("Image errorMessage");
            }

        }
    };
}

function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0; f = files[i]; i++) {

    }
    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f1; f1 = files[i]; i++) {

        // Only process image files.
        if (!f1.type.match('image.*')) {
            continue;
        }
    }
}