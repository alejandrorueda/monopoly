//underscore.js
var _=require("underscore");
function Juego(){
   this.numeroFichasUtilizadas=0
   this.dado = new Dado()
   this.fichas=[]
   this.tablero=null
   this.turnoActual=0
   this.fase=new Inicial()
   this.numeroCasas=32
   this.numeroHoteles=12
   this.maximoPresupuesto=20000
   this.mensaje=""
   this.obtenerDado=function(){
    return this.dado
  
   }
   this.obtenerTablero=function(){
    return this.tablero
  
   }

   this.iniJuego=function(){
    this.tablero=(new CrearTablero).crearObjeto()
    // this.tablero=new Tablero(40)
     this.iniciarFichas()
  
   }


   this.eliminarJugador=function(ficha){
    ficha.presupuesto=-1
    console.log('El usuario '+ficha.usuario.nombre+' con la ficha '+ficha.nombre+' ha sido eliminado')
    this.mensaje='El usuario '+ficha.usuario.nombre+' con la ficha '+ficha.nombre+' ha sido eliminado'
    /*this.fichas.sort(function(a, b) {
    return parseFloat(a.presupuesto) - parseFloat(b.presupuesto);
     });
    this.fichas.shift()
    this.fichas.reverse()*/
    for(var i=0;i<ficha.numeroPropiedades;i++){
        ficha.propiedades[i].estado = new Libre(); 
        ficha.propiedades[i].titulo.casas=0;
        ficha.propiedades[i].titulo.hoteles=0;
    }
    this.fichas.splice(this.turnoActual,1)
    this.numeroFichasUtilizadas--
    if(this.numeroFichasUtilizadas==1){
        this.mensaje='Ha ganado la partida '+this.fichas[0].usuario.nombre
        console.log('Ha ganado la partida '+this.fichas[0].usuario.nombre)
        this.fase=new Final();
    }
   }
   this.empezar=function(){
      if(this.numeroFichasUtilizadas>=2){
         this.fase=new Jugar()
         return 0
       }
       else{
        console.log('Es necesario al menos dos jugadores para jugar')
        return -1
      }
   }
   this.cogerCasa=function(){
      if(this.numeroCasas>0){
        this.numeroCasas--
        return 0
      }
        else{
         console.log('Faltan casas en el juego')
         return -1
       }
   }
   this.cogerHotel=function(){
      if(this.numeroHoteles>0){
        this.numeroHoteles--
        return 0
      }
        else{
         console.log('Faltan hoteles en el juego')
         return -1
       }
   }
   this.agregarCasas=function(numero){
       this.numeroCasas=parseInt(this.numeroCasas)+parseInt(numero)
   }
   this.agregarHoteles=function(numero){
       this.numeroHoteles=parseInt(numero)+parseInt(this.numeroHoteles)
   }

   this.buscarJugador=function(nombre){
      for(i=0;i<this.numeroFichasUtilizadas;i++){
             if(this.fichas[i].obtenerUsuario().nombre==nombre)return this.fichas[i]
       }
     return -1

   }
   this.buscarUID=function(uid){
    for(var i=0;i<this.numeroFichasUtilizadas;i++){
      if(this.fichas[i].usuario.uid==uid){
        return this.fichas[i]
      }
    }
      return -1

   }
   this.gestionTurnos=function(){
       
        if(this.fichas[this.turnoActual].usuario.estado instanceof Bancarrota){
          this.eliminarJugador(this.fichas[this.turnoActual])

        }
        this.turnoActual++;
        if(this.turnoActual>=this.numeroFichasUtilizadas)this.turnoActual=0
        console.log('turno '+this.turnoActual+' '+this.numeroFichasUtilizadas)
        this.fichas[this.turnoActual].usuario.volverTirar=1
        return this.fichas[this.turnoActual].usuario.uid
          
   }

   this.agregarFicha=function(usuario){

     if(this.numeroFichasUtilizadas<6){
     usuario.uid=this.numeroFichasUtilizadas
     this.fichas[this.numeroFichasUtilizadas].agregarUsuario(usuario)
     this.fichas[this.numeroFichasUtilizadas].casilla=this.tablero.casillas[0]
     if(this.numeroFichasUtilizadas==0)this.fichas[this.numeroFichasUtilizadas].usuario.volverTirar=1
     this.numeroFichasUtilizadas++
     console.log('Usuario asignado correctamente a la ficha '+this.fichas[this.numeroFichasUtilizadas-1].nombre)

     return usuario.uid
   }
   else{
    console.log('Ya estan todas las fichas asignadas')

    return -1
   }

     
   }
   this.nuevoUsuario=function(usuario){
     //return this.agregarFicha(usuario)
    return this.fase.nuevoUsuario(usuario,this)

   }
    this.crearUsuario=function(usuarioNombre){
    // return  this.agregarFicha((new CrearJugador).crearObjeto(usuarioNombre,this))
    return this.fase.crearUsuario(usuarioNombre,this)
   }
  
   this.iniciarFichas=function(){
       this.fichas[0]=new Ficha('red')
       this.fichas[1]=new Ficha('blue')
       this.fichas[2]=new Ficha('green')
       this.fichas[3]=new Ficha('black')
       this.fichas[4]=new Ficha('yellow')
       this.fichas[5]=new Ficha('grey')
   }


}

function Tablero(numeroCasillas){
	this.casillas=[]
  this.dado = new Dado()
	this.numeroCasillas=numeroCasillas
  this.caja=new Tarjetas()

	this.agregarCasilla=function(posicion, Casilla){
	     this.casillas[posicion]=Casilla
	}

   this.iniciarTarjetas=function(){
       this.caja.agregarTarjetaSuerte(new Tarjeta(1,new Avanzar(5)))
       this.caja.agregarTarjetaSuerte(new Tarjeta(2,new Avanzar(1)))
       this.caja.agregarTarjetaSuerte(new Tarjeta(3,new Avanzar(10)))
       this.caja.agregarTarjetaSuerte(new Tarjeta(4,new Retroceder(5)))
       this.caja.agregarTarjetaSuerte(new Tarjeta(5,new Avanzar(7)))
       this.caja.agregarTarjetaCofre(new Tarjeta(6,new Multa(500)))
       this.caja.agregarTarjetaCofre(new Tarjeta(7,new Multa(100)))
       this.caja.agregarTarjetaSuerte(new Tarjeta(8,new SalirCarcel()))
       this.caja.agregarTarjetaSuerte(new Tarjeta(9,new SalirCarcel()))
       
       this.caja.agregarTarjetaSuerte(new Tarjeta(10,new IrACasilla(this.casillas[27])))
       this.caja.agregarTarjetaSuerte(new Tarjeta(11,new IrACasilla(this.casillas[21])))
       this.caja.agregarTarjetaSuerte(new Tarjeta(12,new IrACasilla(this.casillas[25])))
       this.caja.agregarTarjetaSuerte(new Tarjeta(13,new IrACasilla(this.casillas[0])))

        this.caja.agregarTarjetaCofre(new Tarjeta(14,new Premio(600)))
       this.caja.agregarTarjetaCofre(new Tarjeta(15,new Premio(150)))
       this.caja.agregarTarjetaCofre(new Tarjeta(16,new Premio(50)))
       this.caja.agregarTarjetaCofre(new Tarjeta(17,new Premio(350)))

   }
	this.iniciarTablero=function(){
       for(i=0;i<numeroCasillas;i++){
       	     this.casillas[i]=new Casilla(i,new Normal())
       }
    this.agregarCasilla(0,new Casilla(0,new Salida()))
    this.agregarCasilla(1,new Casilla(1,new Calle('Ronda de Valencia',60,'marron',1)))
    this.agregarCasilla(2,new Casilla(2,new casillaTarjetaComunidad('comunidad',this.caja)))
    this.agregarCasilla(3,new Casilla(3,new Calle('Plaza Lavapies',60,'marron',3)))
    this.agregarCasilla(4,new Casilla(4,new Impuesto('Impuesto',200)))
    this.agregarCasilla(5,new Casilla(5,new Estacion('Estacion de Goya',200)))
    this.agregarCasilla(6,new Casilla(6,new Calle('Glorienta Cuatro Caminos',100,'celeste',6)))
    this.agregarCasilla(7,new Casilla(7,new casillaTarjetaSuerte('suerte',this.caja),7))
    this.agregarCasilla(8,new Casilla(8,new Calle('Avenida Reina Victoria',100,'celeste',8)))
    this.agregarCasilla(9,new Casilla(9,new Calle('Calle Bravo Murillo',100,'celeste'),9))
    this.agregarCasilla(10,new Casilla(10,new Carcel(),10))
    this.agregarCasilla(11,new Casilla(11,new Calle('Glorienta de Bilbao',140,'morado'),11))
    this.agregarCasilla(12,new Casilla(12,new CompaniaElectrica('Electrica',180),12))
    this.agregarCasilla(13,new Casilla(13,new Calle('Calle Alberto Aguilera',140,'morado',13)))
    this.agregarCasilla(14,new Casilla(14,new Calle('Calle Fuencarral',160,'morado',14)))
    this.agregarCasilla(15,new Casilla(15,new Estacion('Estacion de las delicias',200)))
    this.agregarCasilla(16,new Casilla(16,new Calle('Avenida Felipe III',180,'naranja',16)))
    this.agregarCasilla(17,new Casilla(17,new casillaTarjetaComunidad('comunidad',this.caja)))
    this.agregarCasilla(18,new Casilla(18,new Calle('Calle Velazquez',180,'naranja',18)))
    this.agregarCasilla(19,new Casilla(19,new Calle('Calle Serrano',200,'naranja',19)))
    this.agregarCasilla(21,new Casilla(21,new Calle('Avenida De America',220,'rojo',21)))
    this.agregarCasilla(22,new Casilla(22,new casillaTarjetaSuerte('suerte',this.caja)))
    this.agregarCasilla(23,new Casilla(23,new Calle('Calle María de Molina',220,'rojo',23)))
    this.agregarCasilla(24,new Casilla(24,new Calle('Calle Cia Bermudez',220,'rojo',24)))
    this.agregarCasilla(25,new Casilla(25,new Estacion('Estacion del Mediodia',200)))
    this.agregarCasilla(26,new Casilla(26,new Calle('Avenida de los Reyes Catolicos',260,'amarillo',26)))
    this.agregarCasilla(27,new Casilla(27,new Calle('Calle Bailen',260,'amarillo',27)))
    this.agregarCasilla(28,new Casilla(28,new CompaniaAgua('Companias de aguas',150)))
    this.agregarCasilla(29,new Casilla(29,new Calle('Plaza de Espana',280,'amarillo',29)))
    this.agregarCasilla(30,new Casilla(30,new IrALaCarcel(),30))
    this.agregarCasilla(31,new Casilla(31,new Calle('Puerta del Sol',300,'verde',31)))
    this.agregarCasilla(32,new Casilla(32,new Calle('Calle Alcala',300,'verde',32)))
    this.agregarCasilla(33,new Casilla(33,new casillaTarjetaComunidad('comunidad',this.caja)))
    this.agregarCasilla(34,new Casilla(34,new Calle('Gran Vía',330,'verde',33)))
    this.agregarCasilla(35,new Casilla(35,new Estacion('Estacion del Norte',200)))
    this.agregarCasilla(36,new Casilla(36,new casillaTarjetaSuerte('suerte',this.caja)))
    this.agregarCasilla(37,new Casilla(37,new Calle('Paseo de la Castellana',380,'marino',36)))
    this.agregarCasilla(38,new Casilla(38,new Impuesto('impuesto',100)))
    this.agregarCasilla(39,new Casilla(39,new Calle('Paseo del Prado',400,'marino',38)))
	}
	this.configurarTablero=function(){
		this.agregarCasillas(0,new Casilla(0,new Salida()))
	}
    this.obtenerCasilla=function(tema){
          for(i=0;i<this.numeroCasillas;i++){
                 if(tema==this.casillas[i].obtenerTema().nombre) return this.casillas[i]
          }
    }
   
    
 
	this.iniciarTablero()
  this.iniciarTarjetas()


}

