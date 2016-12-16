/*
Script to create tables for personalSiteDB
*/

CREATE TABLE User
	(username VARCHAR(20) NOT NULL,
	 firstname VARCHAR(20) NOT NULL,
     lastname VARCHAR(20) NOT NULL,
     password VARCHAR(256) NOT NULL,
     email VARCHAR(40) NOT NULL,
	PRIMARY KEY (username));