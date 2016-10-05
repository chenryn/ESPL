#!/usr/bin/env node
var pegjs = require("pegjs");
var fs = require('fs')

fs.readFile('spl.peg', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }

    var parser = pegjs.buildParser(data);
    var result1 = parser.parse('key=value | stats count(a) by group1, group2');
    console.log(JSON.stringify(result1[0], null, 2));

    var result2 = parser.parse('* | transaction sessionid startswith="GoogleSoftwareUpdateDaemon"');
    console.log(JSON.stringify(result2[0], null, 2));

    var response = {
      "took" : 119,
      "timed_out" : false,
      "_shards" : {
        "total" : 5,
        "successful" : 5,
        "failed" : 0
      },
      "hits" : {
        "total" : 186,
        "max_score" : 0.0,
        "hits" : [ ]
      },
      "aggregations" : {
        "transId" : {
          "doc_count_error_upper_bound" : 0,
          "sum_other_doc_count" : 0,
          "buckets" : [ {
            "key" : "MacBook-Pro-3.local",
            "doc_count" : 186,
            "transHits" : {
              "hits" : {
                "total" : 186,
                "max_score" : null,
                "hits" : [ {
                  "_index" : "logstash-2016.09.25",
                  "_type" : "logs",
                  "_id" : "AVdhpH2eD44tQ0Hki3TG",
                  "_score" : null,
                  "_source" : {
                    "path" : "/var/log/system.log",
                    "@timestamp" : "2016-09-25T13:59:11.666Z",
                    "@version" : "1",
                    "host" : "MacBook-Pro-3.local",
                    "message" : "Sep 25 21:59:11 MacBook-Pro-3 iTerm2[35939]: Time to encode state for window <PseudoTerminal: 0x7feebbee8040 tabs=3 window=<PTYWindow: 0x7feebbce6cc0 frame=NSRect: {{37, 0}, {1243, 777}} title=1. raochenlin@MacBook-Pro-3: ~ (zsh) alpha=1.000000 isMain=1 isKey=1 isVisible=1 delegate=0x7feebbee8040>>: 0.004862010478973389"
                  },
                  "sort" : [ 1474811951666 ]
                }, {
                  "_index" : "logstash-2016.09.25",
                  "_type" : "logs",
                  "_id" : "AVdhpIDpD44tQ0Hki3TH",
                  "_score" : null,
                  "_source" : {
                    "path" : "/var/log/system.log",
                    "@timestamp" : "2016-09-25T13:59:12.681Z",
                    "@version" : "1",
                    "host" : "MacBook-Pro-3.local",
                    "message" : "Sep 25 21:59:12 MacBook-Pro-3 GoogleSoftwareUpdateDaemon[87448]: 2016-09-25 21:59:12.426 GoogleSoftwareUpdateDaemon[87448/0xb0197000] [lvl=3] -[KSOutOfProcessFetcher(PrivateMethods) helperDidTerminate:] The request timed out. [NSURLErrorDomain:-1001] (The request timed out. [kCFErrorDomainCFNetwork:-1001])"
                  },
                  "sort" : [ 1474811952681 ]
                }, {
                  "_index" : "logstash-2016.09.25",
                  "_type" : "logs",
                  "_id" : "AVdhpIDpD44tQ0Hki3TI",
                  "_score" : null,
                  "_source" : {
                    "path" : "/var/log/system.log",
                    "@timestamp" : "2016-09-25T13:59:12.681Z",
                    "@version" : "1",
                    "host" : "MacBook-Pro-3.local",
                    "message" : "Sep 25 21:59:12 MacBook-Pro-3 GoogleSoftwareUpdateDaemon[87448]: 2016-09-25 21:59:12.426 GoogleSoftwareUpdateDaemon[87448/0xb0197000] [lvl=3] -[KSServerUpdateRequest(PrivateMethods) fetcher:failedWithError:] KSServerUpdateRequest fetch failed. (productID: com.google.Chrome) [com.google.UpdateEngine.CoreErrorDomain:702 - 'https://tools.google.com/service/update2?cup2hreq=94415f3c84fa4743cf622683eff97b4075f1e87965e306daeec1e32eab38cdd0&cup2key=5:1006047555'] (The request timed out. [NSURLErrorDomain:-1001])"
                  },
                  "sort" : [ 1474811952681 ]
                } ]
              }
            }
          } ]
        }
      }
    };
    var func = result2[1];
    var res = func(response);
    console.log(JSON.stringify(res, null, 2));

    var result3 = parser.parse('* | findkeywords message by punct');
    console.log(JSON.stringify(result3[0], null, 2));
});
