import React from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

const override = `
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 50vh;
  div {
    padding-left:10px;
    padding-right:10px;
  }
`;

class LoaderPage extends React.Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);
  }

  render() {
    return (
      <div className="sweet-loading">
        <PropagateLoader
          css={override}
          size={20}
          color={"linear-gradient(329.54deg, #29b6d1 0%, #00c7c7 100%);"}
        />
      </div>
    );
  }
}

export default LoaderPage;
