package edu.upc.eetac.dsa.musicloud.dao;

import edu.upc.eetac.dsa.musicloud.entity.Cancion;
import edu.upc.eetac.dsa.musicloud.entity.CancionColeccion;

import javax.ws.rs.InternalServerErrorException;
import java.io.*;
import java.sql.*;
import java.util.PropertyResourceBundle;
import java.util.ResourceBundle;
import java.util.UUID;


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
        cancion.setUrl(prb.getString("musicloud.context")+ "/reproduccion/" + cancion.getId() + ".mp3");
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
    public CancionColeccion obtener_catalogo_CANCIONES(long timestamp, boolean before) throws SQLException{
        Cancion cancion = null;
        CancionColeccion cancioncoleccion = new CancionColeccion();
        Connection connection = null;
        PreparedStatement stmt = null;
        try
        {
            connection = Database.getConnection();
            if(before) stmt = connection.prepareStatement(CancionDAOQuery.OBTENER_COLECCION_GRUPOS_APARTIR_ID_PAGINADA_A_5);
            else       stmt = connection.prepareStatement(CancionDAOQuery.OBTENER_COLECCION_GRUPOS_APARTIR_ID_PAGINADA_A_5_after);
            stmt.setTimestamp(1, new Timestamp(timestamp));
            ResultSet rs = stmt.executeQuery();
            boolean first = true;
            while (rs.next())
            {
                cancion = new Cancion();
                cancion.setId(rs.getString("id"));
                cancion.setNombre(rs.getString("artista"));
                cancion.setNombre(rs.getString("nombre"));
                cancion.setNombre(rs.getString("genero"));
                cancion.setNombre(rs.getString("url"));
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


}


