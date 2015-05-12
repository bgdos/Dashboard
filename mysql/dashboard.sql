create database dashboard
create table subcontractor
(   
id int not null primary key auto_increment,
nombre varchar(50) not null
);
         
create table line
 (
     id int not null primary key auto_increment,
     description varchar(5) not null
);
create table subassy
(
    id int not null primary key auto_increment,
    description varchar(50) not null 
);
create table type
(
    id int primary key not null auto_increment,
    descripction varchar(15) not null
);
create table users
(
    id int not null primary key auto_increment,
    email varchar(50) not null,
    password varchar(50) not null,
    name varchar(50) not null,
    lastname varchar(50) not null,
    type_Id int not null,
    subcontractor_Id int not null
);
alter table users add foreign key (type_Id) references type(id);
alter table users add foreign key (subcontractor_Id) references subcontractor(id);

create table model
(
    id int not null primary key auto_increment,
    number int not null,
    owner varchar(50) not null,
    lot int not null,
    sdate date not null,
    line_Id int not null
);
alter table model add foreign key (line_Id) references line(id);

create table po
(
    id int not null primary key,-- numero de orden de compra
    fecha date not null,
    subcontractor_Id int not null
);
alter table po add foreign key (subcontractor_Id) references subcontractor(id);

create table material
(
    id int not null primary key auto_increment,
    number int not null,
    description varchar(50),
    qty int not null,
    model_Id int not null,
    po_Id int not null
);
alter table material add foreign key (model_Id) references model(id);
alter table material add foreign key (po_Id) references po(id);

create table produced
(
    id int not null primary key auto_increment,
    qty int not null,
    p_date date not null,
    model_Id int not null,
    material_Id int null
);
alter table produced add foreign key (model_Id) references model(id);
alter table produced add foreign key (material_Id) references material(id);

create table delivery
(
    id int not null primary key auto_increment,
    qty int not null,
    d_date date not null,
    total int not null,
    model_Id int not null,
    material_Id int not null
);
alter table delivery add foreign key (model_Id) references model(id);
alter table delivery add foreign key (material_Id) references material(id);

create table schedule
(
    id int not null primary key auto_increment,
    fecha date not null,
    sdate date not null,
    lot int not null,
    model_Id int not null,
    line_Id int not null
);
alter table schedule add foreign key (model_Id) references model(id);
alter table schedule add foreign key (line_Id) references line(id);
