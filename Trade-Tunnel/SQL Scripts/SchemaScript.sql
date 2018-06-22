
start transaction;

drop database  if exists TradeTunnel;
/*Creating database */
create database TradeTunnel;


/*Use Database */
use TradeTunnel;
 
 
drop table  if exists Userprofile;
/*Creating Table UserProfile*/
create table Userprofile(
id 					int				  Not Null AUTO_INCREMENT,
first_name 		varchar(100) Not Null,  
last_name  		varchar(100) Not Null,
email_id 			varchar(100) Not Null,
pass_word 		varchar(50)   Not Null,
phone_number				varchar(20),
UNIQUE(email_id),
primary key(id)
);


drop table  if exists Address;
  /*Creating Table Address*/
create table Address(
id 						int		Not Null AUTO_INCREMENT, 
street_address1 	varchar(150) Not Null,
street_address2  varchar(150) Not Null,
city 						varchar(100) Not Null,
state 					varchar(100) Not Null,
country 				varchar(100) Not Null,
postal_code 		varchar(50)   Not Null,
user_id 				int 				  Not Null, 
primary key(id),
foreign key (user_id) references Userprofile(id) ON DELETE CASCADE
);

drop table  if exists Categories;
/*Creating Table Categories*/
create table Categories(
id 						 		int 						  Not Null AUTO_INCREMENT,
category_name 			varchar(150)  		  Not Null, 
primary key(id)
);



drop table  if exists Subcategories;
/*Creating Table SubCategories*/
create table SubCategories(
id 							int 					Not Null AUTO_INCREMENT,
subcategory_name varchar(150) 	Not Null , 
category_id 			int 					Not Null,
primary key(id),
foreign key (category_id) references Categories(id) ON DELETE CASCADE
);


drop table  if exists Product;
/*Creating Table Product*/
create table Product(
id 			 		 		int 			     				Not Null AUTO_INCREMENT,
product_name 		varchar(150) 				Not Null,
product_description  varchar(150)				Not Null,
price 						decimal(6,2) 				Not Null,
create_date 			date,
stat  					  	ENUM('sold','unsold') Not Null, 
user_id 					int 								Not Null,
cat_id 						int						       Not Null,
subcat_id 			 	int						       Not Null,
primary key(id),
foreign key (user_id) references Userprofile(id) ON DELETE CASCADE,
foreign key (cat_id)   references Categories(id),
foreign key (subcat_id)   references Subcategories(id) 
);



drop table  if exists Image;
/*Creating Table Iamge*/
create table Image(
id 							int 					Not Null AUTO_INCREMENT,
image_name 			varchar(150)	Not Null,
image_data 			LONGBLOB,
prod_id 					int					 Not Null,
primary key(id), 
foreign key (prod_id) references Product(id) ON DELETE CASCADE
);
