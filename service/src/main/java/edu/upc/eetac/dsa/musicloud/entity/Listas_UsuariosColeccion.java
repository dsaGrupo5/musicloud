package edu.upc.eetac.dsa.musicloud.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.glassfish.jersey.linking.InjectLinks;

import javax.ws.rs.core.Link;
import java.util.ArrayList;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Listas_UsuariosColeccion
{
    @InjectLinks({})
    private List<Link> links;
    private List<Listas_Usuarios> listas = new ArrayList<>();
    public List<Listas_Usuarios> getListas(){return listas;}
    public void setListas(List<Listas_Usuarios> listas){this.listas = listas;}
    public List<Link> getLinks() {
        return links;
    }
    public void setLinks(List<Link> links) {
        this.links = links;
    }
}
