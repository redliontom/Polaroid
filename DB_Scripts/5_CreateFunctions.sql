drop function if exists func_verify_user(text, text);
create function func_verify_user(_username text, _passwordPlain text)
	returns boolean
	as $$
declare
	_passwordHash text := (select password from public.user where username=_username);
	_passwordSent text := (crypt(_passwordPlain, gen_salt('bf', 8)));
begin
	if(_passwordHash=_passwordSent) then 
		return true;
	end if;

	return false;
end
$$ language plpgsql;


drop function if exists func_hash(text);
create function func_hash(_text text)
	returns boolean
	as $$
declare
	_hash text := (crypt(_text, gen_salt('bf', 8)));
begin
	return _hash;
end
$$ language plpgsql;


drop function if exists func_change_user_name(text, text, text);
create function func_change_user_name(_username text, _forename text, _surname text)
	returns boolean
	as $$
declare
	_count int := (select count(*) from public.user where username=_username);
begin
	if (_count = 0) then
		return false;
	end if;
	
	update public.user set forename=_forename, surname=_surname where username=_username;
	return true;
end
$$ language plpgsql;


drop function if exists func_change_user_mail(text, text);
create function func_change_user_mail(_username text, _mail text)
	returns boolean
	as $$
declare
	_count int := (select count(*) from public.user where username=_username);
begin
	if (_count = 0) then
		return false;
	end if;
	
	update public.user set email=_mail where username=_username;
	return true;
end
$$ language plpgsql;


drop function if exists func_change_user_password(text, text, text);
create function func_change_user_password(_username text, _old text, _new text)
	returns boolean
	as $$
declare
	_password text := (select password from public.user where username=_username);
	_count int := (select count(*) from public.user where username=_username and password=crypt(_old, _password));
begin
	if (_count = 0) then
		return false;
	end if;
	
	update public.user set password=crypt(_new, gen_salt('bf', 8)) where username=_username;
	return true;
end
$$ language plpgsql;
