var url = "http://monopoly.cloudapp.net:80/";
//var url = "http://127.0.0.1:1337/";
var intervaloInicio;
var color;
var uid;
var socket = io(url);
var contadorEmpezar=0;
var colorFicha=["red","blue","green","black","yellow","grey"];
var coord=[];
var coloFicha;
var numeroJugadores=0;
var fichas={lista:colorFicha}
var posiciones=[];
var callesObtenidas=[];
var edificacionesObtenidas=[];
var counter;
var counterSubasta;
var count=30;
var countSubasta=50;
var usuarioEnviar;
function nuevo(uid){
  $.getJSON(url+'nuevo/'+uid,function(data){
    $('#informacionJugador').remove();
    if(data==0){
      $('#informacion').append("<p id='informacionJugador'> "+'No quedan'+"</p>");
    }
    else{
      socket.emit('listo');
      $('#informacion').append("<p id='informacionJugador'> "+'Nuevo usuario creado con siguiente informacion'+"</p>");
    $('#informacionJugador').append("<p id='nombreN'> Nombre:"+data.Nombre+"</p>");
    $('#informacionJugador').append("<p id='colorN'> Color:"+data.Color+"</p>");
    $('#informacionJugador').append("<p id='presupuestoN'> Presupuesto:"+data.Presupuesto+"</p>");
    $('#informacionJugador').append("<p id='uidN'> uid:"+data.UID+"</p>");

    
    
    $.cookie('salir',1);
    botonSalir();   

    $.cookie('color',data.Color);
    $.cookie('numeroJugadores',numeroJugadores);
    $.cookie('uid',data.UID);
  }
  })
}

function botonSalir(){
  $("#salir").append("<a href='#' id='salirBtn'>Salir</a>");
    $('#salirBtn').on("click",function(){

    $.getJSON(url+'salir/'+$.cookie('uid'),function(data){
    // limpiezaPantalla();
    $('#informacionJugador').append("<p id='nombreN'> Nombre:"+data.infon+"</p>");
          $('#pasarBtn').remove();
          $('#lanzarBtn').remove();
          $('#bloqueVender').remove();
          $('#bloqueSolicitud').remove();
          $('#bloqueContestar').remove();
          $('#bloqueEdificar').remove();
          $('#bloqueEnviar').remove();
          $('#salirBtn').remove();
          $('#comprarBtn').remove();
          $('#probarBtn').remove();
          $('#tarjetaBtn').remove();
          $('#bloqueEnVenta').remove();
  })
})    
}

function mostrarInformacion(){
     $.getJSON(url+'mostrar/'+$.cookie('uid'),function(data){
    $('#informacionJugador').remove();
    uid = $.cookie('uid');
      $('#informacion').append("<p id='informacionJugador'> "+'Nuevo usuario creado con siguiente informacion'+"</p>");
    $('#informacionJugador').append("<p id='nombreN'> Nombre:"+data.Nombre+"</p>");
    $('#informacionJugador').append("<p id='colorN'> Color:"+data.Color+"</p>");
    $('#informacionJugador').append("<p id='presupuestoN'> Presupuesto:"+data.Presupuesto+"</p>");
    $('#informacionJugador').append("<p id='uidN'> uid:"+data.UID+"</p>");
    

  })
}



function pasarTurno(uid){
  $.getJSON(url+'pasar/'+uid,function(data){
    $('#temporizadorPasar').remove();
     $('#turno').remove();
     $('#lanzamiento').remove();
        console.log('ha pasar turno');
        if(data.infon!=-2 && data.infon!=-1 && data.infon!=-3){
          $('#informacion').append("<p id='turno'> "+'Ha sido pasado el turno'+"</p>");
          clearInterval(counter);
          socket.emit('cambio',data.infon);
          $('#temporizador').remove();
          $('#pasarBtn').remove();
          $.cookie('pasar',0);
        }

        if(data.infon==-2)$('#informacion').append("<p id='turno'> "+'No te corresponde pasar el turno'+"</p>");
        if(data.infon==-1)$('#informacion').append("<p id='turno'> "+'Tienes que volver a tirar'+"</p>");
        if(data.final1==-3){
          $('#informacion').append("<p id='turno'> "+'Has sido eliminado'+"</p>");
          $('#pasarBtn').remove();
          $('#lanzarBtn').remove();
          $('#bloqueVender').remove();
          $('#bloqueSolicitud').remove();
          $('#bloqueContestar').remove();
          $('#bloqueEdificar').remove();
          $('#bloqueEnviar').remove();
          $('#salirBtn').remove();
          $('#comprarBtn').remove();
          $('#probarBtn').remove();
          $('#tarjetaBtn').remove();
          $('#bloqueEnVenta').remove();

        }
        if(data.final1==-4)socket.emit('final',data.mensaje)
 
  })
}

function actualizarPresupuesto(){
   $.getJSON(url+'mostrar/'+$.cookie('uid'),function(data){
    $('#presupuestoJugando').remove();
    uid = $.cookie('uid');
     console.log('ha actualizar el Presupuesto');
    $('#actualizarPresupuesto').append("<p id='presupuestoJugando' class='header_04'><font color=#FFFFFF> Presupuesto:"+data.Presupuesto+"</font></p>");
    
    

  })

}

function lanzar(uid){
  
  
  $.getJSON(url+'lanzar/'+uid,function(data){
    $('#accion').remove();
   
    $('#turno').remove();
     $('#lanzamiento').remove();
     $('#global').remove();
    
      botonPasar();
     console.log(data.infon);

     if(data.infon!=9){
         botonTitulo();
     
     }

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
        botonComprar();
        //comprobarAccion(data.accion);
        $('#informacion').append("<p id='accion'> "+data.mensaje+"</p>");
      }
      console.log('comprable '+data.comprable);
      if(data.comprable==2 || data.comprable==3){
        $('#pasarBtn').remove();
        $.cookie('pasar',0);
        $('#lanzarBtn').remove();
        $.cookie('lanzar',0);
        botonTarjeta(data.comprable);
      }
      if(data.comprable==4 || data.comprable==5){
      
        encarcelado(data.comprable);
      }
     
       $('#temporizadorLanzar').remove();
       botonEdificar();
       botonVender();
       botonlistaVentas();
       botonSolicitud();
       actualizarPropiedades();
       $.cookie('posicion',data.posicion);
       
       posiciones[$.cookie('color')]=$.cookie('posicion');

       //console.log('posiciones '+data.posicion+$.cookie('color')+' '+posiciones[$.cookie('color')]);
       coloFicha=$.cookie('color');
       $.cookie('posiciones',JSON.stringify(posiciones));
       clearInterval(counter);

       count=120;
       $.cookie('count',count);
       counter=setInterval(timerPasar, 1000);
       //cargarTablero();
       //cargarFichas($.cookie('numeroJugadores'),ponerFicha);
        
      
      socket.emit('ficha',{ficha:$.cookie('color'),numero:data.posicion});  

  }
     actualizarPresupuesto();
  })
}
function comprobarAccion(tipo){
   var mensaje="";
   if(tipo==-2)mensaje="No tiene dinero para pagar la estancia";
   if(tipo==-1)mensaje="El usuario paga por la estancia";
   if(tipo==1)mensaje="Eres el propietario";
   if(tipo==3)mensaje="Puedes comprar una casa";
   if(tipo==4)mensaje="Puedes comprar la propiedad";
   if(tipo==5)mensaje="Eres propietario y tienes un hotel";
   if(tipo==6)mensaje="Puedes comprar un hotel para esta calle";

   $('#informacion').append("<p id='accion'> "+mensaje+"</p>");


}

