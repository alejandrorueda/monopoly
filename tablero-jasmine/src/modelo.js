function Tablero(numeroCasillas){
	this.casillas=[]
  this.dado = new Dado()
	this.numeroCasillas=numeroCasillas

	this.agregarCasilla=function(posicion, Casilla){
	     this.casillas[posicion]=Casilla
	}
	this.iniciarTablero=function(){
       for(i=0;i<numeroCasillas;i++){
       	     this.casillas[i]=new Casilla(i,new Normal())
       }

    this.agregarCasilla(1,new Casilla(1,new Calle('Ronda de Valencia',60,'marron',1)))
    this.agregarCasilla(2,new Casilla(2,new casillaTarjeta('comunidad')))
    this.agregarCasilla(3,new Casilla(3,new Calle('Plaza Lavapies',60,'marron',3)))
    this.agregarCasilla(4,new Casilla(4,new Impuesto('Impuesto',200)))
    this.agregarCasilla(5,new Casilla(5,new Estacion('Estacion de Goya',200)))
    this.agregarCasilla(6,new Casilla(6,new Calle('Glorienta Cuatro Caminos',100,'celeste',6)))
    this.agregarCasilla(7,new Casilla(7,new casillaTarjeta('suerte'),7))
    this.agregarCasilla(8,new Casilla(8,new Calle('Avenida Reina Victoria',100,'celeste',8)))
    this.agregarCasilla(9,new Casilla(9,new Calle('Calle Bravo Murillo',100,'celeste'),9))
    this.agregarCasilla(10,new Casilla(10,new Carcel(),10))
    this.agregarCasilla(11,new Casilla(11,new Calle('Glorienta de Bilbao',140,'morado'),11))
    this.agregarCasilla(12,new Casilla(12,new CompaniaElectrica('Electrica',180),12))
    this.agregarCasilla(13,new Casilla(13,new Calle('Calle Alberto Aguilera',140,'morado',13)))
    this.agregarCasilla(14,new Casilla(14,new Calle('Calle Fuencarral',160,'morado',14)))
    this.agregarCasilla(15,new Casilla(15,new Calle('Estacion de las delicias',200)))
    this.agregarCasilla(16,new Casilla(16,new Calle('Avenida Felipe III',180,'naranja',16)))
    this.agregarCasilla(17,new Casilla(17,new casillaTarjeta('comunidad')))
    this.agregarCasilla(18,new Casilla(18,new Calle('Calle Velazquez',180,'naranja',18)))
    this.agregarCasilla(19,new Casilla(19,new Calle('Calle Serrano',200,'naranja',19)))
    this.agregarCasilla(21,new Casilla(21,new Calle('Avenida De America',220,'rojo',21)))
    this.agregarCasilla(22,new Casilla(22,new casillaTarjeta('suerte')))
    this.agregarCasilla(23,new Casilla(23,new Calle('Calle María de Molina',220,'rojo',23)))
    this.agregarCasilla(24,new Casilla(24,new Calle('Calle Cia Bermudez',220,'rojo',24)))
    this.agregarCasilla(25,new Casilla(25,new Estacion('Estacion del Mediodia',200)))
    this.agregarCasilla(26,new Casilla(26,new Calle('Avenida de los Reyes Catolicos',260,'amarillo',26)))
    this.agregarCasilla(27,new Casilla(27,new Calle('Calle Bailen',260,'amarillo',27)))
    this.agregarCasilla(28,new Casilla(28,new CompaniaAgua('Companias de aguas',150)))
    this.agregarCasilla(29,new Casilla(29,new Calle('Plaza de Espana',280,'amarillo',29)))
    this.agregarCasilla(30,new Casilla(30,new Carcel('Carcel'),30))
    this.agregarCasilla(31,new Casilla(31,new Calle('Puerta del Sol',300,'verde',31)))
    this.agregarCasilla(32,new Casilla(32,new Calle('Calle Alcala',300,'verde',32)))
    this.agregarCasilla(33,new Casilla(33,new Tarjeta('comunidad')))
    this.agregarCasilla(34,new Casilla(34,new Calle('Gran Vía',330,'verde',33)))
    this.agregarCasilla(35,new Casilla(35,new Estacion('Estacion del Norte',200)))
    this.agregarCasilla(36,new Casilla(36,new casillaTarjeta('suerte')))
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
                 if(jugador.nombre)==this.jugadores[this.nJugadores].nombre) return this.casillas[i]
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
function Tarjeta(nombre,descripcion){
      this.nombre=nombre
      this.descripcion=descripcion
} 

function Jugador(nombre,ficha){
      this.nombre=nombre
      this.ficha=ficha

      this.caer=function(casilla){
          casilla.agregarJugador(this)
      }
}
function casillaTarjeta(nombre){
     this.nombre=nombre
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
      
      this.tarjetasCofre[this.nTarjetasSuerte]=tarjeta
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
        return Math.round(Math.random()*6);
     }
}
function Ficha(nombre){
       this.nombre=nombre
}
function Juego(){
     
}
function Jugador(nombre,presupuesto){
     this.presupuesto=presupuesto
     this.nombre=nombre

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
  this.propietario = new Jugador("nadie",0)
   this.agregarPropietario=function(propietario){
      this.propietario = propietario
  }
  this.calcularPago=function(){

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

function iniJuego(){
	tablero = new Tablero(40)

}
