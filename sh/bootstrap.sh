#!/usr/bin/env bash

apt-get update
#apt-get upgrade -y
### it's best to run this manually as the grub update can sometimes cause things to get goofy
#

apt-get install -y curl

# dev tools
apt-get install -y git htop
apt-get install -y jq
apt-get install -y vim
apt-get install -y unzip

# some helpers
cp /vagrant/sh/.vimrc ~/
echo "alias ll='ls -l'">>~/.bashrc
echo "export CLICOLOR=1">>~/.bashrc

# to read md's : pandoc README.md | lynx -stdin
apt-get install -y pandoc lynx

#
# nodejs install
#
curl -sL https://deb.nodesource.com/setup_4.x | bash -
apt-get install -y nodejs

apt-get install -y build-essential

npm install --global gulp-cli

#
# AWS CLI
#
apt-get install python-pip -y
pip install --upgrade pip
pip install awscli
