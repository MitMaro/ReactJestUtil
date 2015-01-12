[![Build Status](https://travis-ci.org/MitMaro/ReactJestUtil.svg)](https://travis-ci.org/MitMaro/ReactJestUtil)

# React Jest Utility Library

Testing react components in Jest can be a real pain at times. This library aims
to add several utility functions that should make that process easier.

## Installation

    npm install --save-dev react-jest-util

If using the automocking feature of jest you should add **'node_modules/react-jest-util'**
to the **unmockedModulePathPatterns** list in your config.

## API

### mockComponent

This is similar to `mockCompoent` in the react test utilities but does a lot
more. It will auto-mock all non-react functions in a component and restore props
to the mock.

#### Accessing mocked functions

For convenience a reference to all the mocked methods of a component can be found
as a key-value pair in `mockedComponent.mockedMethods`.

#### Signature

    object ReactJestUtil.mockComponent(string modulePath [, string tagName = 'div' [, object methods]])

`modulePath` is the absolute path to the module, you can use `require.resolve`
(or `require.requireActual.resolve` if in the context of jest) to obtain the
absolute path from a relative path. `tagName` is an optional tag name that will
be used for the mocked component, defaults to **div**. `methods` is an object of
key-method pairs that will be attached to the created component. This will also
overwrite any react added methods, such as render.

#### Complete Usage Example

    var ReactJestUtil = require('react-jest-util');
    var mockedComponentPath = require.resolve('../path/to/component');
    var mockedComponent = ReactJestUtil.mockComponent(mockedComponentPath, 'Tag Name', {
        render: function() {
            return react.createElement(
                'MyTestTag',
                this.props,
                this.props.children
                );
            }
        });
    console.log(mockedComponent.mockedMethods.foo.mock.calls); // assuming foo exists as a method on component

`mockedComponent` will contain a fully mocked React component that can be used
in React Test Utilities `renderIntoDocument`.

### log

Using `console.log` on React components can cause Jest to blowup because of too
much ocntent being printed to **stdout**. This function uses node's
`util.inspect` to print information about the object while keeping the
amount of information printed low. It will also show information that otherwise
would not be shown with `console.log(obj)`.

#### Signature

    ReactJestUtil.log(object obj [, integer depth = 0])

`obj` is the object to inspect and output and `depth` would be how deep to recurse
into the object.

#### Usage

    var myObj = {
        foo: {
            bar: 'foobar'
        }
    }

    ReactJestUtil.log(myObj, 1);
    -> { foo: { bar: [Object] } }

## License

React Jest Utility Library is released under the [MIT](http://opensource.org/licenses/MIT)
license. See LICENSE.
