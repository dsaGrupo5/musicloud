package edu.upc.eetac.dsa.musicloud.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.glassfish.jersey.linking.InjectLinks;

import javax.ws.rs.core.Link;
import java.util.ArrayList;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class GeneroColeccion {

    @InjectLinks({})

    private List<Link> links;
    private long newestTimestamp;
    private long oldestTimestamp;
    private List<Genero> generos = new ArrayList<>();

    public List<Link> getLinks() {return links;}
    public void setLinks(List<Link> links) {this.links = links;}
    public long getNewestTimestamp() {return newestTimestamp;}
    public void setNewestTimestamp(long newestTimestamp) {this.newestTimestamp = newestTimestamp;}
    public long getOldestTimestamp() {return oldestTimestamp;}
    public void setOldestTimestamp(long oldestTimestamp) {this.oldestTimestamp = oldestTimestamp;}
    public List<Genero> getGeneros() {return generos;}
    public void setGeneros(List<Genero> stings) {this.generos = stings;}
}
