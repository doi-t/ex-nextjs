#!/bin/bash

set -ex

zip -r function.zip .
aws lambda update-function-code --function-name apprunner-demo-pre-token-generator --zip-file fileb://function.zip
