import 'react-perfect-scrollbar/dist/css/styles.css';
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './redux/store';
import { Provider } from 'react-redux';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';


import StudentDashboard from './pages/student/Dashboard';
import ExamRecords from './pages/student/ExamRecords';

import AdminDashboard from './pages/admin/Dashboard';
import CreateUser from './pages/admin/CreateUser';

import TeacherDashboard from './pages/teacher/Dashboard';
import CreateExam from './pages/teacher/CreateExam';
import ManageExam from './pages/teacher/ManageExam';

import Login from './pages/Login';
import Register from './pages/Register';

let { store, persistor } = configureStore();

const App = () => {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Router>
            <Switch>
              <PrivateRoute role="student" path="/student/records" component={ExamRecords} />
              <PrivateRoute role="student" path="/student" component={StudentDashboard} />
              
              <PrivateRoute role="teacher" path="/teacher/exams/:id" component={ManageExam} />
              <PrivateRoute role="teacher" path="/teacher/exams/add" component={CreateExam} />
              <PrivateRoute role="teacher" path="/teacher" component={TeacherDashboard} />
              
              <PrivateRoute role="admin" path="/admin/add-teacher" component={CreateUser} />
              <PrivateRoute role="admin" path="/admin" component={AdminDashboard} />

              <PublicRoute path="/login" component={Login} />
              <PublicRoute path="/register" component={Register} />

              {/* <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute path="/profile" component={Profile} />

              <PrivateRoute role="radiographer" path="/radiology" component={RadiologyForm} />

              <PrivateRoute role="doctor" path="/patient_list" component={PatientList} />

              <PrivateRoute role="doctor" path="/patient_details/:id" component={PatientDetails} />

              <PrivateRoute role="doctor" path="/doctor_message/:id" component={DoctorMessage} />
              <PrivateRoute role="doctor" path="/doctor_message_list" component={DoctorMessageList} />

              <PrivateRoute role="admin" path="/admin/create" component={CreateStaff} />
              <PrivateRoute role="admin" path="/admin" component={StaffList} />

              <PrivateRoute role="patient" path="/readings" component={Readings} />
              <PrivateRoute role="doctor" path="/readings_add/:id" component={ReadingsAdd} />
              <PrivateRoute role="doctor" path="/readings_edit/:id/:reading_id" component={ReadingsEdit} />
              <PrivateRoute role="patient" path="/patient_message_list" component={PatientMessageList} />
              <PrivateRoute role="patient" path="/patient_message/:id" component={PatientMessage} />
              <PrivateRoute path="/schedule_appointment" component={ScheduleAppointment} />
              <PrivateRoute path="/appointments" component={Appointments} />
              <PrivateRoute path="/scans" component={ScanReports} /> */}

              
              {/* <Route path="/forgotpassword" component={ForgotPassword} /> */}
              {/* <Route component={NotFound} /> */}
              <Redirect to="/student" />
            </Switch>
          </Router>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
