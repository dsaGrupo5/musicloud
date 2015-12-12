package edu.upc.eetac.dsa.musicloud.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.glassfish.jersey.linking.InjectLinks;
import javax.ws.rs.core.Link;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Cancion {

    @InjectLinks({})

    private List<Link> links;
    private String id;
    private String artista;
    private String nombre;
    private String idgenero;
    private long last_modified;
    private long creation_timestamp;

    public List<Link> getLinks(){return links;}
    public void setLinks(List<Link> links) {this.links = links;}
    public String getId() {return id;}
    public void setId(String id) {this.id = id;}
    public String getArtista() {return artista;}
    public void setArtista(String artista) {this.artista = artista;}
    public String getNombre() {return nombre;}
    public void setNombre(String nombre) {this.nombre = nombre;}
    public String getIdgenero() {return idgenero;}
    public void setIdgenero(String idgenero) {this.idgenero = idgenero;}
    public long getLast_modified() {return last_modified;}
    public void setLast_modified(long last_modified) {this.last_modified = last_modified;}
    public long getCreation_timestamp() {return creation_timestamp;}
    public void setCreation_timestamp(long creation_timestamp) {this.creation_timestamp = creation_timestamp;}
}
