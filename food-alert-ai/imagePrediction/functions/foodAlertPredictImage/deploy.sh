#!/bin/bash
gcloud beta functions deploy foodAlertPredictImage --stage-bucket food-alert-staging --trigger-http
