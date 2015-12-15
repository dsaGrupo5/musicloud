package edu.upc.eetac.dsa.musicloud;

    import edu.upc.eetac.dsa.musicloud.dao.AuthTokenDAO;
    import edu.upc.eetac.dsa.musicloud.dao.AuthTokenDAOImpl;
    import edu.upc.eetac.dsa.musicloud.dao.UserDAO;
    import edu.upc.eetac.dsa.musicloud.dao.UserDAOImpl;
    import edu.upc.eetac.dsa.musicloud.entity.AuthToken;
    import edu.upc.eetac.dsa.musicloud.entity.User;
    import javax.annotation.security.RolesAllowed;
    import javax.ws.rs.*;
    import javax.ws.rs.core.*;
    import java.sql.SQLException;

    @Path("login")
    public class LoginResource {

        @Context
        SecurityContext securityContext;
        @RolesAllowed({"administrador","registrado"})
        @Path(("/login_out"))
        @POST
        @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
        public void logout(@FormParam("login") String login, @Context UriInfo uriInfo)throws  SQLException{
            if(login == null ) throw new BadRequestException("all parameters are mandatory");
            UserDAOImpl userDAO = new UserDAOImpl();
            AuthTokenDAO authTokenDAO = new AuthTokenDAOImpl();
            try {authTokenDAO.deleteToken(userDAO.obtener_User_por_Login(login).getId());}
            catch (SQLException e) {throw new InternalServerErrorException();}
        }

        @Path(("/login_in"))
        @POST
        @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
        @Produces(MusicloudMediaType.MUSICLOUD_AUTH_TOKEN)
        public AuthToken login(@FormParam("login") String login, @FormParam("password") String password){
            if(login == null || password == null)
                throw new BadRequestException("all parameters are mandatory");

            User user = null;
            String id = null;
            Boolean token = null;
            AuthToken authToken = null;
            try{

                UserDAO userDAO = new UserDAOImpl();
                user = userDAO.obtener_User_por_Login(login);
                AuthTokenDAO authTokenDAO = new AuthTokenDAOImpl();
                id = user.getId();
                token = authTokenDAO.obtenerToken(id);
                if(token == true)
                    throw new WebApplicationException("Ya estas logeado ", Response.Status.CONFLICT);

                if(user == null)
                    throw new BadRequestException("login = " + login + " not found.");
                if(!userDAO.check_Password(user.getId(), password))
                    throw new BadRequestException("incorrect password");


                authToken = authTokenDAO.createAuthToken(user.getId());
            }catch(SQLException e){
                throw new InternalServerErrorException();
            }
            return authToken;
        }
    }

