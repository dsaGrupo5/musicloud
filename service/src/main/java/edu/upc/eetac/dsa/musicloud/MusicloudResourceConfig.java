package edu.upc.eetac.dsa.musicloud;

import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.server.filter.RolesAllowedDynamicFeature;

public class MusicloudResourceConfig extends ResourceConfig {
    public MusicloudResourceConfig() {

        packages("edu.upc.eetac.dsa.musicloud");
        packages("edu.upc.eetac.dsa.musicloud.auth");
        register(RolesAllowedDynamicFeature.class);
    }
}
