create businesses(
    
)

create table dates(
    id serial primary key not null,
    title varchar(25) not null,
    first_buisness varchar(255),
    second_buisness varchar(255),
    third_buisness varchar(255),
    geographical_location varchar(255),
    foreign key(first_buisness) references ()
)