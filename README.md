# ESPL

Elastic Search Processing Language

> Search Processing Language (SPL) encompasses all the search commands and their functions, arguments, and clauses. Its syntax was originally based on the Unix pipeline and SQL. The scope of SPL includes data searching, filtering, modification, manipulation, insertion, and deletion. -- Splunk Docs

There are several products using SPL syntax now: Splunk, SumoLogic, Rizhiyi, Juttle, XpoLog, Azure Search etc. Why not Elasticsearch?

**NOTE**: _This is only a DSL parser now, it can't do anything out of ES query._

## commands

exists commands:

* stats FUNCTION() [by FIELDS]
  * count
  * avg
  * max
  * min
  * es
  * pct\<X\>
* predict FUNCTION() window=\<window\> [SETTINGS]
* bucket <date> span=\<interval\>
* findkeywords [FIELD] by \<FIELDS\>
* transaction <FIELD> [startswith=STRING] [endswith=STRING] [maxevents=INT]

todo commands:

* dedup \<X\> [FIELDS]
* eval val=PATTERN
* fields \<FIELDS\>

## Example

1. percentiles in terms sub-aggregation

`status=200 | stats pct75(resp_time) by geo.country, geo.city`

would output the ES queryDSL like:

```json
{
    "query": {
        "query_string": {
            "query": "status:200"
        }
    },
    "aggs": {
        "0": {
            "terms": {
                "field": "geo.country"
            },
            "aggs": {
                "1": {
                    "terms": {
                        "field": "geo.city"
                    },
                    "aggs": {
                        "1": {
                            "percentiles": {
                                "field": "resp_time",
                                "percents": [
                                    75
                                ]
                            }
                        }
                    }
                }
            }
        }
    }
}
```

2. holt-winters predict for date histogram

` * | bucket timestamp span=1.5h | predict avg(resp_time) window=18 alpha=0.7 beta=0.7`

would output the ES queryDSL like:

```json
{
    "query": {
        "query_string": {
            "query": "*"
        }
    },
    "aggs": {
        "aggs": {
            "bucket": {
                "date_histogram": {
                    "field": "time",
                    "interval": "1.5h"
                },
                "aggs": {
                    "0": {
                        "avg": {
                            "field": "resp_time"
                        }
                    },
                    "predict": {
                        "moving_avg": {
                            "bucket_path": "0",
                            "window": 18,
                            "model": "holt_winters",
                            "settings": {
                                "alpha": "0.7",
                                "beta": "0.7"
                            }
                        }
                    }
                }
            }
        }
    }
}
```

## KNOWN ISSUE

1. do not support full text search in query clauses.

## See Also

* [ESQuery in Etsy 411](https://github.com/kiwiz/esquery)
* [peg in timelion](https://github.com/elastic/timelion/blob/master/public/chain.peg)
