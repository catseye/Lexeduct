Lexeduct
========

**Lexeduct** is an experimental framework for text-processing pipelines, written
in Javascript, usable in both node and in the browser (knock on wood.)

It is currently at a what is this I don't even stage of development.  The
framework and usage and everything is subject to change without notice.

Basic Usage
-----------

The main tool is `lexeduct.js`.  You can `cd` into the `src` directory and run
it as `./lexeduct.js`, or you can put the `src` directory on your executable
search path (e.g. `export PATH=$PATH:/path/to/lexeduct/src`) and run it as
`lexeduct.js` from anywhere on your system.  (YMMV on Windows.)

The basic usage is

    lexeduct.js {filter}

So, for example,

    echo 'Hello!' | lexeduct.js upper

will dump the string `HELLO!` to standard output.

You can of course use shell pipelines to compose filters:

    cat input.txt | lexeduct.js upper | lexeduct.js double-space

*Or* you can name multiple filters on `lexeduct.js`'s command line to compose
them:

    lexeduct.js upper double-space <input.txt

Filters
-------

The idea is that this repository will eventually contain a giant catalogue
of possible text filters that can be composed.  Or at least, more than four.

Each filter is in a seperate Javascript file in the `src/filter` directory
which exports, node-style, a single function called `makeFilter` which takes
a configuration object and returns a filter function.  The filter function
takes two arguments: the current string of text to process, and (optionally)
an object which can be used to store ancillary state.  It should return
either a string, or null (not yet supported), or an array of strings (not yet
supported.)

As a simple example, here is the source of the `upper` filter, found
in `src/filter/upper.js`:

    module.exports = {
        makeFilter: function(cfg) {
            return function(line, state) {
                return line.toUpperCase();
            };
        }
    };

`state` is an object whose members may be read or written to store ancillary
state.  (Doing so will make it an 'impure' pipeline.)

TODO
----

*   Allow filters to take parameters, possibly.
*   Allow filters to do something at the very end, maybe.
*   Many, many other things.
