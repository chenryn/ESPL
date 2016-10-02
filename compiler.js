#!/usr/bin/env node
var pegjs = require("pegjs");
var fs = require('fs')

fs.readFile('spl.peg', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }

    var parser = pegjs.buildParser(data);
    console.log(parser);
});
