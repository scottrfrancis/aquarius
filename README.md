aquarius
========

ensure AWS CLI setup properly
-----------------------------

-	credentials should be in `~/.aws/` The Vagrantfile syncs this folder for the vagrant user as well.
-	test with `aws iot list-things`. Returns an array of things or empty if there are none.

setup IOT policies
------------------

-	`sh/setupIOT.sh` will create the `PubSubToAnyTopic` policy needed to create things

create the thing certs and entries
----------------------------------

-	`sh/mkThing.sh Aqua-Bone`
