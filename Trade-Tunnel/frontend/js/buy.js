// Check for cookies or redirect to login

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

// Modal for loader/spinner Control
var openModal = function() {
        document.getElementById('modal-logo').style.display = 'block';
        document.getElementById('fade-logo').style.display = 'block';
};

var closeModal = function() {
        document.getElementById('modal-logo').style.display = 'none';
        document.getElementById('fade-logo').style.display = 'none';
};


// function generating appropriate card based on the product

function setCard(productId, name, description, price, date, status) {
    var property;
    
    if (status.toUpperCase() === "SOLD") {
        property="alert-danger";
    } else {
        property="alert-success";
    }
    
    var card = `<div class="card productCard">
                <img class="card-img-top" alt="Card image cap" width="300" height="150">
                <div class="card-body">
                    <h6 class="productId hide" >`+productId+`</h6>
                  <h4 class="card-title"> <strong> Product Name: </strong>`+name+`</h4>
                  <p class="card-description"> `+description+`</p>
                </div>
                <div class="card-footer">
                  <large class="text-muted price"> <strong> Price: </strong> $ `+price+`</large><h4 class="status"><div class="`+property+`">`+status.toUpperCase()+`</div></h4>
                </div>
              </div>`; 
    return card;
};

var imageForNoData = `<img id="imageForNoData" src="assets/uniqueChoice.png" alt="Unique Choice Image" style="width: 75%;height: 100%;">`;
var userData;
var products;

// Helps getting the page ready for the DOM manipulation efficiently

$(document).ready(function(){
    
    
    userData = JSON.parse(user);
    
    $("#usernameGreeting").html("Welcome, "+userData.firstName);
    
    
    console.log("load done");
    

    document.getElementById("Filters").addEventListener('input', function(){
        $('#clearFilters').css('display', 'block');
    });

    document.getElementById("buyBtn").addEventListener('click', loadFilter);
	
	document.getElementById("submit").addEventListener('click', handleFormSubmit);
    
    document.getElementById("clearFilters").addEventListener('click', clearFilter());
	
	 document.getElementById("closeFilter").addEventListener('click', clearFilter());
    
    //initMap();

    
    //Load a HTTP Request GET for the data at initial page load
    var request = new XMLHttpRequest();
    var url = "http://localhost:8080/tradetunnel-api-0.0.1-SNAPSHOT/load/"+userData.resourceID;
    openModal();
    
    request.onreadystatechange = function() {
        if (this.readyState == 4) {
            closeModal();
            var data = JSON.parse(this.responseText);
            
            $(".row1").empty();
            $(".productCard").remove();
            products = data._embedded.products;
            populateCards();
        }
    };
    
    request.open("GET", url, true);
    request.setRequestHeader("Accept-Origin","*");
    request.send();
    
    
    //search bar function for filtering out results
    
    $("#search").keypress(function(e) {
        
        if(e.which == 13) {
            e.preventDefault();
            if ($("#search").val() == "") {
                
                var request = new XMLHttpRequest();
                var url = "http://localhost:8080/tradetunnel-api-0.0.1-SNAPSHOT/load/"+userData.resourceID;
                openModal();

                request.onreadystatechange = function() {
                    if (this.readyState == 4) {
                        closeModal();
                        var data = JSON.parse(this.responseText);

                        $(".row1").empty();
                        $(".productCard").remove();
                        products = data._embedded.products
                        populateCards();
                    }
                };

                request.open("GET", url, false);
                request.setRequestHeader("Accept-Origin","*");
                request.send();
            } else {
                var xhttpRequest = new XMLHttpRequest();
                var url = "http://localhost:8080/tradetunnel-api-0.0.1-SNAPSHOT/search/"+$("#search").val()+"/"+userData.resourceID;
                console.log(url);
                openModal();

                xhttpRequest.onreadystatechange = function() {
                    if (this.readyState == 4) {
                        closeModal();
                        var data = JSON.parse(this.responseText);
                        
                        if (data._embedded == undefined) {
                            $(".productCard").remove();
                            $("#imageForNoData").remove();
                            $(".row1").append(imageForNoData);
                        } else {
                            $(".productCard").remove();
                            $(".row1").empty();
                            products = data._embedded.products
                            populateCards()
                        }
                    }
                };
                xhttpRequest.open("GET", url, false);
                xhttpRequest.send();
            }
        }
    });

    
    
    //Register Click Events for the buy page
    $("#previous").click(function(){
        if (currentPage <= 1) {
            currentPage = 1;
        } else {
            currentPage = currentPage - 1;
            console.log(currentPage);
            rePopulateCards();
        }
        
    });
    
    $("#next").click(function(){
        if (currentPage >= totalPages) {
            currentPage = totalPages;
        } else {
            currentPage = currentPage + 1;
            console.log(currentPage);
            rePopulateCards();
        }
        
    });
});

