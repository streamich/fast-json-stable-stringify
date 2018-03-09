'use strict';

var test = require('tape');
var stringify = require('../');
var tests = require('../benchmark/test.json');
var expect = require('chai').expect;

for (var i = 0; i < tests.length; i++) {
    var json = tests[i];

    test('Benchmark - ' + i, function (t) {
        var str = stringify(json);
        var back = JSON.parse(str);
        expect(back).to.eql(json);
        t.end();
    });
}
