import { cloneDeep } from 'lodash';
import * as React from 'react';
import { FoodMetric } from 'models/food-metric.model';

const ReactHighstock = require('react-highcharts/ReactHighstock');

function getData(requests: FoodMetric[]) {
  return requests.map((request: FoodMetric) => {
    return [new Date(request.timestamp).getTime(), request.percentage];
  });
}

function getSeries(name: string, requests: FoodMetric[]) {
  return {
    name,
    data: getData(requests)
  };
}

interface PieChartProps {
  activity: FoodMetric[];
}

export class PieChart extends React.Component<PieChartProps> {
  render() {
    const { activity } = this.props;

    const config = {
      rangeSelector: {
        selected: 1
      },
      title: {
        text: ''
      },
      series: [
        getSeries('BlueBerry', cloneDeep(activity))
      ]
    };
    return <ReactHighstock config={config} />;
  }
}
