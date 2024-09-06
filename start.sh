#!/bin/bash

# start java server
rm magic.log
nohup java -jar ./datamagic-0.5.0.jar > magic.log 2>&1 &

# start node server
pm2 start ./dataexplorer/server.js --log explorer.log

# stop java server
#lsof -i:9527
# kill 12345

# stop node server
#pm2 delete all


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