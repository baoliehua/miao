import React, { PureComponent, Fragment } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Home from './home'
import Subscription from './subscription/loadable'
import Collection from './collection/loadable'
import Login from './login/loadable'
import Wiki from './wiki'
import { actionCreators } from './store';

class Views extends PureComponent {
  render() {
    return (
      <Fragment>
        <Switch>
          <Route exact path={`${process.env.PUBLIC_URL}/`} component={Home} />
          <Route exact path={`${process.env.PUBLIC_URL}/subscription`} component={Subscription} />
          <Route exact path={`${process.env.PUBLIC_URL}/login`} component={Login} />
          <Route exact path={`${process.env.PUBLIC_URL}/collection/:keyword`} component={Collection} />
          <Route exact path={`${process.env.PUBLIC_URL}/wiki/:title`} component={Wiki}/>
        </Switch>
      </Fragment>
    )
  }
  componentWillUpdate(nextProps) {
    const { pathChange } = this.props
    const path = nextProps.location.pathname
    pathChange(path)
  }
}

const mapDispatchToProps = (dispatch) => ({
  pathChange(path) {
    dispatch(actionCreators.pathChangeAction(path))
  }
})

export default connect(null, mapDispatchToProps)(withRouter(Views))