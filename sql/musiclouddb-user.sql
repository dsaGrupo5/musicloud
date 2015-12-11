drop user 'musicloud'@'localhost';
create user 'musicloud'@'localhost' identified by 'musicloud';
grant all privileges on musiclouddb.* to 'musicloud'@'localhost';
flush privileges;
