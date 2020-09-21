import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class ErrorCatch extends Component {
  state = { hasError: false, count: 5, prevPath: '' };
  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.setState({ prevPath: this.props.location });
    }
  }

  componentDidCatch(error) {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      // dev code
    } else {
      this.setState({ hasError: true }, () => {
        this.count();
        setTimeout(() => this.go(), 8000);
      });
    }
  }

  count = () => {
    const { count } = this.state;
    const newC = count - 1;
    setTimeout(() => {
      this.setState({ count: newC }, this.count());
    }, 800);
  };

  go = () => {
    const { history, location } = this.props;
    const { prevPath } = this.state;
    console.log(location, prevPath);
    if (prevPath && prevPath.pathname) {
      window.location.href = prevPath.pathname;
    } else window.location.href = ""
  };

  render() {
    const { } = this.props;
    const { hasError, count } = this.state;
    if (hasError) {
      return (
        <Fragment>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <img width={257} height={67} src={'/img/logo.png'} alt="react" />
            <h1>Beklenmedik bir hata ile karşılaşıldı.</h1>
            <p>
              Bir önceki sayfaya yönlendirilmek için{' '}
              <a style={{ padding: 0 }} className={''} onClick={() => this.go()}>
                tıkla
              </a>
              . Bir işlem yapmazsan {count} saniye içerisinde yönlendiriliceksin.
            </p>
            <p>En kısa sürede bu hata çözüme ulaştırılacaktır.</p>
          </div>
        </Fragment>
      );
    }
    return this.props.children;
  }
}

ErrorCatch.contextTypes = {
  t: PropTypes.func.isRequired,
};

export default withRouter(ErrorCatch);
