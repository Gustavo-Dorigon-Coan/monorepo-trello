CREATE TABLE comment(
id int(6),
comment varchar(255) null,
created_at timestamp NULL,
card_id int(6),
PRIMARY KEY(id)
);

ALTER TABLE comment ADD CONSTRAINT fk_comment_card_id FOREIGN KEY (card_id) REFERENCES card (id);
