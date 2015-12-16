package edu.upc.eetac.dsa.musicloud;

import org.glassfish.grizzly.http.server.HttpServer;
import org.glassfish.jersey.grizzly2.httpserver.GrizzlyHttpServerFactory;
import org.glassfish.jersey.server.ResourceConfig;

import java.io.IOException;
import java.net.URI;
import java.util.PropertyResourceBundle;
import java.util.ResourceBundle;


public class Main
{
    private static String baseURI;
    public static HttpServer startServer() {

        final ResourceConfig rc = new MusicloudResourceConfig();
        return GrizzlyHttpServerFactory.createHttpServer(URI.create(getBaseURI()), rc);
    }
    public static void main(String[] args) throws IOException {

        final HttpServer server = startServer();
    //    final HttpServer server = startServer();
    //    System.out.println(String.format("Jersey app started with WADL available at "
    //            + "%sapplication.wadl\nHit enter to stop it...", getBaseURI()));
    //    System.in.read();
    //    server.shutdownNow();
    }
    public static String getBaseURI() {
        if (baseURI == null) {
            PropertyResourceBundle prb = (PropertyResourceBundle) ResourceBundle.getBundle("musicloud");
            baseURI = prb.getString("musicloud.context");
        }
        return baseURI;
    }
}

