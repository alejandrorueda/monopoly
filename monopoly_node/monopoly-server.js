var modelo=require("./server/modelo.js");
var fs = require("fs");
var express = require("express");
var config=JSON.parse(fs.readFileSync("config.json"));
var port = config.port;
var host = config.host;
var juego = new modelo.Juego();
juego.iniJuego();
var http=require("http");
var io = require("socket.io");
var app=express();
var path= require('path');
var server=http.createServer(app);
console.log(juego.fase.nombre);
app.use("/",express.static(__dirname));

//app.use(express.static(__dirname+'/public'));
//app.use('/public',express.static(path.join(__dirname+'/public')));
app.get("/",function(require,response){
    var contenido = fs.readFileSync("./client/index.html");
    //var css = fs.readFileSync("./client/templatemo_style.css");

    response.setHeader("Content-type","text/html");

    response.send(contenido);
/*var contenido = fs.readFileSync("./client/index.html");
    var css = fs.readFileSync("./client/templatemo_style.css");
if(request.url.indexOf('.css')!=-1){
    response.setHeader("Content-type","text/css");
    response.write(css);
    //response.writeHead(200,{'Content-type':'text/html'});
    response.end();
 }   
    response.writeHead(200,{'Content-type':'text/html'});
    response.end();*/
})

app.get("/public/:nombre",function(require,response){
    var contenido = fs.readFileSync("./client/public/templatemo_style.css");
    //var css = fs.readFileSync("./client/templatemo_style.css");

    response.setHeader("Content-type","text/css");
    response.write(contenido);
    response.end();

})
app.get("/public/images/:nombre",function(require,response){
    var contenido = fs.readFileSync("./client/public/images/"+require.params.nombre);
    //var css = fs.readFileSync("./client/templatemo_style.css");

    response.setHeader("Content-type","text/css");
    response.write(contenido);
    response.end();

})

app.get("/test/:uid/:casilla",function(require,response){
    var uid = require.params.uid;
    var casilla = require.params.casilla;
    var ficha=juego.buscarUID(uid);
    //var css = fs.readFileSync("./client/templatemo_style.css");
    ficha.asignarCasilla(juego.tablero.casillas[casilla]);
      var jsonData={
            "infon": ficha.usuario.nombre+' ha pasado a la casilla '+ficha.casilla.tema.nombre
        };
    response.send(jsonData);    

})



app.get("/reset",function(require,response){
  juego=null;
  juego = new modelo.Juego();
  juego.iniJuego();
    
})

app.get("/salir/:uid",function(require,response){
    
    var uid = require.params.uid;
    var ficha=juego.buscarUID(uid);
    
    juego.eliminarJugador(ficha);


     var jsonData={
            "infon": juego.mensaje
        };
        response.send(jsonData);

})

app.get("/cookies/:uid",function(require,response){
  var resul;
  if(juego.numeroFichasUtilizadas>0 && juego.fase instanceof modelo.Inicial){
     if(juego.buscarUID(require.params.uid)==-1){
      resul=-2;
     }
     else resul=-1;
  }
  if(juego.numeroFichasUtilizadas==0)resul=-3;
  if(juego.fase instanceof modelo.Jugar) resul=0;
  if(juego.fase instanceof modelo.SubastaJuego) resul=1;
  
  var jsonData={
            "infon": resul
        };
    response.send(jsonData);  
    
})


app.get("/comprarpropiedad/:uid1/:uid2/:propiedad/:precio",function(require,response){
    var ficha1 = juego.buscarUID(require.params.uid1);
    var ficha2 = juego.buscarUID(require.params.uid2);

    ficha1.usuario.venderpropiedad(require.params.propiedad,require.params.precio);
   
     var jsonData={
            "mensaje": juego.buscarUID(require.params.uid1).mensaje
        };

    response.send(jsonData)
})

app.get("/vender/:uid/:propiedad/:precio",function(require,response){
    var ficha1 = juego.buscarUID(require.params.uid);

    ficha1.usuario.venderPropiedad(require.params.propiedad,require.params.precio);
   
     var jsonData={
            "mensaje": juego.buscarUID(require.params.uid).usuario.mensaje
        };

    response.send(jsonData)
})

