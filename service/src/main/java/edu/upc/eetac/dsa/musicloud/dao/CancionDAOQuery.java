package edu.upc.eetac.dsa.musicloud.dao;

/**
 * Created by carlos on 12/12/2015.
 */
public interface CancionDAOQuery {
    public final static String cargar_cancion_BD =        "insert into canciones (id, artista, nombre, genero) values (UNHEX(?), ?, ?,UNHEX(?))";
    public final static String obtener_CANCION_por_ID =   "select hex(id) as id, artista, nombre, idgenero from canciones  where id=unhex(?)";
    public final static String ELIMINAR_CANCION =         "delete from canciones where id=unhex(?)";
    public final static String MODIFICAR_CANCION =        "update canciones set artista=?, nombre=?, genero=? where id=unhex(?)";

}
