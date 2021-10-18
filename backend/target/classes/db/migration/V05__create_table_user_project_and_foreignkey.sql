CREATE TABLE user_project(
  user_id int(6),
  project_id int(6)
);

ALTER TABLE user_project ADD CONSTRAINT fk_user_project_user_id FOREIGN KEY (user_id) REFERENCES user (id);

ALTER TABLE user_project ADD CONSTRAINT fk_user_project_project_id FOREIGN KEY (project_id) REFERENCES project (id);