#!/bin/bash

# start java server(9527)
nohup java -jar ./magic/datamagic.jar > magic.log 2>&1 &


# start python server (9138)
source ~/seer/env/bin/activate
nohup python ./seer/main.py run > seer.log 2>&1 &


# start node server (3721)
# check server.js for target ip/port
pm2 start ./explorer/server.js --log explorer.log


# memory usage
free -h

# stop python server
# lsof -i:9138
# kill 12345

# stop java server
# lsof -i:9527
# kill 12345

# stop node server
#pm2 delete all


# -----------------------------------------------------------------------
# AWS EC2

#sudo dnf install java-17-amazon-corretto-devel
#java -version

#sudo yum install -y nodejs
#node -v
#npm -v
#sudo npm install -g n
#n -V
#sudo n lts
#hash -r
#node -v

#sudo npm install -g yarn
#yarn -v

#sudo npm install pm2@latest -g
#pm2 -v

#sudo dnf update
#sudo dnf install redis6
#sudo systemctl enable redis6
#sudo systemctl start redis6
#sudo systemctl status redis6
#redis6-cli
#ping (get pong)


#sudo dnf search python3.11
#sudo dnf install python3.11 -y
#sudo dnf install python3.11-pip -y
#python3.11 --version
#python3.11 -m pip --version
# create virtual env
#python3 -m venv seer/env
#source ~/seer/env/bin/activate
#pip install pip --upgrade
#export TMPDIR=$HOME/tmp
#pip install fastapi
# or pip install --no-cache-dir fastapi (no cache is used to avoid space issue)
# or pip install --cache-dir=$HOME/tmp/ fastapi



# -----------------------------------------------------------------------
# Azure VM

#lsb_release -a
#sudo apt update
#sudo apt install redis-server
#sudo nano /etc/redis/redis.conf
# chagne supervised  to systemd
#sudo systemctl restart redis.service
#sudo systemctl status redis
#redis-cli
#ping (get pong)

#sudo apt install openjdk-17-jdk
#java -version

#sudo apt install nodejs
#node -v
#sudo apt install npm
#npm -v
#sudo npm install -g n
#n -V
#sudo n lts
#hash -r
#node -v
#sudo npm install -g yarn
#yarn -v
#sudo npm install pm2 -g
#pm2 -v



#nvm is used to manage/upgrade node js on wondows
#n is used to manage/updated node js on Linux/MacOs

#express/express-generator is used to run node js and dist as web server when DataExplorer is deployed.
#http-proxy-middleware is used to transfer http request to Java server. it looks like a bridge between DataExplorer and DataMagic.
#pm2 is used to start/stop/monitor node js application (another option: node ./server.js)

#debug DataExplorer: yarn dev
#generate static resouces(dist: html/css/img): yarn build
#generate static resources and preview: yarn preview
#preview dist: yan preview:dist
#generate jar package of DataMagic: Maven->deploy (disable test for now)


