CREATE TABLE user(
  id int(6) AUTO_INCREMENT,
  username varchar(255) NOT NULL,
  email varchar(255) NULL,
  password varchar(255) NOT NULL,
  PRIMARY KEY(id)
);