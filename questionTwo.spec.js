const questionTwo = require('./questionTwo');
const assert = require('assert');

console.log('partner list unit tests');

function should_return_single_data() {
    console.log('should return single data');
    const src = [
      {
          "id": 1,
          "organization": "Balance at Work",
          "offices": [
            {
                "address": "Suite 1308, 109 Pitt St \nSydney 2000",
                "coordinates": "-33.8934219,151.20404600000006"
            }
          ]
      },
      {
          "id": 2,
          "organization": "Spring Development",
          "offices": [
            {
                "location": "Singapore",
                "address": "Ocean Financial Centre, Level 40, 10 Collyer Quay, Singapore, 049315",
                "coordinates": "1.28304,103.85199319999992"
            },
            {
                "location": "London, UK",
                "address": "St Saviours Wharf, London SE1 2BE",
                "coordinates": "51.5014767,-0.0713608999999451"
            }
          ]
      },
      {
          "id": 3,
          "organization": "Talent Lab",
          "offices": [
            {
                "address": "Emerson 150 - 503, Colonia Chapultepec Morales, Delegación Miguel Hidalgo, México City, Mexico, CP 11570",
                "coordinates": "19.4361004,-99.18870959999998"
            }
          ]
      }];

    const target = questionTwo.getPartnersList(100, 51.515419, -0.141099, src);

    assert.equal(target.length, 1);
    assert.equal(target[0].companyName, "Spring Development");
    assert.equal(target[0].address, "St Saviours Wharf, London SE1 2BE");
};

function should_return_multiple_data() {
    console.log('should return multiple data');
    const src = [
      {
          "id": 1,
          "organization": "Balance at Work",
          "offices": [
            {
                "address": "Suite 1308, 109 Pitt St \nSydney 2000",
                "coordinates": "-33.8934219,151.20404600000006"
            }
          ]
      },
      {
          "id": 2,
          "organization": "Spring Development",
          "offices": [
            {
                "location": "Singapore",
                "address": "Ocean Financial Centre, Level 40, 10 Collyer Quay, Singapore, 049315",
                "coordinates": "51.500767,-0.0713608999999451"
            },
            {
                "location": "London, UK",
                "address": "St Saviours Wharf, London SE1 2BE",
                "coordinates": "51.5014767,-0.0713608999999451"
            }
          ]
      },
      {
          "id": 3,
          "organization": "Talent Lab",
          "offices": [
            {
                "address": "Emerson 150 - 503, Colonia Chapultepec Morales, Delegación Miguel Hidalgo, México City, Mexico, CP 11570",
                "coordinates": "51.500767,-0.0713608999999451"
            }
          ]
      }];

    const target = questionTwo.getPartnersList(100, 51.515419, -0.141099, src);

    assert.equal(target.length, 3);
};

should_return_single_data();
should_return_multiple_data();