function comprobarPropiedad(tipo){
  $('#comprarPropiedad').remove();
  var mensaje="";
   if(tipo==-1)mensaje="No es tu turno no puedes comprar";
   if(tipo==0)mensaje="Se ha comprado una propiedad";
   if(tipo==2)mensaje="Esta calle ya tiene propietario";
   

  $('#informacion').append("<p id='comprarPropiedad'> "+mensaje+"</p>");

}

function edificar(uid,nombre){
  
    $.getJSON(url+'edificar/'+uid+"/"+nombre,function(data){
        actualizarPresupuesto();
     $('#accion').remove();
   
    $('#turno').remove();
     $('#lanzamiento').remove();
     $('#global').remove();
     $('#comprarPropiedad').remove();
       //comprobarEdificacion(data.infon);
       limpiezaPantalla();
    $('#informacion').append("<p id='comprarPropiedad'> "+data.mensaje+"</p>"); 
       
      })

}

function comprobarEdificacion(tipo){
  $('#comprarPropiedad').remove();
  var mensaje="";
  console.log('Tipo:'+tipo);
   if(tipo==-1)mensaje="No es tu turno no puedes comprar";
   if(tipo==0)mensaje="Se ha comprado una casa";
   if(tipo==1)mensaje="Aun no puedes comprar una casa";

   if(tipo==2)mensaje="Esta calle no es tuya";
   if(tipo==-2)mensaje="No tienes dinero para edificar";
   if(tipo==4)mensaje="Ya has comprado cuatro casa y puedes comprar un hotel";
   if(tipo==7)mensaje="Ha sido comprado un hotel";
   if(tipo==5)mensaje="Ya tienes un hotel";

  $('#informacion').append("<p id='comprarPropiedad'> "+mensaje+"</p>");

}



function empezar(){
  $.getJSON(url+'empezar/',function(data){
    $.cookie('empezado',1);
    $('#informacionJugador').remove();
          if(data.infon==0){
             $('#empezarBtn').remove();
             $.cookie('empezar',1);
             $('#pedirBtn').remove();
             $.cookie('pedir',1);
             $('#informacion').append("<p id='global'> "+'El juego empieza ya'+"</p>");
             $.cookie('numeroJugadores',data.jugadores);
              botonLanzar();
              cargarTablero();
              cargarCoordenadas();
              
              coloFicha=$.cookie('color');

              for(var i=0;i<$.cookie('numeroJugadores');i++){ //colorFicha.length
                var color=colorFicha[i];
                posiciones[color]=0;
              }
              cargarFichas();  
              ponerFicha($.cookie('color')); 
  
          }
          else $('#informacion').append("<p id='global'> "+'No se ha llegado al minimo de jugadores'+"</p>");
     

  })


}

function comprar(uid){
  $.getJSON(url+'comprar/'+uid,function(data){
         limpiezaPantalla();
        actualizarPresupuesto();
 
       comprobarPropiedad(data.infon);
    //$('#informacion').append("<p id='comprarPropiedad'> "+data.infon+"</p>"); 

      })

}

function titulo(uid){

   $.getJSON(url+'titulo/'+uid,function(data){
      $('#nombre').remove();     
      $('#precioPresupuesto').remove();  
      $('#precioAlquiler').remove();  
      $('#precioCasa').remove();  
      $('#precioHotel').remove();  

     console.log('obtener informacion de calle');
      $('#dialogo2').append("<p class='column_w300_section_01' id='nombre' class='header_03'>"+data.nombre+"</p>");
      $('#dialogo2').append("<p class='column_w300_section_01' id='precioPresupuesto'>Precio:"+data.precio+"</p>");
      $('#dialogo2').append("<p class='column_w300_section_01' id='precioAlquiler'>Precio Alquiler:"+data.precioAlquiler+"</p>");
      $('#dialogo2').append("<p class='column_w300_section_01' id='precioCasa'>Precio de casa: "+data.precioCasa+"</p>");
      $('#dialogo2').append("<p class='column_w300_section_01' id='precioHotel'>Precio de hotel: "+data.precioHotel+"</p>");
   })

}

function tarjeta(){
   $.getJSON(url+'tarjeta/'+uid,function(data){
        limpiezaPantalla();
        $('#informacionJugador').append("<p id='informacionJugador'>"+data.infon+" </p>");
     
   })
}

function limpiezaPantalla(){
  $("informacionJugador").remove();
        $('#informacion').append("<p id='informacionJugador'> </p>");

}


