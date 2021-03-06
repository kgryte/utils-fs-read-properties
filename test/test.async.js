/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	path = require( 'path' ),
	reviver = require( './fixtures/reviver.js' ),
	basic = require( './fixtures/basic.json' ),
	sections = require( './fixtures/sections.json' ),
	read = require( './../lib/async.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'async', function tests() {

	var file = path.join( __dirname, 'fixtures', 'config.properties' ),
		bad = path.join( __dirname, 'fixtures', 'bad.properties' );

	it( 'should export a function', function test() {
		expect( read ).to.be.a( 'function' );
	});

	it( 'should read a .properties file', function test( done ) {
		read( file, onRead );
		function onRead( error, actual ) {
			if ( error ) {
				assert.ok( false );
			} else {
				assert.deepEqual( actual, basic );
			}
			done();
		}
	});

	it( 'should read a .properties file if provided an options object', function test( done ) {
		read( file, {
			'sections':true,
			'namespaces': true,
			'reviver': reviver
		}, onRead );
		function onRead( error, actual ) {
			if ( error ) {
				assert.ok( false );
			} else {
				assert.deepEqual( actual, sections );
			}
			done();
		}
	});

	it( 'should return an error', function test( done ) {
		read( 'beepboopbapbop', onRead );
		function onRead( error ) {
			if ( error ) {
				assert.ok( error );
				assert.strictEqual( error.code, 'ENOENT' );
			} else {
				assert.ok( false );
			}
			done();
		}
	});

	it( 'should return an error (options object)', function test( done ) {
		read( 'beepboopbapbop', {'sections':true}, onRead );
		function onRead( error ) {
			if ( error ) {
				assert.ok( error );
			} else {
				assert.ok( false );
			}
			done();
		}
	});

	it( 'should return an error if unable to parse file data as .properties', function test( done ) {
		read( bad, {'sections':true}, onRead );
		function onRead( error ) {
			if ( error ) {
				assert.ok( error );
			} else {
				assert.ok( false );
			}
			done();
		}
	});

});
