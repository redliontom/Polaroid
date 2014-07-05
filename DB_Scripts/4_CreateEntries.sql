insert into public.user(username, password, email, forename, surname, privacy, status) 
	values ('valid', crypt('password', gen_salt('bf', 8)), 'test@user.valid', 'forename', 'surname', true, true);

insert into public.user(username, password, email, forename, surname, privacy, status) 
	values ('invalid', crypt('password', gen_salt('bf', 8)), 'test@user.invalid', 'forename', 'surname', true, false);

insert into public.user(username, password, email, forename, surname, privacy, status) 
	values ('private', crypt('password', gen_salt('bf', 8)), 'test@user.private', 'forename', 'surname', false, true);

insert into public.user(username, password, email, forename, surname, privacy, status) 
	values ('impossible', crypt('password', gen_salt('bf', 8)), 'test@user.impossible', 'forename', 'surname', false, false);
