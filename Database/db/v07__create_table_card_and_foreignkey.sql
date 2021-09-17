CREATE TABLE card(
  id int(6) AUTO_INCREMENT,
  titulo varchar(250) NOT NULL,
  descricacao varchar(250) NOT NULL,
  list_id int(6),
  isdone boolean DEFAULT false,
  PRIMARY KEY(id)
);

ALTER TABLE card ADD CONSTRAINT fk_card_list_id FOREIGN KEY (list_id) REFERENCES list(id);