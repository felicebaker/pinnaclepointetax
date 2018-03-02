function adjustMarginTopFirstContainer(){
    var heading_div_height = $("#heading_div_3").outerHeight();
    $("#first_container").css("margin-top",""+heading_div_height+"px");
}

function containersMatchWidthAndHeight(){
    for(x=0;x<$(".services_offered_div").length;x++){    
        var width_to_match = $("#services_offered_div_"+(x+1)+"").outerWidth();
        var height_to_match = $("#services_offered_div_"+(x+1)+"").outerHeight();
        $("#services_offered_div_match_height_and_width_"+(x+1)+"").css({"width":""+width_to_match+"px","height":""+height_to_match+"px"});

    }
}

function matchHeight(){
    var height_to_match_array = ["home_page_background","about_us_page_background","services_page_background","services_page_background_2","pricing_page_background","pricing_page_background_2","contact_us_page_background","contact_us_page_background_2"];
    for(x=0;x<height_to_match_array.length;x++){
        if($("#"+height_to_match_array[x]+"").length == 0){
            continue;
        }
        else{
            var height_to_match = $("#"+height_to_match_array[x]+"").outerHeight();
            $("#"+height_to_match_array[x]+"").parent().css("height",""+height_to_match+"px");
        }
       
    }
}

function matchWidthAndHeightGlyphiconCircle(){
    var width_to_match = $(".glyphicon").outerWidth(true);
    var height_to_match = parseInt($(".glyphicon").css("line-height"));
    $(".glyphicon").each(function(){
        if(width_to_match > height_to_match){
            $(this).parent().css({"width":""+width_to_match+"px","line-height":""+width_to_match+"px","border-radius":""+(width_to_match/2)+"px"}); 
        }
        if(height_to_match > width_to_match){
            $(this).parent().css({"width":""+height_to_match+"px","line-height":""+height_to_match+"px","border-radius":""+(height_to_match/2)+"px"});
        }
    });
}

function googleMapResize(){
    if(window.location.href.indexOf('contact')>-1){
        var map_height = $("#google_map_ppt").outerWidth() * .8;
        $("#google_map_ppt").css("height",""+map_height+"px");
    }
}

function googleMapLoadAdjust(){
    if(window.location.href.indexOf('contact')>-1){
        setTimeout(function(){
            $(".contact_us_display").css("visibility","visible");
        },1000);
    }
}

function loadAdjust(){
    setTimeout(function(){
        $(".smth").css("visibility","visible");
    },1000);
}

function footerDivMobileAdjust(){
    var body_height = $("body").outerHeight();
    var window_height = $(window).innerHeight();
    var footer_div_height = $("#footer_div").outerHeight();
    var footer_div_offset_top = $("#footer_div").offset().top;
    if(window_height > body_height){
        $("#footer_div").css({"margin-top":""+((window_height - footer_div_offset_top) - footer_div_height)+"px","visibility":"visible"});
    }
    else{
        $("#footer_div").css("visibility","visible");
    }
}

function changeTitle(){
    var window_location_href = window.location.href;
    var pages =  [["about","About Us - "],
         ["service","Our Services & Products - "],
         ["pricing","Pricing & Discounts - "],
         ["refund","Where's My Refund? - "],
         ["contact","Contact Us - "]];

    for(x=0;x<pages.length;x++){
       if(window_location_href.indexOf(pages[x][0])==-1){
           continue;
       }
       else if(window_location_href.indexOf(pages[x][0])>-1){
           $("title").prepend(pages[x][1]);
       }
    }
}


function submitEmailForm(){
    $("*").on("click",function(){
        if($("#form_submit_alert").css("display")=="block"){
            $(".modal-title").html("");
            $(".modal-body").find("p").html("");
        }
    });
    $(".form_fields").css("border-color","#3f70b2");

    // Blank Fields Check BEGIN

    var first_name_value = $("#first_name").val();
    var last_name_value = $("#last_name").val();
    var email_address_value = $("#email_address").val();
    var inquiry_type_value = $("#inquiry_type").val();
    var message_box_value = $("#message_box").val();
    var input_values = [first_name_value.length,last_name_value.length,email_address_value.length,message_box_value.length];
    var input_ids = ["first_name","last_name","email_address","message_box"];
    var missing_fields = 0;
    for(x=0;x<4;x++){
        if(input_values[x]==0){
           missing_fields++;
           $("#"+input_ids[x]+"").css("border-color","red");
        }
    }
    if($("#inquiry_type").val()=="(Select One)"){
        missing_fields++;
        $("#inquiry_type").css("border-color","red");
    }

    if(missing_fields > 0){
            $(".modal-title").html("The Message Form Is Not Complete");
            $(".modal-body").find("p").html("Please fill in the missing field(s) in red");
            return false;
    }
    else if(missing_fields == 0){

    // Blank Fields Check END

    var response_token = $("#g-recaptcha-response").val();
    $.post("form_verification.php",
    {
        secret: "6LdrHD4UAAAAAGkJF11YCdzJ9MglSjUI7Zmzlaop",
        response: response_token
    },
    function(data, status){
        var data_returned = JSON.parse(data);
        if(data_returned.success == false){
           $(".modal-title").html("Message Has Not Been Sent");
           $(".modal-body").find("p").html("Please complete the ReCAPTCHA test above to prove that you are not a robot");
           return false;
        }
        else if(data_returned.success == true){

        $.post("email_form.php",
        {
            first_name: first_name_value,
            last_name: last_name_value,
            email_address: email_address_value,
            inquiry_type: inquiry_type_value,
            message_box: message_box_value
        },
        function(data, status){
           $(".modal-title").html("Message Has Been Sent");
           $(".modal-body").find("p").html("Thank you for your inquiry! Your message has been received and we will respond to you as soon as possible.");
           grecaptcha.reset();
        });
    }
    });

} // else if(missing_fields == 0){ [closing tag]
}
