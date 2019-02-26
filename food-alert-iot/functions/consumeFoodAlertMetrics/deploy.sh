#!/bin/bash
gcloud beta functions deploy consumeFoodAlertMetrics --stage-bucket food-alert-staging --trigger-topic food-alert-readings
