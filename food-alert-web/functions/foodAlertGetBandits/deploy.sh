#!/bin/bash
gcloud beta functions deploy foodAlertGetBandits --stage-bucket food-alert-staging --trigger-http
