
create table dates(
    id serial primary key not null,
    date_id bigint not null,
    title varchar(25) not null,
    first_buisness varchar(255) not null,
    second_buisness varchar(255),
    third_buisness varchar(255)
)

