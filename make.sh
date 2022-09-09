#!/bin/sh

NODE="node"
cd src
if [ x`which $NODE` != x ]; then
    $NODE gen-lexeduct-transformers.js >../demo/lexeduct-transformers.js
else
    python3 gen-lexeduct-transformers.py >../demo/lexeduct-transformers.js
fi
