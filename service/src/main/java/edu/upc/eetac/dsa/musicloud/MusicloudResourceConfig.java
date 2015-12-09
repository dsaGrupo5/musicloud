package edu.upc.eetac.dsa.musicloud;

import org.glassfish.jersey.server.ResourceConfig;

public class MusicloudResourceConfig extends ResourceConfig {
    public MusicloudResourceConfig() {
        packages("edu.upc.eetac.dsa.musicloud");
    }
}
