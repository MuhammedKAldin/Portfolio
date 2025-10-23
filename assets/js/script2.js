    // Default
    resetingCategsParameters();
    $('.hideGameDev').hide(600);

    function myFunction() 
    {
      var x = document.getElementById("panel");
      if(x.style.display === "none")
      {
        x.style.display = "block";
      }
        else {
      x.style.display = "none";
      }

    }

    $("#buzz_Proj").click(function() {
    $('html, body').animate({
        scrollTop: $("#Projects_area").offset().top
    }, 2000);
    });

    $("#buzz_Proj2").click(function() {
    $('html, body').animate({
        scrollTop: $("#Hire_area").offset().top
    }, 2000);
    });

    $("#buzz_Proj3").click(function() {
    $('html, body').animate({
         scrollTop: $("#Contact_area").offset().top
    }, 2000);
    });


  $( "#showDiscordLogo" ).mouseover(function() {
    $('.showDiscord').css('display','block');
  });


  $( "#showDiscordLogo" ).mouseleave(function() {
    $('.showDiscord').css('display','none');
  });

  // Display project information

  $(document).ready(function () {
    // Show preview dynamically
    $("[id^='showMe_']").on("click", function () {
        const index = $(this).attr("id").split("_")[1];
        $(`.preview-place-${index}`).css("display", "block");
    });

    // Close preview dynamically
    $("[id^='closure_']").on("click", function () {
        const index = $(this).attr("id").split("_")[1];
        $(`.preview-place-${index}`).css("display", "none");
    });
});

    
  /* -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+ */

    function resetingCategsParameters() 
     {
       $('.hideWebDev').show(600);
       $('.hideGameDev').show(600);
     }

    $( "#hideGameDev_Btn" ).click(function() { // will add class to hide game dev ones
       resetingCategsParameters();
       $('.hideGameDev').hide(600);
    });

    $( "#hideWebDev_Btn" ).click(function() { // will add class to hide game dev ones
      resetingCategsParameters();
      $('.hideWebDev').hide(600);
   });

    $( "#showAllDev" ).click(function() { // will add class to hide game dev ones
     resetingCategsParameters();
  });
