package edu.upc.eetac.dsa.musicloud;


import edu.upc.eetac.dsa.musicloud.dao.*;
import edu.upc.eetac.dsa.musicloud.entity.Cancion;
import edu.upc.eetac.dsa.musicloud.entity.CancionColeccion;
import edu.upc.eetac.dsa.musicloud.entity.Listas_Usuarios;
import edu.upc.eetac.dsa.musicloud.entity.Listas_UsuariosColeccion;
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
public class CancionResource
{
    @Context
    private SecurityContext securityContext;
    @RolesAllowed({"administrador"})
    @Path("/cargarcancion")
    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @Produces(MusicloudMediaType.MUSICLOUD_CANCION)
    public Cancion cargarCancion(@FormDataParam("file") InputStream file,@FormDataParam("artista") String artista,@FormDataParam("nombre") String nombre,@FormDataParam("genero") String genero) throws SQLException, CancionExisteException {

        if (file == null)
            throw new BadRequestException("Es necesario selecionar un archivo");

        Cancion cancion = new Cancion();
        cancion.setArtista(artista);
        cancion.setNombre(nombre);
        cancion.setGenero(genero);
        CancionDAOImpl canciondaoimpl = new CancionDAOImpl();
        try {
            cancion = canciondaoimpl.crear_CANCION(file, cancion);
        } catch (CancionExisteException e) {
            throw new WebApplicationException("La cancion que intentas cargar ya exixte en el sisteme", Response.Status.CONFLICT);
        } catch (SQLException e) {
            throw new InternalServerErrorException();
        }
        return cancion;
    }
    @RolesAllowed({"administrador"})
    @Path("/eliminarcancion/{id}")
    @DELETE
    public void eliminarCancion(@PathParam("id") String id) throws SQLException, CancionNoencontradaSFException, CancionNoExisteException{
        CancionDAOImpl canciondaoimpl = new CancionDAOImpl();
        try {
            canciondaoimpl.eliminar_CANCION_en_BD_y_SF(id);
        } catch (CancionNoExisteException e) {
            throw new WebApplicationException("La cancion no esta registrada en la Base de datos", Response.Status.CONFLICT);
        } catch (CancionNoencontradaSFException e) {
            throw new WebApplicationException("La cancion no esta en el Sistema de Ficheros", Response.Status.CONFLICT);
        } catch (SQLException e) {
            throw new InternalServerErrorException();
        }
    }
    @RolesAllowed({"administrador","registrado"})
    @Path(("/catalogo_canciones"))
    @GET
    @Produces(MusicloudMediaType.MUSICLOUD_CANCION_COLECCION)
    public CancionColeccion obtener_catalogo_Canciones(@QueryParam("timestamp") long timestamp, @DefaultValue("true") @QueryParam("before") boolean before) throws SQLException{
        CancionDAO canciondao = new CancionDAOImpl();
        CancionColeccion cancioncoleccion = null ;
        try
        {
            if (before && timestamp == 0) timestamp = System.currentTimeMillis();
            cancioncoleccion = canciondao.obtener_catalogo_CANCIONES(timestamp, before);
        }
        catch(SQLException e)
        {
            throw new InternalServerErrorException();
        }
        return cancioncoleccion;
    }
    @RolesAllowed({"administrador","registrado"})
    @Path(("/crear_listareproduccion"))
    @POST
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MusicloudMediaType.MUSICLOUD_LISTA_USUARIO)
    public Listas_Usuarios crear_LISTAUSUARIOS(@FormParam("iduser") String iduser,@FormParam("nombre") String nombre) throws SQLException, ListaExisteException,UserNoExisteException{
        if(iduser== null ||nombre == null) throw new BadRequestException("Es necesario rellenar todos los campos");
        CancionDAOImpl canciondao = new CancionDAOImpl();
        Listas_Usuarios lista = new Listas_Usuarios();
        try{lista = canciondao.crear_LISTAUSUARIOS(iduser,nombre);}
        catch (ListaExisteException e){throw  new WebApplicationException("El nombre de esta lisya ya existe",Response.Status.CONFLICT );}
        catch (UserNoExisteException e){throw  new WebApplicationException("El nombre de este usuario no existe",Response.Status.CONFLICT );}
        catch (SQLException e){throw new InternalServerErrorException();}
        return lista;
    }
    @RolesAllowed({"administrador","registrado"})
    @Path(("/editar_listareproduccion/{id}"))
    @PUT
    @Consumes(MusicloudMediaType.MUSICLOUD_LISTA_USUARIO)
    @Produces(MusicloudMediaType.MUSICLOUD_LISTA_USUARIO)
    public Listas_Usuarios modificar_LISTAUSUARIOS(@PathParam("id") String id,Listas_Usuarios lista) throws SQLException, ListaExisteException,UserNoExisteException, ListaNoExisteException{
        CancionDAOImpl canciondao = new CancionDAOImpl();
        try{lista = canciondao.modifica_LISTAUSUARIO(id, lista.getCanciones(), lista.getNombre());}
        catch (ListaExisteException e){throw  new WebApplicationException("El nombre de esta lisya ya existe",Response.Status.CONFLICT );}
        catch (ListaNoExisteException e){throw  new WebApplicationException("Esta lista no existe",Response.Status.CONFLICT );}
        catch (UserNoExisteException e){throw  new WebApplicationException("El nombre de este usuario no existe",Response.Status.CONFLICT );}
        catch (SQLException e){throw new InternalServerErrorException();}
        return lista;
    }
    @RolesAllowed({"administrador","registrado"})
    @Path(("/obtener_listausuario/{id}"))
    @GET
    @Produces(MusicloudMediaType.MUSICLOUD_LISTA_USUARIO)
    public Listas_Usuarios obtener_LISTAUSUARIOS(@PathParam("id") String id) throws SQLException, ListaExisteException,UserNoExisteException, ListaNoExisteException{
        CancionDAOImpl canciondao = new CancionDAOImpl();
        Listas_Usuarios lista = new Listas_Usuarios();
        try{lista = canciondao.obtener_LISTAUSUARIOS_por_ID(id);}
        catch (ListaExisteException e){throw  new WebApplicationException("El nombre de esta lisya ya existe",Response.Status.CONFLICT );}
        catch (ListaNoExisteException e){throw  new WebApplicationException("Esta lista no existe",Response.Status.CONFLICT );}
        catch (UserNoExisteException e){throw  new WebApplicationException("El nombre de este usuario no existe",Response.Status.CONFLICT );}
        catch (SQLException e){throw new InternalServerErrorException();}
        return lista;
    }
    @RolesAllowed({"administrador","registrado"})
    @Path(("/obtener_coleccion_listausuario/{login}"))
    @GET
    @Produces(MusicloudMediaType.MUSICLOUD_LISTA_USUARIO_COLECCION)
    public Listas_UsuariosColeccion obtener_LISTAUSUARIOSCOLECCION(@PathParam("login") String login) throws SQLException{
        Listas_UsuariosColeccion coleccion= new Listas_UsuariosColeccion();;
        CancionDAOImpl canciondao = new CancionDAOImpl();
        try{coleccion = canciondao.obtener_COLECCIONLISTAS(login);}
        catch (SQLException e){throw new InternalServerErrorException();}
        return coleccion;
    }
    @RolesAllowed({"registrado"})
    @Path("/eliminar_listausuario/{id}")
    @DELETE
    public void eliminar_LISTAUSUARIO(@PathParam("id") String id) throws SQLException,ListaNoExisteException,UserNoExisteException,ListaExisteException{
        CancionDAO cancionDAO= new CancionDAOImpl();
        try{cancionDAO.eliminarLISTAUSUARIO(id);}
        catch(ListaNoExisteException e){new WebApplicationException("El nombre de esta lista no existe",Response.Status.CONFLICT );}
        catch (SQLException e){throw new InternalServerErrorException();}
    }
    @RolesAllowed({"administrador","registrado"})
    @Path(("/obtener_cancion/{id}"))
    @GET
    @Produces(MusicloudMediaType.MUSICLOUD_CANCION)
    public Cancion obtener_CANCIONPORID(@PathParam("id") String id) throws SQLException{
        Cancion cancion= new Cancion();
        CancionDAOImpl canciondao = new CancionDAOImpl();
        try{cancion = canciondao.obtener_CANCION_por_ID(id);}
        catch (SQLException e){throw new InternalServerErrorException();}
        return cancion;
    }
}

