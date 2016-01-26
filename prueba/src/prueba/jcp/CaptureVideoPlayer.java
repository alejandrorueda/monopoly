package jcp;


import java.awt.Component;
import java.awt.Image;
import java.awt.image.RenderedImage;
import java.io.File;
import java.io.IOException;
import java.util.Vector;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.imageio.ImageIO;
import javax.media.Buffer;
import javax.media.CaptureDeviceInfo;
import javax.media.CaptureDeviceManager;
import javax.media.Controller;
import javax.media.ControllerClosedEvent;
import javax.media.ControllerEvent;
import javax.media.ControllerListener;
import javax.media.Format;
import javax.media.Manager;
import javax.media.MediaLocator;
import javax.media.NoProcessorException;
import javax.media.Player;
import javax.media.Processor;
import javax.media.RealizeCompleteEvent;
import javax.media.StartEvent;
import javax.media.control.FormatControl;
import javax.media.control.FrameGrabbingControl;
import javax.media.control.TrackControl;
import javax.media.format.AudioFormat;
import javax.media.format.VideoFormat;
import javax.media.protocol.ContentDescriptor;
import javax.media.protocol.DataSource;
import javax.media.util.BufferToImage;

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author FAMILIA MEZA MEZA
 */
public class CaptureVideoPlayer implements ControllerListener{
    private String State="Ready";
    private String Time="Capture Audio Player";
    private File Destino;
    private Player player;
    private MediaLocator src;
    private DataSource source;
    public String FormatoV=VideoFormat.YUV;
    private ContentDescriptor cd = new ContentDescriptor(ContentDescriptor.RAW);
    private Integer stateLock = new Integer(0);
    private boolean failed = false;
    private int hors;
    private int mins;
    private int segs;
    private CaptureDeviceInfo Video = null;
    private String Formato=AudioFormat.LINEAR;

    public CaptureVideoPlayer(){
        
    }
    
    public CaptureVideoPlayer( CaptureDeviceInfo videoDevice){
  
        Video=videoDevice;
        src=Video.getLocator();
        
        try {
            player=Manager.createRealizedPlayer(src);
            player.start();
        } catch (Exception ex) {
            Logger.getLogger(CaptureVideoPlayer.class.getName()).log(Level.SEVERE, null, ex);
            System.exit(0);
        } 
        
        
              
    }
    
    
    
    
    
    
    public Component getVideoCamera(){
        return player.getVisualComponent();
    }
    
    
    public Image capturePhoto(){
        Image img=null;
        if(player!=null)
        {
            FrameGrabbingControl fgc = (FrameGrabbingControl)player.getControl("javax.media.control.FrameGrabbingControl");
            
            Buffer buf = fgc.grabFrame();
          
            BufferToImage btoi = new BufferToImage((VideoFormat)buf.getFormat());
            
            img = btoi.createImage(buf);
        }else{
            System.err.println("No se ha iniciado el player!");
            return null;
        }
        return img;
    }

    
    
    public boolean saveImageFile(Image img, File imagenArch){
        String formato = "JPEG";
        try {
            if(img !=null && imagenArch!=null)
                ImageIO.write((RenderedImage) img, formato, imagenArch);
                return true;
        } catch (IOException ex) {
            System.err.println("Error de escritura en Disco");
        }
        return false;
    }
    
    
    
    public CaptureDeviceInfo getDeviceInfo(String device){
        CaptureDeviceInfo Dispo=CaptureDeviceManager.getDevice(device);
        return Dispo;
    }
    
    
    
    public String getDeviceListString(){
        String List="";
        Vector v=javax.media.cdm.CaptureDeviceManager.getDeviceList(null);
        int t;
        if((t=v.size())>0)
            for(int i=0;i<t;i++)
            {
                List+=((CaptureDeviceInfo)v.elementAt(i)).getName()+"\n";
            }
        
        System.out.println(List);
        return List;
    }
    
    
    
    public String[] getDeviceListString(String format){
        String List[]=null;
        Vector v=javax.media.cdm.CaptureDeviceManager.getDeviceList(null);
        int t;int c=0;
        if((t=v.size())>0)
            for(int i=0;i<t;i++){
                CaptureDeviceInfo dev=(CaptureDeviceInfo)v.elementAt(i);
                if(dev.getFormats()[i].getEncoding().equals(format)){
                    c++;
                    
                }
                
            }
            int k=0;
            List=new String[c];
            for(int i=0;i<t;i++){
                CaptureDeviceInfo dev=(CaptureDeviceInfo)v.elementAt(i);
                if(dev.getFormats()[i].getEncoding().equals(format)){
                    List[k]=dev.getName();
                    k++;
                }
                
            }
        return List;
    }
    
    
    