function Casilla(posicion,tema){
	
	this.posicion=posicion
  this.nJugadores=0
    this.tema=tema
   this.jugadores=[] 
    this.obtenerTema = function(){
         return this.tema
    }
    this.agregarJugador=function(jugador){
      this.jugadores[this.nJugadores]=jugador
      this.nJugadores++
    }
    this.quitarJugador=function(jugador){
      for(i=0;i<this.nJugadores;i++){
                 if((jugador.nombre)==this.jugadores[this.nJugadores].nombre) return this.casillas[i]
          }
    }

}
function CompaniaElectrica(nombre,precio){
     this.nombre=nombre
     this.precio=precio
     this.estado=new LibreCompania()
     this.titulo=new Titulo(precio,this)
     this.enSolicitud=false
     this.precioOriginal=10
     this.actualizarPrecio=function(ficha){
       this.titulo.precioAlquiler=10
         for(var i=0;i<ficha.numeroPropiedades;i++){
            if(ficha.propiedades[i] instanceof CompaniaAgua){
               this.titulo.precioAlquiler=this.precioOriginal*2
            }
         }
          
       }
}
function CompaniaAgua(nombre,precio){
     this.nombre=nombre
     this.precio=precio
     this.estado=new LibreCompania()
     this.titulo=new Titulo(precio,this)
     this.enSolicitud=false
     this.precioOriginal=10
     this.actualizarPrecio=function(ficha){
       this.titulo.precioAlquiler=10
         for(var i=0;i<ficha.numeroPropiedades;i++){

            if(ficha.propiedades[i] instanceof CompaniaElectrica){
               this.titulo.precioAlquiler=this.precioOriginal*2
                console.log('actualizado2 precio a '+this.titulo.precioAlquiler)
            }
         }
         
       }
}



function LibreCompania(){
  this.mensaje=""
    this.comprar = function(ficha,propiedad) {
        ficha.agregarPropiedad(propiedad)
        ficha.quitarPresupuesto(propiedad.titulo.precioCompra)
        propiedad.actualizarPrecio(ficha)
        propiedad.estado = new APagarCompania(ficha)
        this.mensaje="Has comprado la compañia"
        return 0
    }
    this.accion = function(ficha, propiedad) {
        this.mensaje="El usuario puede comprar esta compañoa"
        console.log('El usuario puede comprar esta estacion')
    }
}

function APagarCompania(propietario){
  this.propietario=propietario
  this.mensaje=""

  this.comprar = function() {
    this.mensaje='Esta compañia ya tiene propietario'
    return 'Esta estacion ya tiene propietario'
}
  this.accion = function(ficha, propiedad) {
    if(this.propietario!=ficha){
    var numero=ficha.usuario.juego.obtenerDado().calcularNumero()
    var numero2=ficha.usuario.juego.obtenerDado().calcularNumero()
    console.log('propiedad nombre '+propiedad.nombre)
    propiedad.actualizarPrecio(this.propietario)

    ficha.quitarPresupuesto((numero+numero2)*propiedad.titulo.precioAlquiler)
    this.propietario.agregarPresupuesto(propiedad.titulo.precioAlquiler)
    var pago=ficha.presupuesto
    if(pago<0){
      this.mensaje='El usuario no tiene dinero para pagar la estancia'
    console.log('El usuario no tiene dinero para pagar la estancia')
      return -2
    }
    else{
      this.mensaje='El usuario '+ficha.usuario.nombre+' ha pagado por su estancia en '+propiedad.nombre+' al sacar un numero '+(numero+numero2)+' unos '+(numero+numero2)*propiedad.titulo.precioAlquiler
     console.log('El usuario '+ficha.usuario.nombre+' ha pagado por su estancia en '+propiedad.nombre+' al sacar un numero '+(numero+numero2)+' unos '+(numero+numero2)*propiedad.titulo.precioAlquiler)
     return -1
    }

  }
}

}

function Impuesto(nombre,cantidad){
    this.nombre=nombre
    this.cantidad=cantidad
}
function Tarjeta(nombre,comando){
      this.nombre=nombre
      this.comando = comando
      

} 

function casillaTarjetaSuerte(nombre,caja){
     this.nombre=nombre
     this.caja=caja
     this.sacarTarjeta=function(ficha){
      var tarjeta=this.caja.sacarTarjetaSuerte()
      console.log(tarjeta)
      if(tarjeta.comando instanceof SalirCarcel) ficha.usuario.tarjetas.push(tarjeta)
      else tarjeta.comando.ejecutar(ficha)
       return tarjeta
     }

}
function casillaTarjetaComunidad(nombre,caja){
     this.nombre=nombre
     this.caja=caja
     this.sacarTarjeta=function(ficha){
        var tarjeta=this.caja.sacarTarjetaCofre()
         tarjeta.comando.ejecutar(ficha)
         return tarjeta
     }

}
function Tarjetas(){
    this.nTarjetasSuerte = 0
    this.nTarjetasCofre = 0
    this.tarjetasSuerte= []
    this.tarjetasCofre= []
    this.agregarTarjetaSuerte=function(tarjeta){
    	
    	this.tarjetasSuerte[this.nTarjetasSuerte]=tarjeta
      this.nTarjetasSuerte++;
    }
    this.agregarTarjetaCofre=function(tarjeta){
      
      this.tarjetasCofre[this.nTarjetasCofre]=tarjeta
      this.nTarjetasCofre++;
    }
    this.sacarTarjetaCofre=function(){
       
        return this.tarjetasCofre[Math.round(Math.random()*(this.nTarjetasCofre-1))];
    }
    this.sacarTarjetaSuerte=function(){
        return this.tarjetasSuerte[Math.round(Math.random()*(this.nTarjetasSuerte-1))];
    }
}
function Dado(){
     this.calcularNumero=function(){
        return Math.round(Math.random()*6+1);
     }
}



