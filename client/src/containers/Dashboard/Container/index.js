import React from "react";
import { withRouter } from "react-router-dom";
import Layout from '../../../components/Layout';

const Container = (props, context) => {
  const { location } = props;

  return <Layout />;
};

export default withRouter(Container);
