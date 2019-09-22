import React from "react";

class Upload extends React.Component {

  /**
   * Render the upload form.
   *
   * @returns {JSX.Element} The element to be rendered
   * @memberof Upload
   */
  public render(): JSX.Element {
    return (
      <form
        id="uploadForm"
        action="/api/upload"
        method="post"
        encType="multipart/form-data">
        <input type="file" accept=".xlsx" name="excel" />
        <input type="date" name="from" />
        <input type="date" name="to" />
        <input type="submit" value="upload" />
      </form>
    );
  }

}

export default Upload;