function Ficha(nombre){
       this.nombre=nombre
       this.usuario=null
       this.casilla=new Salida()
       this.presupuesto=0
       this.propiedades=[]
       this.numeroPropiedades=0
       this.mensaje
       this.bandejaVentas=new BandejaVentas(this)
       this.agregarPropiedad=function(propiedad){
            this.propiedades[this.numeroPropiedades]=propiedad
            this.numeroPropiedades++
       }
       this.agregarUsuario=function(usuario){
           this.usuario=usuario
           this.presupuesto=this.usuario.presupuesto

       }

      
        this.buscarPropiedad=function(propiedad){
              for(var i=0;i<this.propiedades.length;i++){
                  if(propiedad==this.propiedades[i].nombre){
                     return i;
                  }
              }
              return -1;    
          }

        this.comprarPropiedad=function(precio){
           
          
           this.presupuesto=this.presupuesto - precio
       }

        this.obtenerUsuario=function(){
           return this.usuario
       }
       this.agregarPresupuesto=function(cantidad){
        console.log('presupuesto '+this.presupuesto)
        this.presupuesto=parseInt(this.presupuesto)+parseInt(cantidad);
        console.log('maximo '+cantidad+" total:"+this.presupuesto+" maximo "+this.usuario.juego.maximoPresupuesto)
        if(this.presupuesto>=this.usuario.juego.maximoPresupuesto){
         this.usuario.juego.fase = new Final()
         console.log('Ha ganado el jugador '+this.usuario.nombre+' por superar el presupuesto maximo')
        }
        if(this.presupuesto>=0 && this.usuario.estado instanceof Bancarrota){
          this.usuario.estado = new UsuarioLibre("UsuarioLibre");
        }
       }
       this.quitarPresupuesto=function(cantidad){
        this.presupuesto-=cantidad

        if(this.presupuesto<=0){ 

          //this.usuario.juego.eliminarJugador(this)
          console.log('presupuesto negativo '+this.presupuesto);
          this.usuario.estado= new Bancarrota(this);
        }
        
       }
       this.asignarCasilla=function(casilla){
          //document.writeln('asignada')
           //console.log('El usuario '+this.usuario.nombre+' ha caido en la casilla '+casilla.tema.nombre)
           this.usuario.juego.fase.asignarCasilla(casilla,this)
          /* this.casilla=casilla
           if(casilla.tema instanceof Salida)this.presupuesto=this.presupuesto+200
          if(casilla.tema instanceof Calle || casilla.tema instanceof Estacion){
        
            casilla.tema.estado.accion(this,casilla.tema)
          }

          if(casilla.tema instanceof casillaTarjetaSuerte ||casilla.tema instanceof casillaTarjetaComunidad){
              console.log('Saca una tarjeta')
          }

         // return'El usuario '+this.usuario.nombre+' ha caido en la casilla '+casilla.tema.nombre   */
       }
}

function Jugador(nombre,presupuesto,juego){
     this.presupuesto=presupuesto
     this.nombre=nombre
     this.juego=juego
     this.tipoAccion=9
     this.posicion=0
     this.volverTirar=0
     this.estado= new UsuarioLibre("libre")
     this.tarjetas=[]
     this.perdidoTurno=0
     this.mensaje=""
     this.uid
    this.sacarTarjeta=function(){
      var ficha = juego.buscarUID(this.uid);
     if(this.perdidoTurno==1){
       return ficha.casilla.tema.sacarTarjeta(ficha)
     }
     else{
      console.log('No es tu turno')
      return -1
     }
    }

    this.hipotecarPropiedad=function(propiedad){
      var ficha = juego.buscarUID(this.uid);
      var propiedadIndice=ficha.buscarPropiedad(propiedad);
      
      if(ficha.propiedades[propiedadIndice].titulo.casas==0 || ficha.propiedades[propiedadIndice].titulo.hoteles==0){
      ficha.agregarPresupuesto(ficha.propiedades[propiedadIndice].titulo.precioCompra);
      ficha.propiedades.splice(propiedadIndice,1);
      ficha.propiedades[propiedadIndice]=new Hipotecada(ficha);
      ficha.numeroPropiedades--;
      return this.mensaje="Ha sido hipotecada la propiedad"
     }
     else return this.mensaje="No se puede hipotecar una propiedad con casas"
    }

  this.venderEdificacion=function(propiedad){
      var ficha = juego.buscarUID(this.uid);
      var propiedadIndice=ficha.buscarPropiedad(propiedad);
      console.log('Edificacion vendida con indice '+propiedad);
      if(ficha.propiedades[propiedadIndice].titulo.casas>0 || ficha.propiedades[propiedadIndice].titulo.hoteles>0){
        if(ficha.propiedades[propiedadIndice].titulo.hoteles>0){
          ficha.propiedades[propiedadIndice].titulo.hoteles-=1
          
          ficha.agregarPresupuesto(ficha.propiedades[propiedadIndice].titulo.precioHotel);
          ficha.propiedades[propiedadIndice].estado= new conCasas(ficha);
          this.juego.agregarHoteles(1)
          console.log("Has vendido un hotel")
          this.mensaje="Has vendido un hotel"
       }
       else{
        
          ficha.propiedades[propiedadIndice].titulo.casas-=1

          ficha.agregarPresupuesto(ficha.propiedades[propiedadIndice].titulo.precioCasa);
          if(ficha.propiedades[propiedadIndice].titulo.casas==0)ficha.propiedades[propiedadIndice].estado= new APagar(ficha);
          else ficha.propiedades[propiedadIndice].estado= new Grupo(ficha);
          this.juego.agregarCasas(1)

          this.mensaje="Has vendido una casa"
       
       }
      
     }
     else this.mensaje="No tienes edificaciones para vender"

      return this.mensaje
    }


    this.subastarPropiedad=function(propiedad){

    if(this.perdidoTurno==1){
     var ficha = juego.buscarUID(this.uid);
         if(ficha.buscarPropiedad(propiedad)!=-1){
          var propiedad1=ficha.buscarPropiedad(propiedad);
          ficha.propiedades[propiedad1].estado= new Subasta(ficha,ficha.propiedades[propiedad1]);
         
         for(var i=0;i<this.juego.numeroFichasUtilizadas;i++){
       // console.log('dfg '+this.juego.fichas[i].nombre);
         this.juego.fichas[i].usuario.estado= new EnSubasta(ficha.propiedades[propiedad1],this.juego.fichas[i])
         ficha.propiedades[propiedad1].estado.pujantes.push(this.juego.fichas[i])
         }

         this.juego.fase=new SubastaJuego();
      console.log("La propiedad "+propiedad+" ha sido puesta a subasta por "+ this.nombre);

        return this.mensaje="La propiedad "+propiedad+" ha sido puesta a subasta por "+ this.nombre;
      }
     }
     else{
      console.log("No es tu turno")
      return this.mensaje="No es tu turno"
    }      

    }
  
    this.venderPropiedad=function(propiedad,precio){
        var ficha = juego.buscarUID(this.uid);
         ficha.propiedades[ficha.buscarPropiedad(propiedad)].estado= new Venta(ficha,precio);
         this.mensaje="La propiedad "+propiedad+" ha sido puesta a la venta por "+ precio;
    }
  
    this.quitarVenta=function(escogido){
        var ficha = juego.buscarUID(this.uid);
         ficha.bandejaVentas.propiedadesVentaQuitar[escogido].estado= new APagar(ficha);
         
         return this.mensaje="La propiedad "+ficha.bandejaVentas.propiedadesVentaQuitar[escogido].nombre+" ha sido quitada de la lista";
    }

    this.utilizarTarjetaCarcel=function(){
      if(this.perdidoTurno==1 || this.volverTirar==1){
        if(this.tarjetas.length>0){
          this.tarjetas[0].comando.ejecutar(this)
          this.tarjetas.shift()
        }
        else{ 
          this.estado.mensaje='No tienes una tarjeta para salir de la carcel'
          console.log('No tienes una tarjeta para salir de la carcel')
        }
      }
      else this.estado.mensaje='No es tu turno'
     }

    

    this.comprarPropiedad=function(){
        var ficha = juego.buscarUID(this.uid);
         console.log('Volver a tirar '+this.volverTirar)
      if(this.perdidoTurno==1 || this.volverTirar>0){
        ficha.casilla.tema.estado
        return ficha.casilla.tema.estado.comprar(ficha,ficha.casilla.tema)
       
        }
             else{
              console.log('No es tu turno')
              return -1
              }   
        }

      this.comprarVenta=function(escogido){
        var ficha = juego.buscarUID(this.uid);
        
        return ficha.bandejaVentas.propiedadesVenta[escogido].estado.comprar(ficha.bandejaVentas.propiedadesVenta[escogido],ficha)
             
        }

      this.pagarCarcel=function(){
        var ficha = juego.buscarUID(this.uid)
        if(this.perdidoTurno==1 || this.volverTirar==1){
        this.estado.pagarSalidaCarcel(ficha)
        }
        else this.estado.mensaje="No es tu turno"
      }  

    this.comprarCasa=function(propiedad){

     // if(this.perdidoTurno==1){
       var ficha = juego.buscarUID(this.uid);
       var propiedades = _.filter(ficha.propiedades, function (aTema){

           return aTema.nombre==propiedad;
      });
       
       if(propiedades[0]!=undefined){
            propiedades[0].titulo.iniTitulo();
            return propiedades[0].estado.comprar(ficha,propiedades[0])

       }
       else{
        console.log('No tienes esta propiedad')
        return 2
      }
    // }

   /* else{
      console.log('No es tu turno no puedes comprar casa')
      return -1
    }*/

    }
        
    this.pasarTurno=function(){
      if(this.volverTirar==0){
          if(this.perdidoTurno==1){
            console.log('pierde')
            this.perdidoTurno=0
            return juego.gestionTurnos()
             
          }
          else{
           console.log('No te corresponde pasar turno')

           return -2
         }
       }
      else{
       console.log('Te toca tirar')
       return -1
     }
    }

     this.lanzarDosDados=function(){
       if(this.volverTirar>0)this.estado.accion(juego.buscarUID(this.uid))
       return this.juego.fase.lanzarDosDados(this)
        /*var numero=juego.obtenerDado().calcularNumero()
        var numero2=juego.obtenerDado().calcularNumero()
      
      if(this.volverTirar>0){
        this.posicion=this.posicion+numero+numero2
        if(this.posicion>=40)this.posicion=this.posicion-40
        juego.buscarJugador(this.nombre).asignarCasilla(juego.obtenerTablero().casillas[this.posicion])

        if((numero+numero2)==12)this.volverTirar++;
        else this.volverTirar=0;

        if(this.volverTirar==3){
         
            juego.buscarJugador(this.nombre).asignarCasilla(juego.obtenerTablero().casillas[30])
            this.volverTirar=0
        }

        if(this.volverTirar==0)juego.gestionTurnos()
        
        return numero+numero2 
    }
        
        return 'No se puede tirar' 
        */
     }

       this.lanzarDosDadosManual=function(numero,numero2){
        

      if(this.volverTirar>0){
        this.posicion=this.posicion+numero+numero2
        if(this.posicion>=40)this.posicion=this.posicion-40
        juego.buscarJugador(this.nombre).asignarCasilla(juego.obtenerTablero().casillas[this.posicion])

        if((numero+numero2)==12)this.volverTirar++;
        else this.volverTirar=0;

        if(this.volverTirar==4){
         
            juego.buscarJugador(this.nombre).asignarCasilla(juego.obtenerTablero().casillas[30])
            this.volverTirar=0
        }

        return numero+numero2 
    }
        return 'No se puede tirar' 
     }
     

}