function reseteo(){
  $.getJSON(url+'reset/',function(data){
    /*$('#informacion').remove();
    $('#turno').remove();
    $('#lanzamiento').remove();
    $.cookie('uid',undefined);
    $('#global').remove();
    $('#pedir').append("Nombre: <input type='text' id='nombre' /> <button id='pedirBtn'>Pedir Ficha</button>");
    $('#empezar').append("<button id='empezarBtn'>"+'Empezar'+"</button>");*/
    window.location.reload();
      })
    }
    
  function botonComprar(){
    $.cookie('comprar',1);
    $('#comprarBtn').remove();
      $('#comprar').append("<button id='comprarBtn'>Comprar</button>");
        $('#comprarBtn').on("click",function(){
    console.log('pulso comprar');
    comprar($.cookie('uid'));
    actualizarPropiedades($.cookie('uid'));
    botonEdificar();
    botonVender();
  })
  }

  function botonTarjeta(tipo){
    $.cookie('tarjeta',1);

         console.log('tipo '+tipo);
           if(tipo==2)$('#sacarTarjeta').append("<button id='tarjetaBtn'>Sacar tarjeta suerte</button>");
           if(tipo==3)$('#sacarTarjeta').append("<button id='tarjetaBtn'>Sacar tarjeta comunidad</button>");

           $('#tarjetaBtn').on("click",function(){
                 limpiezaPantalla();
                 tarjeta($.cookie('uid'));
                 botonLanzar();
                 botonPasar();
                 $('#tarjetaBtn').remove();
                 $.cookie('tarjeta',0);
              })
  }

  function botonLanzar(){
    $.cookie('lanzar',1);
     $('#lanzar').append("<button id='lanzarBtn'>Lanzar dado</button>");
      $('#lanzarBtn').on("click",function(){
        $("#informacionJugador").remove();
    $("#turno").remove();
    $.cookie('turno',0);
     limpiezaPantalla();
  
    lanzar($.cookie('uid'));
    
  })
  }

  function pagarCarcel(uid){
    $.getJSON(url+'pagarcarcel/'+uid,function(data){

      limpiezaPantalla();
      $('#informacionJugador').append("<ul id='encarcelado'>"+data.infon+"</ul>");
     $('#probarBtn').remove();
     $.cookie('probar',0);
     $('#pagarcarcelBtn').remove();
     $.cookie('pagarCarcel',0);
     $('#utilizartarjetaBtn').remove();
     $.cookie('utilizarTarjeta',0);
     $.cookie('encarcelado',0);
     botonLanzar();
     botonEdificar();

  })

  }

  function probar(uid){
    $.getJSON(url+'lanzarcarcel/'+uid,function(data){
    
      limpiezaPantalla();
      $('#informacionJugador').append("<ul id='encarcelado'>"+data.infon+"</ul>");
       $('#accion').remove();
    $('#turno').remove();
     $('#lanzamiento').remove();
     $('#global').remove();
      /*if(data.infon=="Has sacado doble para salir de la carcel"){
         $('#probarBtn').remove();
         $('#pagarcarcelBtn').remove();
         $('#utilizartarjetaBtn').remove();
         botonPasar();
      }*/
       // $('#probarBtn').remove();
       console.log('libre '+data.libre);
         if(data.libre==1){
          console.log('libre '+data.libre);
             $('#probarBtn').remove();
             $.cookie('probar',0);
             $.cookie('encarcelado',0);
             botonLanzar();
             botonEdificar();
         }
         botonPasar();

  })
}
  function utilizarTarjeta(uid){
    $.getJSON(url+'utilizartarjeta/'+uid,function(data){
      limpiezaPantalla();
      $('#informacionJugador').append("<ul id='encarcelado'>"+data.infon+"</ul>");
     $('#probarBtn').remove();
     $.cookie('probar',0);
     $('#pagarcarcelBtn').remove();
     $.cookie('pagarCarcel',0);
     $('#utilizartarjetaBtn').remove();
     $.cookie('utilizarTarjeta',0);
     $.cookie('encarcelado',0);
     botonLanzar();
     botonEdificar();


  })  

  }


  function encarcelado(tipo){
       $('#lanzarBtn').remove();
       $('#comprarBtn').remove();
       $('#bloqueEdificar').remove();
       $('#pasarBtn').remove();
       $('#informacionJugador').append("<p id='encarcelado'>Has caido en la carcel, para salir tienes que pagar 50 pelotis</p>");
       $('#informacionJugador').append("<p id='encarcelado2'>,probar a sacar doble(tres intentos) o utilizar una tarjeta de salida</p>");
       $('#lanzar').append("<button id='probarBtn'>Lanzar dado para salir</button>");
       $.cookie('probar',1);
       $('#comprar').append("<button id='pagarcarcelBtn'>Pagar la salida</button>");
       $.cookie('pagarCarcel',1);
       $.cookie('encarcelado',1);
       $.cookie('tipoEncarcelado',tipo);
       if(tipo==4){
           $('#bloqueEdificar').append("<button id='utilizartarjetaBtn'>Utilizar tarjeta</button>");
           $.cookie('utilizarTarjeta',1);
          $('#utilizartarjetaBtn').on("click",function(){
                limpiezaPantalla();
                utilizartarjeta($.cookie('uid'));
                
          })
       }
  
      $('#probarBtn').on("click",function(){
            limpiezaPantalla();
            probar($.cookie('uid'));
            
      })

      $('#pagarcarcelBtn').on("click",function(){
            limpiezaPantalla();
            pagarCarcel($.cookie('uid'));
            
      })
  } 

  function botonPasar(){
        $("#pasarBtn").remove();
        $.cookie('pasar',1);
        //$("#probarBtn").remove();
        $('#pagarcarcelBtn').remove();
        $.cookie('pagarCarcel',0);
         $('#utilizartarjetaBtn').remove();
          $.cookie('utilizarTarjeta',0);
       
    // $("#tituloBtn").remove();
 $('#pasar').append("<button id='pasarBtn'>Pasa turno</button>");
    $('#pasarBtn').on("click",function(){
             limpiezaPantalla();
     //$('#edificarBtn').remove();
     //$('#nombreCalle').remove();
     $('#bloqueEdificar').remove();
      $.cookie('bloqueEdificar',0);
        $('#comprarPropiedad').remove();
        $('#comprarBtn').remove();
        $.cookie('bloqueVender',0);
        $.cookie('comprar',0);
        $('#bloqueVender').remove();
    pasarTurno($.cookie('uid'));
  })

  } 

  function botonEdificar(){
      //$('#nombreCalle').remove();
      //$('#edificarBtn').remove();
      $.cookie('bloqueEdificar',1);
      $('#bloqueEdificar').remove();
      $('#edificar').append("<p id='bloqueEdificar'>Calle:<select id='nombreCalle'/> <button id='edificarBtn'>Edificar</button></p>");
      $('#bloqueEdificar').append("<p id='bloqueVenderEdificacion'>Edificacion:<select id='nombreEdificacion'/> <button id='venderEdificacionBtn'>Vender Edificacion</button></p>");
      obtenerCalles($.cookie('uid'));
       obtenerEdificaciones($.cookie('uid'));
          $('#edificarBtn').on("click",function(){
            limpiezaPantalla();
            
            var posicion=document.getElementById('nombreCalle').options.selectedIndex; //posicion
            var escogido = document.getElementById('nombreCalle').options[posicion].value;
            if(callesObtenidas[escogido]!=undefined)
            edificar($.cookie('uid'),callesObtenidas[escogido]);
            actualizarPresupuesto();
            actualizarPropiedades($.cookie('uid'));
      })

      $('#venderEdificacionBtn').on("click",function(){
            limpiezaPantalla();
            $('#accion').remove();
           
            $('#turno').remove();
            $('#lanzamiento').remove();
            $('#global').remove();
            var posicion=document.getElementById('nombreCalle').options.selectedIndex; //posicion
            var escogido = document.getElementById('nombreCalle').options[posicion].value;
            if(edificacionesObtenidas[escogido]!=undefined)
            venderEdificacion($.cookie('uid'),edificacionesObtenidas[escogido]);
            actualizarPresupuesto();
            actualizarPropiedades($.cookie('uid'));
      })


  }
  function obtenerCalles(uid){ 
    var numero;
     $.getJSON(url+'obtenerCalles/'+uid,function(data){
         callesObtenidas=JSON.parse(JSON.stringify(data.nombres));
      for(var i=0;i<data.numero;i++){
        console.log('obtener calles '+data.nombres[i]);
        $("#nombreCalle").append("<option value="+i+">"+data.nombres[i]+" precio:"+data.precios[i]+"</value>");
      
      }

    
  })
    
    
  }

function obtenerEdificaciones(uid){
     $.getJSON(url+'obteneredificaciones/'+uid,function(data){
         edificacionesObtenidas=JSON.parse(JSON.stringify(data.nombres));
      for(var i=0;i<data.numero;i++){
        $("#nombreEdificacion").append("<option value="+i+">"+data.nombres[i]+" precio:"+data.precios[i]+"</value>");
      
      }
  })
  }

