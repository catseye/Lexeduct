#!/bin/sh

assert() {
    COMMAND=$1
    EXPECTED=$2
    RESULT=`eval $COMMAND`
    if [ "x$RESULT" != "x$EXPECTED" ]; then
        echo "FAIL    : $COMMAND"
        echo "Expected: $EXPECTED"
        echo "Got     : $RESULT"
        exit 1
    fi
}

assert "echo 'Hello' | src/lexeduct.js upper" "HELLO"
assert "echo 'Hello' | src/lexeduct.js lower" "hello"
assert "echo 'Hello' | src/lexeduct.js chars=' ' insert-chars" "H e l l o "
assert "echo 'Hello' | src/lexeduct.js chars='a' insert-chars upper" "HAEALALAOA"
assert "echo 'Hello' | src/lexeduct.js upper chars='a' insert-chars" "HaEaLaLaOa"
