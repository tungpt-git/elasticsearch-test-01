# Elasticsearch Project

## run docker-compose

`docker-compose up`

## create videos index

```
PUT videos
{
  "settings": {
    "index": {
      "number_of_shards": 1,
      "number_of_replicas": 1,
      "analysis": {
        "analyzer": {
          "my_analyzer": {
            "tokenizer": "vi_tokenizer",
            "char_filter": [
              "html_strip"
            ],
            "filter": [
              "icu_folding"
            ]
          }
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "segments": {
        "type": "nested",
        "properties": {
          "text": {
            "type": "text",
            "analyzer": "my_analyzer"
          }
        }
      },
      "name": {
        "type": "text",
        "analyzer": "my_analyzer"
      }
    }
  }
}
```

## bulk data to `videos` index

`rm alias:curl`
`curl -H "Content-Type: application/json" -XPOST "localhost:9200/videos/_bulk?pretty&refresh" --data-binary "@data.json"`