function venderEdificacion(uid,escogido){
     $.getJSON(url+'venderedificacion/'+uid+"/"+escogido,function(data){
          $('#accion').remove();
   
    $('#turno').remove();
     $('#lanzamiento').remove();
     $('#global').remove();
    
         limpiezaPantalla();
        actualizarPresupuesto();
        actualizarPropiedades();
        botonEdificar();
        botonVender();
          
           //$('#lanzarBtn').block();
       // $('#informacionJugador').append("<p id='vender'>"+data.mensaje+"</p>");
       $('#informacion').append("<p id='comprarPropiedad'> "+data.infon+"</p>"); 
      })
}  

  function botonTitulo(){

   $('#tituloCalle').append("<button id='tituloBtn'>Mostrar Titulo</button>");  
    /*$( "#dialog2" ).dialog({
    autoOpen: false
  });
    $("#tituloBtn").on("click",function(){
        titulo($.cookie('uid'));
    $("#dialogo2").dialog({
            width: 590,
            height: 350,
            show: "blind",
            hide: "shake",
            resizable: "false",
            position: "top"      
        });
    });*/
  }


function actualizarPropiedades(uid){
   
     $.getJSON(url+'propiedades/'+$.cookie('uid'),function(data){
      console.log('numero:'+data.length);
      $("#listaPropiedades").remove();
      $('#templatemo_banner_image').append("<ul id='listaPropiedades'></ul>");
      
      for(var i=0;i<data.length;i++){
        $("#listaPropiedades").append("<li >"+data[i]+"</li>");
      
      }
  })
}

  function botonSolicitud(){
      //$('#nombreCalle').remove();
      //$('#edificarBtn').remove();
      $('#bloqueSolicitud').remove();
      $.cookie('bloqueSolicitud',1);
      $('#solicitud').append("<p id='bloqueSolicitud'></p>")
      $('#bloqueSolicitud').append("<p id='bloqueSolicitud2'>Calle:<select id='nombreCalleUsuario'/> <select id='usuarios'/> <button id='verPropiedadesBtn'>Ver propiedades</button> </p>");
      $('#bloqueSolicitud').append("<p id='solicitudMensaje'><input type='text' id='precioSolicitud' width='10'/></p>");
      $('#bloqueSolicitud').append("<p id='bloqueEnviar'><button id='enviarSolicitudBtn'>Enviar Solicitud</button></p>");

      $.cookie('bloqueContestar',1);
      $('#bloqueContestar').remove();
      $('#nada').append("<p id='bloqueContestar'></p>")
      $('#bloqueContestar').append("<p id='bloqueContestar2'>Solicitud:<select id='solicitudes'/> </p>");
      $('#bloqueContestar').append("<p id='contestar'><input type='text' id='mensaje' width='10'/></p>");
      $('#bloqueContestar').append("<p id='bloqueDecidir'><button id='aceptarBtn'>Aceptar</button><button id='rechazarBtn'>Rechazar</button></p>");

      obtenerUsuarios();
      obtenerSolicitudes();
      $('#verPropiedadesBtn').on("click",function(){
            limpiezaPantalla();
            var posicion=document.getElementById('usuarios').options.selectedIndex; //posicion
            var escogido = document.getElementById('usuarios').options[posicion].value;
            usuarioEnviar=escogido;
            obtenerCallesUsuario(escogido);
           
      })

      $('#enviarSolicitudBtn').on("click",function(){
            limpiezaPantalla();
   
            if(usuarioEnviar!=undefined){
            var posicion=document.getElementById('nombreCalleUsuario').options.selectedIndex; //posicion
            var escogido = document.getElementById('nombreCalleUsuario').options[posicion].text;
            var precio=$('#precioSolicitud').val();

          if(precio % 1 == 0){
            if(precio.length!=0){

            enviarSolicitud($.cookie('uid'),escogido,usuarioEnviar,parseInt(precio));
            }
          }
         }
           
      })

      $('#aceptarBtn').on("click",function(){
            limpiezaPantalla();
            console.log('propiedades');
            var posicion=document.getElementById('solicitudes').options.selectedIndex; //posicion
            var escogido = document.getElementById('solicitudes').options[posicion].value;
            var mensaje=$('#mensaje').val();
            aceptarSolicitud(escogido);
           
       
           
      })

      $('#rechazarBtn').on("click",function(){
            limpiezaPantalla();
            var posicion=document.getElementById('solicitudes').options.selectedIndex; //posicion
            var escogido = document.getElementById('solicitudes').options[posicion].value;
            var mensaje=$('#mensaje').val();
            denegarSolicitudes(escogido,mensaje);
           
       
           
      })


  }

function aceptarSolicitud(idsolicitud){
  $.getJSON(url+'aceptarsolicitud/'+$.cookie('uid')+"/"+idsolicitud,function(data){
         //callesObtenidas=JSON.parse(JSON.stringify(data.nombres));
      botonSolicitud();
      limpiezaPantalla();
      actualizarPropiedades();
      actualizarPresupuesto();
      botonEdificar();
      botonVender();
      $('#informacionJugador').append("<p id='solicitudNueva'>"+data.resul+"</p>");
    
  })
}




function obtenerSolicitudes(){
  $.getJSON(url+'obtenersolicitudes/'+$.cookie('uid'),function(data){
         //callesObtenidas=JSON.parse(JSON.stringify(data.nombres));
      limpiezaPantalla();
      for(var i=0;i<data.numero;i++){
        $("#solicitudes").append("<option value="+data.nombres[i]+">"+data.precios[i]+"</value>");
      
      }
    
  })
}

function denegarSolicitudes(idsolicitud,mensaje){
  $.getJSON(url+'denegarsolicitud/'+$.cookie('uid')+"/"+idsolicitud+"/"+mensaje,function(data){
         //callesObtenidas=JSON.parse(JSON.stringify(data.nombres));
      botonSolicitud();
      limpiezaPantalla();
      actualizarPropiedades();
      actualizarPresupuesto();
      botonEdificar();
      botonVender();
    
      socket.emit('denegar',{uid:data.destinatario,mensaje:data.infon});
     // $('#informacionJugador').append("<p id='solicitudNueva'>"+data.infon+"</p>");
  })
}


function enviarSolicitud(uid,propiedad,destinatario,precio){ 
    var numero;
     $.getJSON(url+'enviarsolicitud/'+uid+"/"+propiedad+"/"+destinatario+"/"+precio,function(data){
         //callesObtenidas=JSON.parse(JSON.stringify(data.nombres));
      botonSolicitud();
      limpiezaPantalla();
      socket.emit('solicitud',destinatario);
      $('#informacionJugador').append("<p id='solicitud'>"+data.resul+"</p>");
    
  })
    
  }

