#!/bin/bash

sudo docker run -it --rm --name djavan_web -p 6001:6001 -p 6002:6002 -v /mnt/browser/XRoute/TruckTechnologyServicesUG/rhino/code/djavan-web:/usr/src/app -w /usr/src/app node:6.3 ./entrypoint_dev.sh
