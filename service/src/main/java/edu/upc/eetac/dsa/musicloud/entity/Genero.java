package edu.upc.eetac.dsa.musicloud.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.glassfish.jersey.linking.InjectLinks;

import javax.ws.rs.core.Link;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Genero {
    @InjectLinks({})

    private List<Link> links;
    private String id;
    private String nombre;

    public List<Link> getLinks() {return links;}
    public void setLinks(List<Link> links) {this.links = links;}
    public String getId() {return id;}
    public void setId(String id) {this.id = id;}
    public String getNombre() {return nombre;}
    public void setNombre(String nombre) {this.nombre = nombre;}
}