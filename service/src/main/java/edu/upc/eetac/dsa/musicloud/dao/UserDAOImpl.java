package edu.upc.eetac.dsa.musicloud.dao;

import edu.upc.eetac.dsa.musicloud.entity.User;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;


public class UserDAOImpl implements UserDAO{

    @Override
    public User crear_usuario_registrado(String login,String nombre, String apellidos, String email,String password) throws SQLException, UserAlreadyExistsException {
        Connection connection = null;
        PreparedStatement stmt = null;
        String id = null;
        try {
            User user = obtener_User_por_Login(login);

            if (user != null) throw new UserAlreadyExistsException();

            connection = Database.getConnection();
            stmt = connection.prepareStatement(UserDAOQuery.UUID);

            ResultSet rs = stmt.executeQuery();
            if (rs.next()) id = rs.getString(1);
            else  throw new SQLException();

            connection.setAutoCommit(false);
            stmt.close();
            stmt = connection.prepareStatement(UserDAOQuery.crear_usuario);
            stmt.setString(1, id);
            stmt.setString(2, login);
            stmt.setString(3, nombre);
            stmt.setString(4, apellidos);
            stmt.setString(5, email);
            stmt.setString(6, password);
            stmt.executeUpdate();
            stmt.close();


            stmt = connection.prepareStatement(UserDAOQuery.ASSIGN_ROLE_REGISTERED);
            stmt.setString(1, id);
            stmt.executeUpdate();
            connection.commit();

        } catch (SQLException e) {
            throw e;
        } finally {
            if (stmt != null) stmt.close();
            if (connection != null) {
                connection.setAutoCommit(true);
                connection.close();
            }
        }
        return obtener_User_por_Id(id);
    }

    @Override
    public User obtener_User_por_Id(String id) throws SQLException {

        User user = null;
        Connection connection = null;
        PreparedStatement stmt = null;
        try {
            // Obtiene la conexión del DataSource
            connection = Database.getConnection();

            // Prepara la consulta
            stmt = connection.prepareStatement(UserDAOQuery.obtener_User_por_Id);
            // Da valor a los parámetros de la consulta
            stmt.setString(1, id);

            // Ejecuta la consulta
            ResultSet rs = stmt.executeQuery();
            // Procesa los resultados
            if (rs.next()) {
                user = new User();
                user.setId(rs.getString("id"));
                user.setLogin(rs.getString("login"));
                user.setNombre(rs.getString("nombre"));
                user.setApellidos(rs.getString("apellidos"));
                user.setEmail(rs.getString("email"));
            }
        } catch (SQLException e) {
            // Relanza la excepción
            throw e;
        } finally {
            // Libera la conexión
            if (stmt != null) stmt.close();
            if (connection != null) connection.close();
        }

        // Devuelve el modelo
        return user;
    }

    @Override
    public User obtener_User_por_Login(String login) throws SQLException {

        User user = null;
        Connection connection = null;
        PreparedStatement stmt = null;

        try {
            connection = Database.getConnection();
            stmt = connection.prepareStatement(UserDAOQuery.obtener_User_por_Login);
            stmt.setString(1, login);

            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                user = new User();

                user.setId(rs.getString("id"));
                user.setLogin(rs.getString("login"));
                user.setNombre(rs.getString("nombre"));
                user.setApellidos(rs.getString("apellidos"));
                user.setEmail(rs.getString("email"));
            }
        } catch (SQLException e) {
            throw e;
        } finally {
            if (stmt != null) stmt.close();
            if (connection != null) connection.close();
        }
        return user;
    }

    @Override
    public boolean check_Password(String id, String password) throws SQLException {
        Connection connection = null;
        PreparedStatement stmt = null;
        try {
            connection = Database.getConnection();

            stmt = connection.prepareStatement(UserDAOQuery.GET_PASSWORD);
            stmt.setString(1, id);

            ResultSet rs = stmt.executeQuery();
            if (rs.next()) {
                String storedPassword = rs.getString("password");
                try {
                    MessageDigest md = MessageDigest.getInstance("MD5");
                    md.update(password.getBytes());
                    String passedPassword = new BigInteger(1, md.digest()).toString(16);

                    return passedPassword.equalsIgnoreCase(storedPassword);
                } catch (NoSuchAlgorithmException e) {
                }
            }
            return false;
        } catch (SQLException e) {
            throw e;
        } finally {
            if (stmt != null) stmt.close();
            if (connection != null) connection.close();
        }
    }

    @Override
    public User  modificar_Usuario(String id,String nombre, String apellidos, String email)throws SQLException, UserNoExisteException {
        Connection connection = null;
        PreparedStatement stmt = null;
        User user = null;
        try
        {
            user = obtener_User_por_Id(id);
            if (user == null) throw new UserNoExisteException();
            connection = Database.getConnection();
            stmt = connection.prepareStatement(UserDAOQuery.MODIFICAR_USER);
            stmt.setString(1, nombre);
            stmt.setString(2, apellidos);
            stmt.setString(1, email);
            stmt.setString(2, id);
            int rows = stmt.executeUpdate();
            if (rows == 1) {user = obtener_User_por_Id(id);}
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
        return user;
    }

    @Override
    public boolean eliminar_Usuario(String login) throws SQLException,UserNoExisteException
    {
        Connection connection = null;
        PreparedStatement stmt = null;
        try
        {
            User user = obtener_User_por_Login(login);
            if (user == null)throw new UserNoExisteException();
            connection = Database.getConnection();
            stmt = connection.prepareStatement(UserDAOQuery.ELIMINAR_USER);
            stmt.setString(1,login);
            stmt.executeUpdate();
            return true;
        }
        catch (SQLException e)
        {
            throw e;
        }catch (UserNoExisteException e)
        {
            throw e;
        }
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
}