var expect = require('chai').expect;
var mocha = require('mocha');

module.exports = function() {

  describe('sumByID', function() {
    
    var dataDescription;
    var headerRow;
    var X;
    var trainingLength;

    before(function(done) {

      console.time('joiningData time');
      pyControllerWmt.on('message', function(message) {
        if(message.type === 'join.py') {

          dataDescription = message.text[1];
          trainingLength = message.text[2];
          headerRow = message.text[3];
          X = message.text[0];

          console.timeEnd('joiningData time');
          done();
        }
      });
    });

    // should have a certain number of columns
    it('should have columns from the input data and join data', function() {
      expect( X.length ).to.equal(14);
    });
    // compare the sums of columns to known correct values

    it('should include all the X data', function() {
      expect( X.length ).to.equal( 99999 + 41088 )
    });

    it('should only include joinFile values that match up to a row in X', function() {
      // TODO: add in fake values to our dataset
      function noNonMatchedValues() {
        for( var i = 0; i < X.length; i++) {
          for( var j = 0; j < X[i].length; j++) {
            if( j === 'SHOULD_NOT_EXIST' ) {
              return X[i];
            }
          }
        }
        return true;
      }

      expect( noNonMatchedValues() ).to.be.true;

    });

    // ideally, test for cases where we pass in a join value, and cases where we do not, and just match it up based on matching header names
    // dataDescription row should have certain values and a certain length
    it('should have accurate dataDescription values for all columns', function() {
      var expectedDataDescription = ["Categorical","Categorical","Categorical","Categorical","Categorical","Categorical","Categorical","Categorical","Continuous","Categorical","Categorical","Categorical","Categorical"];
      expect( dataDescription.length ).to.equal(14);
      expect( dataDescription ).to.deep.equal( expectedDataDescription );
    })
    // header row should have certain values and a certain length
    it('should have accurate headerRow values for all columns', function() {
      var expectedHeader = ["Store","DayOfWeek","Sales","Open","Promo","StateHoliday","SchoolHoliday","StoreType","Assortment","CompetitionDistance","CompetitionOpenSinceYear","Promo2","Promo2SinceYear","PromoInterval"];
      expect( headerRow.length ).to.equal(14);
      expect( headerRow ).to.deep.equal( expectedHeader );
    })

    after(function() {
      dataDescription = null;
      headerRow = null;
      X = null;
      trainingLength = null;
    });
    
  });


};