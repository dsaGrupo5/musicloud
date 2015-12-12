package edu.upc.eetac.dsa.musicloud;


import edu.upc.eetac.dsa.musicloud.dao.CancionDAO;
import edu.upc.eetac.dsa.musicloud.dao.CancionDAOImpl;
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
    public Response uploadSong(@FormDataParam("file") InputStream file,
                              @FormDataParam("artista") String artista,
                              @FormDataParam("nombre") String nombre,
                              @FormDataParam("genero") String genero) throws SQLException
    {
        Cancion cancion = new Cancion();
        cancion.setArtista(artista);
        cancion.setNombre(nombre);
        cancion.setIdgenero(genero);
        CancionDAOImpl canciondaoimpl = new CancionDAOImpl();
        try
        {
            canciondaoimpl.cargar_CANCION_en_BD(file, cancion);
        }
        catch (SQLException e)
        {
            throw new InternalServerErrorException();
        }return Response.ok().build();

    }
}