/*function enviarSolicitud(uid,propiedad,destinatario,precio){ 
    var numero;
     $.getJSON(url+'enviarsolicitud/'+uid+"/"+propiedad+"/"+destinatario+"/"+precio,function(data){
         //callesObtenidas=JSON.parse(JSON.stringify(data.nombres));
      botonSolicitud();
      limpiezaPantalla();
      $('#informacionJugador').append("<p id='solicitud'>"+data.resul+"</p>");
    
  })
    
  }
*/
function obtenerCallesUsuario(uid){ 
    var numero;
     $.getJSON(url+'obtenercalles2/'+uid,function(data){
         //callesObtenidas=JSON.parse(JSON.stringify(data.nombres));
      botonSolicitud();
      for(var i=0;i<data.numero;i++){
        $("#nombreCalleUsuario").append("<option value="+data.idd[i]+">"+data.nombres[i]+"</value>");
      
      }

    
  })
    
  }
  function obtenerUsuarios(){ 
    var numero;
     $.getJSON(url+'obtenerusuarios/'+$.cookie('uid'),function(data){
        // callesObtenidas=JSON.parse(JSON.stringify(data.nombres));
      
      for(var i=0;i<data.numero;i++){
        $("#usuarios").append("<option value="+data.uids[i]+">"+data.nombres[i]+"</value>");
      
      }

    
  })
    
    
  }


  function botonVender(){
      //$('#nombreCalle').remove();
      //$('#edificarBtn').remove();
      $('#bloqueVender').remove();
      $.cookie('bloqueVender',1);
      $('#vender').append("<p id='bloqueVender'>Calle:<select id='nombreCalleVender'/> <button id='venderBtn'>Vender</button> <input type='text' id='precio' width='10'/> <button id='subastarBtn'>Subastar</button> <button id='hipotecarBtn'>Hipotecar</button>   </p>");

        listaVentas($.cookie('uid'));
        $('#venderBtn').on("click",function(){
            limpiezaPantalla();
            
            var posicion=document.getElementById('nombreCalleVender').options.selectedIndex; //posicion
            var escogido = document.getElementById('nombreCalleVender').options[posicion].text;
            var precio=parseInt($('#precio').val())
          if (precio % 1 == 0) {
            if (precio.length != 0) {
            vender($.cookie('uid'),escogido,parseInt(precio));
            }
          }
           
      })

      $('#subastarBtn').on("click",function(){
            limpiezaPantalla();
            
            var posicion=document.getElementById('nombreCalleVender').options.selectedIndex; //posicion
            var escogido = document.getElementById('nombreCalleVender').options[posicion].text;

            console.log('escogido '+escogido);
            subastar($.cookie('uid'),escogido);

           
      })

      $('#hipotecarBtn').on("click",function(){
            limpiezaPantalla();
            
            var posicion=document.getElementById('nombreCalleVender').options.selectedIndex; //posicion
            var escogido = document.getElementById('nombreCalleVender').options[posicion].text;

            
            hipotecar($.cookie('uid'),escogido);
            actualizarPresupuesto();

           
      })

  }



function vender(uid,escogido,precio){
     $.getJSON(url+'vender/'+uid+"/"+escogido+"/"+precio,function(data){
         limpiezaPantalla();
        actualizarPresupuesto();
        actualizarPropiedades();
        botonEdificar();
        botonVender();
       // $('#informacionJugador').append("<p id='vender'>"+data.mensaje+"</p>");
    //$('#informacion').append("<p id='comprarPropiedad'> "+data.infon+"</p>"); 
        socket.emit('venta',escogido);  
      })
}

function subastar(uid,escogido){
     $.getJSON(url+'subastar/'+uid+"/"+escogido,function(data){

      if(data.infon!="No es tu turno"){
         limpiezaPantalla();
        actualizarPresupuesto();
        actualizarPropiedades();
        botonEdificar();
        botonVender();
        countSubasta=50;
        $.cookie('countSubasta',50);
        counterSubasta=setInterval(timerSubasta, 1000);
           //$('#lanzarBtn').block();
       // $('#informacionJugador').append("<p id='vender'>"+data.mensaje+"</p>");
    //$('#informacion').append("<p id='comprarPropiedad'> "+data.infon+"</p>"); 
        socket.emit('subasta',data.infon);  
      }
      else{
        limpiezaPantalla();
         $('#informacion').append("<p id='comprarPropiedad'> "+"No es tu turno no puedes subastar"+"</p>"); 
      }
      })
}

function hipotecar(uid,escogido){
     $.getJSON(url+'hipotecar/'+uid+"/"+escogido,function(data){
         limpiezaPantalla();
        actualizarPresupuesto();
        actualizarPropiedades();
        botonEdificar();
        botonVender();
          
           //$('#lanzarBtn').block();
       // $('#informacionJugador').append("<p id='vender'>"+data.mensaje+"</p>");
       $('#informacion').append("<p id='comprarPropiedad'> "+data.infon+"</p>"); 
      })
}

function pujar(uid,precio){
     $.getJSON(url+'pujar/'+uid+"/"+precio,function(data){
         limpiezaPantalla();
        actualizarPresupuesto();
        actualizarPropiedades();
        botonEdificar();
        botonVender();
          console.log('data.infon  '+data.infon)
           //$('#lanzarBtn').block();
       // $('#informacionJugador').append("<p id='vender'>"+data.mensaje+"</p>");
    //$('#informacion').append("<p id='comprarPropiedad'> "+data.infon+"</p>"); 
        socket.emit('actualizarSubasta',data.infon);  
      })
}

function retirarse(uid){
     $.getJSON(url+'retirarse/'+uid,function(data){
         limpiezaPantalla();
        actualizarPresupuesto();
        actualizarPropiedades();
        botonEdificar();
        botonVender();
          console.log('data.infon  '+data.infon)
           //$('#lanzarBtn').block();
       // $('#informacionJugador').append("<p id='vender'>"+data.mensaje+"</p>");
    //$('#informacion').append("<p id='comprarPropiedad'> "+data.infon+"</p>"); 
        if(data.fin==0)socket.emit('actualizarSubasta',data.infon);  
        else socket.emit('terminarSubasta',data.infon);  

      })
}

function terminar(uid){
     $.getJSON(url+'terminar/'+uid,function(data){
         limpiezaPantalla();
        actualizarPresupuesto();
        actualizarPropiedades();
        botonEdificar();
        botonVender();
           //$('#lanzarBtn').block();
       // $('#informacionJugador').append("<p id='vender'>"+data.mensaje+"</p>");
    //$('#informacion').append("<p id='comprarPropiedad'> "+data.infon+"</p>"); 
        socket.emit('terminarSubasta',data.infon);  

      })
}

