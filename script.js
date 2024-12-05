
 var openedOnce = true;

function tester()
{

    if(openedOnce)
    {
        openedOnce = false;
        $("#testMe").attr('src',"door22.gif");
        $("#B_btn").css('display' , 'none');
        openedOnce = false;

        setTimeout(
            function() 
            {
                $(".container").removeClass('caveDoor');
                $(".container").addClass('caveDoor_2');

                setTimeout(
                    function() 
                    {   $(".sec_1").css('backgroundImage' , '');
                        $(".sec_1").css('display' , 'none');
                        $(".sec_2").css('display' , 'block');
                        $(".imgAfterDoor").attr('src',"afterDoor.gif");
        
                        setTimeout(
                        function() 
                        {   
                            window.location.href = "art.html";
                        }, 6000)
                        
                    }, 2500)

                
            }, 5000)
    }
}


function test()
{
    $(".doorImg").attr('src',"");
}

function test2()
{
    alert("green");
}

function test3()
{
    alert("red");
}

// New Particels.js setiings

// Art Page

$( document ).ready(function() {
    setTimeout(
        function() 
        {  
            $('.faderSolid').css("display", "none");
        }, 5000)
});


/* ******************************************************** */

window.onload = function() {
 
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};


/* ******************************************************** */