function Propiedad(tipo,propietario,aumentoPrecio){
      this.tipo=tipo
      this.propietario=propietario
      this.aumentoPrecio=aumentoPrecio
}

function Banco(dinero){
   
    this.dinero=dinero
    this.agregarFondos=function(dinero){
       this.dinero = this.dinero + dinero
    }
    this.quitarFondos=function(dinero){
      this.dinero = this.dinero - dinero
    }

}
function Estacion(nombre,precio){

  this.nombre = nombre
  this.precio = precio
  this.enSolicitud=false
  this.precioInicial=precio
  this.titulo = new Titulo(precio,this)
  this.estado = new LibreEstacion()
  

  this.actualizarPrecioEstacion=function(ficha){
     var precio
     var contador=0
       for(i=0;i<ficha.numeroPropiedades;i++){

        if(ficha.propiedades[i] instanceof Estacion) {
          contador++
          //this.titulo.precioAlquiler = parseInt(this.titulo.precioAlquiler) + parseInt(ficha.propiedades[i].titulo.precioAlquiler/4)
        }
       }
       this.titulo.precioAlquiler = parseInt((this.precioInicial/4)*contador)

  }



}
function Calle(nombre,precio,color,posicion){
   // this.contadorPropiedades = 0
    this.nombre = nombre
	this.precio = precio
	this.casas= new Map()
	this.hoteles = new Map()
	this.colorr = color
  this.propiedades = []
  this.propietario = new Jugador("nadie",0)
  this.titulo=new Titulo(this.precio,this)
  this.estado=new Libre()
  this.enSolicitud=false
   

this.mismoColor=function(juego){
     var colorFiltro=this.colorr
  var colores = _.filter(juego.tablero.casillas, function (aTema){ 
    return aTema.tema.colorr==colorFiltro;
     }).length;

 this.titulo.numeroCallesColor=colores

   return colores
  }
 /* this.agregarPropiedad=function(propiedad){
      this.propiedades[this.contadorPropiedades]=propiedad
      this.contadorPropiedades++;
  }*/
   this.agregarPropietario=function(propietario){
      this.propietario = propietario
  }

}

function Normal(){
   this.nombre="Parking gratuito"
}

function Salida(){

    this.nombre="Salida"
}
function Carcel(nombre){
	this.nombre="Visita en la carcel"

}

function IrALaCarcel(){
  this.nombre='Ir a la carcel'
}


   function iniJuego(){
     tab =new Tablero(40)
  
   }
function Creator(){

   function crearObjeto(){}
}

function CrearTablero(){}

CrearTablero.prototype = new Creator;
CrearTablero.prototype.crearObjeto = function() {
  return new Tablero(40)
}

function CrearJuego(){}

CrearJuego.prototype = new Creator;
CrearJuego.prototype.crearObjeto = function() {
  return new Juego()
}

function CrearJugador(){}

CrearJugador.prototype = new Creator;
CrearJugador.prototype.crearObjeto = function(nombre,juego) {
  return new Jugador(nombre,1500,juego)
}

function Titulo(precioCompra,propiedad){
     this.propiedad=propiedad
     this.precioCompra=precioCompra
     this.precioAlquiler=0
     this.casas=0
     this.hoteles=0
     this.numeroCallesColor=0
     this.precioCasaOriginal=50+(precioCompra/4)
     this.precioCasa=50+(precioCompra/4)
     this.precioHotel=65+(precioCompra/4)
     this.iniTitulo=function(){
    
    if(propiedad instanceof Calle){
     if(this.casas>0)this.precioCasa=this.precioCasaOriginal*this.casas
     this.precioAlquiler=this.precioCompra/4
     this.precioAlquiler=this.precioAlquiler+(this.precioAlquiler*this.casas)
     if(this.hoteles==1)this.precioAlquiler=this.precioAlquiler+(this.precioAlquiler*4)+this.precioHotel
     
     }
   if(propiedad.estado instanceof APagarEstacion){
             
          propiedad.actualizarPrecioEstacion(propiedad.estado.propietario);
     }

     if(propiedad.estado instanceof APagarCompania){
             
          propiedad.actualizarPrecio(propiedad.estado.propietario);
     }
   
   
     
}

}

function Estado(){
   this.nombre='estado'
   this.comprar=function(){}
   this.functionAlquilar=function(){}
   this.accion=function(){}
   this.comprarCasa=function(){}
}
function Libre(){
  this.mensaje=""
}
Libre.prototype = new Estado;
Libre.prototype.comprar = function(ficha,propiedad) {
    ficha.agregarPropiedad(propiedad)
    ficha.quitarPresupuesto(propiedad.titulo.precioCompra)
    propiedad.estado = new APagar(ficha)
 
    console.log(propiedad.nombre+' '+'ha sido comprada')
    this.mensaje=propiedad.nombre+' '+'ha sido comprada'
    propiedad.titulo.iniTitulo()
    propiedad.mismoColor(ficha.usuario.juego)
    return 0
}
Libre.prototype.accion = function(ficha, propiedad) {
    this.mensaje='El usuario puede comprar esta propiedad por '+propiedad.titulo.precioCompra
    console.log('El usuario puede comprar esta propiedad por '+propiedad.titulo.precioCompra)
    return 4
}

