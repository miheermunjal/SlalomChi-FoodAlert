import * as React from 'react';

interface BanditProps {
}

interface BanditState {
}

export class BanditsComponent extends React.Component<BanditProps, BanditState> {
  constructor(props: BanditProps) {
    super(props);
    require('./bandits.component.scss');
  }

  public render() {
    return (
      <div className="bandits-component">
        <h1>Bandits</h1>
      </div>
    );
  }
}
