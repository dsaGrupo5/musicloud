package edu.upc.eetac.dsa.musicloud;


import edu.upc.eetac.dsa.musicloud.dao.*;
import edu.upc.eetac.dsa.musicloud.entity.AuthToken;
import edu.upc.eetac.dsa.musicloud.entity.User;
import javax.annotation.security.RolesAllowed;
import javax.ws.rs.*;
import javax.ws.rs.core.*;
import java.net.URI;
import java.net.URISyntaxException;
import java.sql.SQLException;


@Path("users")
public class UserResource {
        @Context
        private SecurityContext securityContext;
        @Path(("/registrar"))
        @POST
        @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
        @Produces(MusicloudMediaType.MUSICLOUD_AUTH_TOKEN)
        public Response registerUser(@FormParam("login") String login, @FormParam("nombre") String nombre, @FormParam("apellidos") String apellidos, @FormParam("email") String email, @FormParam("password") String password, @Context UriInfo uriInfo) throws URISyntaxException {
            if(login == null || nombre == null || apellidos == null || password == null || email == null)
                throw new BadRequestException("Se necesitan todos los parametros");
            UserDAO userDAO = new UserDAOImpl();
            User user = null;

            try{
                user = userDAO.crear_usuario_registrado(login, nombre, apellidos, email, password);

            }catch (UserAlreadyExistsException e){
                throw new WebApplicationException("Este login ya existe ", Response.Status.CONFLICT);
            }catch(SQLException e){
                throw new InternalServerErrorException();
            }
            URI uri = new URI(uriInfo.getAbsolutePath().toString() + "/" + user.getId());
            return Response.ok().build();
        }
        @RolesAllowed({"administrador","registrado"})
        @Path("/eliminar/{login}")
        @DELETE
        public Response eliminarUser(@PathParam("login") String login) throws UserNoExisteException {

            UserDAO userdao = new UserDAOImpl();
            try {

                if(!userdao.eliminar_Usuario(login))
                    throw new WebApplicationException("Este usuario no existe ", Response.Status.CONFLICT);
            } catch (SQLException e) {
                throw new InternalServerErrorException();
            }
            return Response.ok().build();
        }
        @RolesAllowed({"administrador","registrado"})
        @Path("/editar/{login}")
        @PUT
        @Consumes(MusicloudMediaType.MUSICLOUD_USER)
        @Produces(MusicloudMediaType.MUSICLOUD_USER)
        public User editarUser(@PathParam("login") String login, User user) throws SQLException,  UserNoExisteException{
            UserDAO userdao = new UserDAOImpl();
            User response = null;
            try{response= userdao.modificar_Usuario(user);}
            catch (UserNoExisteException e){
                throw new  WebApplicationException("El usuario no existe", Response.Status.CONFLICT);
            }catch (SQLException e){
                throw new InternalServerErrorException();
            }
            return response;
        }
}




