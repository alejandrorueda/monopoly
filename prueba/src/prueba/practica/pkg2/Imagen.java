/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package prueba.practica.pkg2;

import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;

/**
 *
 * @author Sergio
 */
public class Imagen extends JFrame
{
	
	ImageIcon imagen = new ImageIcon("ayuntamiento.gif");
	


	
	JLabel etiqueta = new JLabel(imagen);
	

		
	public Imagen()
	{
		super("Muestra de Imagen en JAVA...");
		
		
		getContentPane().add(etiqueta);
		
		//ESTABLECEMOS EL TAMAÑO DEL FRAME
		this.setSize(500, 500);
		
        }
}