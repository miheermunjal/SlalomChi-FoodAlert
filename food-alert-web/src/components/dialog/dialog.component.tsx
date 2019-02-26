import * as React from 'react';
import { Dialog, DialogTitle } from 'material-ui';

import { FoodMetric } from 'models/food-metric.model';
import { PieChart } from 'components/home/pie-chart.component';
import { FoodKind, getFoodKindName } from 'models/food-kind.enum';

interface DialogProps {
  type: FoodKind;
  open: boolean;
  metrics: FoodMetric[];
  onRequestClose: () => void;
}

export class SimpleDialog extends React.Component<DialogProps> {
  public constructor(props: DialogProps) {
    super(props);
    require('./dialog.component.scss');
  }

  public render() {
    const { onRequestClose, metrics, ...other } = this.props;

    return (
      <Dialog className="dialog" onRequestClose={this.handleRequestClose} {...other}>
        <DialogTitle>{getFoodKindName(this.props.type)} Pop Tart History</DialogTitle>
        <PieChart activity={metrics} />
      </Dialog>
    );
  }

  handleRequestClose = () => {
    this.props.onRequestClose();
  }

  handleListItemClick = () => {
    this.props.onRequestClose();
  }
}
