#!/bin/bash

cd ..

zip -r devstore_backend.zip . -x "node_modules/*" -x "dist/*"