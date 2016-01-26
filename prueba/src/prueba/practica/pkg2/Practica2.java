/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package prueba.practica.pkg2;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Component;
import javax.swing.JFrame;
import javax.swing.JPanel;

/**
 *
 */
public class Practica2 extends JFrame{

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) throws InterruptedException  {
        // TODO code application logic here
          // TODO code application logic here
       
        JFrame aplicacion=new JFrame();
        
        EntradaPanel db=new EntradaPanel();
        
     
        aplicacion.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        aplicacion.add(db);
        
        aplicacion.setSize(800,500);
        aplicacion.setVisible(true);
        aplicacion.setTitle("Turismo Albacete");
        db.setOpaque(false);
     Component contents = createExamplePanel();
        aplicacion.getContentPane().add(contents, BorderLayout.CENTER);
      
        
        
    }
    
    private static JPanel createExamplePanel() {
  TransparentPanel panel = new TransparentPanel();
 
  panel.setBackgroundImage(panel.createImage("albacete.jpg").getImage());
 
 
 
  return panel;
 }
    
}