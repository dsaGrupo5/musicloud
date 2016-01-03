package edu.upc.eetac.dsa.musicloud.dao;

import edu.upc.eetac.dsa.musicloud.entity.Cancion;
import edu.upc.eetac.dsa.musicloud.entity.CancionColeccion;
import edu.upc.eetac.dsa.musicloud.entity.Listas_Usuarios;
import edu.upc.eetac.dsa.musicloud.entity.Listas_UsuariosColeccion;

import java.io.InputStream;
import java.sql.SQLException;
import java.util.UUID;

/**
 * Created by carlos on 12/12/2015.
 */
public interface CancionDAO {

     public void cargar_CANCION_en_SF (InputStream file,String id) throws SQLException;
     public UUID descargar_CANCION_en_SF (InputStream file) throws SQLException;
     public Cancion crear_CANCION (InputStream file,Cancion cancion) throws SQLException, CancionExisteException;
     public boolean eliminar_CANCION_en_BD_y_SF (String id) throws SQLException, CancionNoExisteException,CancionNoencontradaSFException;
     public Cancion editar_CANCION (Cancion Cancion) throws SQLException,CancionNoExisteException;
     public Cancion obtener_CANCION_por_ID (String id) throws SQLException;
     public Cancion obtener_CANCION_por_ARTISTA_y_NOMBRE(String artista, String nombre) throws SQLException;
     public CancionColeccion obtener_catalogo_CANCIONES(String Ordenpor,long timestamp, boolean before) throws SQLException;
     public Listas_Usuarios crear_LISTAUSUARIOS(String iduser, String nombre) throws SQLException,ListaExisteException,UserNoExisteException;
     public Listas_Usuarios modifica_LISTAUSUARIO(String idlista,CancionColeccion lista, String nombre) throws SQLException, ListaExisteException, UserNoExisteException, ListaNoExisteException;
     public Listas_Usuarios comprobar_existe_LISTAUSUARIOS_por_NOMBRE(String id) throws  SQLException,ListaExisteException;
     public Listas_Usuarios comprobar_existe_LISTAUSUARIOS_por_ID(String id) throws  SQLException,ListaExisteException;
     public CancionColeccion obtener_CC_de_LISTAUSUARIOS(String idlista)  throws  SQLException, ListaExisteException, UserNoExisteException, ListaNoExisteException;
     public void insertar_LISTACANCION(String idlista,String idcancion)  throws  SQLException;
     public void eliminar_LISTACANCION(String idlista,String idcancion)  throws  SQLException;
     public Listas_Usuarios obtener_LISTAUSUARIOS_por_ID(String idlista) throws SQLException, ListaExisteException,ListaNoExisteException,UserNoExisteException;
     public Listas_UsuariosColeccion obtener_COLECCIONLISTAS(String login) throws SQLException;
}
