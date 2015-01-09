/** @jsx React.DOM */
'use strict';

jest.dontMock('../mockComponent');

var react = require('react/addons');
var reactTestUtil = react.addons.TestUtils;

var mockComponent = require('../mockComponent');

describe('mockComponent function', function() {
	it('can auto-mock functions', function() {
		var componentPath = require.resolve('./mocks/ComponentOne.react');
		var Component = mockComponent(componentPath);
		var component = reactTestUtil.renderIntoDocument(
			react.createElement(Component)
		);
		expect(component.foo).toEqual(jasmine.any(Function));
	});

	it('can auto-mock functions', function() {
		var componentPath = require.resolve('./mocks/ComponentOne.react');
		var Component = mockComponent(componentPath);
		var component = reactTestUtil.renderIntoDocument(
			react.createElement(Component, {
				foo: 'bar'
			})
		);
		expect(component.props.foo).toEqual('bar');
	});
});