app.get("/propiedadesenventa/:uid",function(require,response){
   var ficha = juego.buscarUID(require.params.uid);
   var prop= new Array();
   ficha.bandejaVentas.limpiarLista();
   ficha.bandejaVentas.actualizarLista(juego)
   console.log('en venta '+ficha.bandejaVentas.propiedadesVenta.length)
    for(var i=0;i<ficha.bandejaVentas.propiedadesVenta.length;i++){
        prop.push(ficha.bandejaVentas.propiedadesVenta[i].nombre+" precio:"+ficha.bandejaVentas.propiedadesVenta[i].estado.precio)
    }
  response.send(JSON.parse(JSON.stringify(prop)));

 
})

app.get("/propiedadesquitar/:uid",function(require,response){
   var ficha = juego.buscarUID(require.params.uid);
   var prop= new Array();
   ficha.bandejaVentas.limpiarListaQuitar();
   ficha.bandejaVentas.actualizarListaQuitar(juego)
   console.log('en venta '+ficha.bandejaVentas.propiedadesVentaQuitar.length)
    for(var i=0;i<ficha.bandejaVentas.propiedadesVentaQuitar.length;i++){
        prop.push(ficha.bandejaVentas.propiedadesVentaQuitar[i].nombre+" precio:"+ficha.bandejaVentas.propiedadesVentaQuitar[i].estado.precio)
    }
  response.send(JSON.parse(JSON.stringify(prop)));

 
})


app.get("/propiedadesvender/:uid",function(require,response){
   var ficha;
   var prop= new Array();
    ficha = juego.buscarUID(require.params.uid);
   for(var i=0;i<ficha.numeroPropiedades;i++){
    
      if(ficha.propiedades[i] instanceof modelo.Calle || ficha.propiedades[i] instanceof modelo.Estacion || ficha.propiedades[i] instanceof modelo.CompaniaAgua || ficha.propiedades[i] instanceof modelo.CompaniaElectrica){
        console.log('es una calle');
        if((ficha.propiedades[i].estado instanceof modelo.APagar || ficha.propiedades[i].estado instanceof modelo.APagarEstacion || ficha.propiedades[i].estado instanceof modelo.APagarCompania) && ficha.propiedades[i].enSolicitud==false){
       ficha.propiedades[i].titulo.iniTitulo();
       prop.push(ficha.propiedades[i].nombre);
       }
     }
     
   
 }
  response.send(JSON.parse(JSON.stringify(prop)));

 
})

app.get("/nuevo/:nombre",function(require,response){
	console.log('nombre: '+require.params.nombre);
    var resul = juego.crearUsuario(require.params.nombre);
    console.log('uid '+resul);
    if(resul==-1){
          response.send(0);
    }
    else{
    	console.log('color '+juego.buscarUID(resul).colorr);
       var jsonData={
            "Nombre": juego.buscarUID(resul).usuario.nombre,
            "Color":juego.buscarUID(resul).nombre,
            "Presupuesto":juego.buscarUID(resul).presupuesto,
            "UID":juego.buscarUID(resul).usuario.uid
        };
        response.send(jsonData);

    }


})

app.get("/comprar/:uid",function(require,response){
    
    var uid = require.params.uid;
    var resul=juego.buscarUID(uid).usuario.comprarPropiedad();
   /* if(resul==-1){
          var jsonData={
            "infon": "No es tu turno no puedes comprar"
        };
        response.send(jsonData);
    }
    if(resul==0){
        console.log('color '+juego.buscarUID(resul).colorr);
       var jsonData={
            "infon": "Has comprado una propiedad"
        };
        response.send(jsonData);

    }*/

 var jsonData={
            "infon": resul
        };
        response.send(jsonData);



})

app.get("/comprarVenta/:uid/:escogido",function(require,response){
    
    var uid = require.params.uid;
    var resul=juego.buscarUID(uid).usuario.comprarVenta(require.params.escogido);
    

     var jsonData={
            "infon": resul
        };
        response.send(jsonData);



})

