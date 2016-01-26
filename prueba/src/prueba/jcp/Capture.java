package prueba.jcp;


import java.awt.*;
import java.awt.image.*;
import java.io.*;
import javax.imageio.ImageIO;
import javax.swing.JFileChooser;
import javax.swing.JOptionPane;
import javax.swing.filechooser.FileNameExtensionFilter;


public class Capture {    
   
   private BufferedImage image;   
   private FileNameExtensionFilter filter = new FileNameExtensionFilter("Archivos de Imagen","jpg");
   private JFileChooser fileChooser = new JFileChooser();
   /* CAPTURA LA PANTALLA */
   public boolean captureScreen()  {
        try {
            //crea el area de captura
            Robot robot = new Robot();
           
            image = robot.createScreenCapture(new Rectangle(Toolkit.getDefaultToolkit().getScreenSize()));            
            return getImage();
        } catch (Exception ex) {
        }
        return false;
    }

    private boolean getImage(){
       String file=null;
       fileChooser = new JFileChooser();
       fileChooser.setFileFilter(filter);
       //fileChooser.setCurrentDirectory(new java.io.File("e:/capturas/"));
       int result = fileChooser.showSaveDialog(null);
       if ( result == JFileChooser.APPROVE_OPTION ){
                file = fileChooser.getSelectedFile().toString();
                
                return SaveImage(file + ".jpg");
        }
       return false;
    }

  /* guarda la imagen en disco*/
    private boolean SaveImage(String f){
        try {            
            //se escribe en disco en formato JPG
            ImageIO.write(image, "jpg", new File(f));
            return true;
	} catch (IOException e) {
        
        }
        return false;
   }
    
    

}
