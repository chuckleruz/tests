

function gotoanchor(hash, extraOffset) {
    var $elem = $(hash.replace("/", ""));

    if ($elem.length) {
        var eo = (extraOffset && typeof extraOffset === 'number') ? extraOffset : 0;
        var offset = $elem.offset().top - eo;
        var tabulator = Math.abs($(window).scrollTop() - offset);
        var scrollTime = (650 * tabulator) / 800;

        if (false)
        // offset -= general.Navigation.elem.outerHeight();
            if (!window.matchMedia("(max-width: 760px)"))
                offset -= 106;
            else
                offset -= 76;

            //general.Navigation.closeMobileNavigation();
        $('html, body').stop().animate({ scrollTop: Math.round(offset) }, scrollTime);
    } else if (hash == '/#inicio') {
        $('html, body').stop().animate({ scrollTop: 0 }, 1000);
    }
 
}

$(document).ready(function(){
    var $elm = $('.navigation a').on('click', function(ev){
        ev.preventDefault();

        var opt = $(this);
        var key = opt.attr('href');
          
        gotoanchor(key);  
    });
});


$(document).ready(function(){
                   
      var altura = $(".about").offset().top; 
                         
      $(window).scroll(function(){
             
            if($(window).scrollTop() >= altura){
      
                  $(".qtr").css("margin-top","0");
                  $(".qtr").css("position","fixed");
                  //$(".qtr").css("visibility","visible"); 

                               
            }else{
                                     
                  $(".qtr").css("margin-top","-100px");
                  $(".qtr").css("position","fixed");
                  $(".qtr").css("visibility","visible");
                               
            }
                         
      });
                   
});

$(function() {
    var pull = $('#pull');
    var opt= $('.navigation a');
    menu = $('nav ul');
    menuHeight = menu.height();
 
    $(pull).on('click', function(e) {
        e.preventDefault();
        menu.slideToggle();
    });
});
 
$(window).resize(function(){
    var w = $(window).width();
    if(w > 100 && menu.is(':hidden')) {
        menu.removeAttr('style');
    }
});

 $(function (key) {
    if (this.listOptions && "string" === typeof key) {
        this.listOptions.removeClass('active');
        this.listOptions.filter('[href*=' + key + ']').addClass('active');
    }
});
 
