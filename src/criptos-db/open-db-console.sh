#!/bin/sh
docker exec -it criptos-db_mongo_1 \
  mongo -u admin -p Cripto3851 --authenticationDatabase admin criptosite