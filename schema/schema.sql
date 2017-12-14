
create table dates(
    id serial primary key not null,
    date_id varchar(6) not null,
    title varchar(25) not null,
    first_business varchar(255) not null,
    second_business varchar(255),
    third_business varchar(255),
    date_location varchar(50),
    date_radius integer,
    day varchar(50),
    start_time integer,
    duration varchar(15)
)

