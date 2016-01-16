package edu.upc.eetac.dsa.musicloud.dao;

import edu.upc.eetac.dsa.musicloud.auth.UserInfo;
import edu.upc.eetac.dsa.musicloud.entity.AuthToken;
import edu.upc.eetac.dsa.musicloud.entity.Role;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;


public class AuthTokenDAOImpl implements AuthTokenDAO {
    @Override
    public UserInfo getUserByAuthToken(String token) throws SQLException {
        UserInfo userInfo = null;
        Connection connection = null;
        PreparedStatement stmt = null;

        try {
            connection = Database.getConnection();

            stmt = connection.prepareStatement(AuthTokenDAOQuery.GET_USER_BY_TOKEN);
            stmt.setString(1, token);
            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                userInfo = new UserInfo();
                userInfo.setName(rs.getString("id"));
                stmt.close();

                stmt = connection.prepareStatement(AuthTokenDAOQuery.GET_ROLES_OF_USER);
                stmt.setString(1, userInfo.getName());
                rs = stmt.executeQuery();
                while (rs.next()) {
                    String role = rs.getString("role");
                    userInfo.getRoles().add(Role.valueOf(role));
                }
            }
        } catch (SQLException e) {
            throw e;
        } finally {
            if (stmt != null) stmt.close();
            if (connection != null) connection.close();
        }

        return userInfo;
    }
    @Override
    public AuthToken createAuthToken(String iduser) throws SQLException {
        Connection connection = null;
        PreparedStatement stmt = null;
        String token = null;
        AuthToken authToken = null;
        try {
            authToken = new AuthToken();
            connection = Database.getConnection();

            stmt = connection.prepareStatement(AuthTokenDAOQuery.UUID);
            ResultSet rs = stmt.executeQuery();
            if (rs.next()) token = rs.getString(1);
            else throw new SQLException();

            stmt.close();
            stmt = connection.prepareStatement(AuthTokenDAOQuery.CREATE_TOKEN);
            stmt.setString(1, iduser);
            stmt.setString(2, token);

            stmt.executeUpdate();

            stmt = connection.prepareStatement(AuthTokenDAOQuery.GET_ROLES_OF_USER);
            stmt.setString(1, iduser);
            rs = stmt.executeQuery();
            while (rs.next()) {
                String role = rs.getString("role");
                authToken.setRole(role);
            }

            authToken.setToken(token);
            authToken.setIduser(iduser);
        } catch (SQLException e) {
            throw e;
        } finally {
            if (stmt != null) stmt.close();
            if (connection != null) connection.close();
        }
        return authToken;
    }
    @Override
    public void deleteToken(String iduser) throws SQLException {
        Connection connection = null;
        PreparedStatement stmt = null;
        AuthToken authToken = null;
        try {
            connection = Database.getConnection();

            stmt = connection.prepareStatement(AuthTokenDAOQuery.DELETE_TOKEN);
            stmt.setString(1, iduser);

            stmt.executeUpdate();
        } catch (SQLException e) {
            throw e;
        } finally {
            if (stmt != null) stmt.close();
            if (connection != null) connection.close();
        }
    }
}