function APagar(propietario){
  this.propietario=propietario
  this.mensaje=""
}
APagar.prototype = new Estado;
APagar.prototype.comprar = function(ficha,propiedad) {
    
var callesGrupo = _.filter(ficha.propiedades, function (aTema){ 
    return aTema.colorr==propiedad.colorr;
}).length;

if(this.propietario==ficha){
    if(callesGrupo==propiedad.titulo.numeroCallesColor){
   //this.comprarCasa(ficha,propiedad)
   propiedad.estado = new Grupo(this.propietario)
   this.mensaje='ha comprar casa'
   console.log('ha comprar casa')
   propiedad.estado.comprar(ficha,propiedad)
   return 0
 }
 else{
  this.mensaje='Ya has comprado esta calle pero no puedes aun comprar casa'
  console.log('Ya has comprado esta calle pero no puedes aun comprar casa')
  return 1
}
}
else{
   this.mensaje='Esta calle ya tiene propietario'
   console.log('Esta calle ya tiene propietario')
   return 2
 }
}
/*APagar.prototype.comprarCasa = function(ficha,propiedad) {
    
var callesGrupo = _.filter(ficha.propiedades, function (aTema){ 
    return aTema.colorr==propiedad.colorr;
}).length;
 console.log(callesGrupo+' '+propiedad.mismoColor(ficha.usuario.juego))
if(callesGrupo==propiedad.mismoColor(ficha.usuario.juego)){
  if((ficha.presupuesto-propiedad.titulo.precioCasa)>0){

  ficha.presupuesto=ficha.presupuesto-propiedad.titulo.precioCasa
  propiedad.titulo.casas++;
  console.log('El usuario compra una casa')
  }
  else console.log('No tienes suficiente dinero para una casa')
}
else
   console.log('Aun no tienes todas las calles del grupo')
}*/
APagar.prototype.accion = function(ficha, propiedad) {


if(this.propietario!=ficha){
    ficha.quitarPresupuesto(propiedad.titulo.precioAlquiler)
    var pago=ficha.presupuesto
    //this.propietario+=propiedad.titulo.precioAlquiler
    this.propietario.agregarPresupuesto(propiedad.titulo.precioAlquiler)
    if(pago<0){
      this.mensaje='El usuario no tiene dinero para pagar la estancia'
    console.log('El usuario no tiene dinero para pagar la estancia')
      return -2
    }
    else{
      this.mensaje='El usuario '+ficha.usuario.nombre+' ha pagado por su estancia en la calle '+propiedad.nombre+' '+propiedad.titulo.precioAlquiler+' a '+this.propietario.nombre
     console.log('El usuario '+ficha.usuario.nombre+' ha pagado por su estancia en la calle '+propiedad.nombre+' '+propiedad.titulo.precioAlquiler)
     return -1
   }

  }
else{
  this.mensaje='Eres su propietario'
 console.log('Eres su propietario')
 return 1
}
}


function Grupo(propietario){
   this.casas=0
   this.propietario=propietario
   this.mensaje=""
   this.comprar=function(ficha,propiedad) {

 if(this.propietario==ficha){
  if((ficha.presupuesto-propiedad.titulo.precioCasa)>0){
  if(this.casas==0){
     if(ficha.usuario.juego.cogerCasa()==0){
  //ficha.presupuesto=ficha.presupuesto-propiedad.titulo.precioCasa
  ficha.quitarPresupuesto(propiedad.titulo.precioCasa)
  propiedad.titulo.casas++
  propiedad.titulo.iniTitulo()
  this.mensaje='El usuario compra una casa'
  console.log('El usuario compra una casa')
  this.casas++
    return 0
    }
  }
  else this.comprobarCasasGrupo(ficha,propiedad)
  }
  else{
    this.mensaje="No tienes suficiente dinero para una casa"
   console.log('No tienes suficiente dinero para una casa')
      return -2
    }
  }
  else{
    this.mensaje='No puedes comprar casa no eres su propietario'
   console.log('No puedes comprar casa no eres su propietario')  
   return 2
 }
}

this.comprobarCasasGrupo=function(ficha,propiedad){

var casasGrupo = _.filter(ficha.propiedades, function (aTema){ 
    return aTema.colorr==propiedad.colorr && (aTema.titulo.casas>0 || aTema.titulo.hoteles>0);
}).length;

console.log('casas grupo '+casasGrupo)
if(casasGrupo==propiedad.titulo.numeroCallesColor){

  propiedad.estado=new conCasas(this.propietario)
  propiedad.estado.comprar(ficha,propiedad)

}
else{
  this.mensaje='Es necesario una casa por calle para poder comprar mas'
 console.log('Es necesario una casa por calle para poder comprar mas')
  return 1
}
}

 this.accion=function(ficha,propiedad){

   
if(this.propietario!=ficha){
     ficha.quitarPresupuesto(propiedad.titulo.precioAlquiler)
    var pago=ficha.presupuesto
    //this.propietario+=propiedad.titulo.precioAlquiler
    this.propietario.agregarPresupuesto(propiedad.titulo.precioAlquiler)
    if(pago<0){
      this.mensaje='El usuario no tiene dinero para pagar la estancia'
    console.log('El usuario no tiene dinero para pagar la estancia')
      return -2
    }
    else{
      this.mensaje='El usuario '+ficha.usuario.nombre+' ha pagado por su estancia en la calle '+propiedad.nombre+' '+propiedad.titulo.precioAlquiler+' a '+this.propietario.nombre
     console.log('El usuario '+ficha.usuario.nombre+' ha pagado por su estancia en la calle '+propiedad.nombre+' '+propiedad.titulo.precioAlquiler)
     return -1
    }
  }
else{ 
  
  if(this.casas==1){
    this.mensaje='Eres su propietario y tienes 1 casa'
  console.log('Eres su propietario y tienes 1 casa')
   return 1
  }
  else{
    this.mensaje='Puedes comprar una casa para esta calle por '+propiedad.titulo.precioCasa
   console.log('Puedes comprar una casa para esta calle por '+propiedad.titulo.precioCasa)
   return 3
  }
 }
 }

}

function conCasas(propietario){
 this.propietario=propietario
 this.mensaje=""
  this.comprar=function(ficha,propiedad) {

 if(this.propietario==ficha){
  if((ficha.presupuesto-propiedad.titulo.precioCasa)>0){
   if(ficha.usuario.juego.cogerCasa()==0){
 // ficha.presupuesto=ficha.presupuesto-propiedad.titulo.precioCasa
  ficha.quitarPresupuesto(propiedad.titulo.precioCasa)
  propiedad.titulo.casas++
  propiedad.titulo.iniTitulo()
  console.log('El usuario compra una casa')
  this.mensaje='El usuario compra una casa'
    
    }
  if(propiedad.titulo.casas==4){
    this.mensaje=='Ya has comprado 4 casas, ya puedes sustituirlas por un hotel'
    console.log('Ya has comprado 4 casas, ya puedes sustituirlas por un hotel')
    propiedad.estado=new Hotel(this.propietario)
    return 4
  }

   return 0
  }
  else{
    this.mensaje='No tienes suficiente dinero para una casa'
   console.log('No tienes suficiente dinero para una casa')
   return -2 
  }
 }
 else{
  this.mensaje='No puedes comprar casa no eres su propietario'
  console.log('No puedes comprar casa no eres su propietario')
  return 2  
 } 
}

 this.accion=function(ficha,propiedad){

   
if(this.propietario!=ficha){
     ficha.quitarPresupuesto(propiedad.titulo.precioAlquiler)
    var pago=ficha.presupuesto
    //this.propietario+=propiedad.titulo.precioAlquiler
    this.propietario.agregarPresupuesto(propiedad.titulo.precioAlquiler)
    if(pago<0){
      this.mensaje='El usuario no tiene dinero para pagar la estancia'
    console.log('El usuario no tiene dinero para pagar la estancia')
     return -2
    }
    else{
      this.mensaje='El usuario '+ficha.usuario.nombre+' ha pagado por su estancia en la calle '+propiedad.nombre+' '+propiedad.titulo.precioAlquiler+' a '+this.propietario.nombre
     console.log('El usuario '+ficha.usuario.nombre+' ha pagado por su estancia en la calle '+propiedad.nombre+' '+propiedad.titulo.precioAlquiler+' a '+this.propietario.nombre)
    return -1
    }
  }
else{
  this.mensaje='Puedes comprar una casa para esta calle por '+propiedad.titulo.precioCasa
 console.log('Eres su propietario y tienes  '+propiedad.titulo.casas+' casas')
 console.log('Puedes comprar una casa para esta calle por '+propiedad.titulo.precioCasa)
 return 3
 }
 }

}

function Hotel(propietario){

this.hoteles=0
this.propietario=propietario
this.mensaje=""
  this.comprar=function(ficha,propiedad) {
if(this.propietario==ficha){
if(this.hoteles==0){
  if((ficha.presupuesto-propiedad.titulo.precioHotel)>0){
   if(ficha.usuario.juego.cogerHotel()==0){
  //ficha.presupuesto=ficha.presupuesto-propiedad.titulo.precioHotel
  ficha.quitarPresupuesto(propiedad.titulo.precioHotel)
  propiedad.titulo.hoteles=1
  propiedad.titulo.casas=0
  this.hoteles++
  propiedad.titulo.iniTitulo()
  this.mensaje='El usuario compra un hotel'
  console.log('El usuario compra un hotel')
   return 7
   }
  }
  else{
    this.mensaje='No tienes suficiente dinero para un hotel'
   console.log('No tienes suficiente dinero para un hotel')
   return -2
 }
}
else{
  this.mensaje='Ya tienes un hotel en la calle '+propiedad.nombre
 console.log('Ya tienes un hotel en la calle '+propiedad.nombre)
   return 5
 }  
}
else{
  this.mensaje='No puedes comprar un hotel no eres propietario'
 console.log('No puedes comprar un hotel no eres propietario') 
 return 2
}
}

 this.accion=function(ficha,propiedad){

   
if(this.propietario!=ficha){
 ficha.quitarPresupuesto(propiedad.titulo.precioAlquiler)
    var pago=ficha.presupuesto
    //this.propietario+=propiedad.titulo.precioAlquiler
    this.propietario.agregarPresupuesto(propiedad.titulo.precioAlquiler)
    if(pago<0){
      this.mensaje='El usuario no tiene dinero para pagar la estancia'
    console.log('El usuario no tiene dinero para pagar la estancia')
      return -2
    }
    else{
      this.mensaje='El usuario '+ficha.usuario.nombre+' ha pagado por su estancia en la calle '+propiedad.nombre+' '+propiedad.titulo.precioAlquiler+' '+this.propietario.nombre
     console.log('El usuario '+ficha.usuario.nombre+' ha pagado por su estancia en la calle '+propiedad.nombre+' '+propiedad.titulo.precioAlquiler)
     return -1
    }
  }
else{ 

  if(this.hoteles>0){
    this.mensaje='Eres su propietario y tienes 1 hotel'
   console.log('Eres su propietario y tienes 1 hotel')
   return 5
 }
  else{
    this.mensaje='Puedes comprar un hotel para esta calle por '+propiedad.titulo.precioHotel
   console.log('Puedes comprar un hotel para esta calle por '+propiedad.titulo.precioHotel)
   return 6
   }
  }
 }

}

