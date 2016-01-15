package edu.upc.eetac.dsa.musicloud.dao;

/**
 * Created by carlos on 12/12/2015.
 */
public interface CancionDAOQuery {
    public final static String UUID =                     "select REPLACE(UUID(),'-','')";
    public final static String cargar_cancion_BD =        "insert into canciones (id, artista, nombre, genero, url) values (UNHEX(?), ?, ?, ?, ?)";
    public final static String obtener_CANCION_por_ID =                 "select hex(id) as id, artista, nombre, genero, url           from canciones   where id=unhex(?)";
    public final static String obtener_CANCION_por_ARTISTA_Y_NOMBRE =   "select hex(c.id) as id, c.artista, c.nombre, c.genero, c.url from canciones c where c.artista=? and c.nombre=?";
    public final static String ELIMINAR_CANCION =         "delete from canciones where id=unhex(?)";
    public final static String MODIFICAR_CANCION =        "update canciones set artista=?, nombre=?, genero=?, url=? where id=unhex(?)";
    public final static String OBTENER_COLECCION_CANCIONES_APARTIR_ID_PAGINADA_A_5 =       "select hex(id) as id,artista, nombre, genero,url, last_modified, creation_timestamp from canciones where creation_timestamp < ? order by creation_timestamp asc limit 500";
    public final static String OBTENER_COLECCION_CANCIONES_APARTIR_ID_PAGINADA_A_5_after = "select hex(id) as id,artista, nombre, genero,url, last_modified, creation_timestamp from canciones where creation_timestamp > ? order by creation_timestamp asc limit 500";
    public final static String crear_LISTAUSUARIOS =                          "insert into listas_usuarios (id,iduser,nombre)  values (UNHEX(?),UNHEX(?), ?)";
    public final static String crear_registro_en_tabla_LISTA_CANCION =        "insert into lista_cancion   (idlista,idcancion) values (UNHEX(?),UNHEX(?))";
    public final static String comprobar_existe_LISTAUSUARIOS_por_NOMBRE =                 "select hex(id) as id, hex(iduser) as iduser, nombre, last_modified, creation_timestamp  from listas_usuarios   where nombre=?";
    public final static String comprobar_existe_LISTAUSUARIOS_por_ID =                 "select hex(id) as id, hex(iduser) as iduser, nombre, last_modified, creation_timestamp  from listas_usuarios   where id=unhex(?)";
    public final static String MODIFICAR_LISTAUSUARIOS =        "update listas_usuarios  set  nombre=? where id=unhex(?)";
    public final static String obtener_CC_de_LISTAUSUARIO =     "select hex(idcancion) as idcancion  from lista_cancion where idlista=unhex(?)";
    public final static String insertar_LISTA_CANCION =        "insert into lista_cancion (idlista,idcancion)  values (UNHEX(?),UNHEX(?))";
    public final static String eliminar_LISTA_CANCION =        "delete from  lista_cancion where idlista=unhex(?) and idcancion=unhex(?)";
    public final static String obtener_COLECCION_DE_LISTAS_USUARIO =   "select hex(id) as id,hex(iduser) as iduser, nombre from listas_usuarios where iduser=unhex(?)";
    public final static String eliminar_LISTAUSUARIO =        "delete from  listas_usuarios where id=unhex(?)";



}