    public Format[] getFormats(){
        Format []formats=Video.getFormats();
        return formats;
    }
    
    
    
    public void setFormat(int indexformat){
        if(player!=null)
            player.stop();
        
        Format []formatos=getFormats();
        FormatControl formatControl = (FormatControl)player.getControl("javax.media.control.FormatControl");
        formatControl.setFormat (formatos[indexformat]);
        player.start();
    }

    
    
    public String getDur(int dur){
       
        String Durat="";
        String S="";
        double a=0;
        double a2=0;

               a=dur/3600;
               S=""+a;
               hors=Integer.parseInt(S.substring(0,S.lastIndexOf(".")));
               a2=((dur)-(hors*3600))/60;
               S=""+a2;
               mins=Integer.parseInt(S.substring(0,S.lastIndexOf(".")));
               segs=dur-(hors*3600)-(mins*60);

        if(hors<=9){
            Durat="0"+hors+":";
        }else{
            Durat=hors+":";
        }
       
        if(mins<=9){
            Durat=Durat+"0"+mins+":";
        }else{
            Durat=Durat+mins+":";
        }
       
        if(segs<=9){
            Durat=Durat+"0"+segs+"";
        }else{
            Durat=Durat+segs+"";
        }
       
        S=null;
        return Durat;
       
    }
    
    public String getTime(){
        
        Time="00:00:00";
        if(player!=null){
        int D=(int)player.getMediaTime().getSeconds();
        Time=this.getDur(D);
        }
        return Time;
    }
    
    
    
    public String getState(){
        return State;
    }

    
    
    

    
    
    
    
    public Processor prepareProcessor(MediaLocator ML) {
        boolean result=false;
        Processor mediaProcessor=null;
        
            MediaLocator mediaLocator=ML; 
        if (mediaLocator == null){
	    System.err.println("- Locator is null");
            return null;
        }
	

	// Try to create a processor to handle the input media locator
	try {
            
	    mediaProcessor = javax.media.Manager.createProcessor(mediaLocator);
            
	} catch (NoProcessorException npe) {
	    System.err.println("- Couldn't create processor");
            return null;
	} catch (IOException ioe) {
	    System.out.println("- IOException creating processor");
            return null;
	}

	// Wait for it to configure
	result = waitForState(mediaProcessor, Processor.Configured);
	if (result == false){
	    System.err.println("- Couldn't configure processor");
        }
        if(mediaProcessor!=null){
	// Get the tracks from the processor
	TrackControl [] tracks = mediaProcessor.getTrackControls();

	// Do we have atleast one track?
	if (tracks == null || tracks.length < 1)
	    System.err.println("- Couldn't find tracks in processor");

	boolean programmed = false;
        boolean typeaudio = true;
        AudioFormat afmt;
        VideoFormat vfmt;
        
	// Search through the tracks for a Audio track
	for (int i = 0; i < tracks.length; i++) {
	    Format format = tracks[i].getFormat();
	    if (  tracks[i].isEnabled() &&
		  format instanceof AudioFormat &&
		  !programmed) {
		afmt = (AudioFormat)tracks[i].getFormat();
                       AudioFormat AFormat =   new AudioFormat(Formato);
                      
		tracks[i].setFormat (AFormat);
		System.out.println("Audio transmitted as:" );
		System.out.println("  " + AFormat);
                typeaudio=true;
		// Assume succesful
		programmed = true;
	    } else if (  tracks[i].isEnabled() &&
		  format instanceof VideoFormat &&
		  !programmed) {
		vfmt = (VideoFormat)tracks[i].getFormat();
                       VideoFormat VFormat =   new VideoFormat(FormatoV);
                      
		tracks[i].setFormat (VFormat);
		System.out.println("Video transmitted as:" );
		System.out.println("  " + VFormat);
                typeaudio=false;
		// Assume succesful
		programmed = true;
	    } else {
		tracks[i].setEnabled(false);
            }
	}

	if (!programmed){
	    System.err.println("- Couldn't find Audio track");
        }
	// Set the output content descriptor to RAW_RTP
        if(typeaudio){
            mediaProcessor.setContentDescriptor(cd);
        }else{
            mediaProcessor.setContentDescriptor(cd);
        }
	// Realize the processor. This will internally create a flow
	// graph and attempt to create an output datasource for ULAW/RTP
	// Audio frames.
        }
	result = waitForState(mediaProcessor, Controller.Realized);
	if (result == false){
	    System.err.println("- Couldn't realize processor");
            return null;
        }
	// Get the output data source of the processor
	
        mediaProcessor.addControllerListener(new StateListener());
	System.out.println("- Processor OK");
        return mediaProcessor;
    }
    
    
    
