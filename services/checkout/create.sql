drop table mferreira.orders;
drop table mferreira.courses;

create table mferreira.courses (
    couse_id uuid,
    title text,
    amount numeric
);

create table mferreira.orders (
    order_id uuid,
    course_id uuid,
    name text,
    email text,
    status text,
    amount numeric
);

insert into mferreira.courses values (
    'db2775ec-5abd-4cc8-aed0-f6973547a91a',
    'Curso teste',
    1000
)