'use strict';
var fs = require('fs'),
  expect = require('chai').expect,
  path   = require('path'),
  _      = require('lodash'),
  execSync = require('child_process').execSync,
  swaggerCmd = 'node ' + path.resolve(__dirname, '..', 'bin', 'swagger.js');

describe('swagger-cli dereference command', function () {

  it('running the \'swagger validate\' command on a valid swagger file passes successfully', function () {
    var returnBuffer = execSync(swaggerCmd + ' validate tests/swaggerSample/swagger.yaml');
    var outputArray = returnBuffer.toString().split('\n');

    outputArray = _.remove(outputArray, function(item) {
      return item !== '';
    });

    expect(outputArray).to.deep.equal([
      'Validating file: tests/swaggerSample/swagger.yaml',
      'File validated successfully'
    ]);
  });

  it('running the \'swagger validate -R\' command on a valid swagger file passes successfully', function () {
    var returnBuffer = execSync(swaggerCmd + ' validate -R tests/swaggerSample/swagger.yaml');
    var outputArray = returnBuffer.toString().split('\n');
    outputArray = _.remove(outputArray, function(item) {
      return item !== '';
    });

    expect(outputArray).to.deep.equal([
      'Validating file: tests/swaggerSample/swagger.yaml',
      'File validated successfully'
    ]);
  });

  it('running the \'swagger validate -X\' command on a valid swagger file passes successfully', function () {
    var returnBuffer = execSync(swaggerCmd + ' validate -R tests/swaggerSample/swagger.yaml');
    var outputArray = returnBuffer.toString().split('\n');

    outputArray = _.remove(outputArray, function(item) {
      return item !== '';
    });

    expect(outputArray).to.deep.equal([
      'Validating file: tests/swaggerSample/swagger.yaml',
      'File validated successfully'
    ]);
  });

  it('running the \'swagger validate\' command on an invalid swagger file produces the expected error', function () {
    var errorMessageArray = [];
    try {
      //Run with improper file
      execSync(swaggerCmd + ' validate tests/swaggerSamplle/slaggeas');
    }
    catch (error) {
      errorMessageArray = error.message.split('\n');
    }
    expect(errorMessageArray[0]).to.equal('Command failed: '+ swaggerCmd +' validate tests/swaggerSamplle/slaggeas');
  });

  it('running the \'swagger dereference\' command on a valid swagger file passes successfully', function () {
    var returnBuffer = execSync(swaggerCmd + ' dereference tests/swaggerSample/swagger.yaml');
    var outputArray = returnBuffer.toString().split('\n');

    outputArray = _.remove(outputArray, function(item) {
      return item !== '';
    });

    var successDereference = require('./swaggerSample/testFiles/successDereference.json');

    expect(outputArray).to.deep.equal([
      'Dereferencing file: tests/swaggerSample/swagger.yaml',
      'File parsed successfully',
      JSON.stringify(successDereference)
    ]);
  });

  it('running the \'swagger dereference -D\' command on a valid swagger file passes successfully', function () {
    var returnBuffer = execSync('swagger dereference -D tests/swaggerSample/swagger.yaml');
    var outputArray = returnBuffer.toString().split('\n');

    outputArray = _.remove(outputArray, function(item) {
      return item !== '';
    });

    var successDereference = require('./swaggerSample/testFiles/noExternalDereference.json');

    expect(outputArray).to.deep.equal([
      'Dereferencing file: tests/swaggerSample/swagger.yaml',
      'File parsed successfully',
      JSON.stringify(successDereference)
    ]);
  });

  it('running the \'swagger dereference -o\' command on a valid swagger file outputs metadata to designated file', function () {
    //remove leftover testfile
    if (fs.existsSync('tests/swaggerSample/test.json')) {
      fs.unlinkSync('tests/swaggerSample/test.json');
    }

    var returnBuffer = execSync('swagger dereference -o tests/swaggerSample/test.json tests/swaggerSample/swagger.yaml');
    var outputArray = returnBuffer.toString().split('\n');

    outputArray = _.remove(outputArray, function(item) {
      return item !== '';
    });

    expect(outputArray).to.deep.equal([
      'Dereferencing file: tests/swaggerSample/swagger.yaml',
      'File parsed successfully',
      'Writing parsed data to file tests/swaggerSample/test.json',
      'Parsed data successfully written to file'
    ]);

    expect(require('./swaggerSample/test.json')).to.deep.equal(require('./swaggerSample/testFiles/successDereference.json'));

    fs.unlinkSync('tests/swaggerSample/test.json');
  });
  
  it('running the \'swagger dereference\' command on an invalid swagger file produces the expected error', function () {
    var errorMessageArray = [];
    try {
      //Run with improper file
      execSync('swagger dereference tests/swaggerSamplle/slaggeas');
    }
    catch (error) {
      errorMessageArray = error.message.split('\n');
    }
    expect(errorMessageArray[0]).to.equal('Command failed: swagger dereference tests/swaggerSamplle/slaggeas');
  });

});
