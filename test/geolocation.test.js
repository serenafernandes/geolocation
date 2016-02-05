'use strict';

describe('LocationInfo', function() {

  beforeEach(function() {
    fixture.base = 'test';
    fixture.load('geolocation.fixture.html');
    geolocation.init();
  });

  it('should get a location', function() {
    sinon.stub($, 'ajax').yieldsTo('success', {
      "country":"Brazil"
    });
    $('#btnMyLocation').click();
    $('#location_country').html().should.equal("Brazil");
    $.ajax.restore();
  });

  it('should reset locations', function() {
    $('#btnMyLocation').click();
    $('#btnResetLocation').click();
    $('#location_country').html().should.equal("");
  });

  it('should get the website location', function() {
    $('#url_input').val("www.google.com");
    $('#btnInsertUrl').click();
  });

});