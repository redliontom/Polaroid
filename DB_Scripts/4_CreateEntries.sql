insert into public.user(username, password, email, forename, surname, privacy, status) 
	values ('public', crypt('password', gen_salt('bf', 8)), 'test@user.public', 'forename', 'surname', true, true);

insert into public.user(username, password, email, forename, surname, privacy, status) 
	values ('private', crypt('password', gen_salt('bf', 8)), 'test@user.private', 'forename', 'surname', false, true);

insert into public.user(username, password, email, forename, surname, privacy, status) 
	values ('public-invalid', crypt('password', gen_salt('bf', 8)), 'test@user.public-invalid', 'forename', 'surname', true, false);

insert into public.user(username, password, email, forename, surname, privacy, status) 
	values ('private-invalid', crypt('password', gen_salt('bf', 8)), 'test@user.private-invalid', 'forename', 'surname', false, false);
