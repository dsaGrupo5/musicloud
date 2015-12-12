package edu.upc.eetac.dsa.musicloud.dao;

/**
 * Created by carlos on 12/12/2015.
 */
public interface CancionDAOQuery {
    public final static String cargar_cancion_BD = "insert into canciones (id, artista, nombre, idgenero) values (UNHEX(?), ?, ?,UNHEX(?))";
}
