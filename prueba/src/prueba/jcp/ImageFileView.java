package jcp;

import java.io.File;
import javax.swing.*;
import javax.swing.filechooser.*;

public class ImageFileView extends FileView {
    ImageIcon jpgIcon = new ImageIcon("jpeg.gif");
    ImageIcon gifIcon = new ImageIcon("gif.gif");
    ImageIcon bmpIcon = new ImageIcon("bmp.gif");
    ImageIcon pngIcon = new ImageIcon("png.gif");
    
    public String getName(File f) {
        return null; // let the L&F FileView figure this out
    }
    
    public String getDescription(File f) {
        return null; // let the L&F FileView figure this out
    }
    
    public Boolean isTraversable(File f) {
        return null; // let the L&F FileView figure this out
    }
    
    public String getTypeDescription(File f) {
        String extension = getExtension(f);
        String type = null;

        if (extension != null) {
            if (extension.equals("jpeg") || extension.equals("jpg")) {
                type = "Imagen Jpeg";
            } else if (extension.equals("gif")){
                type = "Imagen Gif";
            } else if (extension.equals("bmp")) {
                type = "Imagen Bmp";
            } else if (extension.equals("png")) {
                type = "Imagen Png";
            } 
        }
        return type;
    }
    
    public Icon getIcon(File f) {
        String extension = getExtension(f);
        Icon icon = null;
        if (extension != null) {
            if (extension.equals("jpeg") || extension.equals("jpg")) {
                icon = jpgIcon;
            } else if (extension.equals("gif")) {
                icon = gifIcon;
            } else if (extension.equals("bmp")) {
                icon = bmpIcon;
            }else if (extension.equals("png")) {
                icon = pngIcon;
            } 
        }
        return icon;
    }
    
    // Get the extension of this file. Code is factored out
    // because we use this in both getIcon and getTypeDescription
    private String getExtension(File f) {

        String ext = null;
        String s = f.getName();
        int i = s.lastIndexOf('.');

        if (i > 0 &&  i < s.length() - 1) {
            ext = s.substring(i+1).toLowerCase();
        }
        return ext;
    }
}
