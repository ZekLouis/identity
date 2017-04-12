var state = {
		activeColor: [0, 0, 0]
	};

var colorPicker = (function(){

	var config = {
		baseColors: [
			[46, 204, 113],
			[52, 152, 219],
			[155, 89, 182],
			[52, 73, 94],
			[241, 196, 15],
			[230, 126, 34],
			[231, 76, 60],
			[255, 255, 255],
			[245, 245, 220],
			[128, 128, 128]
		],
		lightModifier: 20,
		darkModifier: 0,
		transitionDuration: 200,
		transitionDelay: 25,
		variationTotal: 10
	};

	function init(){
		createColorPicker(function(){
			appendBaseColors();
		});

		addEventListeners();

		setFirstColorActive(function(){
			setFirstModifiedColorActive();
		});
	}

	function setActiveBaseColor(el){
		$('.color.active').removeClass('active');
		el.addClass('active');
	}

	function setActiveColor(el){
		$('.color-var.active').removeClass('active');
		el.addClass('active');
		state.activeColor = el.data('color').split(',');
	}

	function addEventListeners(){
		$('body').on('click', '.color', function(){
			var color = $(this).data('color').split(',');
			setActiveBaseColor($(this));

			hideVariations(function(){
				createVariations(color, function(){
					setDelays(function(){
						showVariations();
					});
				});
			});
		});

		$('body').on('click', '.color-var', function(){
			setActiveColor($(this));
			setBackgroundColor();
		});
	}

	function setFirstColorActive(callback){
		$('.color').eq(1).trigger('click');
		callback();
	}

	function setFirstModifiedColorActive(){
		setTimeout(function(){
			$('.color-var').eq(7).trigger('click');
		}, 500);
	}

	function createColorPicker(callback){
		$('.color-picker').append('<div class="base-colors"></div>');
		$('.color-picker').append('<div class="varied-colors"></div>');
		$('.color-picker').append('<div class="active-color"></div>');
		$('.color-picker').append('<div class="color-history"></div>');

		callback();
	}

	function appendBaseColors(){
		for(i = 0; i < config.baseColors.length; i++){
			$('.base-colors').append('<div class="color" data-color="' + config.baseColors[i].join() + '" style="background-color: rgb(' + config.baseColors[i].join() + ');"></div>');
		}
	};

	function setBackgroundColor(){
		$('body').css({
			'background-color': 'rgb(' + state.activeColor + ')'
		});
	}

	function createVariations(color, callback){
		$('.varied-colors').html('');

		for(var i = 0; i < config.variationTotal; i++){
			var newColor = [];

			for (var x = 0; x < color.length; x++){
				var modifiedColor = (Number(color[x]) - 100) + (config.lightModifier * i);

				if(modifiedColor <= 0){
					modifiedColor = 0;
				} else if (modifiedColor >= 255){
					modifiedColor = 255;
				}

				newColor.push(modifiedColor);
			}

			$('.varied-colors').append('<div data-color="' + newColor + '" class="color-var" style="background-color: rgb(' + newColor + ');"></div>');
		}

		callback();
	}

	function setDelays(callback){
		$('.color-var').each(function(x){
			$(this).css({
				'transition': 'transform ' + (config.transitionDuration / 1000) + 's ' + ((config.transitionDelay / 1000) * x) + 's'
			});
		});

		callback();
	}

	function showVariations(){
		setTimeout(function(){
			$('.color-var').addClass('visible');
		},(config.transitionDelay * config.variationTotal));
	}

	function hideVariations(callback){
		$('.color-var').removeClass('visible').removeClass('active');

		setTimeout(function(){
			callback();
		},(config.transitionDelay * config.variationTotal));
	}

	return{
		init: init
	};

}());

var selected = false
var index = 0

$(function(){
  colorP = colorPicker.init()

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

  $('.btn').not(".prev").not(".next").click(function(){
		
    switch ($(this).data('link')) {
      case 'exit':
        $(".block").slideUp(500)
        break

      default:
        $(".selected").removeClass("selected")
        $(this).addClass("selected")
        $('#contentDetails>div').hide()
        $('#contentDetails>p').hide()
        $("#"+$(this).data('link')).show();
    }
  })

  $('.prev').click(function(){
    $("#"+$(this).data('link')).text(parseInt($("#"+$(this).data('link')).text())-1)
  })

  $('.next').click(function(){
    $("#"+$(this).data('link')).text(parseInt($("#"+$(this).data('link')).text())+1)
  })

  $('#contentDetails>div').hide()
})