app.get("/quitarVenta/:uid/:escogido",function(require,response){
    
    var uid = require.params.uid;
    var resul=juego.buscarUID(uid).usuario.quitarVenta(require.params.escogido);
    

     var jsonData={
            "infon": resul
        };
        response.send(jsonData);



})


app.get("/subastar/:uid/:escogido",function(require,response){
    
    var uid = require.params.uid;
    var resul=juego.buscarUID(uid).usuario.subastarPropiedad(require.params.escogido);
    
     var jsonData={
            "infon": resul
        };
        response.send(jsonData);

})


app.get("/hipotecar/:uid/:escogido",function(require,response){
    
    var uid = require.params.uid;
    var resul=juego.buscarUID(uid).usuario.hipotecarPropiedad(require.params.escogido);
    
     var jsonData={
            "infon": resul
        };
        response.send(jsonData);

})

app.get("/pujar/:uid/:precio",function(require,response){
    
    var uid = require.params.uid;
    var resul=juego.buscarUID(uid).usuario.estado.pujar(require.params.precio);
   
     var jsonData={
            "infon": resul
        };
        response.send(jsonData);

})

app.get("/retirarse/:uid",function(require,response){
    
    var uid = require.params.uid;
    var resul=juego.buscarUID(uid).usuario.estado.terminar();
    var fin=0;
    if(juego.buscarUID(uid).usuario.estado instanceof modelo.UsuarioLibre){
      fin=1;
    }
     var jsonData={
            "infon": resul,
            "fin":fin
        };
        response.send(jsonData);

})

app.get("/terminar/:uid",function(require,response){
    
    var uid = require.params.uid;
    var resul=juego.buscarUID(uid).usuario.estado.terminar();

     var jsonData={
            "infon": resul
        };
        response.send(jsonData);

})



app.get("/edificar/:uid/:nombre",function(require,response){
    
    var uid = require.params.uid;
    var nombre = require.params.nombre;
    var ficha = juego.buscarUID(uid)
    console.log('uid de la casa a comprar '+uid);
    var resul=juego.buscarUID(uid).usuario.comprarCasa(nombre);
    console.log('resul: '+resul);
   
       

 var jsonData={
            "infon": resul,
            "mensaje": ficha.propiedades[ficha.buscarPropiedad(nombre)].estado.mensaje
        };
        response.send(jsonData);



})

app.get("/tarjeta/:uid",function(require,response){
    
    var uid = require.params.uid;
    var resul=juego.buscarUID(uid).usuario.sacarTarjeta();
    console.log('resul: '+resul);
    
      if(resul==-1){
         var jsonData={
                    "infon": resul
                };
        }
        else{

            var jsonData={
                    "infon": resul.comando.mensaje
                };
        }

        response.send(jsonData);



})

app.get("/mostrar/:uid",function(require,response){
    
     var resul=require.params.uid;
        
       var jsonData={
            "Nombre": juego.buscarUID(resul).usuario.nombre,
            "Color":juego.buscarUID(resul).nombre,
            "Presupuesto":juego.buscarUID(resul).presupuesto,
            "UID":juego.buscarUID(resul).usuario.uid
        };
        response.send(jsonData);


})

