--Drop Functions
drop function if exists fn_adddepartments(text) cascade;
drop function if exists fn_viewdepartments1() cascade;
drop function if exists fn_viewdepartmentbyID(int) cascade;
drop function if exists fn_updatedepartments(int,text) cascade;
drop function if exists fn_deleteDepartmentByID(int) cascade;

--Drop Tables
drop table if exists employee cascade;
drop table if exists dept cascade;
