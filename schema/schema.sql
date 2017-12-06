
create table dates(
    id serial primary key not null,
    date_id varchar(6) not null,
    title varchar(25) not null,
    first_business varchar(255) not null,
    second_business varchar(255),
    third_business varchar(255)
)

