/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package prueba.practica.pkg2;

import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseEvent;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.awt.font.TextAttribute;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.swing.*;
import javax.swing.UIManager.LookAndFeelInfo;
import javax.swing.border.Border;
import javax.swing.border.LineBorder;
import prueba.jcp.*;
/*import maps.java.MapsJava;
import maps.java.Places;
import maps.java.Route;
import maps.java.StaticMaps;
import wiiusej.WiiUseApiManager;
import wiiusej.Wiimote;
import wiiusej.wiiusejevents.physicalevents.ExpansionEvent;
import wiiusej.wiiusejevents.physicalevents.IREvent;
import wiiusej.wiiusejevents.physicalevents.MotionSensingEvent;
import wiiusej.wiiusejevents.physicalevents.WiimoteButtonsEvent;
import wiiusej.wiiusejevents.utils.WiimoteListener;
import wiiusej.wiiusejevents.wiiuseapievents.ClassicControllerInsertedEvent;
import wiiusej.wiiusejevents.wiiuseapievents.ClassicControllerRemovedEvent;
import wiiusej.wiiusejevents.wiiuseapievents.DisconnectionEvent;
import wiiusej.wiiusejevents.wiiuseapievents.GuitarHeroInsertedEvent;
import wiiusej.wiiusejevents.wiiuseapievents.GuitarHeroRemovedEvent;
import wiiusej.wiiusejevents.wiiuseapievents.NunchukInsertedEvent;
import wiiusej.wiiusejevents.wiiuseapievents.NunchukRemovedEvent;
import wiiusej.wiiusejevents.wiiuseapievents.StatusEvent;*/

//import maps.java.StaticMaps;
/**
 *
 * @author USUARIO
 */
public class EntradaPanel extends JPanel implements ActionListener{

    JFrame ventana = new JFrame();
    private JLabel nombreT, apodoT, contrasenaT, confcontrasenaT, email, mapa, info;
    private JTextField texto, ruta, etiqueta;
    private JButton boton, notificacion, pruebaMensaje, volver;
    private JButton boton2, noinicio, registro, registrarse, regConfirma, regVolver, hacerRuta, calcularRuta;
    private JTextField texto2;
    private JTextField texto3, nombre, apodo, contrasena, confcontrasena, regemail, origen, destino, correo;
    private static int contador = 0;
    private JButton boton3, camara, pcamara, foto, volver2, informacion, hacerfoto;
    private JList area, ayudaArea;
    DefaultListModel modelo;
    DefaultListModel ayudaModelo;
    private JScrollPane pane,ayudaPane;
    private boolean wiiactivada = true;
//    private JMyron Myron = new JMyron ();
   // StaticMaps ObjStatMap = new StaticMaps();

    private JMenuBar barra1;
    private JMenu menu1, item2, menu2, simular;
    private JMenu principal, mandoWii;
    private JMenuItem calcular1, cerrarSesion, camara1, activarWii, desactivarWii, configuracionWii, ayudaWii, buscarWiiRemote;
    private JMenuItem item1, item3, item4, item5, activar, desactivar, hacia_delante, agitar, bocaAbajo;
    Image resultadoMapa = null;
    private JTextField aviso;
    boolean giroscopio = true;
    ImageIcon fond = new ImageIcon(this.getClass().getResource("albacete.jpg"));
    boolean wiiRemote = true;
    private JPopupMenu g;
    private JTextArea text = null;
   // private Wiimote wiimote = null;
    boolean activarWiiRe = true;

