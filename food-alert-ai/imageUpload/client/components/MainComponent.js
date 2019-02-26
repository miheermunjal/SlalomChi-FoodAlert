import React from 'react';
import { upload } from '../services/uploadService';
import ImageUpload from './ImageUploadComponent';

function renderResults(loading) {
    if (loading === 'loading') {
        return <img className='loader' src='/static/loader.gif'/>;
    }

    if (loading === false) {
        return 'ERROR';
    } else if (loading) {
        return 'SUCCESS';
    }
}

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: null,
            label: ''
        };
    }

    onUpload(image) {
        this.setState({
            loading: 'loading'
        });
        upload(image, this.state.label, (err, loading) => this.setState({ loading }));
    }

    handleInput(e) {
        this.setState({
            label: e.target.value
        });
    }

    render() {
        return (
            <div>
                <header>Image Uploader</header>
                <input type="text" onChange={(e) => this.handleInput(e) } />
                <div className="results">{renderResults(this.state.loading)}</div>
                <ImageUpload onUpload={(image) => this.onUpload(image)} />
           </div>
        );
    }
}