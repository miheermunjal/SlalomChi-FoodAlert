import React from 'react';

export default class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {imagePreviewUrl: ''};
  }

  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    if (file) {
        reader.onloadend = () => {
          this.setState({
            imagePreviewUrl: reader.result
          });

          this.props.onUpload(reader.result);
        }

        reader.readAsDataURL(file);
    }
  }

  render() {
    const { imagePreviewUrl } = this.state;

    let imagePreview = <img className="preview" src='/static/upload-cloud.png' />;
    if (imagePreviewUrl) {
      imagePreview = (<img className="preview" src={imagePreviewUrl} />);
    }

    return (
      <div className="previewComponent">
        <form>
          <label htmlFor='upload'>{imagePreview}</label>
          <input
            id="upload"
            className="fileInput"
            type="file"
            style={{display: 'none'}}
            onChange={(e) => this.handleImageChange(e)} />
        </form>
      </div>
    )
  }
}