    public EntradaPanel() throws InterruptedException {

        Border negro = new LineBorder(Color.BLACK, 1);
       // MapsJava.setSensor(Boolean.TRUE);
        setLayout(null);

        modelo = new DefaultListModel();
        area = new JList(modelo);

        area.setEnabled(false);
        pane = new JScrollPane(area);
        pane.setBounds(200, 100, 500, 300);
        add(pane);
        pane.setVisible(false);

        noinicio = new JButton("Entrar sin iniciar sesion");
        noinicio.setBounds(200, 400, 250, 30);
        noinicio.setBackground(Color.lightGray);
        add(noinicio);

        pruebaMensaje = new JButton("Probar mensajes");
        pruebaMensaje.setBounds(200, 400, 250, 30);
        pruebaMensaje.setVisible(false);
        pruebaMensaje.setBackground(Color.lightGray);
        add(pruebaMensaje);

        modelo = new DefaultListModel();
        area = new JList(modelo);

        area.setEnabled(false);
        pane = new JScrollPane(area);
        pane.setBounds(100, 100, 550, 300);
        add(pane);
        pane.setVisible(false);

        etiqueta = new JTextField("Lugares de interes");
        etiqueta.setBounds(1, 30, 200, 30);
        etiqueta.setBackground(Color.cyan);
        etiqueta.setForeground(Color.RED);
        add(etiqueta, BorderLayout.LINE_START);
        etiqueta.setVisible(false);

        texto = new JTextField("");
        texto.setBounds(201, 20, 430, 40);
        add(texto);
        texto.setVisible(false);

        hacerRuta = new JButton("Ruta");
        hacerRuta.setBounds(620, 100, 90, 40);
        add(hacerRuta);
        hacerRuta.setVisible(false);

        camara = new JButton("Camara");
        camara.setBounds(620, 150, 90, 40);
        add(camara);
        camara.setVisible(false);
        
        pcamara = new JButton("PruebaCamara");
        pcamara.setBounds(620, 200, 90, 40);
        add(pcamara);
        pcamara.setVisible(false);

        hacerfoto = new JButton("Foto");
        hacerfoto.setBounds(620, 100, 90, 40);
        add(hacerfoto);
        hacerfoto.setVisible(false);

        informacion = new JButton("Info");
        informacion.setBounds(620, 150, 90, 40);
        add(informacion);
        informacion.setVisible(false);

        volver2 = new JButton("Volver");
        volver2.setBounds(620, 200, 90, 40);
        add(volver2);
        volver2.setVisible(false);

        info = new JLabel("");
        info.setBounds(190, 330, 180, 200);
        add(info);

        info.setVisible(false);

        origen = new JTextField("Origen");
        origen.setBounds(100, 20, 200, 30);
        add(origen);
        origen.setVisible(false);

        destino = new JTextField("Destino");
        destino.setBounds(100, 60, 200, 30);
        add(destino);
        destino.setVisible(false);

        texto2 = new JTextField("Nombre de usuario");
        texto2.setBounds(200, 100, 250, 30);
        add(texto2);

        texto3 = new JTextField("Contraseña");
        texto3.setBounds(200, 150, 250, 30);
        add(texto3);

        boton3 = new JButton("Iniciar Sesion");
        boton3.setBounds(200, 200, 250, 30);
        boton3.setBackground(Color.lightGray);
        add(boton3);

        registro = new JButton("Registrarse");
        registro.setBounds(200, 250, 250, 30);
        registro.setBackground(Color.lightGray);
        add(registro);

        mapa = new JLabel();
        mapa.setBounds(200, 100, 500, 300);
        add(mapa);
        mapa.setVisible(false);

        calcularRuta = new JButton("Calcular");
        calcularRuta.setBackground(Color.white);
        calcularRuta.setBounds(620, 20, 90, 40);
        add(calcularRuta);
        calcularRuta.setVisible(false);

        final ImageIcon lupa = new ImageIcon(this.getClass().getResource("lupa.jpg"));
        boton = new JButton();
        boton.setBackground(Color.white);
        boton.setBounds(620, 20, 90, 40);
        boton.setIcon(lupa);
        add(boton);
        boton.setVisible(false);

        volver = new JButton("Volver");
        volver.setBounds(710, 20, 70, 40);
        volver.setBackground(Color.lightGray);
        add(volver);
        volver.setVisible(false);

        aviso = new JTextField("Mensaje Recibido ");
        aviso.setBounds(600, 410, 130, 50);
        add(aviso);
        aviso.setBackground(Color.yellow);
        aviso.setForeground(Color.red);
        aviso.setVisible(false);
        aviso.setEditable(false);

        final ImageIcon sobre = new ImageIcon(this.getClass().getResource("images.jpg"));
        notificacion = new JButton();
        notificacion.setBounds(725, 410, 55, 50);
        notificacion.setIcon(sobre);
        add(notificacion);
        notificacion.setVisible(false);

        final ImageIcon ayu = new ImageIcon(this.getClass().getResource("ayuntamiento.jpg"));
        foto = new JButton();
        foto.setBounds(50, 50, 500, 400);
        foto.setIcon(ayu);
        add(foto);
        foto.setVisible(false);

        barra1 = new JMenuBar();
        barra1.setBounds(1, 1, 150, 20);
        add(barra1);
        barra1.setBackground(Color.WHITE);
        barra1.setBorder(negro);

        menu2 = new JMenu("Giroscopio");

        activar = new JMenuItem("Activar");
        menu2.add(activar);

        desactivar = new JMenuItem("Desactivar");
        menu2.add(desactivar);

        simular = new JMenu("Simula");
        menu2.add(simular);

        hacia_delante = new JMenuItem("Hacia adelante");
        simular.add(hacia_delante);

        agitar = new JMenuItem("Agitar");
        simular.add(agitar);

        bocaAbajo = new JMenuItem("Boca abajo");
        simular.add(bocaAbajo);

        menu1 = new JMenu("Daltonicos");
        // barra1.add(menu1);
        menu1.setToolTipText("Elija entre las distintas tonailidades la que mas se adapte a su daltonismo");
        menu1.setBackground(Color.WHITE);

        item1 = new JMenuItem("Blanco y negro");
        menu1.add(item1);
        item1.setToolTipText("Esta tonalidad servira para cualquier tipo de daltonismo");
        item1.setBackground(Color.WHITE);

        item2 = new JMenu("Paleta monocromatica");
        menu1.add(item2);
        item2.setBackground(Color.WHITE);

        item3 = new JMenuItem("Azul");
        item2.add(item3);
        item3.setBackground(Color.WHITE);

        item4 = new JMenuItem("Gris");
        item2.add(item4);
        item4.setBackground(Color.WHITE);

        item5 = new JMenuItem("Volver al original");
        menu1.add(item5);
        item5.setBackground(Color.WHITE);

        nombre = new JTextField("");
        nombre.setBounds(300, 100, 200, 30);
        add(nombre);
        nombre.setVisible(false);

        regemail = new JTextField("");
        regemail.setBounds(300, 200, 200, 30);
        add(regemail);
        regemail.setVisible(false);

        apodo = new JTextField("");
        apodo.setBounds(300, 150, 200, 30);
        add(apodo);
        apodo.setVisible(false);

        contrasena = new JTextField("");
        contrasena.setBounds(300, 250, 200, 30);
        add(contrasena);
        contrasena.setVisible(false);

        confcontrasena = new JTextField("");
        confcontrasena.setBounds(300, 300, 200, 30);
        add(confcontrasena);
        confcontrasena.setVisible(false);

        nombreT = new JLabel("Nombre");
        Font font = nombreT.getFont();
        Map attributes = font.getAttributes();
        attributes.put(TextAttribute.UNDERLINE, TextAttribute.UNDERLINE_ON);
        nombreT.setFont(font.deriveFont(attributes));
        nombreT.setBounds(150, 100, 100, 30);
        add(nombreT);
        nombreT.setForeground(Color.BLACK);
        nombreT.setFont(new java.awt.Font("Tahoma", 0, 18));
        nombreT.setVisible(false);

        apodoT = new JLabel("Usuario");
        Font font2 = apodoT.getFont();
        Map attributes2 = font2.getAttributes();
        attributes2.put(TextAttribute.UNDERLINE, TextAttribute.UNDERLINE_ON);
        apodoT.setFont(font.deriveFont(attributes2));
        apodoT.setBounds(150, 150, 100, 30);
        add(apodoT);
        apodoT.setForeground(Color.black);
        apodoT.setFont(new java.awt.Font("Tahoma", 0, 18));
        apodoT.setVisible(false);

        email = new JLabel("Email");
        Font font3 = email.getFont();
        Map attributes3 = font3.getAttributes();
        attributes3.put(TextAttribute.UNDERLINE, TextAttribute.UNDERLINE_ON);
        email.setFont(font.deriveFont(attributes3));
        email.setBounds(150, 200, 100, 30);
        add(email);
        email.setForeground(Color.black);
        email.setFont(new java.awt.Font("Tahoma", 0, 18));
        email.setVisible(false);

        contrasenaT = new JLabel("Contraseña");
        Font font4 = contrasenaT.getFont();
        Map attributes4 = font4.getAttributes();
        attributes4.put(TextAttribute.UNDERLINE, TextAttribute.UNDERLINE_ON);
        contrasenaT.setFont(font.deriveFont(attributes3));
        contrasenaT.setBounds(150, 250, 100, 30);
        add(contrasenaT);
        contrasenaT.setForeground(Color.black);
        contrasenaT.setFont(new java.awt.Font("Tahoma", 0, 18));
        contrasenaT.setVisible(false);

        confcontrasenaT = new JLabel("Conf. contraseña");
        Font font5 = confcontrasenaT.getFont();
        Map attributes5 = font5.getAttributes();
        attributes5.put(TextAttribute.UNDERLINE, TextAttribute.UNDERLINE_ON);
        confcontrasenaT.setFont(font.deriveFont(attributes3));
        confcontrasenaT.setBounds(150, 300, 150, 30);
        add(confcontrasenaT);
        confcontrasenaT.setVisible(false);
        confcontrasenaT.setForeground(Color.black);
        confcontrasenaT.setFont(new java.awt.Font("Tahoma", 0, 18));
        confcontrasenaT.setBackground(Color.WHITE);

        correo = new JTextField("E-mail");
        correo.setBounds(200, 250, 250, 30);
        add(correo);
        correo.setVisible(false);

        regConfirma = new JButton("Confirmar");
        regConfirma.setBounds(200, 350, 120, 30);
        add(regConfirma);
        regConfirma.setVisible(false);

        regVolver = new JButton("Cancelar");
        regVolver.setBounds(350, 350, 120, 30);
        add(regVolver);
        regVolver.setVisible(false);

        principal = new JMenu("Principal");
        principal.addSeparator();
        barra1.add(principal);
        principal.add(menu2);

        principal.add(menu1);

        camara1 = new JMenuItem("Camara");
        principal.add(camara1);

        mandoWii = new JMenu("Wii remote");
        principal.add(mandoWii);

        calcular1 = new JMenuItem("Calcular Ruta");
        principal.add(calcular1);
       //boton.setVisible(true);

        activarWii = new JMenuItem("Activar");
        activarWii.setToolTipText("Active los controles del Wii Remote");
        mandoWii.add(activarWii);

        desactivarWii = new JMenuItem("Desactivar");
        desactivarWii.setToolTipText("Desactivar los controles del Wii Remote");
        mandoWii.add(desactivarWii);


        ayudaWii = new JMenuItem("Ayuda");
        mandoWii.add(ayudaWii);

        buscarWiiRemote = new JMenuItem("Buscar wii remote");
        mandoWii.add(buscarWiiRemote);

        cerrarSesion = new JMenuItem("Salir");
        principal.add(cerrarSesion);

        try {
            for (LookAndFeelInfo info : UIManager.getInstalledLookAndFeels()) {
                if ("Nimbus".equals(info.getName())) {
                    UIManager.setLookAndFeel(info.getClassName());
                    break;
                }
            }
        } catch (UnsupportedLookAndFeelException e) {
    // handle exception
        } catch (ClassNotFoundException e) {
    // handle exception
        } catch (InstantiationException e) {
    // handle exception
        } catch (IllegalAccessException e) {
    // handle exception
        }

      /*  buscarWiiRemote.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent ae) {

                ventana.setVisible(true);
                ventana.setSize(320, 320);
                ventana.setTitle("Buscar Wii Remote");

                text = new JTextArea();

                System.setProperty("bluecove.jsr82.psm_minimum_off", "true");
                onSearchWiimote();

            }
        });*/

        activarWii.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent ae) {

                wiiactivada = true;

            }
        });

        desactivarWii.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent ae) {

                wiiactivada = false;

            }
        });

      /*  boton.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent ae) {

                try {
                    resultadoMapa = ObjStatMap.getStaticMap(texto.getText(), 14, new Dimension(301, 300), 1, StaticMaps.Format.jpg, StaticMaps.Maptype.roadmap);

                } catch (MalformedURLException ex) {
                    Logger.getLogger(EntradaPanel.class.getName()).log(Level.SEVERE, null, ex);
                } catch (UnsupportedEncodingException ex) {
                    Logger.getLogger(EntradaPanel.class.getName()).log(Level.SEVERE, null, ex);
                }
                ImageIcon google = new ImageIcon(resultadoMapa);
                mapa.setIcon(google);
                mapa.setVisible(true);

            }
        });*/

        noinicio.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent ae) {

                boton.setVisible(true);
                noinicio.setVisible(false);
                pruebaMensaje.setVisible(true);
                volver.setVisible(true);
                etiqueta.setVisible(true);
                texto.setVisible(true);
                texto3.setVisible(false);
                texto2.setVisible(false);
                boton3.setVisible(false);
                registro.setVisible(false);
               // hacerRuta.setVisible(true);
               // camara.setVisible(true);
              //  pcamara.setVisible(true);

            }
        });

       /* calcularRuta.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent ae) {

                modelo.clear();
                try {

                    Route ObjRout = new Route();
                    String[][] resultadoRuta = ObjRout.getRoute(origen.getText(), destino.getText(), null, Boolean.TRUE, Route.mode.driving, Route.avoids.nothing);
                    for (int i = 0; i < resultadoRuta.length; i++) {
                        modelo.addElement("Tramo " + i + ":");
                        for (int j = 0; j < resultadoRuta[0].length; j++) {
                            modelo.addElement((resultadoRuta[i][j] + "\t"));

                        }
                        modelo.addElement("\n");
                    }
                } catch (UnsupportedEncodingException ex) {
                    Logger.getLogger(EntradaPanel.class.getName()).log(Level.SEVERE, null, ex);
                } catch (MalformedURLException ex) {
                    Logger.getLogger(EntradaPanel.class.getName()).log(Level.SEVERE, null, ex);
                }

            }
        });*/

        hacerRuta.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent ae) {

                boton.setVisible(false);
                noinicio.setVisible(false);
                pruebaMensaje.setVisible(false);
                volver.setVisible(false);
                etiqueta.setVisible(false);
                texto.setVisible(false);
                texto3.setVisible(false);
                texto2.setVisible(false);
                boton3.setVisible(false);
                registro.setVisible(false);
                hacerRuta.setVisible(false);
                calcularRuta.setVisible(true);
                origen.setVisible(true);
                destino.setVisible(true);
                pane.setVisible(true);
                camara.setVisible(false);
                pcamara.setVisible(false);

            }
        });

        registro.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent ae) {

                registro.setVisible(false);
                noinicio.setVisible(false);
                texto3.setVisible(false);
                texto2.setVisible(false);
                boton3.setVisible(false);

                nombre.setVisible(true);
                apodo.setVisible(true);
                contrasena.setVisible(true);
                confcontrasena.setVisible(true);
                nombreT.setVisible(true);
                apodoT.setVisible(true);
                contrasenaT.setVisible(true);
                confcontrasenaT.setVisible(true);
                //registrarse.setVisible(true);  
                regVolver.setVisible(true);
                regConfirma.setVisible(true);
                email.setVisible(true);
                regemail.setVisible(true);

            }
        });

        regConfirma.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent ae) {
                boolean aux = false;
                int aux2 = 0;

                String texto = nombre.getText();
                if ("".equals(texto)) {
                    aux = false;
                } else {
                    aux2++;
                }

                texto = apodo.getText();
                if ("".equals(texto)) {
                    aux = false;
                } else {
                    aux2++;
                }

                texto = contrasena.getText();
                if ("".equals(texto)) {
                    aux = false;
                } else {
                    aux2++;
                }

                texto = confcontrasena.getText();
                if ("".equals(texto)) {
                    aux = false;
                } else {
                    aux2++;
                }

                texto = email.getText();
                if ("".equals(texto)) {
                    aux = false;
                } else {
                    aux2++;
                }

                if (aux2 == 5) {
                    aux = true;
                }
                if (aux) {
                    registro.setVisible(true);
                    noinicio.setVisible(true);
                    texto3.setVisible(true);
                    texto2.setVisible(true);
                    boton3.setVisible(true);

                    nombre.setVisible(false);
                    apodo.setVisible(false);
                    contrasena.setVisible(false);
                    confcontrasena.setVisible(false);
                    nombreT.setVisible(false);
                    apodoT.setVisible(false);
                    contrasenaT.setVisible(false);
                    confcontrasenaT.setVisible(false);
                    //registrarse.setVisible(true);  
                    regVolver.setVisible(false);
                    regConfirma.setVisible(false);
                    email.setVisible(false);
                    regemail.setVisible(false);
                    JOptionPane.showMessageDialog(null, "Registro finalizado");
                } else {
                    JOptionPane.showMessageDialog(null, "Datos erroneos");
                }
            }
        });

        regVolver.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent ae) {

                registro.setVisible(true);
                noinicio.setVisible(true);
                texto3.setVisible(true);
                texto2.setVisible(true);
                boton3.setVisible(true);

                nombre.setVisible(false);
                apodo.setVisible(false);
                contrasena.setVisible(false);
                confcontrasena.setVisible(false);
                nombreT.setVisible(false);
                apodoT.setVisible(false);
                contrasenaT.setVisible(false);
                confcontrasenaT.setVisible(false);
                //registrarse.setVisible(true);  
                regVolver.setVisible(false);
                regConfirma.setVisible(false);
                email.setVisible(false);
                regemail.setVisible(false);

            }
        });

        item1.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent ae) {

                boton.setIcon(null);
                boton.setText("Buscar");
                boton.setBackground(Color.BLACK);
                boton.setForeground(Color.white);
                etiqueta.setBackground(Color.BLACK);
                etiqueta.setForeground(Color.white);
                setBackground(Color.WHITE);
                registro.setBackground(Color.BLACK);
                registro.setForeground(Color.white);
                boton3.setBackground(Color.BLACK);
                boton3.setForeground(Color.white);
                noinicio.setBackground(Color.BLACK);
                noinicio.setForeground(Color.white);
                aviso.setBackground(Color.BLACK);
                aviso.setForeground(Color.white);
                notificacion.setBackground(Color.BLACK);
                notificacion.setForeground(Color.white);
                pruebaMensaje.setBackground(Color.BLACK);
                pruebaMensaje.setForeground(Color.white);
                volver.setBackground(Color.BLACK);
                volver.setForeground(Color.white);
                notificacion.setIcon(null);
                notificacion.setText("Ir");
                notificacion.setForeground(Color.WHITE);
                notificacion.setBackground(Color.BLACK);
            }
        });

        item3.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent ae) {
                boton.setIcon(null);
                boton.setText("Buscar");
                boton.setBackground(Color.blue);
                boton.setForeground(Color.cyan);
                setBackground(Color.cyan);
                registro.setBackground(Color.BLUE);
                registro.setForeground(Color.cyan);
                boton3.setBackground(Color.blue);
                boton3.setForeground(Color.cyan);
                noinicio.setBackground(Color.blue);
                noinicio.setForeground(Color.cyan);
                aviso.setBackground(Color.blue);
                aviso.setForeground(Color.cyan);
                notificacion.setBackground(Color.blue);
                notificacion.setForeground(Color.cyan);
                volver.setBackground(Color.blue);
                volver.setForeground(Color.cyan);
                pruebaMensaje.setBackground(Color.blue);
                pruebaMensaje.setForeground(Color.cyan);
                etiqueta.setBackground(Color.blue);
                etiqueta.setForeground(Color.cyan);
                notificacion.setIcon(null);
                notificacion.setText("Ir");
                notificacion.setForeground(Color.CYAN);
                notificacion.setBackground(Color.BLUE);
            }
        });
        item4.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent ae) {
                boton.setIcon(null);
                boton.setText("Buscar");
                boton.setBackground(Color.gray);
                boton.setForeground(Color.darkGray);
                setBackground(Color.lightGray);
                registro.setBackground(Color.gray);
                registro.setForeground(Color.darkGray);
                boton3.setBackground(Color.gray);
                boton3.setForeground(Color.darkGray);
                noinicio.setBackground(Color.gray);
                noinicio.setForeground(Color.darkGray);
                aviso.setBackground(Color.gray);
                aviso.setForeground(Color.darkGray);
                notificacion.setBackground(Color.gray);
                notificacion.setForeground(Color.darkGray);
                volver.setBackground(Color.gray);
                volver.setForeground(Color.darkGray);
                pruebaMensaje.setBackground(Color.gray);
                pruebaMensaje.setForeground(Color.darkGray);
                etiqueta.setBackground(Color.gray);
                etiqueta.setForeground(Color.darkGray);
                notificacion.setIcon(null);
                notificacion.setText("Ir");
                notificacion.setForeground(Color.darkGray);
                notificacion.setBackground(Color.GRAY);
            }
        });

        item5.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent ae) {

                boton.setText(null);
                boton.setBackground(Color.WHITE);
                boton.setIcon(lupa);

                setBackground(Color.lightGray);
                registro.setBackground(Color.LIGHT_GRAY);
                registro.setForeground(Color.BLACK);
                boton3.setBackground(Color.LIGHT_GRAY);
                boton3.setForeground(Color.BLACK);
                noinicio.setBackground(Color.LIGHT_GRAY);
                noinicio.setForeground(Color.BLACK);
                aviso.setBackground(Color.yellow);
                aviso.setForeground(Color.RED);
                registro.setBackground(Color.LIGHT_GRAY);
                registro.setForeground(Color.BLACK);
                volver.setBackground(Color.lightGray);
                volver.setForeground(Color.BLACK);
                pruebaMensaje.setBackground(Color.lightGray);
                pruebaMensaje.setForeground(Color.BLACK);
                etiqueta.setBackground(Color.cyan);
                etiqueta.setForeground(Color.red);
                notificacion.setIcon(sobre);
                notificacion.setText(null);
                notificacion.setForeground(null);
                notificacion.setBackground(null);

            }
        });

        pruebaMensaje.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent ae) {
                try {
                    Thread.sleep(2000);
                } catch (InterruptedException ex) {
                    Logger.getLogger(EntradaPanel.class.getName()).log(Level.SEVERE, null, ex);
                }

                notificacion.setVisible(true);
                aviso.setVisible(true);

                Toolkit.getDefaultToolkit().beep();
            }
        });

        pruebaMensaje.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent ae) {
                try {
                    Thread.sleep(2000);
                } catch (InterruptedException ex) {
                    Logger.getLogger(EntradaPanel.class.getName()).log(Level.SEVERE, null, ex);
                }

                notificacion.setVisible(true);
                aviso.setVisible(true);

                Toolkit.getDefaultToolkit().beep();
            }
        });

        notificacion.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent ae) {

                notificacion.setVisible(false);
                aviso.setVisible(false);

            }
        });

        camara.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent ae) {

                if (giroscopio) {
                    JCP j = new JCP();
                }

            }
        });

        pcamara.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent ae) {

                if (giroscopio) {

                    boton.setVisible(false);
                    noinicio.setVisible(false);
                    pruebaMensaje.setVisible(false);
                    volver.setVisible(false);
                    etiqueta.setVisible(false);
                    texto.setVisible(false);
                    texto3.setVisible(false);
                    texto2.setVisible(false);
                    boton3.setVisible(false);
                    registro.setVisible(false);
                    hacerRuta.setVisible(false);
                    calcularRuta.setVisible(false);
                    origen.setVisible(false);
                    destino.setVisible(false);
                    pane.setVisible(false);
                    camara.setVisible(false);
                    pcamara.setVisible(false);
                    foto.setVisible(true);
                    volver2.setVisible(true);
                    informacion.setVisible(true);
                    hacerfoto.setVisible(true);
                    info.setVisible(false);

                }

            }
        });

        volver2.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent ae) {

                boton.setVisible(true);
                noinicio.setVisible(false);
                pruebaMensaje.setVisible(true);
                volver.setVisible(true);
                etiqueta.setVisible(true);
                texto.setVisible(true);
                texto3.setVisible(false);
                texto2.setVisible(false);
                boton3.setVisible(false);
                registro.setVisible(false);
                hacerRuta.setVisible(true);
                camara.setVisible(true);
                pcamara.setVisible(true);
                foto.setVisible(false);
                volver2.setVisible(false);
                informacion.setVisible(false);
                hacerfoto.setVisible(false);
                info.setVisible(false);
            }
        });

        informacion.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent ae) {

                info.setText("- Ayuntamiento Albacete");
                info.setForeground(Color.white);
                info.setVisible(true);

            }
        });

        hacia_delante.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent ae) {

                if (giroscopio) {
                    boton.doClick();
                }

            }
        });

        agitar.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent ae) {

                if (giroscopio) {
                    texto.setText("");
                }

            }

        });

        bocaAbajo.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent ae) {

                if (giroscopio) {
                    System.exit(0);
                }

            }

        });

        activar.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent ae) {

                giroscopio = true;

            }

        });
         ayudaWii.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent ae) {
               JDialog ayud = new JDialog();
               
               ayud.setTitle("Ayuda Wii Remote");

        ayudaModelo = new DefaultListModel();
        ayudaArea = new JList(ayudaModelo);

        ayudaArea.setEnabled(false);
        ayudaPane = new JScrollPane(ayudaArea);
        ayudaPane.setBounds(0,0,450,200);
        ayud.add(ayudaPane);
        ayudaPane.setVisible(true);
        ayudaModelo.addElement("Mover el mando rapidamente hacial un lado:    Borrar el contenido de todos los campos");
        ayudaModelo.addElement("Poner boca abajo el mando:    Salir de la aplicacion");
        ayudaModelo.addElement("Pulsar botones + y -:      Cambiar entre estilos de daltonismo");
        ayudaModelo.addElement("Pulsar el botn B:    Estilo original");
        ayudaModelo.addElement("Pulsar boton 1 o 2:  Buscar localizacion");
     
            
              ayud.setSize(470,250);
              ayud.add(informacion);
              ayud.setVisible(true);
              
              

            }

        });
           
        activarWii.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent ae) {

                activarWiiRe = true;

            }

        });
        desactivarWii.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent ae) {

                activarWiiRe = false;

            }

        });
        desactivar.addActionListener(new ActionListener() {

            @Override
            public void actionPerformed(ActionEvent ae) {

                giroscopio = false;

            }

        });

    }

    private void showPopupMenu(MouseEvent e) {
        g.show(this, e.getX(), e.getY());
    }

	@Override
	public void actionPerformed(ActionEvent e) {
		// TODO Auto-generated method stub
		
	}

    /*protected void onSearchWiimote() {

        text.setText("Searching for a wiimote ... press buttons 1 and 2 ...");
        JScrollPane scroll = new JScrollPane(text);
        scroll.setBounds(0, 0, 0, 0);
        ventana.add(scroll);
        try {
			// @param	Int		- The count of Wiimotes to searach.
            // @param	Boolean	- True rumble on connect.

            Wiimote[] wiimotes = WiiUseApiManager.getWiimotes(1, true);

            wiimote = wiimotes[0];
            wiimote.activateIRTRacking();
            wiimote.activateMotionSensing();
            wiimote.addWiiMoteEventListeners(this);

            text.setText("I found to " + wiimote.getId());
        } catch (Exception e) {
            text.setText(e.getMessage());
            text.setText("Failed to connect remote. Trying again.");
        }

    }*/

 /*   @Override
    public void actionPerformed(ActionEvent ae) {
        String sel = ae.getActionCommand();

        if (sel == "search") {
            onSearchWiimote();
        }
    }*/

  /*  @Override
    public void onButtonsEvent(WiimoteButtonsEvent wbe) {
        if (activarWiiRe) {
            if (wbe.isButtonMinusPressed()) {

                boton.setIcon(null);
                boton.setText("Buscar");
                boton.setBackground(Color.BLACK);
                boton.setForeground(Color.white);
                etiqueta.setBackground(Color.BLACK);
                etiqueta.setForeground(Color.white);
                setBackground(Color.WHITE);
                registro.setBackground(Color.BLACK);
                registro.setForeground(Color.white);
                boton3.setBackground(Color.BLACK);
                boton3.setForeground(Color.white);
                noinicio.setBackground(Color.BLACK);
                noinicio.setForeground(Color.white);
                aviso.setBackground(Color.BLACK);
                aviso.setForeground(Color.white);
                notificacion.setBackground(Color.BLACK);
                notificacion.setForeground(Color.white);
                pruebaMensaje.setBackground(Color.BLACK);
                pruebaMensaje.setForeground(Color.white);
                volver.setBackground(Color.BLACK);
                volver.setForeground(Color.white);
                notificacion.setIcon(null);
                notificacion.setText("Ir");
                notificacion.setForeground(Color.WHITE);
                notificacion.setBackground(Color.BLACK);

            }

            if (wbe.isButtonPlusPressed()) {

                boton.setIcon(null);
                boton.setText("Buscar");
                boton.setBackground(Color.blue);
                boton.setForeground(Color.cyan);
                setBackground(Color.cyan);
                registro.setBackground(Color.BLUE);
                registro.setForeground(Color.cyan);
                boton3.setBackground(Color.blue);
                boton3.setForeground(Color.cyan);
                noinicio.setBackground(Color.blue);
                noinicio.setForeground(Color.cyan);
                aviso.setBackground(Color.blue);
                aviso.setForeground(Color.cyan);
                notificacion.setBackground(Color.blue);
                notificacion.setForeground(Color.cyan);
                volver.setBackground(Color.blue);
                volver.setForeground(Color.cyan);
                pruebaMensaje.setBackground(Color.blue);
                pruebaMensaje.setForeground(Color.cyan);
                etiqueta.setBackground(Color.blue);
                etiqueta.setForeground(Color.cyan);
                notificacion.setIcon(null);
                notificacion.setText("Ir");
                notificacion.setForeground(Color.CYAN);
                notificacion.setBackground(Color.BLUE);

            }

            if (wbe.isButtonTwoPressed()) {

                try {
                    resultadoMapa = ObjStatMap.getStaticMap(texto.getText(), 14, new Dimension(301, 300), 1, StaticMaps.Format.jpg, StaticMaps.Maptype.roadmap);

                } catch (MalformedURLException ex) {
                    Logger.getLogger(EntradaPanel.class.getName()).log(Level.SEVERE, null, ex);
                } catch (UnsupportedEncodingException ex) {
                    Logger.getLogger(EntradaPanel.class.getName()).log(Level.SEVERE, null, ex);
                }
                ImageIcon google = new ImageIcon(resultadoMapa);
                mapa.setIcon(google);
                mapa.setVisible(true);

            }

            if (wbe.isButtonOnePressed()) {
                modelo.clear();
                try {

                    Route ObjRout = new Route();
                    String[][] resultadoRuta = ObjRout.getRoute(origen.getText(), destino.getText(), null, Boolean.TRUE, Route.mode.driving, Route.avoids.nothing);
                    for (int i = 0; i < resultadoRuta.length; i++) {
                        modelo.addElement("Tramo " + i + ":");
                        for (int j = 0; j < resultadoRuta[0].length; j++) {
                            modelo.addElement((resultadoRuta[i][j] + "\t"));

                        }
                        modelo.addElement("\n");
                    }
                } catch (UnsupportedEncodingException ex) {
                    Logger.getLogger(EntradaPanel.class.getName()).log(Level.SEVERE, null, ex);
                } catch (MalformedURLException ex) {
                    Logger.getLogger(EntradaPanel.class.getName()).log(Level.SEVERE, null, ex);
                }

            }

            if (wbe.isButtonBPressed()) {
                item5.doClick();
            }
        }
        // throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }*/

  

  /* @Override
    public void onMotionSensingEvent(MotionSensingEvent mse) {
        // System.out.println("x:"+mse.getRawAcceleration().getX()+" y:"+mse.getRawAcceleration().getY()+" z:"+mse.getRawAcceleration().getZ());
        if (activarWiiRe) {
            if (wiiactivada && mse.getRawAcceleration().getY() == 130 && mse.getRawAcceleration().getZ() == 106) {
                System.exit(0);
            }
            if (wiiactivada && mse.getRawAcceleration().getX() >= 1 && mse.getRawAcceleration().getX() <= 90) {
                texto.setText("");
                apodo.setText("");
                contrasena.setText("");
                confcontrasena.setText("");

                nombre.setText("");
                apodo.setText("");
                regemail.setText("");
                origen.setText("");
                destino.setText("");
                texto3.setText("");
                correo.setText("");
                texto2.setText("");
            }
        }
    }*/

   

}
