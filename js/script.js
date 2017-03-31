$(function(){
  // Si on voit trop les autres menus
  $("#coffre").hide()
  $("#portes").hide()

  $(".btn:not(:has(.ret))").click(function(){

      if($(this).data('link')){

        $(".active").hide('slide',{direction:'right'},500)
        $(".active").removeClass("active")
        var obj = $(this)
        setTimeout(function(){
          $("#"+obj.data('link')).show('slide',{direction:'right'},500);
        }, 600);
        $("#"+$(this).data('link')).addClass("active")

      }

  })

  $(".ret").click(function(){
    $(".active").hide('slide',{direction:'right'},500)
    $(".active").removeClass("active")
    setTimeout(function(){
      $("#main").show('slide',{direction:'right'},500)      
    }, 600)
    $("#main").addClass("active")
  })

})