app.get("/lanzar/:uid",function(require,response){

    var ficha = juego.buscarUID(require.params.uid);

   console.log('uiddd '+require.params.uid);
   var resul= ficha.usuario.lanzarDosDados();
    if(resul=='No se puede tirar'){
          var jsonData={
            "infon": 1
        };
    }
    if(resul==-1){
         var jsonData={
            "infon": -1
        };
    }
    if(resul!='No se puede tirar' && resul!=-1){
        
        var casilla=ficha.usuario.nombre+' ha pasado a la casilla '+ficha.casilla.tema.nombre+' al sacar '+resul;
        var comprable=0;
        var mensaje="";
      
        if(ficha.casilla.tema instanceof modelo.Calle || ficha.casilla.tema instanceof modelo.Estacion || ficha.casilla.tema instanceof modelo.CompaniaAgua || ficha.casilla.tema instanceof modelo.CompaniaElectrica){
            comprable=1;

            mensaje=ficha.casilla.tema.estado.mensaje;
        }

        if(ficha.casilla.tema instanceof modelo.casillaTarjetaSuerte){
            comprable=2;
         
            
        }
        if(ficha.casilla.tema instanceof modelo.casillaTarjetaComunidad){
            comprable=3;
        }

        if(ficha.usuario.estado instanceof modelo.UsuarioEncarcelado){
           if(ficha.usuario.tarjetas.length>0)comprable=4;
           else comprable=5;

        }
       
      
       if(ficha.usuario.estado instanceof modelo.Bancarrota){
         var jsonData={
            "infon": ficha.usuario.nombre+' ha pasado a la casilla '+ficha.casilla.tema.nombre+' y estas en Bancarrota, obten el dinero o al pasar turno seras eliminado',
            "prueba": 'el usuario tira',
            "comprable": comprable,
            "accion":ficha.usuario.tipoAccion,
            "posicion":ficha.casilla.posicion,
            "mensaje":mensaje
        };
       }
       else{
        var jsonData={
            "infon": ficha.usuario.nombre+' ha pasado a la casilla '+ficha.casilla.tema.nombre+' al sacar '+resul,
            "prueba": 'el usuario tira',
            "comprable": comprable,
            "accion":ficha.usuario.tipoAccion,
            "posicion":ficha.casilla.posicion,
            "mensaje":mensaje
        };
        
       }

    }

   response.send(jsonData);
})

app.get("/titulo/:uid",function(require,response){
   var ficha = juego.buscarUID(require.params.uid);
   ficha.casilla.tema.titulo.iniTitulo();
    var jsonData={
            "nombre": ficha.casilla.tema.nombre,
            "precio": ficha.casilla.tema.titulo.precioCompra,
            "precioAlquiler": ficha.casilla.tema.titulo.precioAlquiler,
            "precioCasa": ficha.casilla.tema.titulo.precioCasa,
            "precioHotel": ficha.casilla.tema.titulo.precioHotel
        };
    

   response.send(jsonData);

})

app.get("/obtenercalles/:uid",function(require,response){
   var ficha = juego.buscarUID(require.params.uid);
   var prop= new Array();
   var precios = new Array();
   var contador = 0;
   for(var i=0;i<ficha.numeroPropiedades;i++){
    if(ficha.propiedades[i] instanceof modelo.Calle){
      if(ficha.propiedades[i].estado instanceof modelo.Venta){}
        else{
          if(ficha.propiedades[i].titulo.casas==4){
              contador++;
             ficha.propiedades[i].titulo.iniTitulo();
             prop.push(ficha.propiedades[i].nombre);
             precios.push(ficha.propiedades[i].titulo.precioHotel);
          }
          else{
             contador++;
             ficha.propiedades[i].titulo.iniTitulo();
             prop.push(ficha.propiedades[i].nombre);
             precios.push(ficha.propiedades[i].titulo.precioCasa);
          }
     
     }
   }
 }

  var jsonData={
            "nombres": JSON.parse(JSON.stringify(prop)),
            "precios": JSON.parse(JSON.stringify(precios)),
            "numero":contador
        };


  response.send(jsonData);
  //response.send(JSON.parse(JSON.stringify(prop)));

})

app.get("/obtenercalles2/:uid",function(require,response){
   var ficha = juego.buscarUID(require.params.uid);
   var prop= new Array();
   var id = new Array();
   var contador = 0;
   for(var i=0;i<ficha.numeroPropiedades;i++){
    if(ficha.propiedades[i] instanceof modelo.Calle || ficha.propiedades[i] instanceof modelo.Estacion || ficha.propiedades[i] instanceof modelo.CompaniaAgua || ficha.propiedades[i] instanceof modelo.CompaniaElectrica){
      if((ficha.propiedades[i].estado instanceof modelo.APagar || ficha.propiedades[i].estado instanceof modelo.APagarEstacion || ficha.propiedades[i].estado instanceof modelo.APagarCompania) && ficha.propiedades[i].enSolicitud==false){
      if(ficha.propiedades[i].estado instanceof modelo.Venta){}
        else{
              contador++;
             ficha.propiedades[i].titulo.iniTitulo();
             prop.push(ficha.propiedades[i].nombre);
             id.push(i); 
          }               
     }
    }
   }
 

  var jsonData={
            "nombres": JSON.parse(JSON.stringify(prop)),
            "idd": JSON.parse(JSON.stringify(id)),
            "numero":contador
        };


  response.send(jsonData);
  //response.send(JSON.parse(JSON.stringify(prop)));

})

 

