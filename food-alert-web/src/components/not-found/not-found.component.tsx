import * as React from 'react';

export class NotFoundComponent extends React.Component {
  constructor(props: {}) {
    super(props);
  }

  render() {
    document.title = 'Not Found';

    return (
      <div>
        <h1>Route Not Found</h1>
      </div>
    );
  }
}
