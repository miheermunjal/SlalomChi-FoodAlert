#!/bin/bash
gcloud beta functions deploy foodAlertGetMetrics --stage-bucket food-alert-staging --trigger-http
