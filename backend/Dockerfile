from ubuntu

run apt-get update
run apt-get install -y curl
run curl -sl https://deb.nodesource.com/setup_18.x | bash -
run apt-get upgrade -y
run apt-get install -y nodejs

copy package.json package.json
copy package-lock.json package-lock.json
copy index.js index.js

run npm install

entrypoint ["node", "index.js"]