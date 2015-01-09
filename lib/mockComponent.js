'use strict';

var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

// list of items in a react class to not auto-mock
var reactClassBlacklistItems = [
	'constructor',
	'getDOMNode',
	'mixins',
	'statics',
	'propTypes',
	'contextTypes',
	'childContextTypes',
	'getDefaultProps',
	'getInitialState',
	'getChildContext',
	'render',
	'componentWillMount',
	'componentDidMount',
	'componentWillReceiveProps',
	'shouldComponentUpdate',
	'componentWillUpdate',
	'componentDidUpdate',
	'componentWillUnmount',
	'updateComponent'
];

module.exports = function mockComponent(modulePath, tagName) {

	var component;

	try {
		component = require.requireActual(modulePath);
	}
	catch (e) {
		throw new Error(
			'Invalid module path provided: ' + modulePath + '\n' +
			'Did you forget to use require.resolve?'
		);
	}

	var componentProto = component.type.prototype;
	var componentMock = jest.genMockFromModule(modulePath);

	// ** this section can be mostly replaced in react 0.13
	tagName = tagName || componentMock.mockTagName || 'div';
	TestUtils.mockComponent(componentMock, tagName);

	// overwrite the render to include the props
	componentMock.type.prototype.render = function() {
		return React.createElement(
			tagName,
			this.props,
			this.props.children
		);
	};
	// **

	var componentItems = Object.keys(componentProto);

	for (var i = 0; i < componentItems.length; i++) {

		// ignore blacklist items
		if (reactClassBlacklistItems.indexOf(componentItems[i]) !== -1) {
			continue;
		}

		// ignore react prefixed items
		if (componentItems[i].substring(0, 7) === '__react') {
			continue;
		}

		// don't automock non-functions
		if (typeof (componentProto[componentItems[i]]) !== 'function') {
			continue;
		}

		// mock anything that makes it to this point
		componentMock.type.prototype[componentItems[i]] = jest.genMockFunction();
	}
	return componentMock;
};
