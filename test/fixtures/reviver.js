'use strict';

/**
* FUNCTION: reviver( key, value, section )
*	.properties reviver.
*
* @param {String} key - .properties key
* @param {String} value - .properties value
* @param {String} section - .properties section
* @returns {*} revived value
*/
function reviver( key, value ) {
	/* jshint validthis:true */
	var vals;

	// Do not split section lines...
	if ( this.isSection ) {
		return this.assert();
	}
	// Split comma-delimited strings...
	if ( typeof value === 'string' ){
		vals = value.split( ',' );
		return ( vals.length === 1 ) ? value : vals;
	}
	// Do not split the rest of the lines:
	return this.assert();
} // end FUNCTION reviver()


// EXPORTS //

module.exports = reviver;
