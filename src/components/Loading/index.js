import React from "react";
import PropTypes from "prop-types";
import { CircularProgress } from "@material-ui/core";


const Loading = (props) => {
  const { children, loading, type, style } = props;

  const renderLoading = () => {
    return (
      <div>
        <center style={{ ...style, margin: "auto" }}>
          <CircularProgress style={{ color: "blue" }} />
        </center>
      </div>
    );
  };

  return <>{(loading && renderLoading()) || children}</>;
};

Loading.propTypes = {
  type: PropTypes.oneOf(["normal", "hover"]),
  loading: PropTypes.bool,
  style: PropTypes.object
};

Loading.defaultProps = {
  loading: false,
  type: "normal",
  style: { width: "100%" },
};

export default Loading
