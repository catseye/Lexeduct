#!/usr/bin/env python

import os
import sys

def write(s):
    sys.stdout.write(s + "\n")

def main(args):
    write("module = {};")
    write("transformer = {};")
    dirname = "transformers"
    for root, dirnames, filenames in os.walk(dirname):
        dirnames[:] = []
        filenames.sort()
        for filename in filenames:
            transformer_name = filename.split('.js')[0]
            with open(os.path.join(dirname, filename)) as f:
                write(f.read())
            write("transformer['%s'] = module.exports;" % transformer_name)

if __name__ == '__main__':
    main(sys.argv[1:])
