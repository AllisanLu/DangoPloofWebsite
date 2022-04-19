DROP DATABASE IF EXISTS DangoPloof;
CREATE DATABASE IF NOT EXISTS DangoPloof;
USE DangoPloof;

DROP TABLE IF EXISTS website_user;
CREATE TABLE website_user (
  username varchar(100) NOT NULL,
  pw varchar(100) NOT NULL,
  PRIMARY KEY (username)
) ENGINE=InnoDB;
