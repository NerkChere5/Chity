`Residency`(
  `id` int auto_increment,
  `state` varchar (40),
  `region` varchar (40),
  `zone` varchar (40),
  `locality` varchar (40),
  `street` varchar (40),
  `house` varchar (10),
  `corpus` varchar (10),
  `flat` int (5),
  `check_in_date` datetime,
  `eviction_date` datetime,
  `registered` varchar(100),
  
  primary key (id)
)

`Users`(
  `id` int auto_increment,
  `surname` varchar (20),
  `name` varchar (15),
  `patronymic` varchar (20),
  `birthdate` datetime,
  `registration_number_tutor` int (11),
  `registration_number` int (11),
  `sex` varchar (7),
  `date_coming` datetime,
  
  primary key (id)
)

`Military`(
  `id` int auto_increment,
  `location` varchar (50),
  `part_name` varchar (50),
  `part_number` float,
  `date_acceptance` datetime,
  `date_production` datetime,
  
  primary key (id)
)
