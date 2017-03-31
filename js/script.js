$(function(){
  // Si on voit trop les autres menus
  $("#coffre").hide()
  $("#portes").hide()

  $(".btn:not(:has(.ret))").click(function(){

      if($(this).data('link')){

        $(this).parent().closest('ul').hide('slide',{direction:'right'},500)
        $("ul#"+$(this).data('link')).show('slide',{direction:'right'},500)

      }

  })

  $(".ret").click(function(){
    $("ul").hide('slide',{direction:'right'},500)
    $("ul#main").show('slide',{direction:'right'},500)
  })

})
