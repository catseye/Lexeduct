Lexeduct
========

**Lexeduct** is an experimental framework for text-processing pipelines, written
in Javascript, usable in both node and in the browser (knock on wood.)

It is currently at a *what is this I don't even* stage of development.  The
framework and usage and everything is subject to change without notice.

Being a framework, Lexeduct inevitably handles some use cases well, and other
use cases poorly.  Don't expect too much from it.  More details here soon.

The name "Lexeduct" is in analogy with "aqueduct": conduits for words intead
of water.

Basic Usage
-----------

The main tool is `lexeduct.js`.  You can `cd` into the `src` directory and run
it as `./lexeduct.js`, or you can put the `src` directory on your executable
search path (e.g. `export PATH=$PATH:/path/to/lexeduct/src`) and run it as
`lexeduct.js` from anywhere on your system.  (YMMV on Windows.)

The basic usage is

    lexeduct.js {param=value|transformer-name}

So, for example,

    $ echo 'Hello!' | lexeduct.js upper
    HELLO

Parameters can be given with the syntax `name=value` before the name of the
transformer they are to be applied to.  So, for example,

    $ echo 'Hello' | lexeduct.js chars=e remove-chars
    Hllo

You can of course use shell pipelines to compose transformers:

    $ echo 'Hello!' | lexeduct.js upper | lexeduct.js 'chars= ' insert-chars
    H E L L O !

*Or* you can name multiple transformers on `lexeduct.js`'s command line to
compose them:

    $ echo 'Hello!' | lexeduct.js upper 'chars= ' insert-chars
    H E L L O !

Multiple transformers are applied left-to-right.

    $ echo 'Hello!' | lexeduct.js 'chars=a' insert-chars upper
    HAEALALAOA!A

    $ echo 'Hello!' | lexeduct.js upper 'chars=a' insert-chars
    HaEaLaLaOa!a

Transformers
------------

The idea is that this repository will eventually contain a giant catalogue
of possible text transformers that can be composed.  Or at least, more than
are presently included.

Each transformer is in a seperate Javascript file in the `src/transformers`
directory which exports, node-style, a single function called `makeTransformer`
which takes a configuration object and returns a transformer function.  The
transformer function takes two arguments: the current string to process, and
(optionally) an object which can be used to store ancillary state.  Every
transformer function should return either a string, or null (not yet supported),
or an array of strings (not yet supported.)

As a simple example, here is the source of the `upper` transformer, found
in `src/transformers/upper.js`:

    module.exports = {
        makeTransformer: function(cfg) {
            return function(str, state) {
                return str.toUpperCase();
            };
        }
    };

`state` is an object whose members may be read or written to store ancillary
state.  (Doing so will make it an 'impure' pipeline.)

Acknowledgements
----------------

Lexeduct was partly inspired by, and is partly a product of parallel evolution
resembling, [Michael Paulukonis][]'s [TextMunger][].  It is also indebted to
various and sundry discussion with him and others on the
[GenerativeText Forum][].

TODO
----

*   Allow filters to do something at the very end, maybe.
*   Allow filters return multiple, or no, strings.
*   Many, many other things.

[Michael Paulukonis]:   https://github.com/MichaelPaulukonis/
[TextMunger]:           https://github.com/MichaelPaulukonis/text-munger
[GenerativeText Forum]: https://groups.google.com/forum/#!forum/generativetext
