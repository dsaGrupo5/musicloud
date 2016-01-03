package edu.upc.eetac.dsa.musicloud.dao;

import edu.upc.eetac.dsa.musicloud.entity.*;

import javax.ws.rs.InternalServerErrorException;
import java.io.*;
import java.sql.*;
import java.util.*;
import java.util.ListIterator;

public class CancionDAOImpl implements CancionDAO{
    private static String URIdescargaCANCION;
    PropertyResourceBundle prb = (PropertyResourceBundle) ResourceBundle.getBundle("musicloud");
    @Override
    public Cancion obtener_CANCION_por_ARTISTA_y_NOMBRE(String artista, String nombre) throws SQLException{
        Cancion cancion = null;
        Connection connection = null;
        PreparedStatement stmt = null;

        try {
            connection = Database.getConnection();
            stmt = connection.prepareStatement(CancionDAOQuery.obtener_CANCION_por_ARTISTA_Y_NOMBRE);
            stmt.setString(1, artista);
            stmt.setString(2, nombre);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {
                cancion = new Cancion();
                cancion.setId(rs.getString("id"));
                cancion.setArtista(rs.getString("artista"));
                cancion.setNombre(rs.getString("nombre"));
                cancion.setGenero(rs.getString("genero"));
                cancion.setUrl(rs.getString("url"));

            }
        } catch (SQLException e) {
            throw e;
        } finally {
            if (stmt != null) stmt.close();
            if (connection != null) connection.close();
        }
        return cancion;

    }
    @Override
    public void cargar_CANCION_en_SF (InputStream file, String id) throws SQLException{

        String filename =  prb.getString("CANCIONES.context")  + id.toString() + ".mp3";
        DataInputStream dis = new DataInputStream(file);

        try {
            OutputStream outpuStream = null;
            int read = 0;
            byte[] bytes = new byte[1024];
            outpuStream = new FileOutputStream(new File(filename));
            while ((read = file.read(bytes)) != -1) {
                outpuStream.write(bytes, 0, read);
            }
            outpuStream.flush();
            outpuStream.close();
        } catch (FileNotFoundException e1) {
            throw new InternalServerErrorException(
                    "Something has been wrong when converting the file.");
        } catch (IOException e) {
            throw new InternalServerErrorException(
                    "Something has been wrong when converting the file.");
        }
    }
    @Override
    public UUID descargar_CANCION_en_SF (InputStream file) throws SQLException{
        UUID uuid= null;
        return uuid;
    }
    @Override
    public Cancion crear_CANCION (InputStream file,Cancion cancion) throws SQLException, CancionExisteException{
        Connection connection = null;
        PreparedStatement stmt = null;
        CancionDAO canciondao = new CancionDAOImpl();
        String url = new String();
        if(canciondao.obtener_CANCION_por_ARTISTA_y_NOMBRE(cancion.getArtista(), cancion.getNombre()) != null)
            throw new CancionExisteException();

        cancion.setId(UUID.randomUUID().toString().replaceAll("-", ""));
        cancion.setUrl(prb.getString("SongBaseURL.context")+ cancion.getId() + ".mp3");
        try {
            connection = Database.getConnection();
            stmt = connection.prepareStatement(CancionDAOQuery.cargar_cancion_BD);
            stmt.setString(1, cancion.getId());
            stmt.setString(2, cancion.getArtista());
            stmt.setString(3, cancion.getNombre());
            stmt.setString(4, cancion.getGenero());
            stmt.setString(5, cancion.getUrl());
            stmt.executeUpdate();
            stmt.close();
        } catch (SQLException e) {
            throw e;
        }
        finally
        {
            if (stmt != null) stmt.close();
            if (connection != null)
            {
                connection.setAutoCommit(true);
                connection.close();
            }
            cargar_CANCION_en_SF(file,cancion.getId());
            return cancion;
        }
    }
    @Override
    public boolean  eliminar_CANCION_en_BD_y_SF (String id) throws SQLException, CancionNoExisteException,CancionNoencontradaSFException{
        Connection connection = null;
        PreparedStatement stmt = null;
        String filename =  prb.getString("CANCIONES.context")  + id.toString() + ".mp3";
        File fichero = new File(filename);
        try
        {
            if (obtener_CANCION_por_ID(id) == null)throw new CancionNoExisteException();
            connection = Database.getConnection();
            stmt = connection.prepareStatement(CancionDAOQuery.ELIMINAR_CANCION);
            stmt.setString(1, id);
            stmt.executeUpdate();
            if(!fichero.delete()) throw  new CancionNoencontradaSFException();
            return true;
        }
        catch (SQLException e){throw e;}
        finally
        {
            if (stmt != null) stmt.close();
            if (connection != null)
            {
                int res;
                res=1;
                connection.close();
            }
        }

    }
    @Override
    public Cancion editar_CANCION (Cancion cancion) throws SQLException,CancionNoExisteException{
        Connection connection = null;
        PreparedStatement stmt = null;

        try
        {
            if (obtener_CANCION_por_ID(cancion.getId()) == null)
                throw new CancionNoExisteException();
            connection = Database.getConnection();
            stmt = connection.prepareStatement(CancionDAOQuery.MODIFICAR_CANCION);
            stmt.setString(1, cancion.getArtista());
            stmt.setString(2, cancion.getNombre());
            stmt.setString(3, cancion.getGenero());
            int rows = stmt.executeUpdate();
            if (rows == 1) {cancion = obtener_CANCION_por_ID(cancion.getId());}
        }
        catch (SQLException e) {throw e;}
        finally
        {
            if (stmt != null) stmt.close();
            if (connection != null)
            {
                connection.setAutoCommit(true);
                connection.close();
            }
        }
        return cancion;

    }
    @Override
    public Cancion obtener_CANCION_por_ID (String id) throws SQLException{
        Cancion cancion = null;
        Connection connection = null;
        PreparedStatement stmt = null;

        try {
            connection = Database.getConnection();
            stmt = connection.prepareStatement(CancionDAOQuery.obtener_CANCION_por_ID);
            stmt.setString(1, id);

            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                cancion = new Cancion();
                cancion.setId(rs.getString("id"));
                cancion.setArtista(rs.getString("artista"));
                cancion.setNombre(rs.getString("nombre"));
                cancion.setGenero(rs.getString("genero"));
                cancion.setUrl(rs.getString("url"));
            }
        } catch (SQLException e) {
            throw e;
        } finally {
            if (stmt != null) stmt.close();
            if (connection != null) connection.close();
        }
        return cancion;
    }
    @Override
    public CancionColeccion obtener_catalogo_CANCIONES(String Ordenpor, long timestamp, boolean before) throws SQLException{
        Cancion cancion = null;
        CancionColeccion cancioncoleccion = new CancionColeccion();
        Connection connection = null;
        PreparedStatement stmt = null;
        try
        {
            connection = Database.getConnection();
            if(before) stmt = connection.prepareStatement(CancionDAOQuery.OBTENER_COLECCION_CANCIONES_APARTIR_ID_PAGINADA_A_5);
            else       stmt = connection.prepareStatement(CancionDAOQuery.OBTENER_COLECCION_CANCIONES_APARTIR_ID_PAGINADA_A_5_after);
            stmt.setTimestamp(1, new Timestamp(timestamp));
            stmt.setString(2, Ordenpor);
            ResultSet rs = stmt.executeQuery();
            boolean first = true;
            while (rs.next())
            {
                cancion = new Cancion();
                cancion.setId(rs.getString("id"));
                cancion.setArtista(rs.getString("artista"));
                cancion.setNombre(rs.getString("nombre"));
                cancion.setGenero(rs.getString("genero"));
                cancion.setUrl(rs.getString("url"));
                cancion.setCreation_timestamp(rs.getTimestamp("creation_timestamp").getTime());
                cancion.setLast_modified(rs.getTimestamp("last_modified").getTime());
                if (first)
                {
                    cancioncoleccion.setNewestTimestamp(cancion.getLast_modified());
                    first = false;
                }
                cancioncoleccion.setOldestTimestamp(cancion.getLast_modified());
                cancioncoleccion.getCanciones().add(cancion);
            }
        }
        catch (SQLException e){throw e;}
        finally
        {
            if (stmt != null) stmt.close();
            if (connection != null)
            {
                connection.setAutoCommit(true);
                connection.close();
            }
        }
        return  cancioncoleccion;
    }
    @Override
    public Listas_Usuarios crear_LISTAUSUARIOS(String iduser, String nombre) throws SQLException,ListaExisteException, UserNoExisteException{
        Connection connection = null;
        PreparedStatement stmt = null;
        String id = null;
        User user = null;
        try
        {
            Listas_Usuarios lista = comprobar_existe_LISTAUSUARIOS_por_NOMBRE(nombre);
            if(lista != null) throw new ListaExisteException();

            UserDAOImpl userdao = new UserDAOImpl();
            user = userdao.obtener_User_por_Id(iduser);
            if(user == null) throw new UserNoExisteException();


            connection = Database.getConnection();
            stmt = connection.prepareStatement(CancionDAOQuery.UUID);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) id = rs.getString(1);
            else  throw new SQLException();
                stmt.close();



            stmt = connection.prepareStatement(CancionDAOQuery.crear_LISTAUSUARIOS);
            stmt.setString(1, id);
            stmt.setString(2, iduser);
            stmt.setString(3, nombre);
            stmt.executeUpdate();
            stmt.close();
        }
        catch (SQLException e) {throw e;}
        finally {
            if (stmt != null) stmt.close();
            if (connection != null) {
                connection.setAutoCommit(true);
                connection.close();
            }
        }
        return comprobar_existe_LISTAUSUARIOS_por_ID(id);
    }
    @Override
    public Listas_Usuarios modifica_LISTAUSUARIO(String idlista,CancionColeccion cancioncoleccion, String nombre) throws SQLException,ListaExisteException, ListaNoExisteException, UserNoExisteException{
        Connection connection = null;
        PreparedStatement stmt = null;
        Listas_Usuarios lista = null;
        List<Cancion> listanueva = new ArrayList<Cancion>();
        List<Cancion> listaantigua = new ArrayList<Cancion>();
        String idantigua = null;
        String idnueva = null;
        Cancion cancionantigua;
        Cancion cancionnueva;

        CancionColeccion list = null;
        try
        {
            lista = comprobar_existe_LISTAUSUARIOS_por_ID(idlista);
            if(lista == null)throw new ListaNoExisteException();

            connection = Database.getConnection();
            stmt = connection.prepareStatement(CancionDAOQuery.MODIFICAR_LISTAUSUARIOS);
            stmt.setString(1, nombre);
            stmt.setString(2, idlista);
            stmt.executeUpdate();
            stmt.close();

            list = obtener_CC_de_LISTAUSUARIOS(idlista);
            listaantigua =list.getCanciones();
            listanueva = cancioncoleccion.getCanciones();
            int Snuevo = listanueva.size();
            int Santiguo = listaantigua.size();
            boolean encontrado;

            if(listaantigua.size()> listanueva.size())
            {
                for (int i=0; i<Santiguo ; i++)
                {
                    encontrado = false;
                    cancionantigua = listaantigua.get(i);
                    idantigua = cancionantigua.getId();

                    for (int b=0; b<Snuevo; b++)
                    {
                        cancionnueva = listanueva.get(b);
                        idnueva = cancionnueva.getId();
                        if(idantigua.compareTo(idnueva)==0)
                            encontrado = true;
                    }
                    if(encontrado== false)
                        eliminar_LISTACANCION(idlista, idantigua);
                }
            }
            else
            {
                for (int i=0; i<Snuevo ; i++)
                {
                    encontrado = false;
                    cancionnueva = listanueva.get(i);
                    idnueva = cancionnueva.getId();
                    for (int b=0; b<Santiguo; b++)
                    {
                        cancionantigua = listaantigua.get(b);
                        idantigua = cancionantigua.getId();
                        if(idantigua.compareTo(idnueva)==0)
                            encontrado = true;
                    }
                    if(encontrado== false)
                        insertar_LISTACANCION(idlista, idnueva);
                }
            }
        }
        catch (SQLException e) {throw e;}
        finally
        {
            if (stmt != null) stmt.close();
            if (connection != null) connection.close();
        }
        return obtener_LISTAUSUARIOS_por_ID(idlista);
    }
    @Override
    public Listas_Usuarios comprobar_existe_LISTAUSUARIOS_por_NOMBRE(String nombre) throws  SQLException,ListaExisteException{
        Listas_Usuarios  lista= null;
        Connection connection = null;
        PreparedStatement stmt = null;

        try {
            connection = Database.getConnection();
            stmt = connection.prepareStatement(CancionDAOQuery.comprobar_existe_LISTAUSUARIOS_por_NOMBRE);
            stmt.setString(1, nombre);
            ResultSet rs = stmt.executeQuery();
            if (rs.next())
            {
                lista = new Listas_Usuarios();
                lista.setId(rs.getString("id"));
                lista.setIduser(rs.getString("iduser"));
                lista.setNombre(rs.getString("nombre"));
            }
        } catch (SQLException e) {
            throw e;
        } finally {
            if (stmt != null) stmt.close();
            if (connection != null) connection.close();
        }
        return lista;

    }
    @Override
    public Listas_Usuarios comprobar_existe_LISTAUSUARIOS_por_ID(String id) throws  SQLException,ListaExisteException{
        Listas_Usuarios  lista= null;
        Connection connection = null;
        PreparedStatement stmt = null;

        try {
            connection = Database.getConnection();
            stmt = connection.prepareStatement(CancionDAOQuery.comprobar_existe_LISTAUSUARIOS_por_ID);
            stmt.setString(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next())
            {
                lista = new Listas_Usuarios();
                lista.setId(rs.getString("id"));
                lista.setIduser(rs.getString("iduser"));
                lista.setNombre(rs.getString("nombre"));
            }
        } catch (SQLException e) {
            throw e;
        } finally {
            if (stmt != null) stmt.close();
            if (connection != null) connection.close();
        }
        return lista;

    }
    @Override
    public CancionColeccion obtener_CC_de_LISTAUSUARIOS(String idlista)  throws  SQLException, ListaExisteException, UserNoExisteException, ListaNoExisteException{
        Connection connection = null;
        PreparedStatement stmt = null;
        Listas_Usuarios lista = null;

        Cancion cancion = null;
        CancionDAOImpl cancionDAO = new CancionDAOImpl();
        CancionColeccion idcanciones = new CancionColeccion();
        try
        {
            lista = comprobar_existe_LISTAUSUARIOS_por_ID(idlista);
            if (lista == null) throw new ListaNoExisteException();
            connection = Database.getConnection();
            stmt = connection.prepareStatement(CancionDAOQuery.obtener_CC_de_LISTAUSUARIO);
            stmt.setString(1, idlista);
            ResultSet rs = stmt.executeQuery();
            while (rs.next()) {

                cancion = new Cancion();
                cancion.setId(rs.getString("idcancion"));
                idcanciones.getCanciones().add(cancionDAO.obtener_CANCION_por_ID(cancion.getId()));
            }
        }
        catch (SQLException e){throw e;}
        finally
        {
            if (stmt != null) stmt.close();
            if (connection != null)
            {
                connection.setAutoCommit(true);
                connection.close();
            }
        }
        return  idcanciones;
    }
    @Override
    public void insertar_LISTACANCION(String idlista,String idcancion)  throws  SQLException{
        Connection connection = null;
        PreparedStatement stmt = null;
        try
        {
            connection = Database.getConnection();
            stmt = connection.prepareStatement(CancionDAOQuery.insertar_LISTA_CANCION);
            stmt.setString(1, idlista);
            stmt.setString(2, idcancion);
            stmt.executeUpdate();
        }
        catch (SQLException e){throw e;}
        finally
        {
            if (stmt != null) stmt.close();
            if (connection != null)
            {
                connection.setAutoCommit(true);
                connection.close();
            }
        }
    }
    @Override
    public void eliminar_LISTACANCION(String idlista,String idcancion)  throws  SQLException{
        Connection connection = null;
        PreparedStatement stmt = null;
        try
        {
            connection = Database.getConnection();
            stmt = connection.prepareStatement(CancionDAOQuery.eliminar_LISTA_CANCION);
            stmt.setString(1, idlista);
            stmt.setString(2, idcancion);
            stmt.executeUpdate();
        }
        catch (SQLException e){throw e;}
        finally
        {
            if (stmt != null) stmt.close();
            if (connection != null)
            {
                connection.setAutoCommit(true);
                connection.close();
            }
        }
    }
    @Override
    public Listas_Usuarios obtener_LISTAUSUARIOS_por_ID(String id) throws SQLException, ListaExisteException,ListaNoExisteException,UserNoExisteException{
        Listas_Usuarios  lista= null;
        Connection connection = null;
        PreparedStatement stmt = null;

        try {
            connection = Database.getConnection();
            stmt = connection.prepareStatement(CancionDAOQuery.comprobar_existe_LISTAUSUARIOS_por_ID);
            stmt.setString(1, id);
            ResultSet rs = stmt.executeQuery();
            if (rs.next())
            {
                lista = new Listas_Usuarios();
                lista.setId(rs.getString("id"));
                lista.setIduser(rs.getString("iduser"));
                lista.setNombre(rs.getString("nombre"));
            }
            lista.setCanciones(obtener_CC_de_LISTAUSUARIOS(id));
        } catch (SQLException e) {
            throw e;
        } finally {
            if (stmt != null) stmt.close();
            if (connection != null) connection.close();
        }
        return lista;
    }
    @Override
    public Listas_UsuariosColeccion obtener_COLECCIONLISTAS(String login) throws SQLException
    {

        User user = new User();
        Listas_UsuariosColeccion coleccion = new Listas_UsuariosColeccion();

        UserDAO userdao= new UserDAOImpl();
        Connection connection = null;
        PreparedStatement stmt = null;
        user = userdao.obtener_User_por_Login(login);
        try {
            connection = Database.getConnection();
            stmt = connection.prepareStatement(CancionDAOQuery.obtener_COLECCION_DE_LISTAS_USUARIO);
            stmt.setString(1,user.getId());
            ResultSet rs = stmt.executeQuery();
            while (rs.next())
            {
                Listas_Usuarios lista = new Listas_Usuarios();
                lista.setId(rs.getString("id"));
                lista.setIduser(rs.getString("iduser"));
                lista.setNombre(rs.getString("nombre"));
                coleccion.getListas().add(lista);
            }

        } catch (SQLException e) {
            throw e;
        } finally {
            if (stmt != null) stmt.close();
            if (connection != null) connection.close();
        }
        return coleccion;

    }
}