app.get("/obtenersolicitudes/:uid",function(require,response){
   var ficha = juego.buscarUID(require.params.uid);
   var prop= new Array();
   var precios = new Array();
   var contador = 0;

   ficha.bandejaVentas.limpiarLista();
   ficha.bandejaVentas.actualizarLista(juego)

   for(var i=0;i<ficha.bandejaVentas.solicitudes.length;i++){
             console.log('-------------------------'+ficha.bandejaVentas.solicitudes[i].propiedad.nombre);
             contador++;
             //ficha.propiedades[i].titulo.iniTitulo();
             prop.push(ficha.bandejaVentas.solicitudes[i].idsolicitud);
             precios.push(ficha.bandejaVentas.solicitudes[i].propiedad.nombre+" precio:"+ficha.bandejaVentas.solicitudes[i].precio+" de "+ficha.bandejaVentas.solicitudes[i].cliente.usuario.nombre+"("+ficha.bandejaVentas.solicitudes[i].cliente.nombre+")");
        
 }

  var jsonData={
            "nombres": JSON.parse(JSON.stringify(prop)),
            "precios": JSON.parse(JSON.stringify(precios)),
            "numero":contador
        };


  response.send(jsonData);
  //response.send(JSON.parse(JSON.stringify(prop)));

})

app.get("/obtenerusuarios/:uid",function(require,response){
   var prop= new Array();
   var uids = new Array();
   var contador = 0;

   for(var i=0;i<juego.numeroFichasUtilizadas;i++){
          if(juego.fichas[i].usuario.uid!=require.params.uid){
             contador++;
             //ficha.propiedades[i].titulo.iniTitulo();
             uids.push(juego.fichas[i].usuario.uid);
             prop.push(juego.fichas[i].usuario.nombre+" color ficha:"+juego.fichas[i].nombre+" presupuesto:"+juego.fichas[i].presupuesto);
           }
        
 }

  var jsonData={
            "nombres": JSON.parse(JSON.stringify(prop)),
            "uids": JSON.parse(JSON.stringify(uids)),
            "numero":contador
        };


  response.send(jsonData);
  //response.send(JSON.parse(JSON.stringify(prop)));

})

app.get("/aceptarsolicitud/:uid/:idsolicitud",function(require,response){
   var ficha = juego.buscarUID(require.params.uid);
   var resul=ficha.bandejaVentas.aceptarSolicitud(require.params.idsolicitud)

   

  var jsonData={
            "infon": resul
        };


  response.send(jsonData);
  //response.send(JSON.parse(JSON.stringify(prop)));

})

app.get("/denegarsolicitud/:uid/:idsolicitud/:mensaje",function(require,response){
   var ficha = juego.buscarUID(require.params.uid);
   var desti = ficha.bandejaVentas.buscarSolicitud(require.params.idsolicitud).cliente.usuario.uid;
   var resul=ficha.bandejaVentas.denegarSolicitud(require.params.idsolicitud,require.params.mensaje)

   

  var jsonData={
            "infon": resul,
            "destinatario":desti
        };

  
  response.send(jsonData);
  //response.send(JSON.parse(JSON.stringify(prop)));

})

app.get("/enviarsolicitud/:uid/:propiedad/:destinatario/:precio",function(require,response){
   var ficha = juego.buscarUID(require.params.uid);

   var resul=ficha.bandejaVentas.enviarSolicitud(require.params.propiedad,require.params.precio,require.params.destinatario,juego);

   

  var jsonData={
            "infon": resul
        };


  response.send(jsonData);
  //response.send(JSON.parse(JSON.stringify(prop)));

})



