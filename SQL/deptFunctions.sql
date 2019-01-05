--Add Procedure
CREATE OR REPLACE FUNCTION fn_adddepartments(param_deptname text) RETURNS void
    LANGUAGE plpgsql
    AS 
$BODY$	
begin
Insert into dept(deptname)
Values(param_deptname);
end
$BODY$;

--Get All Procedure
CREATE OR REPLACE FUNCTION fn_viewdepartments1() 
RETURNS Table (id int,deptname text)
    LANGUAGE plpgsql
    AS $BODY$
begin
    return query
select * from dept order by id;
end;
$BODY$;

--Get By ID Procedure
CREATE OR REPLACE FUNCTION fn_viewdepartmentbyID(param_deptid integer) 
RETURNS Table (id int,deptname text)
    LANGUAGE plpgsql
    AS $BODY$
begin
    return query
select * from dept d
where d.Id=param_deptid order by d.id;
end;
$BODY$;

--Update Procedure
CREATE OR REPLACE FUNCTION fn_updatedepartments(param_deptid integer, param_deptname text) 
RETURNS void
    LANGUAGE plpgsql
    AS 
 $BODY$	
begin 
update  dept set deptname=param_deptname
where id=param_deptid;
end
$BODY$;

--Delete Procedure
CREATE OR REPLACE FUNCTION fn_deleteDepartmentByID(param_deptid integer) 
RETURNS void
    LANGUAGE plpgsql
    AS $BODY$
begin
delete from dept where id=param_deptid;
end;
$BODY$;
