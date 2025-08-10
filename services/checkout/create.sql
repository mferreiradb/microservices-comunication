drop table if exists orders;
drop table if exists courses;

create table courses (
    course_id uuid,
    title text,
    amount numeric
);

create table orders (
    order_id uuid,
    course_id uuid,
    name text,
    email text,
    status text,
    amount numeric
);

insert into courses values (
    'db2775ec-5abd-4cc8-aed0-f6973547a91a',
    'Curso teste',
    1000
)