// Import Image using the request and transcode from _base64 format

var importImage = function(imageUrl) {
    var xhttpRequest = new XMLHttpRequest();
    xhttpRequest.open("GET",imageUrl,false);
    xhttpRequest.send();
    
    if (xhttpRequest.status === 200) {
        var data = JSON.parse(xhttpRequest.responseText);
        var image64 = null;
        if (data._embedded.images.length > 0) {
            image64 = data._embedded.images[0].data;
        } 
        return image64;
    }
    
}

var currentPage = 1;
var totalPages = -1;

// intialize the page with all products

var populateCards = function() {
    var i = 0;
    console.log(products.length);
    if (products.length >= 9) {
        totalPages = Math.ceil((products.length)/9);
        console.log(totalPages);
    } else {
        totalPages = 1;
        console.log(totalPages);
    }
    
    for (i=((currentPage-1)*9);i<9;i=i+1) {
        
        if (products[i] != undefined) {
            
            var productName = products[i].productName;
            var productDescription = products[i].productDescription;
            var price = products[i].price;
            var createDate = products[i].createDate;
            var stat = products[i].stat;
            var id = products[i].resourceID;


            var card = setCard(id, productName, productDescription, price, createDate, stat);

            if (i==0 || i==1 || i==2) {
                $(".row1").append(card);
            } else if (i==3 || i==4 || i==5) {
                $(".row2").append(card);
            } else if (i==6 || i==7 || i==8) {
                $(".row3").append(card);
            }

            var cardImages = document.querySelectorAll(".card-img-top");


            //import the image
            var image = importImage(products[i]._links.image.href);
            if (image != null) {
                cardImages[i].src = 'data:image/*;base64,'+image;
            }
        }
    }
    
    $(".productCard").on('click', function() {
        var productId = $(this).find("h6")[0].innerText;
        console.log(productId);
        
        //redirection to new product code
        window.location = "http://localhost:8080/main/frontend/productDetails.html?id="+productId;
    });
    
};

// Helps in repopulation of the cards in the view with new results from filter and search bar

var rePopulateCards = function() {
    
    $(".row1").empty();
    $(".row2").empty();
    $(".row3").empty();

    
    for (var j=((currentPage-1)*9);j<(((currentPage-1)*9)+9);j=j+1) {

            var productName = products[j].productName;
            var productDescription = products[j].productDescription;
            var price = products[j].price;
            var createDate = products[j].createDate;
            var stat = products[j].stat;
            var id = products[j].resourceID;


            var card = setCard(id, productName, productDescription, price, createDate, stat);

            if ((j%9)==0 || (j%9)==1 || (j%9)==2) {
                $(".row1").append(card);
            } else if ((j%9)==3 || (j%9)==4 ||(j%9)==5) {
                $(".row2").append(card);
            } else if ((j%9)==6 || (j%9)==7 || (j%9)==8) {
                $(".row3").append(card);
            }

            var cardImages = document.querySelectorAll(".card-img-top");


            //import the image
            var image = importImage(products[j]._links.image.href);
            if (image != null) {
                cardImages[j%9].src = 'data:image/*;base64,'+image;
            }
    
    $(".productCard").on('click', function() {
        var productId = $(this).find("h6")[0].innerText;
        console.log(productId);
        
        //redirection to new product code
        window.location = "http://localhost:8080/main/frontend/productDetails.html?id="+productId;
    });
    }
   document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera 
};

// Handling the code for submission of the filter form

