package edu.upc.eetac.dsa.musicloud.dao;

import edu.upc.eetac.dsa.musicloud.entity.Cancion;

import java.io.InputStream;
import java.sql.SQLException;
import java.util.UUID;

/**
 * Created by carlos on 12/12/2015.
 */
public interface CancionDAO {

     public UUID cargar_CANCION_en_SF (InputStream file) throws SQLException;
     public UUID descargar_CANCION_en_SF (InputStream file) throws SQLException;
     public Cancion crear_CANCION (InputStream file,Cancion cancion) throws SQLException;
     public boolean eliminar_CANCION (String id) throws SQLException, CancionNoExisteException;
     public Cancion editar_CANCION (Cancion Cancion) throws SQLException,CancionNoExisteException;
     public Cancion obtener_CANCION_por_ID (String id) throws SQLException;

}
