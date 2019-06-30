#!/bin/sh

envFile="/home/app/.env"

adonis migration:run --force

if [ -f "$envFile" ]; then
  source /home/app/.env

  if [ $NODE_ENV == "development" ]; then
    adonis serve --dev
  else
    adonis serve
  fi
else
  adonis serve
fi