function Venta(propietario,precio){
  this.propietario=propietario
  this.precio=precio
  this.mensaje=""
  this.comprar=function(propiedad,cliente){
     if((cliente.presupuesto-this.precio)>0){
                this.propietario.agregarPresupuesto(this.precio);
                cliente.quitarPresupuesto(this.precio);
                
                console.log('propiedad a comprar '+propiedad.nombre)
                //var propiedadAgregar=clone(propiedad);
                var propiedadAgregar = propiedad;
                if(propiedadAgregar instanceof Calle)propiedadAgregar.estado=new APagar(cliente);
                if(propiedadAgregar instanceof Estacion){
                  propiedadAgregar.estado=new APagarEstacion(cliente);
                  propiedad.actualizarPrecioEstacion(cliente);
                }
                if(propiedadAgregar instanceof CompaniaAgua || propiedadAgregar instanceof CompaniaElectrica){
                  propiedadAgregar.estado=new APagarCompania(cliente);
                  propiedad.actualizarPrecio(cliente);
                }  
                cliente.agregarPropiedad(propiedadAgregar);
                var indice=this.propietario.buscarPropiedad(propiedad.nombre);
                this.propietario.propiedades.splice(indice,1);
                this.propietario.numeroPropiedades--;

                return this.mensaje="Ha sido vendida la propiedad "+propiedad.nombre+" por parte de "+this.propietario.nombre+" a "+cliente.nombre+" por "+precio;
          }
          else return this.mensaje="No tiene suficiente dinero el comprador";
  }

  this.quitar=function(propiedad){
      propiedad.estado = new APagar(this.propietario);
  }

  this.accion=function(){

    console.log('Esta propiedad esta a la venta')
    this.mensaje="Esta propiedad esta a la venta"
    return 10
  }

}

function puja(estado,precio,ficha){
    this.estado=estado
    this.precio=precio
    this.ficha=ficha
}

function Subasta(propietario,propiedad){
  this.propietario=propietario
  this.pujas=[]
  this.maximo=0
  this.mensaje=""
  this.propiedad=propiedad
  this.precioFinal=0
  this.comprador=propietario
  this.turnoActual=0
  this.pujantes=[]
  this.pujar=function(precio,ficha){

      if(precio>this.maximo){
        console.log('precio '+precio+' ficha '+ficha.presupuesto)
        if(precio<ficha.presupuesto){
          this.maximo=precio
          this.comprador=ficha
          this.precioFinal=precio
          this.mensaje=ficha.usuario.nombre+" ha pujado "+precio+" por "+this.propiedad.nombre
          this.pujas.push(new puja(ficha.usuario.estado.retirado,this.maximo,ficha))
          //this.pasar()
          console.log(this.mensaje)
          return this.mensaje
         }
         else{
          console.log(this.mensaje)
          return this.mensaje="No tienes ese dinero"
        }
      }
      else{
        console.log(this.mensaje)
       return this.mensaje="La puja no es mayor que el maximo"
     }
  }
  this.terminar=function(){
      
   
      for(var i=0;i<this.propietario.usuario.juego.numeroFichasUtilizadas;i++){
         this.propietario.usuario.juego.fichas[i].usuario.estado= new UsuarioLibre("libre")
      }
      for(var k=(this.pujas-1);k>=0;k--){
         if(this.pujas[k].estado==false){
          this.comprador=this.pujas[k].ficha
          this.precioFinal=this.pujas[k].precio
          k=-1
         }
      }
      this.propiedad.estado=new Venta(this.propietario,this.precioFinal)
      this.propiedad.estado.comprar(this.propiedad,this.comprador)

      this.propietario.usuario.juego.fase=new Jugar()
      console.log(this.comprador.usuario.nombre+" se ha llevado la puja por "+this.precioFinal)
      return this.mensaje=this.comprador.usuario.nombre+" se ha llevado la puja por "+this.precioFinal
  }
  this.pasar=function(){
    var juego=this.propietario.usuario.juego
    var estado=true
    var contador=0
    
  }
  
  this.retirarse=function(propietario){
    var estado=false;
    var contador=0
    var juego=propietario.usuario.juego
     propietario.usuario.estado.retirado=true
     for(var i=0;i<this.pujantes.length;i++){
      
      if(this.pujantes[i].usuario.estado.retirado==true){
      contador++
      }
    }
    console.log('contador '+contador)
    if((juego.numeroFichasUtilizadas-contador)<=1)return this.terminar();
    return "Se ha retirado "+propietario.usuario.nombre

  }
  this.accion=function(){
    console.log('Esta en subasta')
    this.mensaje="Esta en subasta"
  }
  this.comprar=function(){
    console.log('Esta en subasta')
    this.mensaje="Esta en subasta"
  }

}



function Hipotecada(propietario){
  this.propietario=propietario

  this.accion=function(){
    console.log('Esta en subasta')
    this.mensaje="Esta hipotecado"
  }
    this.comprar=function(){
    console.log('Esta en subasta')
    this.mensaje="Esta en subasta"
  }

}


function EstadoJuego(){


}

function EstadoEstacion(){
  this.mensaje=""
  this.comprar=function(){}
   this.functionAlquilar=function(){}
   this.accion=function(){}

}

function LibreEstacion(){}
LibreEstacion.prototype = new EstadoEstacion;
LibreEstacion.prototype.comprar = function(ficha,propiedad) {
    ficha.agregarPropiedad(propiedad)
    ficha.quitarPresupuesto(propiedad.titulo.precioCompra)
    propiedad.actualizarPrecioEstacion(ficha)
    propiedad.estado = new APagarEstacion(ficha)
    this.mensaje="Has comprado la estacion"
    return 0
}
LibreEstacion.prototype.accion = function(ficha, propiedad) {
    this.mensaje="El usuario puede comprar esta estacion"
    console.log('El usuario puede comprar esta estacion')
}

function APagarEstacion(propietario){
  this.propietario=propietario
}
APagarEstacion.prototype = new EstadoEstacion;
APagarEstacion.prototype.comprar = function() {
    this.mensaje='Esta estacion ya tiene propietario'
    return 'Esta estacion ya tiene propietario'
}
APagarEstacion.prototype.accion = function(ficha, propiedad) {
    if(this.propietario!=ficha){
    propiedad.actualizarPrecioEstacion(this.propietario)
    ficha.quitarPresupuesto(propiedad.titulo.precioAlquiler)

    this.propietario.agregarPresupuesto(propiedad.titulo.precioAlquiler)
    var pago=ficha.presupuesto
    if(pago<0){
      this.mensaje='El usuario no tiene dinero para pagar la estancia'
    console.log('El usuario no tiene dinero para pagar la estancia')
      return -2
    }
    else{
      this.mensaje='El usuario '+ficha.usuario.nombre+' ha pagado por su estancia en la estacion '+propiedad.nombre+' '+propiedad.titulo.precioAlquiler+' a '+this.propietario.nombre
     console.log('El usuario '+ficha.usuario.nombre+' ha pagado por su estancia en la estacion '+propiedad.nombre+' '+propiedad.titulo.precioAlquiler)
     return -1
    }

  }
}



function Fases(){

this.nuevoUsuario=function(usuario,juego){
     console.log('No se pueden añadir usuarios')

     return -1

   }
    this.crearUsuario=function(usuarioNombre,juego){
     console.log('No se pueden crea usuarios')

return -1
   }

   this.lanzarDosDados=function(usuario){
     console.log('No se pueden lanzar dados')

     return -1

   }
  this.asignarCasilla=function(casilla,ficha){
          //document.writeln('asignada')
           console.log('No se pueden hacer transiciones ')

           return -1
          
}
}
function Inicial(){
  this.nombre='Fase Inicial'
}

