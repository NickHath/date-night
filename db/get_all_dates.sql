select * from dates
where LOWER(date_location) = LOWER($1);