import Auth from './Auth'
import HomeController from './HomeController'
import DashboardController from './DashboardController'
import AdminController from './AdminController'
import DoctorController from './DoctorController'
import PatientController from './PatientController'
import ReviewController from './ReviewController'
import Settings from './Settings'
const Controllers = {
    Auth: Object.assign(Auth, Auth),
HomeController: Object.assign(HomeController, HomeController),
DashboardController: Object.assign(DashboardController, DashboardController),
AdminController: Object.assign(AdminController, AdminController),
DoctorController: Object.assign(DoctorController, DoctorController),
PatientController: Object.assign(PatientController, PatientController),
ReviewController: Object.assign(ReviewController, ReviewController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers