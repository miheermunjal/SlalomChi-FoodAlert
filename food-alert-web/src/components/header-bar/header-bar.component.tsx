import { AppBar, Toolbar, Typography } from 'material-ui';
import * as React from 'react';

interface HeaderBarProps {
  title: string;
}

export class HeaderBar extends React.Component<HeaderBarProps, {}> {
  constructor(props: HeaderBarProps) {
    super(props);
    require('./header-bar.component.scss');
  }

  public render() {
    const { title } = this.props;

    return (
      <AppBar position="static" className="header-bar-component">
        <Toolbar>
          <Typography type="title" color="inherit">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}
