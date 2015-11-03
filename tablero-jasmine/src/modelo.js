//underscore.js
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
    this.fichas.sort(function(a, b) {
    return parseFloat(a.presupuesto) - parseFloat(b.presupuesto);
     });
    this.fichas.shift()
    this.fichas.reverse()
    this.numeroFichasUtilizadas--
    if(this.numeroFichasUtilizadas==1){
        console.log('Ha ganado la partida '+this.fichas[0].usuario.nombre)
        this.fase=new Final();
    }
   }
   this.empezar=function(){
      if(this.numeroFichasUtilizadas>=2){
         this.fase=new Jugar()
       }
       else console.log('Es necesario al menos dos jugadores para jugar')
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
       this.numeroCasas+=numero
   }
   this.agregarHoteles=function(numero){
       this.numeroHoteles+=numero
   }

   this.buscarJugador=function(nombre){
      for(i=0;i<this.numeroFichasUtilizadas;i++){
             if(this.fichas[i].obtenerUsuario().nombre==nombre)return this.fichas[i]
       }
     return -1

   }
   this.gestionTurnos=function(){

        this.turnoActual++;
        if(this.turnoActual>=this.numeroFichasUtilizadas)this.turnoActual=0
        console.log('turno '+this.turnoActual+' '+this.numeroFichasUtilizadas)
        this.fichas[this.turnoActual].usuario.volverTirar=1
          
   }

   this.agregarFicha=function(usuario){

     if(this.numeroFichasUtilizadas<6){
      
     this.fichas[this.numeroFichasUtilizadas].agregarUsuario(usuario)
     this.fichas[this.numeroFichasUtilizadas].casilla=this.tablero.casillas[0]
     if(this.numeroFichasUtilizadas==0)this.fichas[this.numeroFichasUtilizadas].usuario.volverTirar=1
     this.numeroFichasUtilizadas++
     console.log('Usuario asignado correctamente a la ficha '+this.fichas[this.numeroFichasUtilizadas-1].nombre)

     return 0
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
       this.fichas[0]=new Ficha('amarillo')
       this.fichas[1]=new Ficha('azul')
       this.fichas[2]=new Ficha('rojo')
       this.fichas[3]=new Ficha('verde')
       this.fichas[4]=new Ficha('morado')
       this.fichas[5]=new Ficha('marron')
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
       
       this.caja.agregarTarjetaSuerte(new Tarjeta(10,new IrACasilla(this.casillas[10])))
       this.caja.agregarTarjetaSuerte(new Tarjeta(11,new IrACasilla(this.casillas[30])))
       this.caja.agregarTarjetaSuerte(new Tarjeta(12,new IrACasilla(this.casillas[25])))
       this.caja.agregarTarjetaSuerte(new Tarjeta(13,new IrACasilla(this.casillas[0])))

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
    this.agregarCasilla(15,new Casilla(15,new Calle('Estacion de las delicias',200)))
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
}
function CompaniaAgua(nombre,precio){
     this.nombre=nombre
     this.precio=precio
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
        
         this.caja.sacarTarjetaCofre().comando.ejecutar(ficha)
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
       
        return this.tarjetasCofre[Math.round(Math.random()*this.nTarjetasCofre)];
    }
    this.sacarTarjetaSuerte=function(){
        return this.tarjetasSuerte[Math.round(Math.random()*this.nTarjetasSuerte)];
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

       this.agregarPropiedad=function(propiedad){
            this.propiedades[this.numeroPropiedades]=propiedad
            this.numeroPropiedades++
       }
       this.agregarUsuario=function(usuario){
           this.usuario=usuario
           this.presupuesto=this.usuario.presupuesto

       }

        this.comprarPropiedad=function(precio){
           
          
           this.presupuesto=this.presupuesto - precio
       }

        this.obtenerUsuario=function(){
           return this.usuario
       }
       this.agregarPresupuesto=function(cantidad){
        this.presupuesto+=cantidad
        if(this.presupuesto>=this.usuario.juego.maximoPresupuesto){
         this.usuario.juego.fase = new Final()
         console.log('Ha ganado el jugador '+this.usuario.nombre+' por superar el presupuesto maximo')
        }
       }
       this.quitarPresupuesto=function(cantidad){
        this.presupuesto-=cantidad

        if(this.presupuesto<=0) this.usuario.juego.eliminarJugador(this)
        
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
     this.posicion=0
     this.volverTirar=0
     this.estado= new UsuarioLibre()
     this.tarjetas=[]
     this.perdidoTurno=0
     
    this.sacarTarjeta=function(){
      var ficha = juego.buscarJugador(this.nombre);
     if(this.volverTirar>0){
       return ficha.casilla.tema.sacarTarjeta(ficha)
     }
     else console.log('No es tu turno')
    }
    this.utilizarTarjetaCarcel=function(){
        if(this.tarjetas.length>0){
          this.tarjetas[0].comando.ejecutar(this)
          this.tarjetas.shift()
        }
        else console.log('No tienes una tarjeta para salir de la carcel')
     }
    this.comprarPropiedad=function(){
        var ficha = juego.buscarJugador(this.nombre);
      if(this.volverTirar>0){
        ficha.casilla.tema.estado
        ficha.casilla.tema.estado.comprar(ficha,ficha.casilla.tema)
        return 0
        }
             else{
              console.log('No es tu turno')
              return -1
              }   
        }
      this.pagarCarcel=function(){
        var ficha = juego.buscarJugador(this.nombre)
        this.estado.pagarSalidaCarcel(ficha)
      }  

    this.comprarCasa=function(propiedad){
      if(this.volverTirar>0){
       var ficha = juego.buscarJugador(this.nombre);
       var propiedades = _.filter(ficha.propiedades, function (aTema){

           return aTema.nombre==propiedad;
      });
       
       if(propiedades[0]!=undefined){
            propiedades[0].estado.comprar(ficha,propiedades[0])
       }
       else console.log('No tienes esta propiedad')
     }

    else{
      console.log('No es tu turno no puedes comprar casa')
    }

    }
        
    this.pasarTurno=function(){
      if(this.volverTirar==0){
          if(this.perdidoTurno==1){
            console.log('pierde')
            this.perdidoTurno=0
            juego.gestionTurnos()
            return 0
          }
          else console.log('No te corresponde pasar turno')
       }
      else{
       console.log('Te toca tirar')
       return -1
     }
    }

     this.lanzarDosDados=function(){
       if(this.volverTirar>0)this.estado.accion(juego.buscarJugador(this.nombre))
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
 
  this.titulo = new Titulo(precio)
  this.estado = new LibreEstacion()
  

  this.actualizarPrecioEstacion=function(ficha){
     var precio
       for(i=0;i<ficha.numeroPropiedades;i++){

        if(ficha.propiedades[i] instanceof Estacion) {
          
          this.titulo.precioAlquiler = this.titulo.precioAlquiler + ficha.propiedades[i].titulo.precioAlquiler
        }
       }
  }

}
function Calle(nombre,precio,color,posicion){
    this.contadorPropiedades = 0
    this.nombre = nombre
	this.precio = precio
	this.casas= new Map()
	this.hoteles = new Map()
	this.colorr = color
  this.propiedades = []
  this.propietario = new Jugador("nadie",0)
  this.titulo=new Titulo(this.precio)
  this.estado=new Libre()


this.mismoColor=function(juego){
     var colorFiltro=this.colorr
  var colores = _.filter(juego.tablero.casillas, function (aTema){ 
    return aTema.tema.colorr==colorFiltro;
     }).length;

 this.titulo.numeroCallesColor=colores

   return colores
  }
  this.agregarPropiedad=function(propiedad){
      this.propiedades[this.contadorPropiedades]=propiedad
      this.contadorPropiedades++;
  }
   this.agregarPropietario=function(propietario){
      this.propietario = propietario
  }

}

function Normal(){
   this.nombre="Normal"
}

function Salida(){

    this.nombres="Salida"
}
function Carcel(nombre){
	this.nombre=nombre

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

function Titulo(precioCompra){
     this.precioCompra=precioCompra
     this.precioAlquiler=0
     this.casas=0
     this.hoteles=0
     this.numeroCallesColor=0
     this.precioCasa=100+(precioCompra/4)
     this.precioHotel=150+(precioCompra/4)
     this.iniTitulo=function(){

     this.precioAlquiler=this.precioCompra/4
     this.precioAlquiler=this.precioAlquiler+this.precioAlquiler*this.casas
     this.precioAlquiler=this.precioAlquiler+this.precioHotel*this.hoteles
     
     }


}

function Estado(){
   this.nombre='estado'
   this.comprar=function(){}
   this.functionAlquilar=function(){}
   this.accion=function(){}
   this.comprarCasa=function(){}
}
function Libre(){}
Libre.prototype = new Estado;
Libre.prototype.comprar = function(ficha,propiedad) {
    ficha.agregarPropiedad(propiedad)
    ficha.quitarPresupuesto(propiedad.titulo.precioCompra)
    propiedad.estado = new APagar()
    propiedad.estado.propietario=ficha
    console.log(propiedad.nombre+' '+'ha sido comprada')
    propiedad.titulo.iniTitulo()
    propiedad.mismoColor(ficha.usuario.juego)
}
Libre.prototype.accion = function(ficha, propiedad) {
  
    console.log('El usuario puede comprar esta propiedad por '+propiedad.titulo.precioCompra)
}

function APagar(){
  this.propietario
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
   console.log('ha comprar casa')
   propiedad.estado.comprar(ficha,propiedad)
 }else
  console.log('Ya has comprado esta calle pero no puedes aun comprar casa')
}
else
   console.log('Esta calle ya tiene propietario')
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
    if(pago<0)
    console.log('El usuario no tiene dinero para pagar la estancia')
    else console.log('El usuario '+ficha.usuario.nombre+' ha pagado por su estancia en la calle '+propiedad.nombre+' '+pago)

  }
else console.log('Eres su propietario')
}


function Grupo(propietario){
   this.casas=0
   this.propietario=propietario
   this.comprar=function(ficha,propiedad) {

 if(this.propietario==ficha){
  if((ficha.presupuesto-propiedad.titulo.precioCasa)>0){
  if(this.casas==0){
     if(ficha.usuario.juego.cogerCasa()==0){
  //ficha.presupuesto=ficha.presupuesto-propiedad.titulo.precioCasa
  ficha.quitarPresupuesto(propiedad.titulo.precioCasa)
  propiedad.titulo.casas++
  propiedad.titulo.iniTitulo()
  console.log('El usuario compra una casa')
  this.casas++
    }
  }
  else this.comprobarCasasGrupo(ficha,propiedad)
  }
  else console.log('No tienes suficiente dinero para una casa')
  }
  else console.log('No puedes comprar casa no eres su propietario')  
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
else console.log('Es necesario una casa por calle para poder comprar mas')

}

 this.accion=function(ficha,propiedad){

   
if(this.propietario!=ficha){
     ficha.quitarPresupuesto(propiedad.titulo.precioAlquiler)
    var pago=ficha.presupuesto
    //this.propietario+=propiedad.titulo.precioAlquiler
    this.propietario.agregarPresupuesto(propiedad.titulo.precioAlquiler)
    if(pago<0)
    console.log('El usuario no tiene dinero para pagar la estancia')
    else console.log('El usuario '+ficha.usuario.nombre+' ha pagado por su estancia en la calle '+propiedad.nombre+' '+pago)
    
  }
else{ 
  
  if(this.casas==1){
  console.log('Eres su propietario y tienes 1 casa')
  }
  else console.log('Puedes comprar una casa para esta calle por '+propiedad.titulo.precioCasa)

 }
 }

}

function conCasas(propietario){
 this.propietario=propietario
  this.comprar=function(ficha,propiedad) {

 if(this.propietario==ficha){
  if((ficha.presupuesto-propiedad.titulo.precioCasa)>0){
   if(ficha.usuario.juego.cogerCasa()==0){
 // ficha.presupuesto=ficha.presupuesto-propiedad.titulo.precioCasa
  ficha.quitarPresupuesto(propiedad.titulo.precioCasa)
  propiedad.titulo.casas++
  propiedad.titulo.iniTitulo()
  console.log('El usuario compra una casa')
    }
  if(propiedad.titulo.casas==4){
    console.log('Ya has comprado 4 casas, ya puedes sustituirlas por un hotel')
    propiedad.estado=new Hotel(this.propietario)
  }
  }
  else console.log('No tienes suficiente dinero para una casa')
 }
 else console.log('No puedes comprar casa no eres su propietario')  
  
}

 this.accion=function(ficha,propiedad){

   
if(this.propietario!=ficha){
     ficha.quitarPresupuesto(propiedad.titulo.precioAlquiler)
    var pago=ficha.presupuesto
    //this.propietario+=propiedad.titulo.precioAlquiler
    this.propietario.agregarPresupuesto(propiedad.titulo.precioAlquiler)
    if(pago<0)
    console.log('El usuario no tiene dinero para pagar la estancia')
    else console.log('El usuario '+ficha.usuario.nombre+' ha pagado por su estancia en la calle '+propiedad.nombre+' '+pago)

  }
else{
 console.log('Eres su propietario y tienes  '+propiedad.titulo.casas+' casas')
 console.log('Puedes comprar una casa para esta calle por '+propiedad.titulo.precioCasa)
 }
 }

}

function Hotel(propietario){

this.hoteles=0
this.propietario=propietario
  this.comprar=function(ficha,propiedad) {
if(this.propietario==ficha){
if(this.hoteles==0){
  if((ficha.presupuesto-propiedad.titulo.precioHotel)>0){
   if(ficha.usuario.juego.cogerHotel()==0){
  //ficha.presupuesto=ficha.presupuesto-propiedad.titulo.precioHotel
  ficha.quitarPresupuesto(propiedad.titulo.precioHotel)
  propiedad.titulo.hoteles++
  propiedad.titulo.casas=0
  this.hoteles++
  propiedad.titulo.iniTitulo()
  console.log('El usuario compra un hotel')
   }
  }
  else console.log('No tienes suficiente dinero para una casa')
}
else console.log('Ya tienes un hotel en la calle '+propiedad.nombre)  
}
else console.log('No puedes comprar un hotel no eres propietario')  
}

 this.accion=function(ficha,propiedad){

   
if(this.propietario!=ficha){
 ficha.quitarPresupuesto(propiedad.titulo.precioAlquiler)
    var pago=ficha.presupuesto
    //this.propietario+=propiedad.titulo.precioAlquiler
    this.propietario.agregarPresupuesto(propiedad.titulo.precioAlquiler)
    if(pago<0)
    console.log('El usuario no tiene dinero para pagar la estancia')
    else console.log('El usuario '+ficha.usuario.nombre+' ha pagado por su estancia en la calle '+propiedad.nombre+' '+pago)

  }
else{ 
  if(this.hoteles>0) console.log('Eres su propietario y tienes 1 hotel')
  else console.log('Puedes comprar un hotel para esta calle por '+propiedad.titulo.precioHotel)

  }
 }

}



function Hipotecado(){}
Hipotecado.prototype = new Estado;


function EstadoJuego(){


}

function EstadoEstacion(){
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
}
LibreEstacion.prototype.accion = function(ficha, propiedad) {
  
    console.log('El usuario puede comprar esta estacion')
}

function APagarEstacion(propietario){
  this.propietario=propietario
}
APagarEstacion.prototype = new EstadoEstacion;
APagarEstacion.prototype.comprar = function() {
    
    return 'Esta estacion ya tiene propietario'
}
APagarEstacion.prototype.accion = function(ficha, propiedad) {
    if(this.propietario!=ficha){
    ficha.quitarPresupuesto(propiedad.titulo.precioAlquiler)
    this.propietario.agregarPresupuesto(propiedad.titulo.precioAlquiler)
    var pago=ficha.presupuesto
    if(pago<0)
    console.log('El usuario no tiene dinero para pagar la estancia')
    else console.log('El usuario '+ficha.usuario.nombre+' ha pagado por su estancia en la estacion '+propiedad.nombre+' '+pago)
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
      if(usuario.volverTirar==0 && usuario.perdidoTurno==1)console.log('Tienes que pasar el turno')
      if(usuario.volverTirar>0 && usuario.perdidoTurno==0){
        usuario.posicion=usuario.posicion+numero+numero2
        if(usuario.posicion>=40)usuario.posicion=usuario.posicion-40
        usuario.juego.buscarJugador(usuario.nombre).asignarCasilla(usuario.juego.obtenerTablero().casillas[usuario.posicion])

        if((numero+numero2)==12)usuario.volverTirar++;
        else usuario.volverTirar=0;

        if(usuario.volverTirar==3){
         
            usuario.juego.buscarJugador(usuario.nombre).asignarCasilla(usuario.juego.obtenerTablero().casillas[30])
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
           ficha.casilla=casilla
          if(casilla.tema instanceof Impuesto){
           // ficha.presupuesto-=casilla.tema.cantidad
            ficha.quitarPresupuesto(casilla.tema.cantidad)
            console.log('Has pagado '+casilla.tema.cantidad+' por impuestos')
          }
           if(casilla.tema instanceof Salida){
           // ficha.presupuesto=ficha.presupuesto+200
            ficha.agregarPresupuesto(200)
            console.log('Has cobrado 200 pelotis por pasar por la casilla de salida')
          }
          if(casilla.tema instanceof Calle || casilla.tema instanceof Estacion)
            casilla.tema.estado.accion(ficha,casilla.tema)

          if(casilla.tema instanceof IrALaCarcel){
             ficha.casilla= ficha.usuario.juego.tablero.casillas[10]
             ficha.usuario.estado = new UsuarioEncarcelado()
             console.log('Has sido encarcelado')
          }
          
}

function Final(){
   

}



function Caja(){
   this.tarjetas=[]

}

function Comando(){

   this.ejecutar=function(){}
}

function Avanzar(posiciones){
   this.posiciones=posiciones
   this.ejecutar=function(ficha){
    
       ficha.usuario.posicion=ficha.usuario.posicion+this.posiciones
        if(ficha.usuario.posicion>=40)ficha.usuario.posicion=ficha.usuario.posicion-40

        ficha.asignarCasilla(ficha.usuario.juego.obtenerTablero().casillas[ficha.usuario.posicion])
        console.log('Avanzas '+this.posiciones+' posiciones hasta la casilla '+ficha.usuario.posicion+' '+ficha.usuario.juego.obtenerTablero().casillas[ficha.usuario.posicion].tema.nombre)
   }
}

function Retroceder(posiciones){
   this.posiciones=posiciones
   this.ejecutar=function(ficha){
   
       ficha.usuario.posicion=ficha.usuario.posicion-this.posiciones
        if(ficha.usuario.posicion<0)ficha.usuario.posicion=ficha.usuario.posicion+40
       
        ficha.asignarCasilla(ficha.usuario.juego.obtenerTablero().casillas[ficha.usuario.posicion])

        console.log('Retocedes '+this.posiciones+' posiciones hasta la casilla '+ficha.usuario.posicion+' '+ficha.usuario.juego.obtenerTablero().casillas[ficha.usuario.posicion].tema.nombre)
   }
}

function Multa(cantidad){
    this.cantidad=cantidad
    this.ejecutar=function(ficha){
        //ficha.presupuesto=ficha.presupuesto-this.cantidad
        ficha.quitarPresupuesto(this.cantidad)
        if(ficha.presupuesto<0){
          console.log('No puedes pagar la multa')
        }
        else
        console.log('Has recibido una multa de '+this.cantidad)
    }

}

function IrACasilla(casilla){
     this.casilla=casilla
        this.ejecutar=function(ficha){
          console.log('Vas a la casilla '+this.casilla)
        ficha.asignarCasilla(casilla)
    }    
}

function SalirCarcel(){
    this.nombre='Salir de la carcel'
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
    this.pagarSalidaCarcel=function(ficha){

         if(ficha.presupuesto<0){
          console.log('No puedes pagar la 50 pelotis para salir de la carcel')
          //ficha.presupuesto-=50
          ficha.quitarPresupuesto(50)
          return true
        }
        else
        {
        console.log('Has pagado 50 pelotis y ya puedes salir de la carcel')
        ficha.usuario.estado = new UsuarioLibre()
          return false
         }

    }

    this.accion=function(ficha){      
        this.numeroIntentos++
        ficha.usuario.volverTirar=0
        ficha.usuario.perdidoTurno=1
        if((ficha.usuario.juego.dado.calcularNumero()+ficha.usuario.juego.dado.calcularNumero())==12){           
            ficha.usuario.libre=new UsuarioLibre()  
        }
        else{
          console.log('El jugador no ha sacado doble para salir de la carcel')
          if(this.numeroIntentos>2){
              if(!this.pagarSalidaCarcel(ficha))console.log('El usuario no puede pagar la salida de la carcel')
                else console.log('El usuario al ser el tercer intento ha tenido que pagar')
          }

        }
    }

    this.utilizarTarjeta=function(usuario){
       usuario.estado= new UsuarioLibre()
       console.log('Has sido liberado de la carcel')

    }

}

function UsuarioLibre(){
  this.accion=function(){}
   this.pagarSalidaCarcel=function(ficha){
    console.log('No estas en la carcel')
   }
   this.utilizarTarjeta=function(usuario){
    console.log('No puedes utilizar la tarjeta no estas en la carcel')
   }

}