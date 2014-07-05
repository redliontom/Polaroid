﻿drop table if exists public.user cascade;
create table public.user (
    username text primary key,
    password text not null,
    email text unique default null,
    forename text default null,
    surname text default null,
    privacy boolean default false,
    status boolean default false
);

drop table if exists public.friend cascade;
create table public.friend (
    user1 text references public.user (username),
    user2 text references public.user (username),
    status boolean default false
);

drop table if exists public.photo cascade;
create table public.photo (
    id serial primary key,
    username text references public.user (username),
    title text,
    description text,
    aperture text,
    exposuretime text,
    iso text,
    focallength text,
    flash text,
    time timestamp
);

drop table if exists public.comment cascade;
create table public.comment (
    username text references public.user (username),
    photo int references public.photo (id),
    text text default null,
    time timestamp default current_timestamp
);

drop table if exists public.like cascade;
create table public.like (
    username text references public.user (username),
    photo int references public.photo (id)
);

drop table if exists public.message cascade;
create table public.message (
    id serial primary key,
    fromuser text references public.user (username),
    touser text references public.user (username),
    subject text default null,
    text text default null,
    time timestamp default current_timestamp
);
