#!/bin/bash

if [ ! -f .env ]; then
    cat env-template > .env
fi

docker run --name apollo-database -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=apollo -e MYSQL_USER=admin -e MYSQL_PASSWORD=admin123 -p 3306:3306 -d mysql:latest

echo "Waiting for MySQL to start..."
while ! docker exec apollo-database mysqladmin --user=admin --password=admin123 --host "127.0.0.1" --port "3306" ping --silent &> /dev/null ; do
    echo -n "."
    sleep 1
done
echo "MySQL started."

npm i

sudo npx prisma db push

echo "GRANT SUPER ON *.* TO 'admin'@'%'; FLUSH PRIVILEGES;" | docker exec -i apollo-database mysql -uroot -proot

docker exec -i apollo-database mysql -uadmin -padmin123 apollo < after_endeks_insert.sql
