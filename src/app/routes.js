import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import TrackUserVisit from '../components/Other/TrackUserVisit';

import SignupLayout from '../components/Layouts/signupLayout';
import DefaultLayout from '../components/Layouts/defaultLayout';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';

import Login from '../pages/Login/Login';
import ResetPassword from '../pages/ResetPassword/ResetPassword';
import CreateAccount from '../pages/CreateAccount/CreateAccount';
import Welcome from '../pages/Welcome/Welcome';

import EmployerProfile from '../pages/Employer/Profile/EmployerProfile';
import JobseekerProfile from '../pages/Jobseeker/Profile/JobseekerProfile';
import ProfileSettings from '../pages/Profile/ProfileSettings/ProfileSettings';
import ProfileEmployerSubscription from '../pages/Profile/ProfileEmployerSubscription/ProfileEmployerSubscription';

import ManageJob from '../pages/ManageJob/ManageJob';
import MyJobs from '../pages/MyJobs/MyJobs';
import Jobs from '../pages/Jobs/Jobs';
import Job from '../pages/Job/Job';
import Jobseekers from '../pages/Jobseekers/Jobseekers';

function RoutesSetup() {
    return (
        <Router>
            <TrackUserVisit />
            <Toaster position="bottom-right" reverseOrder={false} />
            <Routes>
                <Route path="/" element={<SignupLayout />} >
                    <Route path="login" element={
                        <ProtectedRoute userStatus="notLoggedIn">
                            <Login />
                        </ProtectedRoute>}
                    />
                    <Route path="reset-password" element={
                        <ProtectedRoute userStatus="notLoggedIn">
                            <ResetPassword />
                        </ProtectedRoute>}
                    />
                    <Route path="create-account" element={
                        <ProtectedRoute userStatus="notLoggedIn">
                            <CreateAccount />
                        </ProtectedRoute>}
                    />
                    <Route path="welcome" element={
                        <ProtectedRoute userStatus="loggedIn">
                            <Welcome />
                        </ProtectedRoute>}
                    />
                </Route>
                <Route path="/" element={<DefaultLayout />} >
                    <Route path="employers/:slug" element={<EmployerProfile />} />
                    <Route path="jobseekers/:slug" element={<JobseekerProfile />} />

                    <Route path="profile/settings" element={
                        <ProtectedRoute userStatus="loggedIn">
                            <ProfileSettings />
                        </ProtectedRoute>}
                    />
                    <Route path="profile/subscription" element={
                        <ProtectedRoute userStatus="loggedIn" userRole="employer">
                            <ProfileEmployerSubscription />
                        </ProtectedRoute>}
                    />
                    <Route path="profile/my-jobs" element={
                        <ProtectedRoute userStatus="loggedIn" userRole="employer">
                            <MyJobs />
                        </ProtectedRoute>}
                    />

                    <Route path="create-job" element={
                        <ProtectedRoute userStatus="loggedIn" userRole="employer">
                            <ManageJob />
                        </ProtectedRoute>}
                    />
                    <Route path="jobs/:id/edit" element={
                        <ProtectedRoute userStatus="loggedIn" userRole="employer">
                            <ManageJob />
                        </ProtectedRoute>}
                    />

                    <Route path="jobs/saved" element={
                        <ProtectedRoute userStatus="loggedIn" userRole="jobseeker">
                            <MyJobs />
                        </ProtectedRoute>}
                    />

                    <Route path="jobs" element={<Jobs />} />
                    <Route path="jobs/:slug" element={<Job />} />

                    <Route path="jobseekers" element={<Jobseekers />} />

                </Route>
            </Routes>
        </Router>
    );
}

export default RoutesSetup;