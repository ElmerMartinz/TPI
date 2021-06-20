//MOSTRAR NOMBRE DE USUARIO EN LA INTERFAZ
var nombreUsuario = sessionStorage.getItem("userName");
document.getElementById('nombreUsuario').innerText = nombreUsuario;
var mensaje= sessionStorage.getItem("userNombreDep")+" -- "+sessionStorage.getItem("userNombreMun");
document.getElementById('idDepMun').innerText = mensaje;
            
//BORRANDO LAS VARIABLES AL SALIR
document.getElementById("myBtn").onclick = function() {borrar()};
function borrar() {
    sessionStorage.setItem("userName","");
    sessionStorage.setItem("userRol", "");
    sessionStorage.setItem("encontrado", false);
     window.location = './login.html'
};

//METODO PARA OCULTAR OPCIONES DEL MENU
var votoUsuario = sessionStorage.getItem("userVoto");
var rolUsuario = sessionStorage.getItem("userRol");
$(document).ready(function(){
    //OCULTAR OPCION DE VOTO
        if (votoUsuario==1){
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
         if (rolUsuario ==1 ) {
                $('#navAdminUser').addClass('d-block');
                $('#navAdminUser').removeClass('d-none');
                $('#navAdminAlcalde').addClass('d-block');
                $('#navAdminAlcalde').removeClass('d-none');
                $('#navAdminPresidente').addClass('d-block');
                $('#navAdminPresidente').removeClass('d-none');
                $('#navAdminDiputado').addClass('d-block');
                $('#navAdminDiputado').removeClass('d-none');
                $('#navVotos').addClass('d-none');
                $('#navVotos').removeClass('d-block');
                $('#navEstadisticas').addClass('d-block');
                $('#navEstadisticas').removeClass('d-none');
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

  
})(jQuery); // End of use strict


//METODOS CHECKBOX
$(document).click(function() { //Creamos la Funcion del Click
  	var checked = $(".CheckedAK:checked").length; //Creamos una Variable y Obtenemos el Numero de Checkbox que esten Seleccionados
	$("#parametroMensaje").text("Tienes Actualmente " + checked + " Candidatos " + "Seleccionado(s)"); //Asignamos a la Etiqueta <p> el texto de cuantos Checkbox ahi Seleccionados(Combinando la Variable)
})
.trigger("click"); //Simulamos el Evento Click(Desde el Principio, para que muestre cuantos ahi Seleccionados)