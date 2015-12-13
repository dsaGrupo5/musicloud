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

/**
 * Created by carlos on 12/12/2015.
 */
public class CancionDAOImpl implements CancionDAO{

    private Application app;

    @Override
    public UUID cargar_CANCION_en_SF (InputStream file) throws SQLException{
        UUID uuid = UUID.randomUUID();
        String filename = uuid.toString() + ".mp3";
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

        System.out.println(uuid);
        return uuid;
    }
    @Override
    public boolean cargar_CANCION_en_BD (InputStream file,Cancion cancion) throws SQLException
    {
        Connection connection = null;
        PreparedStatement stmt = null;
        UUID uuid = cargar_CANCION_en_SF(file);

        try {
            connection = Database.getConnection();
            stmt = connection.prepareStatement(CancionDAOQuery.cargar_cancion_BD);
            stmt.setString(1, uuid.randomUUID().toString().replaceAll("-", ""));
            stmt.setString(2, cancion.getArtista());
            stmt.setString(3, cancion.getNombre());
            stmt.setString(4, cancion.getIdgenero());
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
            return true;
        }
    }
}