Inicial.prototype = new Fases;
Inicial.prototype.nuevoUsuario=function(usuario,juego){
     return juego.agregarFicha(usuario)

   }
Inicial.prototype.crearUsuario=function(usuarioNombre,juego){
     return  juego.agregarFicha((new CrearJugador).crearObjeto(usuarioNombre,juego))

   }



function Jugar(){
  this.nombre='Fase Jugar'
}
Jugar.prototype = new Fases;
Jugar.prototype.lanzarDosDados=function(usuario){
        var numero=usuario.juego.obtenerDado().calcularNumero()
        var numero2=usuario.juego.obtenerDado().calcularNumero()
      if(usuario.volverTirar==0 && usuario.perdidoTurno==1)return -1
      if(usuario.volverTirar>0 && usuario.perdidoTurno==0){
     
      


        usuario.posicion=usuario.posicion+numero+numero2
        if(usuario.posicion>=40){
          usuario.posicion=usuario.posicion-40
          usuario.juego.buscarUID(usuario.uid).agregarPresupuesto(200)
        }
        console.log('usario uid--------------------------------------------------------------------------------------- '+usuario.nombre);
        usuario.juego.buscarUID(usuario.uid).asignarCasilla(usuario.juego.obtenerTablero().casillas[usuario.posicion])

        if((numero+numero2)==12)usuario.volverTirar++;
        else usuario.volverTirar=0;

        if(usuario.volverTirar==3){
         
            usuario.juego.buscarUID(usuario.uid).asignarCasilla(usuario.juego.obtenerTablero().casillas[30])
            usuario.volverTirar=0
        }

        if(usuario.volverTirar==0){
          //usuario.juego.gestionTurnos()
          usuario.perdidoTurno=1
        }
        
        return numero+numero2 
    }
        
       return 'No se puede tirar' 
     }
Jugar.prototype.asignarCasilla=function(casilla,ficha){
          //document.writeln('asignada')
           console.log('El usuario '+ficha.usuario.nombre+' ha caido en la casilla '+casilla.tema.nombre)
           var posicionInicial=ficha.usuario.posicion

           
           ficha.casilla=casilla
           ficha.usuario.tipoAccion=9

          if(casilla.tema instanceof Impuesto){
           // ficha.presupuesto-=casilla.tema.cantidad
            ficha.quitarPresupuesto(casilla.tema.cantidad)
            console.log('Has pagado '+casilla.tema.cantidad+' por impuestos')
          }
           /*if(casilla.tema instanceof Salida){
           // ficha.presupuesto=ficha.presupuesto+200
            ficha.agregarPresupuesto(200)
            console.log('Has cobrado 200 pelotis por pasar por la casilla de salida')
          }*/

          if(casilla.tema instanceof Calle || casilla.tema instanceof Estacion || casilla.tema instanceof CompaniaAgua || casilla.tema instanceof CompaniaElectrica){
            ficha.usuario.tipoAccion=casilla.tema.estado.accion(ficha,casilla.tema)

          }

          if(casilla.tema instanceof IrALaCarcel){
             ficha.casilla= ficha.usuario.juego.tablero.casillas[10]
             ficha.usuario.estado = new UsuarioEncarcelado()
             console.log('Has sido encarcelado')
             ficha.casilla.tema.nombre='Has sido encarcelado'
          }

          
}

function SubastaJuego(){

  this.lanzarDosDados=function(usuario){
     
       }
  this.asignarCasilla=function(casilla,ficha){
            //document.writeln('asignada')
            
    }
  }
function Final(){
   this.nombre="Fase final"  
 
}
Final.prototype = new Fases;



function Caja(){
   this.tarjetas=[]

}

function Comando(){

   this.ejecutar=function(){}
}

function Avanzar(posiciones){
   this.posiciones=posiciones
   this.mensaje
   this.ejecutar=function(ficha){
    
       ficha.usuario.posicion=ficha.usuario.posicion+this.posiciones
        if(ficha.usuario.posicion>=40)ficha.usuario.posicion=ficha.usuario.posicion-40

        ficha.asignarCasilla(ficha.usuario.juego.obtenerTablero().casillas[ficha.usuario.posicion])
        console.log('Avanzas '+this.posiciones+' posiciones hasta la casilla '+ficha.usuario.posicion+' '+ficha.usuario.juego.obtenerTablero().casillas[ficha.usuario.posicion].tema.nombre)
        this.mensaje='Avanzas '+this.posiciones+' posiciones hasta la casilla '+ficha.usuario.posicion+' '+ficha.usuario.juego.obtenerTablero().casillas[ficha.usuario.posicion].tema.nombre
   }
}

function Retroceder(posiciones){
   this.posiciones=posiciones
   this.mensaje
   this.ejecutar=function(ficha){
   
       ficha.usuario.posicion=ficha.usuario.posicion-this.posiciones
        if(ficha.usuario.posicion<0)ficha.usuario.posicion=ficha.usuario.posicion+40
       
        ficha.asignarCasilla(ficha.usuario.juego.obtenerTablero().casillas[ficha.usuario.posicion])

        console.log('Retocedes '+this.posiciones+' posiciones hasta la casilla '+ficha.usuario.posicion+' '+ficha.usuario.juego.obtenerTablero().casillas[ficha.usuario.posicion].tema.nombre)
        this.mensaje='Retocedes '+this.posiciones+' posiciones hasta la casilla '+ficha.usuario.posicion+' '+ficha.usuario.juego.obtenerTablero().casillas[ficha.usuario.posicion].tema.nombre
   }
}

function Multa(cantidad){
    this.cantidad=cantidad
    this.mensaje
    this.ejecutar=function(ficha){
        //ficha.presupuesto=ficha.presupuesto-this.cantidad
        ficha.quitarPresupuesto(this.cantidad)
        if(ficha.presupuesto<0){
          console.log('No puedes pagar la multa')
        }
        else
        console.log('Has recibido una multa de '+this.cantidad)

        this.mensaje='Has recibido una multa de '+this.cantidad
    }

}

function Premio(cantidad){
    this.cantidad=cantidad
    this.mensaje
    this.ejecutar=function(ficha){
        //ficha.presupuesto=ficha.presupuesto-this.cantidad
        ficha.agregarPresupuesto(this.cantidad)

        console.log('Has recibido un premio de '+this.cantidad)

        this.mensaje='Has recibido un premio de '+this.cantidad
    }

}

function IrACasilla(casilla){
     this.casilla=casilla
     this.mensaje
        this.ejecutar=function(ficha){
          console.log('Vas a la casilla '+this.casilla.tema.nombre)
        ficha.asignarCasilla(casilla)
        this.mensaje='Vas a la casilla '+this.casilla.tema.nombrepasar

    }    
}

function SalirCarcel(){
    this.nombre='Salir de la carcel'
    this.mensaje="Salir de la carcel"
    this.ejecutar=function(usuario){
       usuario.estado.utilizarTarjeta(usuario)

    }
}

Avanzar.prototype = new Comando
Avanzar.prototype.ejecutar = function(ficha){

   ficha.posicion+=this.posicion

}

function UsuarioEncarcelado(){
this.numeroIntentos=0
this.mensaje=""
    this.pagarSalidaCarcel=function(ficha){

         if(ficha.presupuesto<0){
          console.log('No puedes pagar la 50 pelotis para salir de la carcel')
          //ficha.presupuesto-=50
          this.mensaje="No puedes pagar la 50 pelotis para salir de la carcel"
          ficha.quitarPresupuesto(50)
          return true
        }
        else
        {
        console.log('Has pagado 50 pelotis y ya puedes salir de la carcel')
        this.mensaje="Has pagado 50 pelotis y ya puedes salir de la carcel"
        ficha.quitarPresupuesto(50)
        ficha.usuario.estado = new UsuarioLibre(this.mensaje)
          return false
         }

    }

    this.accion=function(ficha){      
        this.numeroIntentos++
        

        if(ficha.usuario.volverTirar>=1){
        if((ficha.usuario.juego.dado.calcularNumero()==ficha.usuario.juego.dado.calcularNumero())){      
             this.mensaje="Has sacado doble para salir de la carcel"     
            ficha.usuario.estado=new UsuarioLibre(this.mensaje)  
            
        }
        else{
          console.log('El jugador no ha sacado doble para salir de la carcel')
          this.mensaje="El jugador no ha sacado doble para salir de la carcel"
          if(this.numeroIntentos>2){
              if(!this.pagarSalidaCarcel(ficha))this.mensaje=='El usuario no puede pagar la salida de la carcel'
                else{
                 this.mensaje=='El usuario al ser el tercer intento ha tenido que pagar'
               }
          }

        }
        ficha.usuario.volverTirar=0
        ficha.usuario.perdidoTurno=1
      }
    }

    this.utilizarTarjeta=function(usuario){
       usuario.estado= new UsuarioLibre()
       console.log('Has sido liberado de la carcel')
       this.mensaje="Has sido liberado de la carcel36"

    }
    this.puja=function(precio){
    console.log('No estas en subasta')
    this.mensaje="No estas en subasta"
   }

}

