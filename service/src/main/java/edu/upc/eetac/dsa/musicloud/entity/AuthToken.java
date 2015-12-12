package edu.upc.eetac.dsa.musicloud.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.glassfish.jersey.linking.InjectLinks;

import javax.ws.rs.core.Link;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class AuthToken {

    @InjectLinks({})

    private List<Link> links;
    private String Iduser;
    private String token;
    private String role;

    public List<Link> getLinks() {return links;}
    public void setLinks(List<Link> links) {this.links = links;}
    public String getIduser() {return Iduser;}
    public void setIduser(String iduser) {Iduser = iduser;}
    public String getToken() {return token;}
    public void setToken(String token) {this.token = token;}
    public String getRole() { return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}