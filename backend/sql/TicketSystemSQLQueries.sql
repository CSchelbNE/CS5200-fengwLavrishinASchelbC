USE ticket_system;

SELECT * FROM users;


DROP TABLE ticket;
create table ticket(
ticket_id SERIAL primary key,
priority varchar(64) not null,
date_created date not null,
status varchar(64) not null,
user_id INT,
CONSTRAINT ticket_fk1 foreign key(user_id) references users(user_id)
on update restrict on delete restrict
);

DROP TABLE problem; 
TRUNCATE TABLE problem;
create table problem(
problem_id SERIAL primary key,
subject varchar(25) NOT NULL,
type varchar(64) NOT NULL,
description varchar(255) NOT NULL,
ticket_id INT,
CONSTRAINT problem_fk1 foreign key(ticket_id) references ticket(ticket_id)
on update restrict on delete restrict
);


INSERT INTO ticket (priority,date_created,status,user_id) VALUES ("low","2020-02-05","open",10);
INSERT INTO problem (subject, type,description,ticket_id) VALUES ("Unable to access records", "Financial Aid", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Duis posuere diam tortor, nec condimentum nunc fringilla at.", 0);
SELECT * FROM users;
SELECT * FROM ticket;
SELECT * FROM problem;