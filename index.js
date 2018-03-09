'use strict';

var keyList = Object.keys;
var native_stringify = JSON.stringify;

function stringify(val, allowUndefined) {
    var i, max, str, keys, key, propVal;

    if (val === true) return 'true';
    if (val === false) return 'false';
    if (val === null) return 'null';

    if (val instanceof Object) {
        if (val.toJSON && typeof val.toJSON === 'function')
            return stringify(val.toJSON(), allowUndefined);

        if (val instanceof Array) {
            str = '[';
            max = val.length - 1;
            for(i = 0; i < max; i++)
                str += stringify(val[i], false) + ',';
            if (max > -1) {
                str += stringify(val[i], false);
            }

            return str + ']';
        }

        // only object is left
        keys = keyList(val).sort();
        max = keys.length;
        str = '';
        i = 0;
        while (i < max) {
            key = keys[i];
            propVal = stringify(val[key], true);
            if (propVal !== undefined) {
                if (str) {
                    str += ',';
                }
                str += native_stringify(key) + ':' + propVal;
            }
            i++;
        }
        return '{' + str + '}';
    }

    switch (typeof val) {
    case 'function':
    case 'undefined':
        return allowUndefined ? undefined : null;
    case 'string':
        return native_stringify(val);
    default:
        return isFinite(val) ? val : null;
    }
}

module.exports = function(obj) { return '' + stringify(obj, false); };
