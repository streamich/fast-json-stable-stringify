'use strict';

var keyList = Object.keys;

function stringify(val, isArrayProp) {
    var i, max, str, keys, key, propVal;

    if (val === true) return 'true';
    if (val === false) return 'false';

    switch (typeof val) {
    case 'object':
        if (val === null) return null;
        else if (val.toJSON && typeof val.toJSON === 'function')
            return stringify(val.toJSON(), isArrayProp);

        if (val instanceof Array) {
            str = '[';
            max = val.length - 1;
            for(i = 0; i < max; i++)
                str += stringify(val[i], true) + ',';
            if (max > -1) {
                str += stringify(val[i], true);
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
            propVal = stringify(val[key], false);
            if (propVal !== undefined) {
                if (str) {
                    str += ',';
                }
                str += JSON.stringify(key) + ':' + propVal;
            }
            i++;
        }
        return '{' + str + '}';
    case 'function':
    case 'undefined':
        return isArrayProp ? null : undefined;
    case 'string':
        return JSON.stringify(val);
    default:
        return isFinite(val) ? val : null;
    }
}

module.exports = function(val) {
    var returnVal = stringify(val, false);

    if (returnVal !== undefined) {
        return '' + returnVal;
    }
};
