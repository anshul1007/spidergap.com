//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::                                                                               :::
//:::  This module is used to get the partner list of given radius (in KM) from the :::
//:::  given coordinates                                                            :::
//:::                                                                               :::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

exports.getPartnersList = getPartnersList;

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::                                                                               :::
//:::  This function filter the partner list for given radius (in KM) & coordinates.:::
//:::  It reads the json file to get the partner coordinates and get the distance   :::
//:::  between two locations before applying the radius filter.                     :::
//:::  Result is sort by company name (ascending)                                   :::
//:::                                                                               :::
//:::  Definitions:                                                                 :::
//:::    west/south latitudes are negative, east/north longitudes are positive      :::
//:::                                                                               :::
//:::  Passed to function:                                                          :::
//:::    radius = offices within given distance (in KM)                             :::
//:::    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)        :::
//:::                                                                               :::
//:::  Result:                                                                      :::
//:::    partner list, sorted by company name (ascending)                           :::
//:::                                                                               :::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
function getPartnersList(radius, lat, lon, partners) {
    var result = [];
    // validate the input, if they are number
    if (radius && !isNaN(radius) && lat && !isNaN(lat) && lon && !isNaN(lon) && typeof (partners) === 'object') {
        try {
            for (var p of partners) {
                if (p && p.offices) {
                    for (var o of p.offices) {
                        const point2 = o.coordinates.split(','); // split coordinates to get lat & lon
                        if (point2 && point2.length === 2) {
                            const dist = distance(lat, lon, Number(point2[0]), Number(point2[1]));
                            //console.log(dist);
                            if (dist <= radius) {
                                result.push({
                                    'companyName': p.organization,
                                    'address': (o.address) ? o.address : ''
                                });
                            }
                        } else {
                            throw "Error: Invalid coordinates for " + JSON.stringify(p);
                        }
                    }
                }
            }
            return sort(result);
        } catch (e) {
            console.log(e);
        }
    } else {
        console.log("Error: Invalid argument");
    }
    return result;
}

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::                                                                               :::
//:::  This function sort the partner list based on company name (ascending).       :::
//:::                                                                               :::
//:::                                                                               :::
//:::  Passed to function:                                                          :::
//:::    Object = list of the partner                                               :::
//:::                                                                               :::
//:::  Result:                                                                      :::
//:::    partner list sorted by company name (ascending)                            :::
//:::                                                                               :::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
function sort(obj) {
    return obj.sort(function (a, b) { return a.companyName > b.companyName })
}

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::                                                                               :::
//:::  This function calculates the distance between two points (given the          :::
//:::  latitude/longitude of those points). It is being used to calculate           :::
//:::  the distance between two locations.                                          :::
//:::                                                                               :::
//:::  Definitions:                                                                 :::
//:::    west/south latitudes are negative, east/north longitudes are positive      :::
//:::                                                                               :::
//:::  Passed to function:                                                          :::
//:::    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)        :::
//:::    lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)        :::
//:::                                                                               :::
//:::  Result:                                                                      :::
//:::    distance in km                                                             :::
//:::                                                                               :::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
function distance(lat1, lon1, lat2, lon2) {
    const radlat1 = deg2rad(lat1); // convert to radians
    const radlat2 = deg2rad(lat2); // convert to radians

    const theta = lon1 - lon2;
    const radtheta = deg2rad(theta); // convert to radians

    // formula reference: https://en.wikipedia.org/wiki/Great-circle_distance#Formulas
    const sigma = Math.acos(Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta));

    const dist = rad2deg(sigma); // convert to degrees
    return (dist * 60 * 1.1515 * 1.609344); // distance *  number of minutes in a degree *  statute miles in a nautical mile * the number of kilometres in a mile
}

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::                                                                               :::
//:::  This function convert degree into radian.                                    :::
//:::                                                                               :::
//:::  Passed to function:                                                          :::
//:::    deg = value in degree                                                      :::
//:::                                                                               :::
//:::  Result:                                                                      :::
//:::    converted degree into radian                                               :::
//:::                                                                               :::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
function deg2rad(deg) {
    return (Math.PI * deg / 180);
}

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::                                                                               :::
//:::  This function convert degree into radian.                                    :::
//:::                                                                               :::
//:::  Passed to function:                                                          :::
//:::    rad = value in radian                                                      :::
//:::                                                                               :::
//:::  Result:                                                                      :::
//:::    converted radian into degree                                               :::
//:::                                                                               :::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
function rad2deg(rad) {
    return (180 * rad / Math.PI);
}