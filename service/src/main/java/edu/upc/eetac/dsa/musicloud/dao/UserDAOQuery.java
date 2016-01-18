package edu.upc.eetac.dsa.musicloud.dao;

/**
 * Created by carlos on 11/12/2015.
 */
public interface UserDAOQuery {

    public final static String UUID =                     "select REPLACE(UUID(),'-','')";
    public final static String crear_usuario =            "insert into users      (id, login, nombre, apellidos, email, password) values (UNHEX(?), ?, ?, ?, ?,UNHEX(MD5(?)))";
    public final static String ASSIGN_ROLE_REGISTERED =   "insert into user_roles (iduser, role) values (UNHEX(?), 'registrado')";
    public final static String ASSIGN_ROLE_NOREGISTERED = "insert into user_roles (iduser, role) values (UNHEX(?), 'noregistrado')";
    public final static String ASSIGN_ROLE_ADMINISTRADOR ="insert into user_roles (iduser, role) values (UNHEX(?), 'administrador')";
    public final static String obtener_User_por_Id =      "select hex(u.id)     as id, u.login, u.nombre, u.apellidos, u.email  from users u where id=unhex(?)";
    public final static String obtener_User_por_Login =   "select hex(u.id)     as id, u.login, u.nombre, u.apellidos, u.email  from users u where u.login=?";
    public final static String GET_PASSWORD =             "select hex(password) as password from users where id=unhex(?)";
    public final static String MODIFICAR_USER =           "update users set nombre=?, apellidos=?, email=? where login=?";
    public final static String ELIMINAR_USER =            "delete from users where login=?";
    public final static String obtener_USUARIOS =         "select login,nombre,apellidos,email from users ";

}