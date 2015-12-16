package edu.upc.eetac.dsa.musicloud.dao;

/**
 * Created by carlos on 12/12/2015.
 */
public interface CancionDAOQuery {
    public final static String cargar_cancion_BD =        "insert into canciones (id, artista, nombre, genero, url) values (UNHEX(?), ?, ?, ?, ?)";
    public final static String obtener_CANCION_por_ID =   "select hex(id) as id, artista, nombre, genero, url from canciones  where id=unhex(?)";
    public final static String obtener_CANCION_por_ARTISTA_Y_NOMBRE =   "select hex(c.id) as id, c.artista, c.nombre, c.genero, c.url from canciones c where c.artista=? and c.nombre=?";
    public final static String ELIMINAR_CANCION =         "delete from canciones where id=unhex(?)";
    public final static String MODIFICAR_CANCION =        "update canciones set artista=?, nombre=?, genero=?, url=? where id=unhex(?)";
    public final static String OBTENER_COLECCION_GRUPOS_APARTIR_ID_PAGINADA_A_5 =       "select hex(id) as id,artista, nombre, genero,url, last_modified, creation_timestamp from canciones where creation_timestamp < ?  order by creation_timestamp asc limit 5";
    public final static String OBTENER_COLECCION_GRUPOS_APARTIR_ID_PAGINADA_A_5_after = "select hex(id) as id,artista, nombre, genero,url, last_modified, creation_timestamp from canciones where creation_timestamp > ?  order by creation_timestamp asc limit 5";
}
