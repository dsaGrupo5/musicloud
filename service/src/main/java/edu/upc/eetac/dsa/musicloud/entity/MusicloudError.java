package edu.upc.eetac.dsa.musicloud.entity;

import com.fasterxml.jackson.annotation.JsonInclude;


public class MusicloudError {


        private int status;
        private String reason;

        public MusicloudError() { }
        public MusicloudError(int status, String reason) {
            this.status = status;
            this.reason = reason;
        }

        public int getStatus() {return status;}
        public void setStatus(int status) {this.status = status;}
        public String getReason() {return reason;}
        public void setReason(String reason) {this.reason = reason;}

}
