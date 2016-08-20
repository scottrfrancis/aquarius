aquarius
========

AWS Account setup
-----------------

-	beyond the scope of this README, but sign up for AWS, download your certs, etc. This README assumes that you have credentials installed in `~/.aws/` of your host.

Vagrant setup
-------------

-	download and install [Vagrant](www.vagrantup.com)
-	open a terminal and type `vagrant up` and wait while it's setup
-	after your shiny new vagrant box is up, `vagrant ssh` to get in to it. The rest of this readme is from the perspective of that ssh session.

ensure AWS CLI setup properly
-----------------------------

-	credentials should be in `~/.aws/` The Vagrantfile syncs this folder for the vagrant user as well.
-	test with `aws iot list-things`. Returns an array of things or empty if there are none.

fetch latest aws iot device sdk for node
----------------------------------------

-	run `sh/getSDK.sh`
-	this will place `aws-iot-device-sdk-js` in the project root. The device code depends on this path.

create the thing certs and entries
----------------------------------

-	`sh/mkThing.sh Aqua-Mock` will create policies, certs, and entries for the thing named 'Aqua-Mock' and place them in the directory `things/Aqua-Mock`

### test account and setup with aws examples

-	`cd aws-iot-device-sdk-js`
-	`npm install`
-	cd `examples`
-	`node thing-example.js --certificate-dir=/vagrant/things/Aqua-Mock --aws-region=US-WEST-2 --test-mode=2`
	-	you may need to adjust the region based on your account
-	in the AWS IOT console, make a fresh MQTT client connection and subscribe to `$aws/things/RGBLedLamp/shadow/#`
	-	you should see a bunch of shadow document updates roughly every 10s
	-	if you see the updates, then all is well and you can proceed to setup the Aquarius Mock or BBG devices
	-	if not, go back and fix errors

Mock Device
===========

While the target of this project is BeagleBone Green, it's handy to develop with a Mock device, so you can run without hardware access, etc. The `mock` directory has the device code for the Mock Device.

-	setup node modules: `cd mock; npm install`
