package edu.upc.eetac.dsa.musicloud.entity;

import org.glassfish.jersey.linking.InjectLinks;

import javax.ws.rs.core.Link;
import java.util.List;


public class AuthToken {

    @InjectLinks({})

    private List<Link> links;
    private String Iduser;
    private String token;

    public List<Link> getLinks() {return links;}
    public void setLinks(List<Link> links) {this.links = links;}
    public String getIduser() {return Iduser;}
    public void setIduser(String iduser) {Iduser = iduser;}
    public String getToken() {return token;}
    public void setToken(String token) {this.token = token;}
}