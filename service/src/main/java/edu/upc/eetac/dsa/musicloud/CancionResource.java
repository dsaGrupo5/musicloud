package edu.upc.eetac.dsa.musicloud;


import edu.upc.eetac.dsa.musicloud.dao.*;
import edu.upc.eetac.dsa.musicloud.entity.Cancion;
import org.glassfish.jersey.media.multipart.FormDataParam;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.io.InputStream;
import java.sql.SQLException;

@Path("cancion")
public class CancionResource{
    @Context
    private SecurityContext securityContext;
    @RolesAllowed({"registrado"})
    @Path("/cargarcancion")
    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MusicloudMediaType.MUSICLOUD_CANCION)
    public Cancion cargarCancion(@FormDataParam("file") InputStream file,
                              @FormDataParam("artista") String artista,
                              @FormDataParam("nombre") String nombre,
                              @FormDataParam("genero") String genero) throws SQLException, CancionExisteException{

        if(file == null)
            throw new BadRequestException("Es necesario selecionar un archivo");

        Cancion cancion = new Cancion();
        cancion.setArtista(artista);
        cancion.setNombre(nombre);
        cancion.setGenero(genero);
        CancionDAOImpl canciondaoimpl = new CancionDAOImpl();
        try
        {
            cancion= canciondaoimpl.crear_CANCION(file, cancion);
        }
        catch (CancionExisteException e)
        {
            throw new WebApplicationException("La cancion que intentas cargar ya exixte en el sisteme",Response.Status.CONFLICT);
        }
        catch (SQLException e)
        {
            throw new InternalServerErrorException();
        }
        return cancion;
    }
    @RolesAllowed({"registrado"})
    @Path("/eliminarcancion/{id}")
    @DELETE
    public void eliminarCancion(@PathParam("id") String id) throws SQLException,CancionNoencontradaSFException,CancionNoExisteException{
        CancionDAOImpl canciondaoimpl = new CancionDAOImpl();
        try
        {
            canciondaoimpl.eliminar_CANCION_en_BD_y_SF(id);
        }
        catch (CancionNoExisteException e){
            throw  new WebApplicationException("La cancion no esta registrada en la Base de datos", Response.Status.CONFLICT);
        }
        catch (CancionNoencontradaSFException e){
            throw  new WebApplicationException("La cancion no esta en el Sistema de Ficheros", Response.Status.CONFLICT);
        }
        catch (SQLException e){
            throw new InternalServerErrorException();
        }
    }

}