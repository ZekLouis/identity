function successMessage(message){
  $(".isa_success").slideDown(300);
  $(".isa_success>span").text(message)

  setTimeout(function(){
    $(".isa_success").slideUp(300);
  }, 3000)
}

function errorMessage(message){
  $(".isa_error").slideDown(300);
  $(".isa_error>span").text(message)

  setTimeout(function(){
    $(".isa_error").slideUp(300);
  }, 3000)
}

function infoMessage(message){
  $(".isa_info").slideDown(300);
  $(".isa_info>span").text(message)

  setTimeout(function(){
    $(".isa_info").slideUp(300);
  }, 3000)
}
var selected = false
var index = 0

$(function(){
  // Si on voit trop les autres menus
  $("#coffre").hide()
  $("#portes").hide()
  $(".isa").hide()

  $(document).keydown(function(e) {
    console.log(index)
    switch (e.which) {
      case 13:

        break;

      // UP
      case 38:
        if(selected){
          li = $(".selected").parent("li").prev().children("button");
          $(".selected").removeClass("selected");
          li.addClass("selected");
        }else{
          $("ul.active li>button").first().addClass('selected');
        }
        selected = true
        break;

      // DOWN
      case 40:
        if(selected){
          li = $(".selected").parent("li").next().children("button");
          $(".selected").removeClass("selected");
          li.addClass("selected");
        }else{
          $("ul.active li>button").first().addClass('selected');
        }
        selected = true
        break;

      default:
        break;
    }
  });

  $(".btn").not(".ret").click(function(){
      switch ($(this).data('link')) {
        case 'close':
          $(".block").hide('slide',{direction:'right'},500)
          break;

        case 'verVeh':
          successMessage("Vous avez verrouillé votre véhicule")
          break;

        case 'putObj':
          errorMessage("Vous n'avez pas d'objets ou d'armes sur vous")
          break;

        case 'getObj':
          errorMessage("Le coffre est vide")
          break;

        case 'watchTrunk':
          infoMessage("Le coffre est vide")
          break;

        case 'trunk':
          successMessage("Vous avez ouvert le coffre")
          break;

        case 'hood':
          successMessage("Vous avez ouvert le capot")
          break;

        case 'doorAVLeft':
          successMessage("Vous avez ouvert la porte")
          break;

        case 'doorAVRight':
          successMessage("Vous avez ouvert la porte")
          break;

        case 'doorARLeft':
          successMessage("Vous avez ouvert la porte")
          break;

        case 'doorARRight':
          successMessage("Vous avez ouvert la porte")
          break;

        default:
          $(".active").hide('slide',{direction:'left'},500)
          $(".active").removeClass("active")
          var obj = $(this)
          setTimeout(function(){
            $("#"+obj.data('link')).show('slide',{direction:'right'},500);
          }, 600);
          $("#"+$(this).data('link')).addClass("active")
          break;
      }



  })

  $(".ret").click(function(){
    $(".active").hide('slide',{direction:'right'},500)
    $(".active").removeClass("active")
    setTimeout(function(){
      $("#main").show('slide',{direction:'left'},500)
    }, 600)
    $("#main").addClass("active")
  })

})
