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
    console.log(e.which);
    switch (e.which) {
      case 13:
        if(selected){
          $("li:eq("+index+")>button").trigger("click")
          if($("li:eq("+index+")>button").hasClass("ret")){
            index=0
            $(".selected").removeClass("selected")
          }else{
            console.log("sousmenn");
            if($("li:eq("+index+")>button").data('link')=="coffre"){
              index=4
            }else if($("li:eq("+index+")>button").data('link')=="verVeh"){
              index=0
              $(".selected").removeClass("selected")
            }else if($("li:eq("+index+")>button").data('link')=="portes"){
              index=8
            }
            console.log(index);
          }
          selected=false
        }
        break;

      // UP
      case 38:
        if(!selected){
          $("li:eq("+index+")>button").addClass("selected")
          selected = true
        }else{
          $("li:eq("+index+")>button").removeClass("selected")
          index--
          $("li:eq("+index+")>button").addClass("selected")
        }
        break;

      // DOWN
      case 40:
        console.log(index);
        if(!selected){
          $("li:eq("+index+")>button").addClass("selected")
          selected = true
        }else{
          $("li:eq("+index+")>button").removeClass("selected")
          index++
          $("li:eq("+index+")>button").addClass("selected")
        }
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