app.get("/obteneredificaciones/:uid",function(require,response){
   var ficha = juego.buscarUID(require.params.uid);
   var prop= new Array();
   var precios = new Array();
   var contador=0;
   for(var i=0;i<ficha.numeroPropiedades;i++){
    if(ficha.propiedades[i] instanceof modelo.Calle){
      if(ficha.propiedades[i].titulo.casas>0){
       ficha.propiedades[i].titulo.iniTitulo();
       prop.push(ficha.propiedades[i].nombre);
       precios.push(ficha.propiedades[i].titulo.precioCasa);
       contador++;
       }
       if(ficha.propiedades[i].titulo.hoteles>0){
        contador++;
       ficha.propiedades[i].titulo.iniTitulo();
       prop.push(ficha.propiedades[i].nombre);
       precios.push(ficha.propiedades[i].titulo.precioHotel);
       }
     
     }
   }
   var jsonData={
            "nombres": JSON.parse(JSON.stringify(prop)),
            "precios": JSON.parse(JSON.stringify(precios)),
            "numero":contador
        };


  response.send(jsonData);

})

app.get("/venderedificacion/:uid/:escogido",function(require,response){
 var uid = require.params.uid;
    var resul=juego.buscarUID(uid).usuario.venderEdificacion(require.params.escogido);
    
     var jsonData={
            "infon": resul
        };
        response.send(jsonData);


})


app.get("/propiedades/:uid",function(require,response){
   var ficha = juego.buscarUID(require.params.uid);
   var prop= new Array();
 
   for(var i=0;i<ficha.numeroPropiedades;i++){

       ficha.propiedades[i].titulo.iniTitulo();

      if(ficha.propiedades[i].estado instanceof modelo.Venta){}
        else{
       prop.push("Nombre:"+ficha.propiedades[i].nombre+" Numero de casas:"+ficha.propiedades[i].titulo.casas+" Numero hoteles:"+ficha.propiedades[i].titulo.hoteles+" Precio Alquiler:"+ficha.propiedades[i].titulo.precioAlquiler);
      }
   }

/*
    var jsonData={
            "propiedades":[ficha.propiedades]
        };
    */
  response.send(JSON.parse(JSON.stringify(prop)));
  // response.send(jsonData);

})

app.get("/pagarcarcel/:uid",function(require,response){
    var uid = require.params.uid;
    var ficha=juego.buscarUID(uid);
    //var css = fs.readFileSync("./client/templatemo_style.css");
    ficha.usuario.pagarCarcel();
    
        var jsonData={
            "infon": ficha.usuario.estado.mensaje
        };

        response.send(jsonData);
       

})


app.get("/utilizartarjeta/:uid",function(require,response){
    var uid = require.params.uid;
    var ficha=juego.buscarUID(uid);
    //var css = fs.readFileSync("./client/templatemo_style.css");
    ficha.usuario.utilizarTarjetaCarcel();
        var jsonData={
            "infon": ficha.usuario.estado.mensaje
        };

        response.send(jsonData);
       

})


app.get("/lanzarcarcel/:uid",function(require,response){
    var uid = require.params.uid;
    var ficha=juego.buscarUID(uid);
    var libre=0;
    //var css = fs.readFileSync("./client/templatemo_style.css");
    ficha.usuario.estado.accion(ficha);

    if(ficha.usuario.estado instanceof modelo.UsuarioLibre){
      libre=1;
    }
        var jsonData={
            "infon": ficha.usuario.estado.mensaje,
            "libre":libre
        };

        response.send(jsonData);
       

})

app.get("/empezar",function(require,response){
    
    var resul=juego.empezar();
    var jsonData={
            "infon": resul,
            "jugadores":juego.numeroFichasUtilizadas
            
        };
    response.send(jsonData);

})



