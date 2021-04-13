# Elasticsearch Project

## build & run image

`docker build -t tung/elasticsearch .`
`docker run -p 9200:9300 -e "discovery.type=single-node" tung/elasticsearch`

## run docker-compose

`docker-compose up`
