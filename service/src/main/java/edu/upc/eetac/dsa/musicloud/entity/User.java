package edu.upc.eetac.dsa.musicloud.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.glassfish.jersey.linking.InjectLinks;
import javax.ws.rs.core.Link;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class User {

    @InjectLinks({})

    private List<Link> links;
    private String id;
    private String login;
    private String nombre;
    private String apellidos;
    private String email;
    private String password;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Link> getLinks() {return links;}
    public void setLinks(List<Link> links) {this.links = links;}
    public String getId() {return id;}
    public void setId(String id) {this.id = id;}
    public String getLogin() {return login;}
    public void setLogin(String login){this.login = login;}
    public String getNombre() {return nombre;}
    public void setNombre(String nombre) {this.nombre = nombre;}
    public String getApellidos() {return apellidos;}
    public void setApellidos(String apellidos) {this.apellidos = apellidos;}
    public String getEmail() {return email;}
    public void setEmail(String email) {this.email = email;}
}
