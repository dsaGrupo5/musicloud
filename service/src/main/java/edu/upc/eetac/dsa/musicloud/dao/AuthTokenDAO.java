package edu.upc.eetac.dsa.musicloud.dao;

import edu.upc.eetac.dsa.musicloud.auth.UserInfo;
import edu.upc.eetac.dsa.musicloud.entity.AuthToken;

import java.sql.SQLException;

/**
 * Created by carlos on 11/12/2015.
 */
public interface AuthTokenDAO {
    public UserInfo    getUserByAuthToken (String token)  throws SQLException;
    public AuthToken   createAuthToken    (String iduser) throws SQLException;
    public void        deleteToken        (String iduser) throws SQLException;
    public boolean     obtenerToken       (String iduser) throws SQLException;
}