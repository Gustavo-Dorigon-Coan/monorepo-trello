CREATE TABLE user_role(
  user_id int(6),
  role_id int(6),
  PRIMARY KEY(user_id, role_id)
);

ALTER TABLE user_role ADD CONSTRAINT fk_user_role_user_id FOREIGN KEY (user_id) REFERENCES user (id);

ALTER TABLE user_role ADD CONSTRAINT fk_user_role_role_id FOREIGN KEY (role_id) REFERENCES role (id);