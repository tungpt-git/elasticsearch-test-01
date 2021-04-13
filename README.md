# Elasticsearch Project

## docker build -t tung/elasticsearch .

## run image

`docker run -p 9200:9300 -e "discovery.type=single-node" tung/elasticsearch`

## run docker-compose

`docker-compose up`
