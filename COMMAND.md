```
GET /videos/_search
```

```
GET /videos/_search
{
  "_source": {
    "includes": ["name"]
  },
  "query": {
    "nested": {
      "path": "segments",
      "query": {
        "match": {
          "segments.text": "hà nội"
        }
      },
      "inner_hits": {
        "size": 10
      }
    }
  }
}
```

```
GET videos/_analyze
{
  "field": "segments.text",
  "text": "chào đón quý vị thính giả đến với chương trình tình yêu hà nội cùng thu minh và bích ngọc"
}

```

```
DELETE /videos?pretty

```

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
