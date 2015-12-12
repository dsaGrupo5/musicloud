package edu.upc.eetac.dsa.musicloud.dao;

import edu.upc.eetac.dsa.musicloud.entity.Cancion;

import java.io.InputStream;
import java.sql.SQLException;
import java.util.UUID;

/**
 * Created by carlos on 12/12/2015.
 */
public interface CancionDAO {
     public Cancion cargar_CANCION    (String id) throws SQLException;
     public Cancion descargar_CANCION (String id) throws SQLException;
     public UUID cargar_CANCION_en_SF (InputStream file) throws SQLException;
}