function UsuarioLibre(mensaje){
  this.mensaje=mensaje
  this.accion=function(){
   
  }
   this.pagarSalidaCarcel=function(ficha){
    console.log('No estas en la carcel')
    this.mensaje="No estas en la carcel"
   }
   this.utilizarTarjeta=function(usuario){
    console.log('No puedes utilizar la tarjeta no estas en la carcel')
    this.mensaje="No puedes utilizar la tarjeta no estas en la carcel"
   }
    this.puja=function(precio){
    console.log('No estas en subasta')
    this.mensaje="No estas en subasta"
   }


}


function EnSubasta(propiedad,ficha){
this.mensaje=""
this.propiedad=propiedad
this.ficha=ficha
this.retirado=false
this.precio=0
  this.accion=function(){
  this.mensaje="Estas en subasta"
  }
   this.pagarSalidaCarcel=function(ficha){
    console.log('No estas en la carcel')
    this.mensaje="No estas en la carcel"
   }
   this.utilizarTarjeta=function(usuario){
    console.log('No puedes utilizar la tarjeta no estas en la carcel')
    this.mensaje="No puedes utilizar la tarjeta no estas en la carcel"
   }
   this.pujar=function(precio){
     
    // if(this.ficha.usuario.volverTirar>=1)

     this.mensaje=this.propiedad.estado.pujar(precio,this.ficha);

     return this.mensaje
   }
   this.retirarse=function(){
     this.propiedad.estado.retirarse(this.ficha)
     if(this.ficha.usuario.volverTirar>=1)this.propiedad.estado.pasar()
   }
 this.terminar=function(){
    return this.propiedad.estado.terminar()
   }



}

function Bancarrota(ficha){
  this.ficha=ficha
  this.accion=function(){
    console.log('estas fuera')
     this.ficha.usuario.volverTirar=0
    this.ficha.usuario.perdidoTurno=0
    this.mensaje="Estas eliminado"
  }
  this.pujar=function(precio){
     
    return this.mensaje="Estas eliminado"
   }
   this.retirarse=function(){
     return this.mensaje="Estas eliminado"
   }

}

function Solicitud(propiedad,cliente,precio){
  this.idsolicitud
  this.propiedad=propiedad
  this.cliente=cliente
  this.precio=precio

  this.agregarId=function(id){
     this.idsolicitud=id
  }

}

function BandejaVentas(ficha){
   this.solicitudes=[]
   this.propiedadesVenta=[]
   this.propiedadesVentaQuitar=[]
   this.ficha=ficha
   this.mensaje=""
   this.indice=0
   this.agregarSolicitud=function(propiedad,cliente,precio){
      var solicitud=new Solicitud(this.ficha.propiedades[this.ficha.buscarPropiedad(propiedad)],cliente,precio)
      solicitud.propiedad.enSolicitud=true;
      console.log('solicitud '+solicitud.precio)
     
      solicitud.agregarId(this.indice)
      this.indice=parseInt(this.indice)+1
      this.solicitudes.push(solicitud)  
   }
   this.buscarSolicitud=function(idsolicitud){
      var solicitud;
    for(var i=0;i<this.solicitudes.length;i++){

      if(idsolicitud==this.solicitudes[i].idsolicitud){
         return this.solicitudes[i]
      }
    }
    return -1
   }
   this.aceptarSolicitud=function(idsolicitud){
     var solicitud=this.buscarSolicitud(idsolicitud);
     
      if(solicitud!=-1){
        solicitud.propiedad.enSolicitud=false;
      solicitud.propiedad.estado = new Venta(this.ficha,solicitud.precio);
      solicitud.propiedad.estado.comprar(solicitud.propiedad,solicitud.cliente);
      this.quitarSolicitud(idsolicitud);
      console.log(solicitud.cliente.bandejaVentas.mensaje="Ha sido aceptada la solicitud por "+solicitud.propiedad.nombre+" y has pagado "+solicitud.precio)
      this.mensaje=solicitud.cliente.bandejaVentas.mensaje="Ha sido aceptada la solicitud por "+solicitud.propiedad.nombre+" y has pagado "+solicitud.precio
      return solicitud.cliente.bandejaVentas.mensaje="Ha sido aceptada la solicitud por "+solicitud.propiedad.nombre+" y has pagado "+solicitud.precio
    }
    else return this.mensaje="No existe una solicitud con este id"
   }

   this.denegarSolicitud=function(idsolicitud,mensaje){
     var solicitud=this.buscarSolicitud(idsolicitud);

     if(solicitud!=-1){
      solicitud.propiedad.enSolicitud=false;
      this.quitarSolicitud(idsolicitud);
      console.log(solicitud.cliente.bandejaVentas.mensaje="Ha sido denegara la solicitud por "+solicitud.propiedad.nombre+"  mensaje:"+mensaje)
      return solicitud.cliente.bandejaVentas.mensaje="Ha sido denegara la solicitud por "+solicitud.propiedad.nombre+"  mensaje:"+mensaje
    }
    else return this.mensaje="No existe una solicitud con este id"

   }
   this.quitarSolicitud=function(idsolicitud){
         
         for(var i=0;i<this.solicitudes.length;i++){

            if(idsolicitud==this.solicitudes[i].idsolicitud){
                this.solicitudes.splice(i,1);
            }
         }

   }

   this.enviarSolicitud=function(propiedad,precio,uid,juego){
     var destinatario=juego.buscarUID(uid);
      
      
      destinatario.bandejaVentas.agregarSolicitud(propiedad,this.ficha,precio);

   }

   this.limpiarLista=function(){
      this.propiedadesVenta=[]
   }
   this.limpiarListaQuitar=function(){
      this.propiedadesVentaQuitar=[]
   }
   this.agregarVenta=function(propiedad){
     this.propiedadesVenta.push(propiedad)   
   }
   this.actualizarLista=function(juego){
      var ficha;
      for(var i=0;i<juego.numeroFichasUtilizadas;i++){
        ficha = juego.fichas[i]
       
       for(var j=0;j<ficha.numeroPropiedades;j++){
          
          if((ficha.propiedades[j] instanceof Calle || ficha.propiedades[j] instanceof Estacion || ficha.propiedades[j] instanceof CompaniaElectrica || ficha.propiedades[j] instanceof CompaniaAgua) && this.ficha.usuario.uid!=ficha.usuario.uid){
      
            if(ficha.propiedades[j].estado instanceof Venta){
               
              ficha.propiedades[j].titulo.iniTitulo();
              this.propiedadesVenta.push(ficha.propiedades[j])
           }
         }
         
      }
    }
   }

   this.actualizarListaQuitar=function(juego){
      var ficha;
      for(var i=0;i<juego.numeroFichasUtilizadas;i++){
        ficha = juego.fichas[i]
        console.log(' numero propiedades'+ficha.numeroPropiedades)
       for(var j=0;j<ficha.numeroPropiedades;j++){
          
          if((ficha.propiedades[j] instanceof Calle || ficha.propiedades[j] instanceof Estacion || ficha.propiedades[j] instanceof CompaniaElectrica || ficha.propiedades[j] instanceof CompaniaAgua)  && this.ficha.usuario.uid==ficha.usuario.uid){
      
            if(ficha.propiedades[j].estado instanceof Venta){
               console.log(' propiedades '+ficha.propiedades[j].estado)
              ficha.propiedades[j].titulo.iniTitulo();
              this.propiedadesVentaQuitar.push(ficha.propiedades[j])
           }
         }
         
      }
    }
   }



}



function clone( obj ) {
    if ( obj === null || typeof obj  !== 'object' ) {
        return obj;
    }
 
    var temp = obj.constructor();
    for ( var key in obj ) {
        temp[ key ] = clone( obj[ key ] );
    }
 
    return temp;
}

module.exports.Juego = Juego;
module.exports.Final = Final;
module.exports.Jugar = Jugar;
module.exports.SubastaJuego = SubastaJuego;
module.exports.Inicial = Inicial;
module.exports.Hipotecada = Hipotecada;
module.exports.Bancarrota = Bancarrota;
module.exports.Tablero = Tablero;
module.exports.Jugador = Jugador;
module.exports.Ficha = Ficha;
module.exports.Calle = Calle;
module.exports.Estacion = Estacion;
module.exports.Salida = Salida;
module.exports.APagarEstacion = APagarEstacion;
module.exports.APagar = APagar;
module.exports.APagarEstacion = APagarEstacion;
module.exports.Libre = Libre;
module.exports.Casilla = Casilla;
module.exports.Venta = Venta;
module.exports.casillaTarjetaSuerte = casillaTarjetaSuerte;
module.exports.casillaTarjetaComunidad = casillaTarjetaComunidad;
module.exports.UsuarioLibre = UsuarioLibre;
module.exports.UsuarioEncarcelado = UsuarioEncarcelado;
module.exports.CompaniaAgua = CompaniaAgua;
module.exports.CompaniaElectrica = CompaniaElectrica;
module.exports.APagarCompania = APagarCompania;