CREATE TABLE list(
  id int(6) AUTO_INCREMENT,
  name varchar(250) NOT NULL,
  project_id int (6),
  PRIMARY KEY(id)
);

ALTER TABLE list ADD CONSTRAINT fk_list_project_id FOREIGN KEY (project_id) REFERENCES project (id);