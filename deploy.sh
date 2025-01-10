#!/bin/bash

docker compose down
docker compose build backend frontend
docker compose up -d