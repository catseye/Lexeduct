Lexeduct
========

**Lexeduct** is an experimental framework for text-processing pipelines, written
in Javascript, usable in both node and in the browser (knock on wood.)

It is currently at a what is this I don't even stage of development.  The
framework and usage and everything is subject to change without notice.

Basic Usage
-----------

The main tool is `lexeduct.js`.  You can run it from the `src` directory.
The basic usage is

    ./lexeduct.js {filter}

So, for example, go into the `src` directory and run

    ./lexeduct.js upper <../README.md

and an uppercased version of this document will be dumped to standard output.

You can of course use shell pipelines to compose filters:

    ./lexeduct.js upper <../README.md | ./lexeduct.js double-space

Or you can name multiple filters on `lexeduct.js`'s command line to compose
them:

    ./lexeduct.js upper double-space <../README.md

Filters
-------

The idea is that this repository will eventually contain a giant catalogue
of possible text filters that can be composed.  Or at least, more than three.

Each filter is in a seperate Javascript file in the `src/filter` directory
which exports, node-style, a single function called `filter` which takes
two arguments.  For example, here is the source of the `upper` filter, found
in `src/filter/upper.js`:

    module.exports = {
        filter: function(line, state) {
            return line.toUpperCase();
        }
    };

`state` is an object whose members may be read or written to store ancillary
state.  (Doing so will make it an 'impure' pipeline.)

TODO
----

*   Add a shell script wrapper which allows `lexeduct.js` to be run from
    any directory, via your executable search path.
*   Allow filters to take parameters, possibly.
*   Allow filters to do something at the very end, maybe.
*   Many, many other things.