function listaVentas(uid){
   
  $.getJSON(url+'propiedadesvender/'+uid,function(data){
        
      for(var i=0;i<data.length;i++){
        $("#nombreCalleVender").append("<option value="+i+">"+data[i]+"</value>");
      
      }
  })
}





 function botonlistaVentas(){
      //$('#nombreCalle').remove();
      //$('#edificarBtn').remove();
      $('#bloqueEnVenta').remove();
      $.cookie('bloqueEnVenta');
      $('#listaEnVenta').append("<p id='bloqueEnVenta'>Calle En Venta:<select id='nombreCalleVenta'/> <button id='comprarVentaBtn'>Comprar</button> </p>");
        listaEnVenta($.cookie('uid'));
        botonlistaQuitar();
          $('#comprarVentaBtn').on("click",function(){
            limpiezaPantalla();
            
            var posicion=document.getElementById('nombreCalleVenta').options.selectedIndex; //posicion
            var escogido = document.getElementById('nombreCalleVenta').options[posicion].value;
            console.log('calle a vender tras venta '+escogido)
       
            //vender($.cookie('uid'),escogido,$('#precio').val());
          
            $.getJSON(url+'comprarVenta/'+uid+"/"+escogido,function(data){
               limpiezaPantalla();
               actualizarPresupuesto();
               actualizarPropiedades();
               botonEdificar();
               botonVender();
               $('#bloqueEnVenta').remove();
               $('#listaEnVenta').append("<p id='bloqueEnVenta'>Calle En Venta:<select id='nombreCalleVenta'/> <button id='comprarVentaBtn'>Comprar</button> </p>");
               listaEnVenta($.cookie('uid'));
             // $('#informacion').append("<p id='comprarPropiedad'> "+data.infon+"</p>"); 
              socket.emit('ventaCompletada',data.infon);  
            
            })
      })

  }

  function listaEnVenta(uid){
     $.getJSON(url+'propiedadesenventa/'+uid,function(data){
       
      for(var i=0;i<data.length;i++){
        $("#nombreCalleVenta").append("<option value="+i+">"+data[i]+"</value>");
      
      }
     })
  }

  function botonlistaQuitar(){
      //$('#nombreCalle').remove();
      //$('#edificarBtn').remove();
      $('#bloqueQuitar').remove();
      $('#bloqueEnVenta').append("<p id='bloqueQuitar'>Calle En Venta:<select id='nombreCalleQuitar'/> <button id='quitarVentaBtn'>Quitar</button> </p>");
        listaEnVentaQuitar($.cookie('uid'));
          $('#quitarVentaBtn').on("click",function(){
            limpiezaPantalla();
            
            var posicion=document.getElementById('nombreCalleQuitar').options.selectedIndex; //posicion
            var escogido = document.getElementById('nombreCalleQuitar').options[posicion].value;
            console.log('calle a vender tras venta '+escogido)
       
            //vender($.cookie('uid'),escogido,$('#precio').val());

            $.getJSON(url+'quitarVenta/'+uid+"/"+escogido,function(data){
               limpiezaPantalla();
               actualizarPresupuesto();
               actualizarPropiedades();
               botonEdificar();
               botonVender();
               $('#bloqueEnVenta').remove();
               $('#listaEnVenta').append("<p id='bloqueEnVenta'>Calle En Venta:<select id='nombreCalleVenta'/> <button id='comprarVentaBtn'>Comprar</button> </p>");
               $('#bloqueEnVenta').append("<p id='bloqueQuitar'>Calle En Venta:<select id='nombreCalleQuitar'/> <button id='quitarVentaBtn'>Quitar</button> </p>");
               listaEnVenta($.cookie('uid'));
               listaEnVentaQuitar($.cookie('uid'));
              //$('#informacion').append("<p id='comprarPropiedad'> "+data.infon+"</p>"); 
              socket.emit('ventaCompletada',data.infon);  
            
            })
      })

  }

  function listaEnVentaQuitar(uid){
     $.getJSON(url+'propiedadesquitar/'+uid,function(data){
         
      for(var i=0;i<data.length;i++){
        $("#nombreCalleQuitar").append("<option value="+i+">"+data[i]+"</value>");
      
      }
     })
  }




function cargarTablero(){
  var canvas=document.getElementById("micanvas");
  ctx=canvas.getContext("2d");
  maxX=canvas.width;
  maxY=canvas.height;
  img=new Image();
  img.src="client/public/images/tablero.png";
  ctx.drawImage(img,0,0);
  img.onload=function(){
    ctx.drawImage(img,0,0);
  }
}

function inicio(){
       if($.cookie('uid')!=undefined){
         uid=$.cookie('uid');
         console.log('tengo una cookie')
       }
       else{
        $.cookie('uid',undefined);
        console.log('borrada la cookie');
        $('#pedir').append("Nombre: <input type='text' id='nombre' /> <button id='pedirBtn'>Pedir Ficha</button>");
        
      }
console.log($.cookie('uid')+" uid ");

    if($.cookie('uid')!=null && $.cookie('uid')!=undefined){

          $.getJSON(url+'cookies/'+$.cookie('uid'),function(data){
             console.log(data.infon+" cookie ");
             if(data.infon==-3 && data.infon==-2){
                borrarCookies();
             }
             if(data.infon==-1)$('#pedirBtn').remove();
             if(data.infon==0){
               if($.cookie('lanzar')==1)botonLanzar();
               if($.cookie('pasar')==1)botonPasar();
               if($.cookie('tarjeta')==1)botonTarjeta();
               if($.cookie('comprar')==1)botonComprar();
               if($.cookie('encarcelado')==1)encarcelado($.cookie('tipoEncarcelado'));
               if($.cookie('salir')==1)botonSalir();
                 $('#pedirBtn').remove();
                 botonEdificar();
                 botonVender();
                 botonlistaVentas();
                 botonSolicitud();
                 if($.cookie('posiciones')!=undefined && $.cookie('posiciones')!=null){
                 var json_str= $.cookie('posiciones');
                 posiciones = JSON.parse(json_str);

                  var canvas=document.getElementById("micanvas");
                  ctx=canvas.getContext("2d");
                  ctx.clearRect(0, 0, canvas.width, canvas.height);
                  cargarTablero();
                  cargarCoordenadas();
                  cargarFichas(); 
                  ponerFicha($.cookie('color'));
                }
             }
             if(data.infon==1){
                 if($.cookie('lanzar')==1)botonLanzar();
               if($.cookie('pasar')==1)botonPasar();
               if($.cookie('tarjeta')==1)botonTarjeta();
               if($.cookie('comprar')==1)botonComprar();
               if($.cookie('encarcelado')==1)encarcelado($.cookie('tipoEncarcelado'));
               if($.cookie('salir')==1)botonSalir();
                 $('#pedirBtn').remove();
                 botonEdificar();
                 botonVender();
                 botonlistaVentas();
                 botonSolicitud();
                 subastaBloque();
                 counterSubasta=setInterval(timerSubasta, 1000);
                 console.log('subasta bloque');
                 if($.cookie('posiciones')!=undefined && $.cookie('posiciones')!=null){
                 var json_str= $.cookie('posiciones');
                 posiciones = JSON.parse(json_str);

                  var canvas=document.getElementById("micanvas");
                  ctx=canvas.getContext("2d");
                  ctx.clearRect(0, 0, canvas.width, canvas.height);
                  cargarTablero();
                  cargarCoordenadas();
                  cargarFichas(); 
                  ponerFicha($.cookie('color'));
                }
              }
         })


    }
    else{

       borrarCookies();
    }  

    }


 function borrarCookies(){

 $.cookie('uid',null);
  $.cookie('salir',null);
                $.cookie('comprar',null);
                $.cookie('lanzar',null);
                $.cookie('pagarCarcel',null);
                $.cookie('bloqueEdificar',null);
                $.cookie('bloqueVender',null);
                $.cookie('bloqueEnVenta',null);
                $.cookie('pasar',null);
                $.cookie('posiciones',null);
                $.cookie('numeroJugadores',null);
                $.cookie('color',null);
                $.cookie('encarcelado',null);
                $.cookie('tipoEncarcelado',null);

 }


