package edu.upc.eetac.dsa.musicloud.dao;

import edu.upc.eetac.dsa.musicloud.entity.Cancion;

import javax.ws.rs.InternalServerErrorException;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.SecurityContext;
import java.io.*;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.UUID;


public class CancionDAOImpl implements CancionDAO{
    @Override
    public Cancion obtener_CANCION_por_ARTISTA_y_NOMBRE(String artista, String nombre) throws SQLException
    {
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

        String filename = id.toString() + ".mp3";
        DataInputStream dis = new DataInputStream(file);

        try {
            OutputStream outpuStream = null;
            int read = 0;
            byte[] bytes = new byte[1024];
            outpuStream = new FileOutputStream(new File("C:\\canciones\\" + filename));
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

        if(canciondao.obtener_CANCION_por_ARTISTA_y_NOMBRE(cancion.getArtista(), cancion.getNombre()) != null)
            throw new CancionExisteException();

        cancion.setId(UUID.randomUUID().toString().replaceAll("-", ""));
        try {
            connection = Database.getConnection();
            stmt = connection.prepareStatement(CancionDAOQuery.cargar_cancion_BD);
            stmt.setString(1, cancion.getId());
            stmt.setString(2, cancion.getArtista());
            stmt.setString(3, cancion.getNombre());
            stmt.setString(4, cancion.getGenero());
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
        String filename = id.toString() + ".mp3";
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

                cancion.setId(rs.getString("id"));
                cancion.setArtista(rs.getString("artista"));
                cancion.setNombre(rs.getString("nombre"));
                cancion.setGenero(rs.getString("genero"));

            }
        } catch (SQLException e) {
            throw e;
        } finally {
            if (stmt != null) stmt.close();
            if (connection != null) connection.close();
        }
        return cancion;
    }
}


