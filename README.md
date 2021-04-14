# Elasticsearch Project

## build & run image

`docker build -t tung/elasticsearch .`
`docker run -p 9200:9300 -e "discovery.type=single-node" tung/elasticsearch`

## bulk data to `videos` index

`rm alias:curl`
<br/>

`curl -H "Content-Type: application/json" -XPOST "localhost:9200/videos/_bulk?pretty&refresh" --data-binary "@data.json"`

## run docker-compose

`docker-compose up`
