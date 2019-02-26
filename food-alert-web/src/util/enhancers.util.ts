declare global {
  interface Window {
    devToolsExtension: () => void;
  }
}

// tslint:disable-next-line:no-any
export const applyEnhancers = (enhancers: any[]): any[] => {
  if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.devToolsExtension;

    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  return enhancers;
};
