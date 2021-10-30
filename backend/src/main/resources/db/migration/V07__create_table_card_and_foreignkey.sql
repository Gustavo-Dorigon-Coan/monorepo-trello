CREATE TABLE card(
  id int(6) AUTO_INCREMENT,
  title varchar(250) NOT NULL,
  description varchar(250) NOT NULL,
  list_of_cards_id int(6),
  done boolean DEFAULT false,
  PRIMARY KEY(id)
);

ALTER TABLE card ADD CONSTRAINT fk_card_list_of_cards_id FOREIGN KEY (list_of_cards_id) REFERENCES list_of_cards(id);