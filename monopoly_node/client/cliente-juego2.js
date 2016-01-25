
var url = "http://127.0.0.1:1337/";
var intervaloInicio;
var color;
var uid;
//var socket = io(url);

function nuevo(uid){
  $.getJSON(url+'nuevo/'+uid,function(data){
  	$('#informacionJugador').remove();
  	if(data==0){
      $('#informacion').append("<p id='informacionJugador'> "+'No quedan'+"</p>");
  	}
  	else{
  		$('#informacion').append("<p id='informacionJugador'> "+'Nuevo usuario creado con siguiente informacion'+"</p>");
		$('#informacionJugador').append("<p id='nombreN'> Nombre:"+data.Nombre+"</p>");
		$('#informacionJugador').append("<p id='colorN'> Color:"+data.Color+"</p>");
		$('#informacionJugador').append("<p id='presupuestoN'> Presupuesto:"+data.Presupuesto+"</p>");
    $('#informacionJugador').append("<p id='uidN'> uid:"+data.UID+"</p>");
    $.cookie('uid',data.UID);
	}
	})
}

function mostrarInformacion(){
     $.getJSON(url+'mostrar/'+$.cookie('uid'),function(data){
    $('.informacionJugador').remove();
    uid = $.cookie('uid');
      $('#informacion').append("<p id='informacionJugador'> "+'Nuevo usuario creado con siguiente informacion'+"</p>");
    $('.informacionJugador').append("<p id='nombreN'> Nombre:"+data.Nombre+"</p>");
    $('.informacionJugador').append("<p id='colorN'> Color:"+data.Color+"</p>");
    $('.informacionJugador').append("<p id='presupuestoN'> Presupuesto:"+data.Presupuesto+"</p>");
    $('.informacionJugador').append("<p id='uidN'> uid:"+data.UID+"</p>");
    

  })
}

function pasarTurno(uid){
  $.getJSON(url+'pasar/'+uid,function(data){
  	 $('#turno').remove();
     $('#lanzamiento').remove();
  	    console.log('ha pasar turno');
        if(data.infon==0){
        	$('#informacion').append("<p id='turno'> "+'Ha sido pasado el turno'+"</p>");
        }
        if(data.infon==1)$('#informacion').append("<p id='turno'> "+'No te corresponde pasar el turno'+"</p>");
        if(data.infon==-1)$('#informacion').append("<p id='turno'> "+'Te toca tirar'+"</p>");
	})
}

function lanzar(uid){
	
	
  $.getJSON(url+'lanzar/'+uid,function(data){
  	$('#turno').remove();
     $('#lanzamiento').remove();
     $('#global').remove();
     $('#comprarBtn').remove();
     console.log(data.infon);
  	if(data.infon==1){

      $('#informacion').append("<p id='lanzamiento'> "+'No se puede lanzar'+"</p>");
  	}
  	if(data.infon==-1){


  	   $('#informacion').append("<p id='lanzamiento'> "+'Tiene que pasar turno'+"</p>");	
  	}
  	if(data.infon!=1 && data.infon!=-1){
 
  		$('#informacion').append("<p id='lanzamiento'> "+data.infon+"</p>");
      if(data.comprable==1){
        console.log('ha comprar');
        //$('#comprar').append("<button id='comprarBtn'>"+'Comprar'+"</button>");
      }
	}
	})
}

function empezar(){
  $.getJSON(url+'empezar/',function(data){

  	$('#informacionJugador').remove();
          if(data.infon==0){
          	 $('#empezarBtn').remove();
             $('#pedirBtn').remove();
          	 $('#informacion').append("<p id='global'> "+'El juego empieza ya'+"</p>");
          }
          else $('#informacion').append("<p id='global'> "+'No se ha llegado al minimo de jugadores'+"</p>");
	})
}

function comprar(){
  $.getJSON(url+'comprar/',function(data){
    $('#informacion').append("<p id='comprarPropiedad'> "+data.infon+"</p>"); 
      })

}

function reseteo(){
  $.getJSON(url+'empezar/',function(data){
    $('#informacion').remove();
    $('#turno').remove();
    $('#lanzamiento').remove();
    $.cookie("uid").remove();
    $('#global').remove();
    $('#pedir').append("<a href='#' class='current' id='pedirBtn'>"+'Nuevo'+"</a>");
    $('#empezar').append("<a href='#' class='current' id='empezarBtn'>"+'Empezar'+"</a>");
      })
    }
    function inicio(){
       $('#comprarBtn').remove();
       if($.cookie("uid")!=undefined){
         uid=$.cookie("uid")
       }
       else $('#pedir').append("<a href='#' class='current' id='pedirBtn'>"+'Nuevo'+"</a>");
    }
function pedirFicha(){
  $(document).ready(function(){
     
  inicio();

     });
	$('#pedirBtn').on("click",function(){
		
		nuevo($('#nombre').val());
	})
	$('#lanzarBtn').on("click",function(){
		
		lanzar($.cookie('uid'));
	})
	$('#empezarBtn').on("click",function(){
		
		empezar();
	})
	$('#pasarBtn').on("click",function(){
		
		pasarTurno($.cookie('uid'));
	})
  $('#resetBtn').on("click",function(){
    
    reseteo($.cookie('uid'));
  })
  $('#mostrarBtn').on("click",function(){
    
    mostrarInformacion();
  })
}
