package edu.upc.eetac.dsa.musicloud.dao;

import edu.upc.eetac.dsa.musicloud.entity.Genero;
import edu.upc.eetac.dsa.musicloud.entity.GeneroColeccion;

import java.sql.SQLException;

/**
 * Created by carlos on 12/12/2015.
 */
public interface GeneroDAO {
    public Genero            crear_GENERO                (String nombre) throws SQLException;
    public boolean           eliminar_GENERO             (String nombre) throws SQLException;
    public Genero            obtener_ID_por_NOMBRE       (String nombre) throws SQLException;
    public Genero            obtener_NOMBRE_por_ID       (String id)     throws SQLException;
    public GeneroColeccion   obtener_coleccion_GENERO    () throws SQLException;
}
