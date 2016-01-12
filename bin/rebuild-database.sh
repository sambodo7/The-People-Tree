mysql_config_editor set --login-path=mysql-path --host=localhost --user=root --password

mysql --login-path=mysql-path the_people < ../db/DropTable.sql
echo Tables successfully deleted
mysql --login-path=mysql-path the_people < ../db/CreateTable.sql
echo Tables successfully created
mysql --login-path=mysql-path the_people < ../db/LoadData.sql
echo Data successfully loaded

mysql_config_editor remove --login-path=mysql-path

