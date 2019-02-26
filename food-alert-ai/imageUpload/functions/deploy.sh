#!/bin/bash
gcloud beta functions deploy uploadImage --stage-bucket food-alert-staging --trigger-http
