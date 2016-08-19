#!/bin/bash

aws iot create-policy --policy-name "PubSubToAnyTopic" --policy-document things/iotpolicy.json
