'use strict';

var React = require('react');

var component = {

	foo: function() {

	},

	render: function() {
		return (
			React.DOM.div({})
		);
	}
};

module.exports = React.createClass(component);
