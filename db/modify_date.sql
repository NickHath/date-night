update dates
set first_business = $2, second_business = $3, third_business = $4
where date_id = $1;