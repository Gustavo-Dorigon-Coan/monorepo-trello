insert into user (id, username, email, password) values (1,"Admin", "admin@yopmain.com", "$2a$10$LlH7ODzQf9mlfb8HMLusue/f6Be3yf80VrZjaV2RpdgLZ5YbEdjCy");

insert into role (id, name) values (1, "ROLE_ADMIN");
insert into role (id, name) values (2, "ROLE_USER");

insert into user_role (user_id, role_id) values (1,1);