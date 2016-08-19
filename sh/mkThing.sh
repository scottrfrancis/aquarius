#!/bin/bash

### NB:  you need to have the aws cli tools installed:
# pip install awscli
#
#  ALSO:  need to have credentials, etc in ~/.aws
#

THING_NAME=$1

mkdir -p things/$THING_NAME
cd things/$THING_NAME

echo "Making new thing"
aws iot create-thing --thing-name $THING_NAME >thingData.json
# ARN=$(jq '.thingArn' thingData.json)
# echo $ARN; echo ""
echo "Things now:"
aws iot list-things

echo ""; echo "making certs"
aws iot create-keys-and-certificate --set-as-active --certificate-pem-outfile cert.pem --public-key-outfile publickey.pem --private-key-outfile privkey.pem >cert.json
CERTARN=$(jq '.certificateArn' cert.json)
echo $CERTARN
# echo "Certs now:"
# aws iot list-certificates
cp ../aws-iot-rootCA.crt ./

echo ""; echo "making policy"
aws iot create-policy --policy-name "PubSubToAnyTopic" --policy-document file://../iotpolicy.json 2>/dev/null
aws iot attach-principal-policy --principal ${CERTARN//\"/} --policy-name "PubSubToAnyTopic"
aws iot attach-thing-principal --thing-name $THING_NAME --principal ${CERTARN//\"/}
