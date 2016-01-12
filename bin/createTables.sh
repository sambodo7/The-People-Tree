mysql_config_editor set --login-path=mysql-path --host=localhost --user=root --password

mysql --login-path=mysql-path the_people  < ../db/CreateTable.sql

mysql_config_editor remove --login-path=mysql-path
