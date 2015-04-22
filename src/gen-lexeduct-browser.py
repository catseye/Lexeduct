#!/usr/bin/env python

# Written in Python right now, but should be converted to node for consistency.

import os

def main():
    print "module = {};"
    print "makeFilter = {};"
    for filename in os.listdir('filter'):
        if not filename.endswith('.js'):
            continue
        filter_name = filename[:-3]
        print
        with open(os.path.join('filter', filename), 'r') as f:
            print f.read()
        print "makeFilter['%s'] = module.exports.makeFilter;" % filter_name


if __name__ == '__main__':
    main()