function handleFormSubmit(){
    
    var jsonString = "";
    
    var category = $("#category").val();
    if(category !== ""){
        jsonString +=  "\"categories\" : [ \"" + category + "\"],";
        
    }
    
    
	var subcategory = [];
	var temp;
    
	/* look for all checkboes that have a parent id called 'checkboxlist' attached to it and check if it was checked */
	$("#sublist input:checked").each(function() {
        //temp = $(this).val();
        temp= $(this).attr('id');
        temp = "\"" +temp + "\"";
		subcategory.push(temp);
	});
	
    if(subcategory.length > 0){
        var selected;
        selected = subcategory.join(',') ;

        /* check if there is selected checkboxes, by default the length is 1 as it contains one single comma */
        if(selected.length > 0){
            console.log("You have selected " + selected);	
        }else{
            console.log("Please at least check one of the checkbox");	
        }
        
        jsonString += "\"subcategories\": [ " + subcategory +"],";
    }
	/* we join the array separated by the comma */
	
	
    var from = $("#minVal").val();
    
    /*if(from !== ""){
        jsonString +=  "\"range\" : { \"from\" : "  + from  + ",";
    }*/
        
    var to =$("#maxVal").val();
    if(from!== "" && to!== ""){
        jsonString +=   "\"range\" : { \"from\" : "  + from  + "," + " \"to\" : " + to + "},";
    }
    else if(from === "" && to !== ""){
        //
       //   jsonString += " \"to\" : " + "500" + "},";
    }
    else if(from !== "" && to === ""){
        jsonString  +=   "\"range\" : { \"from\" : "  + from  + " \"to\" : " + "500" + "},";
    }
    
    var location = $("#location").val();
    if(location !== ""){
        jsonString +=  "\"city\": \""+ location + "\"";
    }
    
    if(jsonString.charAt(jsonString.length-1) === ','){
        jsonString = jsonString.substring(0, jsonString.length-1);
    }
    
    console.log(jsonString);
    
    jsonString = "{" + jsonString +"}";
    
    var jsonObj = JSON.parse(jsonString);
    console.log(jsonObj);
	
	 var request = new XMLHttpRequest();
	 
	
    openModal();
    
    
    // Send a AJAX request for the filtered products
    
    var url = "http://localhost:8080/tradetunnel-api-0.0.1-SNAPSHOT/products/filter/"+userData.resourceID;
    request.onreadystatechange = function() {
        if (this.readyState == 4) {
        closeModal();
        var data = JSON.parse(this.responseText);
            
            console.log(data);
            
            //close the main modal body & Populate the cards
            document.getElementById("closeFilter").click();
            $(".productCard").remove();
            $(".row1").empty();
                products = data._embedded.products;
            
                if (products.length < 0) {
                   $(".row1").append(imageForNoData); 
                }
            
                rePopulateCards();
            
        }
    };

    request.open("POST", url, false);
	request.setRequestHeader('Content-Type', 'application/json');
	
    request.send(JSON.stringify(jsonObj));
    
    
}

// Clears all the parameters for filters

function clearFilter(){
    $("select#category").prop('selectedIndex', 0);
    $("#sublist").empty();
    $("#subLabel").css('display', 'block');
    $("#minVal").val("");
    $("#minVal").prop('placeholder', '0');
    $("#maxVal").val("");
    $("#maxVal").prop('placeholder', '500');
    $("#location").val("");
    $("#location").prop('placeholder', 'Enter City');
}

// Helps load the filter with categories

function loadFilter(){
    var request = new XMLHttpRequest();
    var url = "http://localhost:8080/tradetunnel-api-0.0.1-SNAPSHOT/categorieses";

    request.onreadystatechange = function() {
        if (this.readyState == 4) {
            var data = JSON.parse(this.responseText);

            populateCategory(data);
            catList= data;
        }
    };
    request.open("GET", url, true);
    request.send();
}

// populate all the categories in the filter

var populateCategory = function(categorieses) {
    var i = 0, categorylist;
    var list = document.getElementById("category").options;

    for (i=0;i<categorieses._embedded.categorieses.length;i=i+1) {
        var flag = true;
        categoryName = categorieses._embedded.categorieses[i].categoryName;
        list = document.getElementById("category").options;
        if(list.length == 1){
        $('select').append( '<option>' + categorieses._embedded.categorieses[i].categoryName + '</option>' );
        continue;
        } 
       for(var j = 0; j < list.length ; j++){
           
           if(list[j].value.toLowerCase() == categoryName.toLowerCase()){
               flag = false;
               break;
           }
       }  
        
        if(flag){
            $('select').append( '<option>' + categorieses._embedded.categorieses[i].categoryName + '</option>' );
        }
    }
};


// get all the subcategories from the category

