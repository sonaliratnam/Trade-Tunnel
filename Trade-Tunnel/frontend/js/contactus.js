
(function ($) {
    "use strict";


    //  Focus Contact2
    
    $('.input2').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })



    // Validate the details taken from the user
    var name = $('.validate-input input[name="name"]');
    var email = $('.validate-input input[name="email"]');
    var message = $('.validate-input textarea[name="message"]');


    // check for all fields
    $('.validate-form').on('submit',function(){
        var check = true;

        if($(name).val().trim() == ''){
            showValidate(name);
            check=false;
        }


        if($(email).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            showValidate(email);
            check=false;
        }

        if($(message).val().trim() == ''){
            showValidate(message);
            check=false;
        }

        return check;
    });


    $('.validate-form .input2').each(function(){
        $(this).focus(function(){
            hideValidate(this);
        });
    });

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    // custom event listener for sendButton clicked

    document.getElementById('sendBtn').addEventListener('click', sendEmail);
    
    function sendEmail(){
        
        
        
        var messageBody= "hello";
        var messageFrom= "vinukundnani@gmail.com";
        var msgTo= "ipproject2018@gmail.com";
        var msgSubject= "Contactus from" ;
        
        $.ajax({
            type: 'POST',
            url: 'https://mandrillapp.com/api/1.0/messages/send.json',
            data: {
                'key': '8158f3d53b0381b0e9700edf24570cce-us18',
                'message': {
                    'from_email': messageFrom,
                    'to': [
                        {
                            'email': messageTo,
                            'name': 'RECIPIENT NAME (OPTIONAL)',
                            'type': 'to'
                        }
                    ],
                    'autotext': 'true',
                    'subject': 'YOUR SUBJECT HERE!',
                    'html': 'YOUR EMAIL CONTENT HERE! YOU CAN USE HTML!'
                }
            }
        }).done(function(response) {
            console.log(response); // if you're into that sorta thing
        });
    }
})(jQuery);