describe("Tablero",function(){

	var tab; 
     var juego;
     var usr;
	beforeEach(function(){
		tab = new Tablero(40);
		juego = new Juego();
    usr = new Jugador('pepe',1000);
	});

	describe("Tablero",function(){
		it("Tiene 40 casillas",function(){
               
			expect(tab.dado.calcularNumero()).toBeDefined(); //debe existir la variable
			expect(tab.numeroCasillas).toEqual(40);	 //debe tener valor inicial 0

		});
		it("Estan las calles en el tablero",function(){
		  expect(tab.casillas[0].obtenerTema) instanceof Salida	

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

          expect(tab.casillas[30].obtenerTema().nombre).toEqual('Carcel');

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
		  tab.agregarCasilla(1,new Casilla(1,new Calle('Avenida Espana',1,'marron',1)));
		  expect(tab.obtenerCasilla('Avenida Espana').obtenerTema().nombre).toEqual('Avenida Espana'); 
          tab = new Tablero(40);
		});

   

		it("Comprobar numero dado",function(){
            var valor
             

            
            for(i=0;i<100;i++){
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

            expect(juego.crearUsuario('usuario7')).toEqual('Ya estan todas las fichas asignadas');
            var colores=' ';
            for(i=0;i<6;i++){
               var ficha;

               ficha = juego.buscarJugador('usuario'+i);
               if(ficha!=-1){
               expect(ficha.obtenerUsuario().nombre).toEqual('usuario'+i);
               expect(colores.indexOf(ficha.nombre)).toEqual(-1);
               colores=colores+' '+ficha.nombre;
               expect(juego.buscarJugador('usuario'+i).presupuesto).toEqual(150000);
               }
               else expect(0).toEqual(-1);
            }


          });

           it("Lanzar los dos dados",function(){
               juego.iniJuego();

               juego.crearUsuario('usuario');
               var numeroDado;
               
              juego.buscarJugador('usuario').usuario.volverTirar=1;
               numeroDado=juego.buscarJugador('usuario').obtenerUsuario().lanzarDosDados();
               expect(numeroDado).toBeGreaterThan(1);
               expect(numeroDado).toBeLessThan(13);
             

          });

             it("Se modifica la posicion",function(){
               juego.iniJuego();

               juego.crearUsuario('usuario');
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
               var posicion=0,numeroDado,nuevaCasilla,total;
               
               for(k=0;k<40;k++){
               juego.buscarJugador('usuario').usuario.volverTirar=1;
                 juego.buscarJugador('usuario').obtenerUsuario().lanzarDosDados();

                 if(posicion==juego.buscarJugador('usuario').casilla.posicion)expect(0).toEqual(-1);

                 posicion = juego.buscarJugador('usuario').casilla.posicion;
                 expect(posicion).toBeLessThan(40);
                 expect(posicion).toBeGreaterThan(-1);
               }

          });

           it("Doble",function(){
               juego.iniJuego();

               juego.crearUsuario('usuario');
               var posicion=0,numeroDado,nuevaCasilla,total;
               
               
                 juego.buscarJugador('usuario').usuario.volverTirar=1;

                 posicion=juego.buscarJugador('usuario').obtenerUsuario().lanzarDosDadosManual(6,6);

                 expect(posicion).toEqual(12);

                  posicion=juego.buscarJugador('usuario').obtenerUsuario().lanzarDosDadosManual(6,1);

                 expect(posicion).toEqual(7);

                  posicion=juego.buscarJugador('usuario').obtenerUsuario().lanzarDosDados();

                 expect(posicion).toEqual('No se puede tirar');

               


          });

            it(" Tres Dobles",function(){
               juego.iniJuego();

               juego.crearUsuario('usuario');
               var posicion=0,numeroDado,nuevaCasilla,total;
               
               
                 juego.buscarJugador('usuario').usuario.volverTirar=1;

                 posicion=juego.buscarJugador('usuario').obtenerUsuario().lanzarDosDadosManual(6,6);

                 expect(posicion).toEqual(12);

                  posicion=juego.buscarJugador('usuario').obtenerUsuario().lanzarDosDadosManual(6,6);

                 expect(posicion).toEqual(12);

                 posicion=juego.buscarJugador('usuario').obtenerUsuario().lanzarDosDadosManual(6,6);

                 expect(posicion).toEqual(12);

                 expect(juego.buscarJugador('usuario').casilla.tema.nombre).toEqual('Carcel');

                  posicion=juego.buscarJugador('usuario').obtenerUsuario().lanzarDosDados();

                 expect(posicion).toEqual('No se puede tirar');
               


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



	/*it("debería resetear el valor de la calculadora",function(){
		cal.actual=20;
		cal.reset();
		expect(cal.actual).toEqual(0);
	});*/
})