function cargarFichas(){
  var cont=0;
  //numJug=parseInt($.cookie("numJug")); 
  for(var i=0;i<$.cookie('numeroJugadores');i++){ //colorFicha.length
    var color=colorFicha[i];
    var imag=new Image();
    console.log('color '+color);
    imag.src="client/public/images/"+color+".png";
    fichas.lista[color]=imag;
    //posiciones[color]=0;
    //fichas.posicion[color]=0;
    ctx.drawImage(fichas.lista[color],maxX,maxY);
    fichas.lista[color].onload=function(){
      ctx.drawImage(fichas.lista[color],maxX-70,maxY-70,30,30);
       if (++cont>=$.cookie('numeroJugadores')){
        ponerFicha(color);  
      }
    }
  } 
}

function cargarCoordenadas(){
  for(i=0;i<40;i++) coord[i]=[];
  inc=55;
  var contador;
  coord[0].push(maxX-inc*1.5)
  coord[0].push(maxY-inc*1.5);
  
  contador=3;
  for(k=1;k<11;k++){
   
  coord[k].push(maxX-inc*contador++)
  coord[k].push(maxY-inc*1.2);
  }

  coord[10].push(coord[9][0]-inc)
  coord[10].push(coord[9][1]);
  
  contador=3;
  for(l=11;l<21;l++){
    coord[l].push(maxX-inc*12.7)
    coord[l].push(maxY-inc*contador++);
  }

  coord[20].push(inc)
  coord[20].push(inc);

   
   contador=55;
  for(t=21;t<31;t++){
    coord[t].push(inc+contador)
    coord[t].push(inc-30);
    contador+=57
  }

  coord[30].push(maxX-inc)
  coord[30].push(inc);
  
  contador=55;
  for(z=31;z<40;z++){
  coord[z].push(maxX-inc-15)
  coord[z].push(inc+contador);
  contador+=57
  }
}

function ponerFicha(){
  var x,y;
  
  for(var i=0;i<$.cookie('numeroJugadores');i++){ //colorFicha.length
    var color=colorFicha[i];
    var posicion=posiciones[color];

    if (posicion>=0 && posicion<40){
      x=coord[posicion][0];
      y=coord[posicion][1];
  
    ctx.drawImage(fichas.lista[color],x,y,30,30);
  }
}

}



function pedirFicha(){
  $(window).load(function () {

    inicio();

    
   });
 $(document).ready(function(){

    //$.cookie('uid',undefined);
     });
  $('#pedirBtn').on("click",function(){
    
    
    if($('#nombre').val().length==0){
      $('#informacionJugador').remove();
      $('#informacion').append("<p id='informacionJugador'> "+'Escribe un nombre de usuario'+"</p>");
    }
    else{
      nuevo($('#nombre').val());
      $('#pedirBtn').remove();
    }


  })

$('#casillaBtn').on("click",function(){
    
  //console.log('posiciones '+$('#posicionAsig').val());
      if($('#posicionAsig').val()<40 && $('#posicionAsig').val()>=0){
         asignarCasilla($('#posicionAsig').val());
     }
    
    


})

  $('#lanzarBtn').on("click",function(){
    $("#informacionJugador").remove();
    $("#turno").remove();
    $("#pasarBtn").remove();
    

    ($.cookie('uid'));

  })
  $('#empezarBtn').on("click",function(){
    
    //empezar();
  

  })
  $('#pasarBtn').on("click",function(){
    $("#informacionJugador").remove();
   //  $("#tituloBtn").remove();
    pasarTurno($.cookie('uid'));
  })
  $('#resetBtn').on("click",function(){
    
    reseteo($.cookie('uid'));
  })
  $('#mostrarBtn').on("click",function(){
    
    mostrarInformacion();
  })
   $('#comprarBtn').on("click",function(){
    console.log('pulso comprar');
    comprar($.cookie('uid'));

  })

}



function asignarCasilla(posicion){
  
  
  $.getJSON(url+'asignar/'+$.cookie('uid')+"/"+posicion,function(data){
    $('#accion').remove();
    
    $('#turno').remove();
     $('#lanzamiento').remove();
     $('#global').remove();
    
      botonPasar();
     console.log(data.infon);

     if(data.infon!=9){
         botonTitulo();
     
     }

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
        botonComprar();
        //comprobarAccion(data.accion);
        $('#informacion').append("<p id='accion'> "+data.mensaje+"</p>");
      }
      console.log('comprable '+data.comprable);
      if(data.comprable==2 || data.comprable==3){
        $('#pasarBtn').remove();
        $.cookie('pasar',0);
        $('#lanzarBtn').remove();
        $.cookie('lanzar',0);
        botonTarjeta(data.comprable);
      }
      if(data.comprable==4 || data.comprable==5){
      
        encarcelado(data.comprable);
      }
     
       $('#temporizadorLanzar').remove();
       botonEdificar();
       botonVender();
       botonlistaVentas();
       botonSolicitud();
       actualizarPropiedades();
       $.cookie('posicion',data.posicion);
       
       posiciones[$.cookie('color')]=$.cookie('posicion');

       //console.log('posiciones '+data.posicion+$.cookie('color')+' '+posiciones[$.cookie('color')]);
       coloFicha=$.cookie('color');
       $.cookie('posiciones',JSON.stringify(posiciones));
     
       //cargarTablero();
       //cargarFichas($.cookie('numeroJugadores'),ponerFicha);
        
      
      socket.emit('ficha',{ficha:$.cookie('color'),numero:data.posicion});  

  }
     actualizarPresupuesto();
  })
}








socket.on('empezar',function(){
  if(contadorEmpezar==0){
  empezar();
  contadorEmpezar++;
  }

})

socket.on('cambioTurno',function(data){
   if(data==$.cookie('uid')){
      $('#turno').remove();
      $('#informacion').append("<p id='turno'> "+'Te toca tirar'+"</p>");
       $.ionSound.play("button_tiny");
      count=30;
      counter=setInterval(timerLanzar, 1000);
      
    }
  })

 //1000 will  run it every 1 second

function timerLanzar()
{
  count=count-1;
  $('#temporizadorLanzar').remove();
  $('#lanzar').append("<p id='temporizadorLanzar'>"+count+"</p>");
  if (count <= 0)
  {
     $('#temporizadorPasar').remove();
     clearInterval(counter);
     lanzar($.cookie('uid'));
     //counter ended, do something here
     return;
  }

  //Do code for showing the number of seconds here
}

