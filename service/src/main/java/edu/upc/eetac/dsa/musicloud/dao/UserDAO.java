package edu.upc.eetac.dsa.musicloud.dao;

import edu.upc.eetac.dsa.musicloud.entity.User;
import java.sql.SQLException;


public interface UserDAO {
    public User    crear_usuario_registrado (String login,String nombre, String apellidos, String email,String password) throws SQLException, UserAlreadyExistsException;
    public User    obtener_User_por_Id      (String id)                                                                  throws SQLException;
    public User    obtener_User_por_Login   (String login)                                                               throws SQLException;
    public boolean check_Password           (String id, String password)                                                 throws SQLException;
    public User    modificar_Usuario        (User user)                                                                  throws SQLException, UserNoExisteException;
    public boolean eliminar_Usuario         (String login)                                                               throws SQLException, UserNoExisteException;
}
