//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::                                                                               :::
//:::  This module is used to do the deep clone of give given json object.          :::
//:::  It will copy the simple oject and will not support the circular references,  :::
//:::  map, set etc.                                                                :::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

exports.deepClone = deepClone;

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::                                                                               :::
//:::  This function will take the json object and will do the deep clone.          :::
//:::  It works like as "tree data structure" and call the recursive function       :::
//:::  until it finds the primitive data type.                                      :::
//:::                                                                               :::
//:::  Passed to function:                                                          :::
//:::    obj = valid json object                                                    :::
//:::                                                                               :::
//:::  Result:                                                                      :::
//:::    json object                                                                :::
//:::                                                                               :::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
function deepClone(obj) {
    // console.log(obj);
    if (obj == null || typeof (obj) != 'object') { // return arguments is a primitive data type
        return obj;
    }

    var temp = new obj.constructor();

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            temp[key] = deepClone(obj[key]);
        }
    }
    return temp;
};