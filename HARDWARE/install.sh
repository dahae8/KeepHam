#!/bin/bash

sudo apt-get update && sudo apt-get upgrade -y
sudo apt install vim -y
pip3 install kafka-python

# QR

pip3 install zbar-py

# complete

echo "complete"