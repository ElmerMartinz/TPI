//MOSTRAR NOMBRE DE USUARIO EN LA INTERFAZ
var nombreUsuario = sessionStorage.getItem("userName");
document.getElementById('nombreUsuario').innerText = nombreUsuario;

//BORRANDO LAS VARIABLES AL SALIR
document.getElementById("myBtn").onclick = function() {borrar()};
function borrar() {
    sessionStorage.setItem("userName","");
    sessionStorage.setItem("userRol", "");
    sessionStorage.setItem("encontrado", false);
    sessionStorage.setItem("userVoto", false);
     window.location = './login.html'
};

//METODO PARA OCULTAR OPCIONES DEL MENU
var rolUsuario = sessionStorage.getItem("userRol");
var votoUsuario = sessionStorage.getItem("userVoto");
$(document).ready(function(){
    //OCULTAR OPCION DE VOTO
        if (votoUsuario=="true"){
                $('#navVotos').addClass('d-none');
                $('#navVotos').removeClass('d-block');
                $('#navEstadisticas').addClass('d-block');
                $('#navEstadisticas').removeClass('d-none');
           }else{
                $('#navVotos').addClass('d-block');
                $('#navVotos').removeClass('d-none');
                $('#navEstadisticas').addClass('d-none');
                $('#navEstadisticas').removeClass('d-block');
        }
    //SEGUN ROL DEL USUARIO LOGUEADO
         if (rolUsuario =="administrador" ) {
                $('#navAdminUser').addClass('d-block');
                $('#navAdminUser').removeClass('d-none');
                $('#navAdminAlcalde').addClass('d-block');
                $('#navAdminAlcalde').removeClass('d-none');
                $('#navAdminPresidente').addClass('d-block');
                $('#navAdminPresidente').removeClass('d-none');
                $('#navAdminDiputado').addClass('d-block');
                $('#navAdminDiputado').removeClass('d-none');
            } else {
                $('#navAdminUser').addClass('d-none');
                $('#navAdminUser').removeClass('d-block');
                $('#navAdminAlcalde').addClass('d-none');
                $('#navAdminAlcalde').removeClass('d-block');
                $('#navAdminPresidente').addClass('d-none');
                $('#navAdminPresidente').removeClass('d-block');
                $('#navAdminDiputado').addClass('d-none');
                $('#navAdminDiputado').removeClass('d-block');
            }
    }); 

(function($) {
  "use strict"; // Start of use strict
//Mostrar Pequeño el Menu
    $('.sidebar').collapse('hide');
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $('.sidebar .collapse').collapse('hide');
    };
    
    
  // Toggle the side navigation
  $("#sidebarToggle, #sidebarToggleTop").on('click', function(e) {
    $('.sidebar').collapse('hide');
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
    if ($(".sidebar").hasClass("toggled")) {
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Close any open menu accordions when window is resized below 768px
  $(window).resize(function() {
    if ($(window).width() > 768) {
      $('.sidebar .collapse').collapse('hide');
    };
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  // Scroll to top button appear
  $(document).on('scroll', function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function(e) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    e.preventDefault();
  });

})(jQuery); // End of use strict
