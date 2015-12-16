package edu.upc.eetac.dsa.musicloud;


public interface MusicloudMediaType {
    public final static String MUSICLOUD_AUTH_TOKEN =          "application/vnd.dsa.musicloud.auth-token+json";
    public final static String MUSICLOUD_USER =                "application/vnd.dsa.musicloud.user+json";
    public final static String MUSICLOUD_CANCION =             "application/vnd.dsa.musicloud.cancion+json";
    public final static String MUSICLOUD_CANCION_REPRODUCCION ="application/vnd.dsa.musicloud.cancion_reproduccion+json";
    public final static String MUSICLOUD_GENERO =              "application/vnd.dsa.musicloud.genero+json";
    public final static String MUSICLOUD_GENERO_COLECCION =    "application/vnd.dsa.musicloud.genero.coleccion+json";
    public final static String MUSICLOUD_CANCION_COLECCION =   "application/vnd.dsa.musicloud.cancion.coleccion+json";
    public final static String MUSICLOUD_ROOT =                "application/vnd.dsa.musicloud.root+json";
}
