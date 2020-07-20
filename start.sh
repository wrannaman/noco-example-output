
KEYPATH=/usr/src/api
KEYFILE=config.json
echo "Fetching $KEYFILE"
curl "https://noco-api.default.noco.io/v1/configs?apiKey=HXWWPFD-TCKM4NX-K6D5CYM-YWS083Z&env=dev&type=api" > $KEYPATH/config.json
echo "got keys "
cat $KEYPATH/config.json
npm run start