    public Processor prepareProcessor(DataSource ML) {
        boolean result=false;
        Processor mediaProcessor=null;
        
            DataSource mediaLocator=ML; 
        if (mediaLocator == null){
	    System.err.println("- Locator is null");
            return null;
        }
	

	// Try to create a processor to handle the input media locator
	try {
            
	    mediaProcessor = javax.media.Manager.createProcessor(mediaLocator);
            
	} catch (NoProcessorException npe) {
	    System.err.println("- Couldn't create processor");
            return null;
	} catch (IOException ioe) {
	    System.out.println("- IOException creating processor");
            return null;
	}

	// Wait for it to configure
	result = waitForState(mediaProcessor, Processor.Configured);
	if (result == false){
	    System.err.println("- Couldn't configure processor");
        }
        if(mediaProcessor!=null){
	// Get the tracks from the processor
	TrackControl [] tracks = mediaProcessor.getTrackControls();

	// Do we have atleast one track?
	if (tracks == null || tracks.length < 1)
	    System.err.println("- Couldn't find tracks in processor");

	boolean programmed = false;
        boolean typeaudio = true;
        AudioFormat afmt;
        VideoFormat vfmt;
        
	// Search through the tracks for a Audio track
	for (int i = 0; i < tracks.length; i++) {
	    Format format = tracks[i].getFormat();
	    if (  tracks[i].isEnabled() &&
		  format instanceof AudioFormat &&
		  !programmed) {
		afmt = (AudioFormat)tracks[i].getFormat();
                       AudioFormat AFormat =   new AudioFormat(Formato);
                      
		tracks[i].setFormat (AFormat);
		System.out.println("Audio transmitted as:" );
		System.out.println("  " + AFormat);
                typeaudio=true;
		// Assume succesful
		programmed = true;
	    } else if (  tracks[i].isEnabled() &&
		  format instanceof VideoFormat &&
		  !programmed) {
		vfmt = (VideoFormat)tracks[i].getFormat();
                       VideoFormat VFormat =   new VideoFormat(FormatoV);
                      
		tracks[i].setFormat (VFormat);
		System.out.println("Video transmitted as:" );
		System.out.println("  " + VFormat);
                typeaudio=false;
		// Assume succesful
		programmed = true;
	    } else {
		tracks[i].setEnabled(false);
            }
	}

	if (!programmed){
	    System.err.println("- Couldn't find Audio track");
        }
	// Set the output content descriptor to RAW_RTP
        if(typeaudio){
            mediaProcessor.setContentDescriptor(cd);
        }else{
            mediaProcessor.setContentDescriptor(cd);
        }
	// Realize the processor. This will internally create a flow
	// graph and attempt to create an output datasource for ULAW/RTP
	// Audio frames.
        }
	result = waitForState(mediaProcessor, Controller.Realized);
	if (result == false){
	    System.err.println("- Couldn't realize processor");
            return null;
        }
	// Get the output data source of the processor
	
        mediaProcessor.addControllerListener(new StateListener());
	System.out.println("- Processor OK");
        return mediaProcessor;
    }
    

    
    
    
    
    
        
        
        
        
        
        
        
    void setFailed() {
	failed = true;
    }
     

    Integer getStateLock() {
	return stateLock;
    }
    
    
    class StateListener implements ControllerListener {

	public void controllerUpdate(ControllerEvent ce) {

	    if (ce instanceof ControllerClosedEvent)
		setFailed();

	    if (ce instanceof ControllerEvent) {
		synchronized (getStateLock()) {
		    getStateLock().notifyAll();
		}
	    }
	}
    }

  
       private synchronized boolean waitForState(Processor p, int state) {
	player.addControllerListener(new StateListener());
	failed = false;

	if (state == Processor.Realized) {
	    player.realize();
	}
	
	// Wait until we get an event that confirms the
	// success of the method, or a failure event.
	// See StateListener inner class
	while (player.getState() < state && !failed) {
	    synchronized (getStateLock()) {
		try {
		    getStateLock().wait();
		} catch (InterruptedException ie) {
		    return false;
		}
	    }
	}

	if (failed)
	    return false;
	else
	    return true;
     }   
  
  


    public synchronized void controllerUpdate(ControllerEvent evt) {

		System.err.println("Nuevo Evento: " + evt);
        

        if (evt instanceof RealizeCompleteEvent) {
	    
            System.out.println("Conected!...");
	}

        if (evt instanceof StartEvent) {
	     
            
	}



    }




  

        
        


    
}
