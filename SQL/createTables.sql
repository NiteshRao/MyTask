CREATE TABLE dept(id serial primary key,deptname text);
CREATE TABLE employee(id serial primary key, name text, contactno varchar(10),deptid int references dept(id));
