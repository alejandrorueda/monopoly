var modelo=require("./modelo.js");

describe("Monopoly",function(){

	var tab; 
     var juego;
     var usr;
	beforeEach(function(){
		tab = new modelo.Tablero(40);
		juego = new modelo.Juego();
    usr = new modelo.Jugador('pepe',1000);
	});

	describe("Tablero",function(){
		it("Tiene 40 casillas",function(){
               
			expect(tab.dado.calcularNumero()).toBeDefined(); //debe existir la variable
			expect(tab.numeroCasillas).toEqual(40);	 //debe tener valor inicial 0

		});
		it("Estan las calles en el tablero",function(){
		  expect(tab.casillas[0].obtenerTema) instanceof modelo.Salida	

		  expect(tab.casillas[1].obtenerTema().nombre).toEqual('Ronda de Valencia'); 
		  expect(tab.casillas[1].obtenerTema().colorr).toEqual('marron'); 

		  expect(tab.casillas[2].obtenerTema().nombre).toEqual('comunidad'); 
		 

		  expect(tab.casillas[3].obtenerTema().nombre).toEqual('Plaza Lavapies');
		  expect(tab.casillas[3].obtenerTema().colorr).toEqual('marron'); 

		  expect(tab.casillas[4].obtenerTema().nombre).toEqual('Impuesto'); 
		  expect(tab.casillas[4].obtenerTema().cantidad).toEqual(200); 

		  expect(tab.casillas[5].obtenerTema().nombre).toEqual('Estacion de Goya'); 
		 

          expect(tab.casillas[6].obtenerTema().nombre).toEqual('Glorienta Cuatro Caminos'); 
          expect(tab.casillas[6].obtenerTema().colorr).toEqual('celeste'); 

          expect(tab.casillas[7].obtenerTema().nombre).toEqual('suerte');

          expect(tab.casillas[8].obtenerTema().nombre).toEqual('Avenida Reina Victoria'); 
          expect(tab.casillas[8].obtenerTema().colorr).toEqual('celeste'); 

          expect(tab.casillas[9].obtenerTema().nombre).toEqual('Calle Bravo Murillo');
          expect(tab.casillas[9].obtenerTema().colorr).toEqual('celeste');  

          expect(tab.casillas[11].obtenerTema().nombre).toEqual('Glorienta de Bilbao');
          expect(tab.casillas[11].obtenerTema().colorr).toEqual('morado'); 

          expect(tab.casillas[13].obtenerTema().nombre).toEqual('Calle Alberto Aguilera'); 
          expect(tab.casillas[13].obtenerTema().colorr).toEqual('morado');

          expect(tab.casillas[14].obtenerTema().nombre).toEqual('Calle Fuencarral'); 
          expect(tab.casillas[14].obtenerTema().colorr).toEqual('morado'); 

          expect(tab.casillas[15].obtenerTema().nombre).toEqual('Estacion de las delicias'); 

          expect(tab.casillas[16].obtenerTema().nombre).toEqual('Avenida Felipe III'); 
          expect(tab.casillas[16].obtenerTema().colorr).toEqual('naranja'); 

          expect(tab.casillas[18].obtenerTema().nombre).toEqual('Calle Velazquez'); 
          expect(tab.casillas[18].obtenerTema().colorr).toEqual('naranja'); 

          expect(tab.casillas[19].obtenerTema().nombre).toEqual('Calle Serrano'); 
          expect(tab.casillas[19].obtenerTema().colorr).toEqual('naranja'); 

          expect(tab.casillas[21].obtenerTema().nombre).toEqual('Avenida De America');
          expect(tab.casillas[21].obtenerTema().colorr).toEqual('rojo'); 

          expect(tab.casillas[22].obtenerTema().nombre).toEqual('suerte');

          expect(tab.casillas[23].obtenerTema().nombre).toEqual('Calle María de Molina');
          expect(tab.casillas[23].obtenerTema().colorr).toEqual('rojo'); 

          expect(tab.casillas[24].obtenerTema().nombre).toEqual('Calle Cia Bermudez');
          expect(tab.casillas[24].obtenerTema().colorr).toEqual('rojo'); 

          expect(tab.casillas[25].obtenerTema().nombre).toEqual('Estacion del Mediodia');


          expect(tab.casillas[26].obtenerTema().nombre).toEqual('Avenida de los Reyes Catolicos');
          expect(tab.casillas[26].obtenerTema().colorr).toEqual('amarillo'); 

          expect(tab.casillas[27].obtenerTema().nombre).toEqual('Calle Bailen');
          expect(tab.casillas[27].obtenerTema().colorr).toEqual('amarillo'); 

          expect(tab.casillas[28].obtenerTema().nombre).toEqual('Companias de aguas');

          expect(tab.casillas[29].obtenerTema().nombre).toEqual('Plaza de Espana');
          expect(tab.casillas[29].obtenerTema().colorr).toEqual('amarillo'); 

          expect(tab.casillas[30].obtenerTema().nombre).toEqual('Ir a la carcel');

          expect(tab.casillas[31].obtenerTema().nombre).toEqual('Puerta del Sol');
          expect(tab.casillas[31].obtenerTema().colorr).toEqual('verde'); 

          expect(tab.casillas[32].obtenerTema().nombre).toEqual('Calle Alcala');
          expect(tab.casillas[32].obtenerTema().colorr).toEqual('verde'); 

          expect(tab.casillas[33].obtenerTema().nombre).toEqual('comunidad');

          expect(tab.casillas[34].obtenerTema().nombre).toEqual('Gran Vía');
          expect(tab.casillas[34].obtenerTema().colorr).toEqual('verde'); 

          expect(tab.casillas[35].obtenerTema().nombre).toEqual('Estacion del Norte');

          expect(tab.casillas[36].obtenerTema().nombre).toEqual('suerte');

          expect(tab.casillas[37].obtenerTema().nombre).toEqual('Paseo de la Castellana');
          expect(tab.casillas[37].obtenerTema().colorr).toEqual('marino'); 

          expect(tab.casillas[38].obtenerTema().nombre).toEqual('impuesto');
          expect(tab.casillas[38].obtenerTema().cantidad).toEqual(100); 

          expect(tab.casillas[39].obtenerTema().nombre).toEqual('Paseo del Prado');
          expect(tab.casillas[39].obtenerTema().colorr).toEqual('marino'); 

		});

		it("Agrega correctamente las calles",function(){
		  tab.agregarCasilla(1,new modelo.Casilla(1,new modelo.Calle('Avenida Espana',1,'marron',1)));
		  expect(tab.obtenerCasilla('Avenida Espana').obtenerTema().nombre).toEqual('Avenida Espana'); 
          tab = new modelo.Tablero(40);
		});

   

		it("Comprobar numero dado",function(){
            var valor
             

            
            for(i=0;i<20;i++){
            valor=tab.dado.calcularNumero();

		 // expect(valor).toBeLessThan(6);
       //     expect(valor).toBeGreaterThan(2);

            valor=valor+tab.dado.calcularNumero();
            expect(valor).toBeLessThan(15);
            expect(valor).toBeGreaterThan(1);
            }
		});

           it("Agregar nuevo usuario",function(){
               juego.iniJuego();
               juego.nuevoUsuario(usr);

               expect(juego.buscarJugador('pepe').obtenerUsuario().nombre).toEqual('pepe');
              

          });

           it("6 jugadores con sus respectivas fichas",function(){
               juego.iniJuego();
            for(i=0;i<6;i++){
               juego.crearUsuario('usuario'+i);
            }
            expect(juego.crearUsuario('usuario7')).toEqual(-1);
            var colores=' ';
            for(i=0;i<6;i++){
               var ficha;

               ficha = juego.buscarJugador('usuario'+i);
               if(ficha!=-1){
               expect(ficha.obtenerUsuario().nombre).toEqual('usuario'+i);
               expect(colores.indexOf(ficha.nombre)).toEqual(-1);
               colores=colores+' '+ficha.nombre;
               expect(juego.buscarJugador('usuario'+i).presupuesto).toEqual(1500);
               }
               else expect(0).toEqual(-1);
            }


          });

           it("Lanzar los dos dados",function(){
               juego.iniJuego();
        
               juego.crearUsuario('usuario');
               juego.crearUsuario('usuario2');
               var numeroDado;
              juego.empezar();
              juego.buscarJugador('usuario').usuario.volverTirar=1;
               numeroDado=juego.buscarJugador('usuario').obtenerUsuario().lanzarDosDados();
               expect(numeroDado).toBeGreaterThan(1);
               expect(numeroDado).toBeLessThan(14);
             

          });

             it("Se modifica la posicion",function(){
               juego.iniJuego();

               juego.crearUsuario('usuario');
               juego.crearUsuario('usuario2');
               juego.empezar();
               var posicion,numeroDado,nuevaCasilla,total;
               juego.buscarJugador('usuario').usuario.volverTirar=1;
               posicion=juego.buscarJugador('usuario').casilla.posicion;
               numeroDado=juego.buscarJugador('usuario').obtenerUsuario().lanzarDosDados();
               total=posicion+numeroDado;
               expect(juego.buscarJugador('usuario').casilla.posicion).toEqual(total);
             

          });

          it("Limites del tablero",function(){
               juego.iniJuego();

               juego.crearUsuario('usuario');
               juego.crearUsuario('usuario2');
               juego.empezar();
               var posicion=0,numeroDado,nuevaCasilla,total;
               
               for(k=0;k<40;k++){
               //juego.buscarJugador('usuario').usuario.volverTirar=1;
                         juego.buscarJugador('usuario').obtenerUsuario().lanzarDosDados();
                  juego.buscarJugador('usuario').obtenerUsuario().pasarTurno();
                 juego.buscarJugador('usuario2').obtenerUsuario().lanzarDosDados();
                 juego.buscarJugador('usuario2').obtenerUsuario().pasarTurno();

                 if(posicion==juego.buscarJugador('usuario').casilla.posicion)expect(posicion).toEqual(juego.buscarJugador('usuario').casilla.posicion);

                 posicion = juego.buscarJugador('usuario').casilla.posicion;
                 expect(posicion).toBeLessThan(40);
                 expect(posicion).toBeGreaterThan(-1);
               }

          });

           it("Doble",function(){
               juego.iniJuego();

               juego.crearUsuario('usuario');
               juego.crearUsuario('usuario2');
               var posicion=0,numeroDado,nuevaCasilla,total;
               juego.empezar();
               
                 juego.buscarJugador('usuario').usuario.volverTirar=1;

                 posicion=juego.buscarJugador('usuario').obtenerUsuario().lanzarDosDadosManual(6,6);

                 expect(posicion).toEqual(12);

                  posicion=juego.buscarJugador('usuario').obtenerUsuario().lanzarDosDadosManual(6,1);

                 expect(posicion).toEqual(7);

                  posicion=juego.buscarJugador('usuario').obtenerUsuario().lanzarDosDados();

                 expect(posicion).toEqual('No se puede tirar');

               


          });

            it(" Tres Dobles",function(){
              /* juego.iniJuego();

               juego.crearUsuario('usuario');
               var posicion=0,numeroDado,nuevaCasilla,total;
               
               juego.empezar();
                 juego.buscarJugador('usuario').usuario.volverTirar=1;

                 posicion=juego.buscarJugador('usuario').obtenerUsuario().lanzarDosDadosManual(6,6);

                 expect(posicion).toEqual(12);

                  posicion=juego.buscarJugador('usuario').obtenerUsuario().lanzarDosDadosManual(6,6);

                 expect(posicion).toEqual(12);

                 posicion=juego.buscarJugador('usuario').obtenerUsuario().lanzarDosDadosManual(6,6);

                 expect(posicion).toEqual(12);

                 expect(juego.buscarJugador('usuario').casilla.tema.nombre).toEqual('Carcel');

                  posicion=juego.buscarJugador('usuario').obtenerUsuario().lanzarDosDados();

                 expect(posicion).toEqual('No se puede tirar');*/
               


          });


		/*it("Debería restar cualquier serie de números",function(){
			expect(tab.obtenerCasilla(calle)).toBeDefined());
		});*/

		/*it("Existe la calle",function(){	
			expect(cal.suma(5)).toEqual(5);
			expect(cal.suma(5)).toEqual(10);
		});

		it("sumar cualquier número de números",function(){
			expect(cal.suma(1,2,3)).toEqual(6);
		});*/

	});



 it("´Gestion de turnos",function(){
      var presupuestoInicial,valor;
        juego.iniJuego();
        juego.crearUsuario('pepe');
        juego.crearUsuario('jose');
juego.empezar();
        ficha1 = juego.buscarJugador('pepe');
        ficha2 = juego.buscarJugador('jose');
        
        presupuestoInicial=ficha1.presupuesto;

       valor=ficha1.usuario.lanzarDosDados()
       expect(valor).toBeGreaterThan(1);
        do{
        valor=ficha1.usuario.lanzarDosDados()
        }while(valor==12);
        ficha1.usuario.pasarTurno();
   
        expect(ficha1.usuario.lanzarDosDados()).toEqual('No se puede tirar' );

        valor=ficha2.usuario.lanzarDosDados()
        expect(valor).toBeGreaterThan(1);
         do{
        valor=ficha2.usuario.lanzarDosDados()
        }while(valor==12);

        expect(ficha2.usuario.lanzarDosDados()).toEqual(-1);
        ficha2.usuario.pasarTurno();
        expect(ficha1.usuario.lanzarDosDados()).toBeGreaterThan(1);

     })

describe("Funciones calles",function(){

    it("Comprar y alquiler",function(){
      var presupuestoInicial;
        juego.iniJuego();
        juego.crearUsuario('pepe');
        juego.crearUsuario('jose');

        ficha1 = juego.buscarJugador('pepe');
        ficha2 = juego.buscarJugador('jose');
        juego.empezar();
        presupuestoInicial=ficha1.presupuesto;

        ficha1.asignarCasilla(juego.tablero.casillas[23]);
      
        juego.tablero.casillas[23].tema.titulo.iniTitulo();
        ficha1.usuario.comprarPropiedad();
        expect(ficha1.propiedades[0]).toEqual(juego.tablero.casillas[23].tema);
        expect(presupuestoInicial-juego.tablero.casillas[23].tema.titulo.precioCompra).toEqual(ficha1.presupuesto);

        if(juego.tablero.casillas[23].tema.estado instanceof modelo.APagar)
        expect(0).toEqual(0);
        else expect(0).toEqual(-1);

        presupuestoInicial=ficha2.presupuesto;
        ficha2.asignarCasilla(juego.tablero.casillas[23]);
        expect(presupuestoInicial-juego.tablero.casillas[23].tema.titulo.precioAlquiler).toEqual(ficha2.presupuesto);

       

     })


    it("Comprar y alquiler Casas y hoteles y vender edificaciones",function(){
      var presupuestoInicial,presupuestoInicial2;
        juego.iniJuego();
        juego.crearUsuario('pepe');
        juego.crearUsuario('jose');

        ficha1 = juego.buscarJugador('pepe');
        ficha2 = juego.buscarJugador('jose');
        juego.empezar();
        presupuestoInicial=ficha1.presupuesto;

        ficha1.asignarCasilla(juego.tablero.casillas[1]);
       
        juego.tablero.casillas[1].tema.titulo.iniTitulo();
        ficha1.usuario.comprarPropiedad();
        expect(ficha1.propiedades[0]).toEqual(juego.tablero.casillas[1].tema); //comprueba que la propiedad se compro correctamente
        expect(presupuestoInicial-juego.tablero.casillas[1].tema.titulo.precioCompra).toEqual(ficha1.presupuesto);
        presupuestoInicial=ficha1.presupuesto

        presupuestoInicial2=ficha2.presupuesto;
        ficha2.asignarCasilla(juego.tablero.casillas[1]);
        expect(presupuestoInicial2).toBeGreaterThan(ficha2.presupuesto);  //comprueba que cuando cae otro usuario sobre la calle este pagar un alquiler y obtendra lo correspondiente a este
        var beneficio=presupuestoInicial2-ficha2.presupuesto
        expect(presupuestoInicial+beneficio).toEqual(ficha1.presupuesto);

        if(juego.tablero.casillas[1].tema.estado instanceof modelo.APagar) //cambia de estado la propiedad
        expect(0).toEqual(0);
        else expect(0).toEqual(-1);

        presupuestoInicial=ficha2.presupuesto;
        ficha2.asignarCasilla(juego.tablero.casillas[1]);
        expect(presupuestoInicial-juego.tablero.casillas[1].tema.titulo.precioAlquiler).toEqual(ficha2.presupuesto);

        ficha1.asignarCasilla(juego.tablero.casillas[3]);
        ficha1.usuario.comprarPropiedad(); //no puede utilizar esta funcion si no es su turno
        expect(juego.tablero.casillas[3].tema.titulo.casas).toEqual(0)

        ficha1.asignarCasilla(juego.tablero.casillas[1]);
        ficha1.usuario.comprarPropiedad();  //compra una casa

        expect(juego.tablero.casillas[1].tema.titulo.casas).toEqual(1)

        ficha1.usuario.comprarPropiedad();
        expect(juego.tablero.casillas[1].tema.titulo.casas).toEqual(1)

        presupuestoInicial=ficha2.presupuesto;
        ficha2.asignarCasilla(juego.tablero.casillas[3]);
        presupuestoInicial2=presupuestoInicial-ficha2.presupuesto;
        ficha1.asignarCasilla(juego.tablero.casillas[3]);
        ficha1.usuario.comprarPropiedad();
        ficha1.usuario.comprarPropiedad();
        ficha1.usuario.comprarPropiedad();
        ficha1.usuario.comprarPropiedad();
        expect(juego.tablero.casillas[3].tema.titulo.casas).toEqual(4); //compro cuatro casas
        presupuestoInicial=ficha2.presupuesto;
        ficha2.asignarCasilla(juego.tablero.casillas[3]);

        expect(presupuestoInicial2).toBeLessThan(presupuestoInicial-ficha2.presupuesto); // se comprueba que el precio a pagar fue menor antes de comprar las casas

        ficha1.usuario.lanzarDosDados();
        ficha1.usuario.pasarTurno();
       
        ficha1.usuario.comprarCasa('Plaza Lavapies');  // un modo de poder comprar casas sin tener que caer en la casilla y sea tu turno
        expect(juego.tablero.casillas[3].tema.titulo.casas).toEqual(0);
        expect(juego.tablero.casillas[3].tema.titulo.hoteles).toEqual(1);
        ficha1.usuario.venderEdificacion(juego.tablero.casillas[3].tema.nombre);
        ficha1.usuario.comprarCasa('Plaza Lavapies');
       /* ficha1.usuario.comprarCasa('Ronda de Valencia');
        expect(juego.tablero.casillas[1].tema.titulo.casas).toEqual(2);*/
        
        ficha2.usuario.lanzarDosDados();
        ficha2.usuario.pasarTurno();

         ficha1.usuario.comprarCasa('Ronda de Valencia');
         ficha1.usuario.comprarCasa('Ronda de Valencia');
          ficha1.usuario.comprarCasa('Ronda de Valencia');

         expect(juego.tablero.casillas[1].tema.titulo.casas).toEqual(4);
         
         var presupuestoAnterior=ficha1.presupuesto;
         ficha1.usuario.venderEdificacion(juego.tablero.casillas[1].tema.nombre);  //se comprueba que al vender una edificacion esta realmente se vende
         expect(juego.tablero.casillas[1].tema.titulo.casas).toEqual(3);
         expect(presupuestoAnterior).toBeLessThan(ficha1.presupuesto);
         presupuestoAnterior=ficha1.presupuesto;
         ficha1.usuario.venderEdificacion(juego.tablero.casillas[1].tema.nombre);
         expect(juego.tablero.casillas[1].tema.titulo.casas).toEqual(2);
         expect(presupuestoAnterior).toBeLessThan(ficha1.presupuesto);
         ficha1.usuario.venderEdificacion(juego.tablero.casillas[1].tema.nombre);
         expect(juego.tablero.casillas[1].tema.titulo.casas).toEqual(1);
         ficha1.usuario.venderEdificacion(juego.tablero.casillas[1].tema.nombre);
         expect(juego.tablero.casillas[1].tema.titulo.casas).toEqual(0);
        // ficha1.usuario.venderEdificacion(juego.tablero.casillas[1].tema.nombre);
        // expect(juego.tablero.casillas[1].tema.titulo.casas).toEqual(2);


     })

  it("Salir de la carcel",function(){
      var presupuestoInicial;
        juego.iniJuego();
        juego.crearUsuario('pepe');
        juego.crearUsuario('jose');

        ficha1 = juego.buscarJugador('pepe');
        ficha2 = juego.buscarJugador('jose');
        juego.empezar();
        presupuestoInicial=ficha1.presupuesto;

        ficha1.asignarCasilla(juego.tablero.casillas[30]);
        expect(ficha1.usuario.lanzarDosDados()).toEqual(-1);

        ficha1.usuario.pasarTurno();
        ficha2.usuario.lanzarDosDados();
        ficha2.usuario.pasarTurno();
        expect(ficha1.usuario.lanzarDosDados()).toEqual(-1);
        ficha1.usuario.pasarTurno();
        ficha2.usuario.lanzarDosDados();
        ficha2.usuario.pasarTurno();
        expect(ficha1.usuario.lanzarDosDados()).toEqual(-1);
        ficha1.usuario.pasarTurno();
        ficha2.usuario.lanzarDosDados();
        ficha2.usuario.pasarTurno();
        expect(ficha1.usuario.lanzarDosDados()).toBeGreaterThan(1);
        expect(ficha1.presupuesto).toEqual(1450);


        ficha1.asignarCasilla(juego.tablero.casillas[30]);
        ficha1.usuario.pagarCarcel();
        ficha1.usuario.pasarTurno();
        ficha2.usuario.lanzarDosDados();
        ficha2.usuario.pasarTurno();
        expect(ficha1.usuario.lanzarDosDados()).toBeGreaterThan(1);
     })

  it("Obtener Tarjeta",function(){
      var presupuestoInicial;
        juego.iniJuego();
        juego.crearUsuario('pepe');
        juego.crearUsuario('jose');

        ficha1 = juego.buscarJugador('pepe');
        ficha2 = juego.buscarJugador('jose');
        juego.empezar();
        presupuestoInicial=ficha1.presupuesto;

        ficha1.asignarCasilla(juego.tablero.casillas[7]);
        var tarjeta=ficha1.usuario.sacarTarjeta();
        expect(tarjeta).toBeDefined();
        

     })


   /*it("Casilla salida 200 pelotis",function(){
      var presupuestoInicial;
        juego.iniJuego();
        juego.crearUsuario('pepe');
        juego.crearUsuario('jose');
        juego.empezar();
        ficha1 = juego.buscarJugador('pepe');
        ficha2 = juego.buscarJugador('jose');
        
        presupuestoInicial=ficha1.presupuesto;

        ficha1.asignarCasilla(juego.tablero.casillas[1]);
      
        expect(ficha1.presupuesto).toEqual(presupuestoInicial+200)

       

     })*/

      it("Comprar Estacion",function(){
      var presupuestoInicial;
        juego.iniJuego();
        juego.crearUsuario('pepe');
        juego.crearUsuario('jose');
        juego.empezar();
        ficha1 = juego.buscarJugador('pepe');
        ficha2 = juego.buscarJugador('jose');
        
        presupuestoInicial=ficha1.presupuesto;
     
       
        juego.tablero.casillas[5].tema.estado.accion();
        ficha1.asignarCasilla(juego.tablero.casillas[5]);
      
        juego.tablero.casillas[5].tema.titulo.iniTitulo();
        ficha1.usuario.comprarPropiedad();
        expect(ficha1.propiedades[0]).toEqual(juego.tablero.casillas[5].tema);
        expect(presupuestoInicial-juego.tablero.casillas[5].tema.titulo.precioCompra).toEqual(ficha1.presupuesto);

        if(juego.tablero.casillas[5].tema.estado instanceof modelo.APagarEstacion)
        expect(0).toEqual(0);
        else expect(0).toEqual(-1);

        presupuestoInicial=ficha2.presupuesto;
        ficha2.asignarCasilla(juego.tablero.casillas[5]);
        expect(presupuestoInicial-juego.tablero.casillas[5].tema.titulo.precioAlquiler).toEqual(ficha2.presupuesto);

       

     })

    it("Fase del tablero Inicio",function(){

        juego.iniJuego();
        juego.crearUsuario('pepe');
        

        ficha1 = juego.buscarJugador('pepe');
       
        expect(ficha1).toBeDefined();
        juego.empezar();

        expect(juego.crearUsuario('paco')).toEqual(1);

        juego.empezar();

        expect(juego.crearUsuario('paco2')).toEqual(-1);


    })

     it("Fase del tablero Jugar",function(){

        juego.iniJuego();
        juego.crearUsuario('pepe');
        

        ficha1 = juego.buscarJugador('pepe');
        expect(ficha1).toBeDefined();
        expect(ficha1.usuario.lanzarDosDados()).toEqual(-1);
        juego.empezar();
        expect(ficha1.usuario.lanzarDosDados()).toEqual(-1);
        juego.crearUsuario('jose');
        juego.empezar();
        expect(ficha1.usuario.lanzarDosDados()).toBeGreaterThan(1);


    })

    it("Eliminar del juego",function(){

        juego.iniJuego();
        juego.crearUsuario('pepe');
        juego.crearUsuario('jose');
        juego.crearUsuario('mar');
        juego.empezar();
        ficha1 = juego.buscarJugador('pepe');
        ficha2 = juego.buscarJugador('jose');
        var ficha3 = juego.buscarJugador('mar');
        expect(ficha1).toBeDefined();
        ficha1.usuario.lanzarDosDados();
        ficha1.quitarPresupuesto(parseInt(ficha1.presupuesto)+50);

        ficha1.usuario.pasarTurno();

        if(ficha1.usuario.estado instanceof modelo.Bancarrota){
        expect(1).toEqual(1);
        }
        else expect(0).toEqual(1);

        ficha2.usuario.lanzarDosDados();
        ficha2.usuario.pasarTurno();

        ficha3.usuario.lanzarDosDados();
        ficha3.usuario.pasarTurno();

        ficha2.usuario.lanzarDosDados();
       

        ficha2.quitarPresupuesto(parseInt(ficha2.presupuesto)+50);
        ficha2.usuario.pasarTurno();
        if(ficha2.usuario.estado instanceof modelo.Bancarrota){
        expect(1).toEqual(1);
        }
        else expect(0).toEqual(1);
        
       

        if(juego.fase instanceof modelo.Final){
        expect(1).toEqual(1);
        }
        else expect(0).toEqual(1);
        expect(juego.mensaje).toEqual('Ha ganado la partida mar');

    })

    it("Eliminar del juego y recuperacion hipotecando",function(){

        juego.iniJuego();
        juego.crearUsuario('pepe');
        juego.crearUsuario('jose');
        juego.empezar();
        ficha1 = juego.buscarJugador('pepe');
        expect(ficha1).toBeDefined();
        juego.tablero.casillas[23].tema.titulo.iniTitulo();
        ficha1.asignarCasilla(juego.tablero.casillas[23]);
        ficha1.usuario.comprarPropiedad();
        ficha1.quitarPresupuesto(parseInt(ficha1.presupuesto)+50);
        
        ficha1.usuario.hipotecarPropiedad(juego.tablero.casillas[23].tema.nombre);
        ficha1.usuario.pasarTurno();
        if(ficha1.usuario.estado instanceof modelo.Bancarrota){
        expect(0).toEqual(1);
        }
        else expect(1).toEqual(1);

    })

    it("Vender propiedad",function(){
        var presupuestoInicial;
        juego.iniJuego();
        juego.crearUsuario('pepe');
        juego.crearUsuario('jose');
        juego.empezar();

        ficha1 = juego.buscarJugador('pepe');
        ficha2 = juego.buscarJugador('jose');
        
        ficha1.usuario.lanzarDosDados();
        ficha1.asignarCasilla(juego.tablero.casillas[1]);
       
        juego.tablero.casillas[1].tema.titulo.iniTitulo();
         
        ficha1.usuario.comprarPropiedad();
        presupuestoInicial=ficha1.presupuesto;
        var propiedad=ficha1.propiedades[0];
        ficha1.propiedades[0].estado= new modelo.Venta(ficha1,100);
        ficha1.propiedades[0].estado.comprar(ficha1.propiedades[0],ficha2);// se vende una propiedad a otro usuario y se comprueba si esta en su lista de propiedades y ha realizado el gasto necesario
        expect(propiedad).toEqual(ficha2.propiedades[0]);
        expect(1400).toEqual(ficha2.presupuesto);
        expect(parseInt(presupuestoInicial)+100).toEqual(ficha1.presupuesto);

    })

    it("Compañias",function(){
        var presupuestoInicial,presupuestoInicial2;
        juego.iniJuego();
        juego.crearUsuario('pepe');
        juego.crearUsuario('jose');
        juego.empezar();

        ficha1 = juego.buscarJugador('pepe');
        ficha2 = juego.buscarJugador('jose');
        
        ficha1.usuario.lanzarDosDados();
        ficha1.asignarCasilla(juego.tablero.casillas[12]);
       
        juego.tablero.casillas[12].tema.titulo.iniTitulo();
         
        ficha1.usuario.comprarPropiedad();

        presupuestoInicial=ficha1.presupuesto;
        var propiedad=ficha1.propiedades[0];
        ficha1.propiedades[0].estado= new modelo.Venta(ficha1,100);
        ficha1.propiedades[0].estado.comprar(ficha1.propiedades[0],ficha2); //se comprueba que la compañia se puede vender adecuadamente
        expect(propiedad).toEqual(ficha2.propiedades[0]);
        
        presupuestoInicial=ficha1.presupuesto;
        presupuestoInicial2=ficha2.presupuesto;
        ficha1.asignarCasilla(juego.tablero.casillas[12]);    
        expect(ficha1.presupuesto).toBeLessThan(presupuestoInicial); //se paga el alquiler

        expect(ficha2.presupuesto).toBeGreaterThan(presupuestoInicial2);


    })

    

   
   
   
})



	/*it("debería resetear el valor de la calculadora",function(){
		cal.actual=20;
		cal.reset();
		expect(cal.actual).toEqual(0);
	});*/
})