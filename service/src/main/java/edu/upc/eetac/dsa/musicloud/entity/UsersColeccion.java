package edu.upc.eetac.dsa.musicloud.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.glassfish.jersey.linking.InjectLinks;

import javax.ws.rs.core.Link;
import java.util.ArrayList;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class UsersColeccion {

    @InjectLinks({})


    private List<Link> links;
    private long newestTimestamp;
    private long oldestTimestamp;
    private List<User> usuarios = new ArrayList<>();

    public List<Link> getLinks() {return links;}
    public void setLinks(List<Link> links) {this.links = links;}
    public long getNewestTimestamp() {return newestTimestamp;}
    public void setNewestTimestamp(long newestTimestamp) {this.newestTimestamp = newestTimestamp;}
    public long getOldestTimestamp() {return oldestTimestamp;}
    public void setOldestTimestamp(long oldestTimestamp) {this.oldestTimestamp = oldestTimestamp;}
    public List<User> getUsers() {return usuarios;}
    public void setCanciones(List<User> stings) {this.usuarios = stings;}
}
