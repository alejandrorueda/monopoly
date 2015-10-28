//underscore.js
function Juego(){
   this.numeroFichasUtilizadas=0
   this.dado = new Dado()
   this.fichas=[]
   this.tablero=null
   this.turnoActual=0
   this.fase=new Inicial()
   
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
   this.empezar=function(){
     
         this.fase=new Jugar()
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
     this.fichas[this.numeroFichasUtilizadas].asignarCasilla(this.tablero.casillas[0])
     if(this.numeroFichasUtilizadas==0)this.fichas[this.numeroFichasUtilizadas].usuario.volverTirar=1
     this.numeroFichasUtilizadas++
     return 'Usuario asignado correctamente a la ficha '+this.fichas[this.numeroFichasUtilizadas-1].nombre
   }
   else return 'Ya estan todas las fichas asignadas'

     
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

	this.agregarCasilla=function(posicion, Casilla){
	     this.casillas[posicion]=Casilla
	}
	this.iniciarTablero=function(){
       for(i=0;i<numeroCasillas;i++){
       	     this.casillas[i]=new Casilla(i,new Normal())
       }
    this.agregarCasilla(0,new Casilla(0,new Salida()))
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
function Tarjeta(nombre,descripcion,comando){
      this.nombre=nombre
      this.descripcion=descripcion
      this.comando = comando

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
       this.asignarCasilla=function(casilla){
          //document.writeln('asignada')
           console.log('El usuario '+this.usuario.nombre+' ha caido en la casilla '+casilla.tema.nombre)
           this.casilla=casilla
           if(casilla.tema instanceof Salida)this.presupuesto=this.presupuesto+200
          if(casilla.tema instanceof Calle || casilla.tema instanceof Estacion){
            console.log(casilla.tema.estado.nombre)
            casilla.tema.estado.accion(this,casilla.tema)
          } 

         // return'El usuario '+this.usuario.nombre+' ha caido en la casilla '+casilla.tema.nombre   
       }
}

function Jugador(nombre,presupuesto,juego){
     this.presupuesto=presupuesto
     this.nombre=nombre
     this.juego=juego
     this.posicion=0
     this.volverTirar=0
     
    
    this.comprarPropiedad=function(){
        var ficha = juego.buscarJugador(this.nombre);

        ficha.casilla.tema.estado.comprar(ficha,ficha.casilla.tema)
             
                   
        }

    this.comprarCasa=function(propiedad){
      if(this.volverTirar==1){
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
        
    

     this.lanzarDosDados=function(){
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
  return new Jugador(nombre,1300,juego)
}

function Titulo(precioCompra){
     this.precioCompra=precioCompra
     this.precioAlquiler=0
     this.casas=0
     this.numeroCallesColor=0
     this.precioCasa=100+(precioCompra/4)
     this.iniTitulo=function(){
     this.precioAlquiler=this.precioCompra/4
     this.precioAlquiler=this.precioAlquiler+this.precioAlquiler*this.casas
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
    ficha.comprarPropiedad(propiedad.titulo.precioCompra)
    propiedad.estado = new APagar()
    propiedad.estado.propietario=ficha
    console.log(propiedad.nombre+' '+'ha sido comprada')
    propiedad.titulo.iniTitulo()
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
    if(callesGrupo==propiedad.mismoColor(ficha.usuario.juego)){
   //this.comprarCasa(ficha,propiedad)
   propiedad.estado = new Grupo()
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
    var pago=ficha.presupuesto=ficha.presupuesto-propiedad.titulo.precioAlquiler
    this.porpietario+=propiedad.titulo.precioAlquiler
    if(pago<0)
    console.log('El usuario no tiene dinero para pagar la estancia')
    else console.log('El usuario '+ficha.usuario.nombre+' ha pagado por su estancia en la calle '+propiedad.nombre+' '+pago)

  }
else console.log('Eres su propietario')
}


function Grupo(){
   
   this.comprar=function(ficha,propiedad) {

  if((ficha.presupuesto-propiedad.titulo.precioCasa)>0){

  ficha.presupuesto=ficha.presupuesto-propiedad.titulo.precioCasa
  propiedad.titulo.casas++
  propiedad.titulo.iniTitulo()
  console.log('El usuario compra una casa')
  }
  else console.log('No tienes suficiente dinero para una casa')
}

 this.accion=function(ficha,propiedad){

   
if(this.propietario!=ficha){
    var pago=ficha.presupuesto=ficha.presupuesto-propiedad.titulo.precioAlquiler
    this.porpietario+=propiedad.titulo.precioAlquiler
    if(pago<0)
    console.log('El usuario no tiene dinero para pagar la estancia')
    else console.log('El usuario '+ficha.usuario.nombre+' ha pagado por su estancia en la calle '+propiedad.nombre+' '+pago)

  }
else console.log('Eres su propietario')

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
    ficha.comprarPropiedad(propiedad.titulo.precioCompra)
    propiedad.actualizarPrecioEstacion(ficha)
    propiedad.estado = new APagarEstacion()
}
LibreEstacion.prototype.accion = function(ficha, propiedad) {
  
    console.log('El usuario puede comprar esta estacion')
}

function APagarEstacion(){}
APagarEstacion.prototype = new EstadoEstacion;
APagarEstacion.prototype.comprar = function() {
    
    return 'Esta estacion ya tiene propietario'
}
APagarEstacion.prototype.accion = function(ficha, propiedad) {
    var pago=ficha.presupuesto=ficha.presupuesto-propiedad.titulo.precioAlquiler
    if(pago<0)
    console.log('El usuario no tiene dinero para pagar la estancia')
    else console.log('El usuario '+ficha.usuario.nombre+' ha pagado por su estancia en la estacion '+propiedad.nombre+' '+pago)
}



function Fases(){

this.nuevoUsuario=function(usuario,juego){
     console.log('Ya no se pueden añadir usuarios')

     return -1

   }
    this.crearUsuario=function(usuarioNombre,juego){
     console.log('Ya no se pueden crea usuarios')

return -1
   }

   this.lanzarDosDados=function(usuario){
     console.log('Aun no ha comenzado el juego')

     return -1

   }
  this.asignarCasilla=function(casilla,ficha){
          //document.writeln('asignada')
           console.log('Aun no se pueden hacer transiciones ')

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
      
      if(usuario.volverTirar>0){
        usuario.posicion=usuario.posicion+numero+numero2
        if(usuario.posicion>=40)usuario.posicion=usuario.posicion-40
        usuario.juego.buscarJugador(usuario.nombre).asignarCasilla(usuario.juego.obtenerTablero().casillas[usuario.posicion])

        if((numero+numero2)==12)usuario.volverTirar++;
        else usuario.volverTirar=0;

        if(usuario.volverTirar==3){
         
            usuario.juego.buscarJugador(usuario.nombre).asignarCasilla(usuario.juego.obtenerTablero().casillas[30])
            usuario.volverTirar=0
        }

        if(usuario.volverTirar==0)usuario.juego.gestionTurnos()
        
        return numero+numero2 
    }
        
        return 'No se puede tirar' 
     }
Jugar.prototype.asignarCasilla=function(casilla,ficha){
          //document.writeln('asignada')
           console.log('El usuario '+ficha.usuario.nombre+' ha caido en la casilla '+casilla.tema.nombre)
           ficha.casilla=casilla
           if(casilla.tema instanceof Salida)ficha.presupuesto=ficha.presupuesto+200
          if(casilla.tema instanceof Calle || casilla.tema instanceof Estacion)
            casilla.tema.estado.accion(ficha,casilla.tema)
          
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
       ficha.posicion=ficha.posicion+this.posiciones
        if(ficha.posicion>=40)ficha.posicion=ficha.posicion-40
        ficha.asignarCasilla(ficha.usuario.juego.obtenerTablero().casillas[ficha.posicion])
        console.log('Avanzas '+this.posiciones+' posiciones hasta la casilla '+ficha.posicion+' '+ficha.usuario.juego.obtenerTablero().casillas[ficha.posicion].tema.nombre)
   }
}

function Retroceder(posiciones){
   this.posiciones=posiciones
   this.ejecutar=function(ficha){
       ficha.posicion=ficha.posicion-this.posiciones
        if(ficha.posicion<0)ficha.posicion=ficha.posicion+40
        ficha.asignarCasilla(ficha.usuario.juego.obtenerTablero().casillas[ficha.posicion])
        console.log('Retocedes '+this.posiciones+' posiciones hasta la casilla '+ficha.posicion+' '+ficha.usuario.juego.obtenerTablero().casillas[ficha.posicion].tema.nombre)
   }
}

function Multa(cantidad){
    this.cantidad=cantidad
    this.ejecutar=function(ficha){
        ficha.presupuesto=ficha.presupuesto-this.cantidad
        if(ficha.presupuesto<0){

        }
        console.log('Has recibido una multa de '+this.cantidad)
    }

}

Avanzar.prototype = new Comando
Avanzar.prototype.ejecutar = function(ficha){

   ficha.posicion+=this.posicion

}