function populateSubCategory(category) {
    var catReference;
    
    if(category === "notSelected"){
        $("#sublist").empty();
        $("#subLabel").css('display', 'block');
        
    }
    else{
        $("#sublist").empty();
        $("#subLabel").css('display', 'none');
        
        for (var i=0;i<catList._embedded.categorieses.length;i=i+1) {
            
            if(catList._embedded.categorieses[i].categoryName === category) {
                catReference = catList._embedded.categorieses[i]._links.subCategory.href;
                console.log(catReference);
                break;
            }
        }

        var request = new XMLHttpRequest();
        var url2 = catReference;
        request.onreadystatechange = function() {
            if (this.readyState == 4) {
                var data = JSON.parse(this.responseText);
                
                if(data._embedded.subCategorieses.length <= 5)
                {
                    
                     for (i=0;i<data._embedded.subCategorieses.length;i=i+1) {
                        
                         var divInput1= "<input class=\"invisible\" type=\"checkbox\" id = \""  + data._embedded.subCategorieses[i].subcategoryName + "\" />";
		
                        var pathDiv= "<path d=\"M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z\"></path>";
                         var polyDiv= "<polyline points=\"4 11 8 15 16 6\"></polyline>";
                        var svgDiv= "<svg width=\"20px\" height=\"20px\" viewBox=\"0 0 20 20\">"+pathDiv+polyDiv+"</svg>";
                        var checkClass= "<div class=\"checkbox\">"+svgDiv+"</div>";
                        var spanDiv1= "<span>"+data._embedded.subCategorieses[i].subcategoryName+"</span>";

                        var divLabel1= "<label class=\"label-cbx\" for=\"" + data._embedded.subCategorieses[i].subcategoryName + "\">"+divInput1+checkClass+spanDiv1+"</label>";

                        var divColPadding= "<div class=\"col-sm-1\"></div>";
                                        var divColPadding2= "<div class=\"col-sm-5\"></div>";
                        var divCol1= "<div class=\"col-sm-6\">"+divLabel1 + "</div>";

                        var divRow = "<div class=\"row\">"+divColPadding +divCol1+divColPadding2+divColPadding+"</div>";

                        $('#sublist').append(divRow);

                  }
                    
                }
                    else
                {
                    var dataBool = false;
                    if(data._embedded.subCategorieses.length %2 != 0)
                        {
                            dataBool= true;
                        }
                        var i=0;
                       for(i=0; i < data._embedded.subCategorieses.length; i+=2)
                        {
                           
                            var divInput1= "<input class=\"invisible\" type=\"checkbox\" id = \""  + data._embedded.subCategorieses[i].subcategoryName + "\" />";
                            var divInput2= "<input class=\"invisible\" type=\"checkbox\" id = \""  + data._embedded.subCategorieses[i+1].subcategoryName + "\" />";

                            var pathDiv= "<path d=\"M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z\"></path>";
                             var polyDiv= "<polyline points=\"4 11 8 15 16 6\"></polyline>";
                            var svgDiv= "<svg width=\"20px\" height=\"20px\" viewBox=\"0 0 20 20\">"+pathDiv+polyDiv+"</svg>";
                            var checkClass= "<div class=\"checkbox\">"+svgDiv+"</div>";
                            var spanDiv1= "<span>"+data._embedded.subCategorieses[i].subcategoryName+"</span>";
                            var spanDiv2= "<span>"+data._embedded.subCategorieses[i+1].subcategoryName+"</span>";

                            var divLabel1= "<label class=\"label-cbx\" for=\"" + data._embedded.subCategorieses[i].subcategoryName + "\">"+divInput1+checkClass+spanDiv1+"</label>";
                            var divLabel2= "<label class=\"label-cbx\" for=\"" + data._embedded.subCategorieses[i+1].subcategoryName + "\">"+divInput2+checkClass+spanDiv2+"</label>";

                            var divCol1= "<div class=\"col-sm-6\">"+divLabel1 + "</div>";
                            var divCol2= "<div class=\"col-sm-6\">"+divLabel2 + "</div>";

                            var divRow = "<div class=\"row\">" +divCol1 +divCol2+"</div>";

                            $('#sublist').append(divRow);
                            
                            if(dataBool && ((i+1) === data._embedded.subCategorieses.length-2))
                                {
                                    break;
                                }
                            

                        } 
                    if(dataBool)
                    {
                            
                         var divInput1= "<input class=\"invisible\" type=\"checkbox\" id = \""  + data._embedded.subCategorieses[i+2].subcategoryName + "\" />";
		
                        var pathDiv= "<path d=\"M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z\"></path>";
                         var polyDiv= "<polyline points=\"4 11 8 15 16 6\"></polyline>";
                        var svgDiv= "<svg width=\"20px\" height=\"20px\" viewBox=\"0 0 20 20\">"+pathDiv+polyDiv+"</svg>";
                        var checkClass= "<div class=\"checkbox\">"+svgDiv+"</div>";
                        var spanDiv1= "<span>"+data._embedded.subCategorieses[i+2].subcategoryName+"</span>";

                        var divLabel1= "<label class=\"label-cbx\" for=\"" + data._embedded.subCategorieses[i+2].subcategoryName + "\">"+divInput1+checkClass+spanDiv1+"</label>";

                                        var divColPadding= "<div class=\"col-sm-6\"></div>";
                        var divCol1= "<div class=\"col-sm-6\">"+divLabel1 + "</div>";

                        var divRow = "<div class=\"row\">"+divCol1+divColPadding+"</div>";

                        $('#sublist').append(divRow);
                    }
                }
            }
        };
        request.open("GET", url2, true);
        request.send();
    }  
};

