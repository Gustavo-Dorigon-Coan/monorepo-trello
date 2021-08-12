docker build -t trellodb .

docker run -d -p 3306:3306 --name trello-db -e MYSQL_ROOT_PASSWORD=admin -e MYSQL_DATABASE=TrelloDB -e MYSQL_USER=admin -e MYSQL_PASSWORD=admin trellodb