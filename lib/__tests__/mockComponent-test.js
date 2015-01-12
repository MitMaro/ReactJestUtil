/** @jsx React.DOM */
'use strict';

jest.dontMock('../mockComponent');

var react = require('react/addons');
var reactTestUtil = react.addons.TestUtils;

var mockComponent = require('../mockComponent');

describe('mockComponent function', function() {
	it('can auto-mock functions without props', function() {
		var componentPath = require.resolve('./mocks/ComponentOne.react');
		var Component = mockComponent(componentPath);
		var component = reactTestUtil.renderIntoDocument(
			react.createElement(Component)
		);
		expect(component.foo).toEqual(jasmine.any(Function));
	});

	it('can auto-mock functions with props retained', function() {
		var componentPath = require.resolve('./mocks/ComponentOne.react');
		var Component = mockComponent(componentPath);
		var component = reactTestUtil.renderIntoDocument(
			react.createElement(Component, {
				foo: 'bar'
			})
		);
		expect(component.props.foo).toEqual('bar');
	});

	it('can auto-mock functions over-writting render', function() {
		var componentPath = require.resolve('./mocks/ComponentOne.react');
		var Component = mockComponent(componentPath, null, {
			render: function() {
				return react.createElement(
					'MyTestTag',
					this.props,
					this.props.children
				);
			}
		});
		var component = reactTestUtil.renderIntoDocument(
			react.createElement(Component)
		);

		var span = reactTestUtil.findRenderedDOMComponentWithTag(component, 'MyTestTag');
		expect(span).not.toBeUndefined();
	});

	it('can auto-mock functions with additional methods', function() {
		var componentPath = require.resolve('./mocks/ComponentOne.react');
		var Component = mockComponent(componentPath, 'MyTag', {
			newMethod: function() {}
		});
		var component = reactTestUtil.renderIntoDocument(
			react.createElement(Component)
		);
		expect(component.newMethod).not.toBeUndefined();
	});

	it('retains the overwritten render when given additional methods', function() {
		var componentPath = require.resolve('./mocks/ComponentOne.react');
		var Component = mockComponent(componentPath, null, {
			newMethod: function() {}
		});
		var component = reactTestUtil.renderIntoDocument(
			react.createElement(Component, {
				foo: 'bar'
			})
		);

		// react utils render doesn't keep props, if prop exists we are good
		expect(component.props.foo).toEqual('bar');
	});
});
