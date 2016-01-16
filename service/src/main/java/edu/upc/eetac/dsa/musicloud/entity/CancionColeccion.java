package edu.upc.eetac.dsa.musicloud.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import edu.upc.eetac.dsa.musicloud.CancionResource;
import org.glassfish.jersey.linking.Binding;
import org.glassfish.jersey.linking.InjectLink;
import org.glassfish.jersey.linking.InjectLinks;

import javax.ws.rs.core.Link;
import java.util.ArrayList;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class CancionColeccion {

    @InjectLinks({})


    private List<Link> links;
    private long newestTimestamp;
    private long oldestTimestamp;
    private List<Cancion> canciones = new ArrayList<>();

    public List<Link> getLinks() {return links;}
    public void setLinks(List<Link> links) {this.links = links;}
    public long getNewestTimestamp() {return newestTimestamp;}
    public void setNewestTimestamp(long newestTimestamp) {this.newestTimestamp = newestTimestamp;}
    public long getOldestTimestamp() {return oldestTimestamp;}
    public void setOldestTimestamp(long oldestTimestamp) {this.oldestTimestamp = oldestTimestamp;}
    public List<Cancion> getCanciones() {return canciones;}
    public void setCanciones(List<Cancion> stings) {this.canciones = stings;}
}