app.get("/pasar/:uid",function(require,response){
    

    var resul=juego.buscarUID(require.params.uid).usuario.pasarTurno();
    
    var final1=juego.buscarUID(require.params.uid);
    if(final1==-1)
    {
      final1=-3
      if(juego.fase instanceof modelo.Final)final1=-4;
      
    }
    else final1=0
    
    var jsonData={
            "infon": resul,
            "mensaje":juego.mensaje,
            "final1":final1
            
        };
    response.send(jsonData);

})



app.get("/asignar/:uid/:posicion",function(require,response){

    var ficha = juego.buscarUID(require.params.uid);
    ficha.asignarCasilla(juego.tablero.casillas[require.params.posicion]);
 
       
        var casilla=ficha.usuario.nombre+' ha pasado a la casilla '+ficha.casilla.tema.nombre;
        var comprable=0;
        var mensaje="";
      
        if(ficha.casilla.tema instanceof modelo.Calle || ficha.casilla.tema instanceof modelo.Estacion || ficha.casilla.tema instanceof modelo.CompaniaAgua || ficha.casilla.tema instanceof modelo.CompaniaElectrica){
            comprable=1;

            mensaje=ficha.casilla.tema.estado.mensaje;
        }

        if(ficha.casilla.tema instanceof modelo.casillaTarjetaSuerte){
            comprable=2;
         
            
        }
        if(ficha.casilla.tema instanceof modelo.casillaTarjetaComunidad){
            comprable=3;
        }

        if(ficha.usuario.estado instanceof modelo.UsuarioEncarcelado){
           if(ficha.usuario.tarjetas.length>0)comprable=4;
           else comprable=5;

        }
       
      
       if(ficha.usuario.estado instanceof modelo.Bancarrota){
         var jsonData={
            "infon": ficha.usuario.nombre+' ha pasado a la casilla '+ficha.casilla.tema.nombre+' y estas en Bancarrota, obten el dinero o al pasar turno seras eliminado',
            "prueba": 'el usuario tira',
            "comprable": comprable,
            "accion":ficha.usuario.tipoAccion,
            "posicion":ficha.casilla.posicion,
            "mensaje":mensaje
        };
       }
       else{
        var jsonData={
            "infon": ficha.usuario.nombre+' ha pasado a la casilla '+ficha.casilla.tema.nombre+' al sacar ',
            "prueba": 'el usuario tira',
            "comprable": comprable,
            "accion":ficha.usuario.tipoAccion,
            "posicion":ficha.casilla.posicion,
            "mensaje":mensaje
        };
        
       }

    

   response.send(jsonData);
})

server.listen(port,host);
var coleccion=[];
var contador=0;
var socket = io.listen(server);
socket.on('connection', function(client){
  socket.emit('connected'); 
  client.on('listo',function(data){
         coleccion.push(data);
    if (coleccion.length==2){
      socket.emit('empezar');
    }
  });

  client.on('cambio', function(data){
    socket.sockets.emit('cambioTurno',data);
  });
  client.on('ficha', function(data){

    socket.sockets.emit('moverFicha',data);
  });
  client.on('venta', function(data){
    console.log('nueva venta');
    socket.sockets.emit('nuevaVenta',data);
  });
  client.on('ventaCompletada', function(data){
    console.log('nueva venta');
    socket.sockets.emit('ventaRealizada',data);
  });
  client.on('subasta', function(data){
    
    socket.sockets.emit('subastaEmpieza',data);
  });
  client.on('actualizarSubasta', function(data){

    socket.sockets.emit('actualizarSubasta2',data);
  });
  client.on('terminarSubasta', function(data){

    socket.sockets.emit('terminarSubasta2',data);
  });
  client.on('final', function(data){

    socket.sockets.emit('final2',data);
  });
  client.on('solicitud', function(data){

    socket.sockets.emit('solicitud2',data);
  });
   client.on('denegar', function(data){
    console.log('denegar2');
    socket.sockets.emit('denegar2',data);
  });



  //Evento creado por nosotros se puede llamar 'pepito'
});

console.log("Servidor: iniciado en host "+host);
console.log("Servidor: iniciado en puerto "+port);