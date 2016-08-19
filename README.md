aquarius
========

ensure AWS CLI setup properly
-----------------------------

-	credentials should be in `~/.aws/` The Vagrantfile syncs this folder for the vagrant user as well.
-	test with `aws iot list-things`. Returns an array of things or empty if there are none.


create the thing certs and entries
----------------------------------

-	`sh/mkThing.sh Aqua-Bone` will create policies, certs, and entries for the thing named 'Aqua-Bone' and place them in the directory `things/Aqua-Bone`
