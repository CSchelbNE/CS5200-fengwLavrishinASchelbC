DROP DATABASE IF EXISTS ticket_system;
CREATE DATABASE ticket_system;
USE ticket_system;

DROP TABLE IF EXISTS users;
create table users(
	user_id SERIAL primary key,
	password char(64) not null,
    type VARCHAR(10) not null,
	name varchar(64) NOT NULL UNIQUE,
	address varchar(64) not null,
	email varchar(64) not null UNIQUE
);

DROP TABLE IF EXISTS ticket;
create table ticket(
ticket_id SERIAL primary key,
priority varchar(64) not null,
date_created date not null,
status varchar(64) not null,
user_id BIGINT UNSIGNED,
CONSTRAINT ticket_fk1 foreign key(user_id) references users(user_id)
on update restrict on delete restrict
);

DROP TABLE IF EXISTS problem; 
create table problem(
problem_id SERIAL primary key,
subject varchar(25) NOT NULL,
type varchar(64) NOT NULL,
description varchar(255) NOT NULL,
ticket_id BIGINT UNSIGNED,
CONSTRAINT problem_fk1 foreign key(ticket_id) references ticket(ticket_id)
on update restrict on delete restrict
);

DROP TABLE IF EXISTS approval;
create table approval(
	approvalid SERIAL primary key,
	status varchar(64) NOT NULL,
	ticket_id BIGINT UNSIGNED,
	CONSTRAINT approval_fk1 foreign key(ticket_id) references ticket(ticket_id)
	on update restrict on delete restrict
);


DROP PROCEDURE IF EXISTS createTicket;
DELIMITER $$
CREATE PROCEDURE createTicket(IN n_subject VARCHAR(25), IN n_type VARCHAR(64), IN n_description VARCHAR(255),
								IN n_priority VARCHAR(64), IN n_status VARCHAR(64), IN n_date_created DATE,
                                n_user_id BIGINT UNSIGNED)
	BEGIN
		declare n_ticket_id int unsigned default 0;
		INSERT INTO ticket (priority,date_created,status,user_id) VALUES (n_priority, n_date_created, n_status, n_user_id);
        SET n_ticket_id = last_insert_id();
        INSERT INTO problem (subject, type,description,ticket_id) VALUES (n_subject, n_type, n_description, n_ticket_id);
        SELECT * FROM ticket NATURAL JOIN problem WHERE ticket_id = n_ticket_id;
END $$
DELIMITER ;

DROP PROCEDURE IF EXISTS createTicketWithApproval;
DELIMITER $$
CREATE PROCEDURE createTicketWithApproval(IN n_subject VARCHAR(25), IN n_type VARCHAR(64), IN n_description VARCHAR(255),
								IN n_priority VARCHAR(64), IN n_status VARCHAR(64), IN n_date_created DATE,
                                n_user_id BIGINT UNSIGNED)
	BEGIN
		declare n_ticket_id int unsigned default 0;
		INSERT INTO ticket (priority,date_created,status,user_id) VALUES (n_priority, n_date_created, n_status, n_user_id);
        SET n_ticket_id = last_insert_id();
        INSERT INTO problem (subject, type,description,ticket_id) VALUES (n_subject, n_type, n_description, n_ticket_id);
        INSERT INTO approval (status, description, type, ticket_id) VALUES ("REQUIRES APPROVAL",n_ticket_id);
        SELECT * FROM ticket NATURAL JOIN problem WHERE ticket_id = n_ticket_id;
END $$
DELIMITER ;

-- Admin Username: admin1 Password: abc123
-- Tech Username: tech1 Password: 123abc
INSERT INTO users (password, name, address, email, type)
    VALUES("$2b$12$CVFokaV.Cxyp1emjsAq6ZOkYMhKJwbkgW4O729c8cUlpmYJbeKr9S", "admin1", "abcd", "admin@neu.edu", "admin"),
    ("$2b$12$Artl91bTDLq4l1X4k4WDG.3IMAdztyZ/6u71syfHPZRWecnoBB/Cy", "tech1", "abcd", "tech1@neu.edu", "tech");

