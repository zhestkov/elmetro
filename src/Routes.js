import React, { Component } from "react";
import { Switch, Route } from "react-router";
import { Router } from "react-router-dom";
import { Provider } from "mobx-react";

import Home from "./components/Home";
import Courses from "./components/Courses/Courses";
import Course from "./components/Course/Course";
import Lessons from "./components/Lessons/Lessons";
import Lesson from "./components/Lesson/Lesson";
import Tasks from "./components/Tasks/Tasks";
import Task from "./components/Task/Task";
import Container from "./components/Common";

export class Routes extends Component {
  render() {
    return (
      <Provider>
        <Router history={this.props.history}>
          <Switch>
            <Container>
              <Route exact path="/" component={Home} />

              <Route exact path="/lessons" component={Lessons} />
              <Route path="/lessons/:lessonId" component={Lesson} />

              <Route exact path="/courses" component={Courses} />
              <Route path="/courses/:courseId" component={Course} />

              <Route exact path="/tasks" component={Tasks} />
              <Route path="/tasks/:taskId" component={Task} />
            </Container>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default Routes;

// export default connect(mapStateToProps)(Routes);
// export { Routes };