function timerPasar()
{
  count=count-1;
  $('#temporizadorPasar').remove();
  $('#pasar').append("<p id='temporizadorPasar'>"+count+"</p>");
  if (count <= 0)
  {
     clearInterval(counter);
     $('#temporizadorPasar').remove();
       $('#bloqueEdificar').remove();
        $('#comprarPropiedad').remove();
        $('#comprarBtn').remove();
        $('#bloqueVender').remove();
     pasarTurno($.cookie('uid'));
     //counter ended, do something here
     return;
  }

  //Do code for showing the number of seconds here
}

function timerSubasta()
{
  countSubasta=$.cookie('countSubasta');
  countSubasta=countSubasta-1;
  $.cookie('countSubasta',countSubasta);
  $('#infoSubastaTemporizador').remove();
  $('#subastaCuadro').append(" <p id='infoSubastaTemporizador'>"+countSubasta+" </p>");
  if (countSubasta <= 0)
  {
     clearInterval(counterSubasta);
      terminar($.cookie('uid'));  
     //counter ended, do something here
     return;
  }

  //Do code for showing the number of seconds here
}



/*socket.on('cambioTurno',function(){
    console.log('turno ha sido cambiado');
      console.log('mi turno');
      $('#turno').remove();
      $('#informacion').append("<p id='turno'> "+'Te toca tirar'+"</p>");
  })
*/
socket.on('moverFicha',function(data){
    
     posiciones[data.ficha]=data.numero;
     var canvas=document.getElementById("micanvas");
       ctx=canvas.getContext("2d");
       ctx.clearRect(0, 0, canvas.width, canvas.height);
       cargarTablero();
      cargarCoordenadas();
      cargarFichas(); 
      ponerFicha($.cookie('color'));
  })
socket.on('nuevaVenta',function(data){
    console.log('nueva venta 2');

    botonlistaVentas();
     $('#notificacion').remove();
     $('#bloqueEnVenta').append("<p id='notificacion'>"+"Añadida la propiedad "+data+"</p>");
  })
socket.on('ventaRealizada',function(data){
    console.log('nueva venta 3');
    botonlistaVentas();
     $('#notificacion').remove();
     $('#bloqueEnVenta').append("<p id='notificacion'>"+data+"</p>");
  })

socket.on('subastaEmpieza',function(data){
       console.log('empieza la subasta');
            $.cookie('subasta',1);
      $('#subastaCuadro').remove();
            $('#subastaa').append("<p id='subastaCuadro'> </p>");
            //$('#subastaCuadro').append(" <input type='text' id='precioPuja' width='10'/><button id='pujarBtn'>Pujar</button><button id='retirarseBtn'>Retirarse</button>");
            $('#subastaCuadro').append(" <input type='text' id='precioPuja' width='10'/><button id='pujarBtn'>Pujar</button>");
            $('#subastaCuadro').append(" <p id='infoSubasta'><font color='#24AAFF'>"+data+"</font></p>");
            $("#dialog").dialog("open");
            $(".ui-dialog-titlebar").hide();

     $('#pujarBtn').on("click",function(){
            limpiezaPantalla();
            var valorPuja=$('#precioPuja').val()
           
            if (valorPuja % 1 != 0) {
              $('#infoSubasta').remove();
              $('#subastaCuadro').append(" <p id='infoSubasta'>"+"Escribe un valor para pujar"+" </p>");
             }
             else{
            pujar($.cookie('uid'),parseInt(valorPuja));
          }

           
      })
     /*$('#retirarseBtn').on("click",function(){
            limpiezaPantalla();
            
            retirarse($.cookie('uid'));

           
      })*/
  })



function subastaBloque(){
     $.cookie('subasta',1);
      $('#subastaCuadro').remove();
            $('#subastaa').append("<p id='subastaCuadro'> </p>");
           // $('#subastaCuadro').append(" <input type='text' id='precioPuja' width='10'/><button id='pujarBtn'>Pujar</button><button id='retirarseBtn'>Retirarse</button>");
            $('#subastaCuadro').append(" <input type='text' id='precioPuja' width='10'/><button id='pujarBtn'>Pujar</button>");
            //$('#subastaCuadro').append(" <p id='infoSubasta'>"+data+" </p>");
            $("#dialog").dialog("open");
            $(".ui-dialog-titlebar").hide();

     $('#pujarBtn').on("click",function(){
            limpiezaPantalla();
            var valorPuja=$('#precioPuja').val()
           
            if (valorPuja.length == 0) {
              $('#infoSubasta').remove();
              $('#subastaCuadro').append(" <p id='infoSubasta'><font color='#24AAFF'>"+"Escribe un valor para pujar"+" </font><</p>");
             }
             else{
            pujar($.cookie('uid'),parseInt(valorPuja));
          }

           
      })
    /* $('#retirarseBtn').on("click",function(){
            limpiezaPantalla();
            
            retirarse($.cookie('uid'));

           
      })*/
}



socket.on('actualizarSubasta2',function(data){

      if(data!="La puja no es mayor que el maximo"){
      $('#infoSubasta').remove();
      $('#subastaCuadro').append(" <p id='infoSubasta'><font color='#24AAFF'>"+data+"</font></p>");
    }
          
  })
socket.on('terminarSubasta2',function(data){
      $.cookie('subasta',0);
     actualizarPropiedades($.cookie('uid'));
     
     setTimeout("$('#dialog').dialog('close');",5000);     
  })
socket.on('final2',function(data){

     limpiezaPantalla(); 
          $('#pasarBtn').remove();
          $('#lanzarBtn').remove();
          $('#bloqueVender').remove();
          $('#bloqueSolicitud').remove();
          $('#bloqueContestar').remove();
          $('#bloqueEdificar').remove();
          $('#bloqueEnviar').remove();
          $('#salirBtn').remove();
          $('#comprarBtn').remove();
          $('#probarBtn').remove();
          $('#tarjetaBtn').remove();
          $('#bloqueEnVenta').remove();
     $('#informacion').append("<p id='turno'> "+data+"</p>");  
  })
socket.on('solicitud2',function(data){

     limpiezaPantalla();
     console.log('recibida la notificacion '+data+' '+$.cookie('uid'));
     if(data==$.cookie('uid')){ 
       botonSolicitud();
     }
  })

socket.on('denegar2',function(data){

     limpiezaPantalla();
      console.log("pantalla "+data.uid+" "+$.cookie('uid'));
     if(data.uid==$.cookie('uid')){ 
        
          $('#notificacionInfo').remove();
            $('#notificacion').append("<p id='notificacionInfo'> </p>");
            $('#notificacionInfo').append(" <p id='infoNoti'><font color=color='#24AAFF'>"+data.mensaje+"</font></p>");
        $('#dialog3').dialog('open');
        setTimeout("$('#dialog3').dialog('close');",10000); 

     }
  })