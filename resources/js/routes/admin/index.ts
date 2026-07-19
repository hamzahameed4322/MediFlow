import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import users48860f from './users'
import doctorsD3dd26 from './doctors'
/**
* @see \App\Http\Controllers\AdminController::dashboard
 * @see app/Http/Controllers/AdminController.php:36
 * @route 'http://localhost/admin/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: 'http://localhost/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::dashboard
 * @see app/Http/Controllers/AdminController.php:36
 * @route 'http://localhost/admin/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::dashboard
 * @see app/Http/Controllers/AdminController.php:36
 * @route 'http://localhost/admin/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminController::dashboard
 * @see app/Http/Controllers/AdminController.php:36
 * @route 'http://localhost/admin/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AdminController::users
 * @see app/Http/Controllers/AdminController.php:96
 * @route 'http://localhost/admin/users'
 */
export const users = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: users.url(options),
    method: 'get',
})

users.definition = {
    methods: ["get","head"],
    url: 'http://localhost/admin/users',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::users
 * @see app/Http/Controllers/AdminController.php:96
 * @route 'http://localhost/admin/users'
 */
users.url = (options?: RouteQueryOptions) => {
    return users.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::users
 * @see app/Http/Controllers/AdminController.php:96
 * @route 'http://localhost/admin/users'
 */
users.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: users.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminController::users
 * @see app/Http/Controllers/AdminController.php:96
 * @route 'http://localhost/admin/users'
 */
users.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: users.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AdminController::doctors
 * @see app/Http/Controllers/AdminController.php:123
 * @route 'http://localhost/admin/doctors'
 */
export const doctors = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: doctors.url(options),
    method: 'get',
})

doctors.definition = {
    methods: ["get","head"],
    url: 'http://localhost/admin/doctors',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::doctors
 * @see app/Http/Controllers/AdminController.php:123
 * @route 'http://localhost/admin/doctors'
 */
doctors.url = (options?: RouteQueryOptions) => {
    return doctors.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::doctors
 * @see app/Http/Controllers/AdminController.php:123
 * @route 'http://localhost/admin/doctors'
 */
doctors.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: doctors.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminController::doctors
 * @see app/Http/Controllers/AdminController.php:123
 * @route 'http://localhost/admin/doctors'
 */
doctors.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: doctors.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AdminController::appointments
 * @see app/Http/Controllers/AdminController.php:207
 * @route 'http://localhost/admin/appointments'
 */
export const appointments = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appointments.url(options),
    method: 'get',
})

appointments.definition = {
    methods: ["get","head"],
    url: 'http://localhost/admin/appointments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::appointments
 * @see app/Http/Controllers/AdminController.php:207
 * @route 'http://localhost/admin/appointments'
 */
appointments.url = (options?: RouteQueryOptions) => {
    return appointments.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::appointments
 * @see app/Http/Controllers/AdminController.php:207
 * @route 'http://localhost/admin/appointments'
 */
appointments.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appointments.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminController::appointments
 * @see app/Http/Controllers/AdminController.php:207
 * @route 'http://localhost/admin/appointments'
 */
appointments.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: appointments.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AdminController::consultations
 * @see app/Http/Controllers/AdminController.php:223
 * @route 'http://localhost/admin/consultations'
 */
export const consultations = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: consultations.url(options),
    method: 'get',
})

consultations.definition = {
    methods: ["get","head"],
    url: 'http://localhost/admin/consultations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::consultations
 * @see app/Http/Controllers/AdminController.php:223
 * @route 'http://localhost/admin/consultations'
 */
consultations.url = (options?: RouteQueryOptions) => {
    return consultations.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::consultations
 * @see app/Http/Controllers/AdminController.php:223
 * @route 'http://localhost/admin/consultations'
 */
consultations.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: consultations.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminController::consultations
 * @see app/Http/Controllers/AdminController.php:223
 * @route 'http://localhost/admin/consultations'
 */
consultations.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: consultations.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AdminController::prescriptions
 * @see app/Http/Controllers/AdminController.php:237
 * @route 'http://localhost/admin/prescriptions'
 */
export const prescriptions = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: prescriptions.url(options),
    method: 'get',
})

prescriptions.definition = {
    methods: ["get","head"],
    url: 'http://localhost/admin/prescriptions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::prescriptions
 * @see app/Http/Controllers/AdminController.php:237
 * @route 'http://localhost/admin/prescriptions'
 */
prescriptions.url = (options?: RouteQueryOptions) => {
    return prescriptions.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::prescriptions
 * @see app/Http/Controllers/AdminController.php:237
 * @route 'http://localhost/admin/prescriptions'
 */
prescriptions.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: prescriptions.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminController::prescriptions
 * @see app/Http/Controllers/AdminController.php:237
 * @route 'http://localhost/admin/prescriptions'
 */
prescriptions.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: prescriptions.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AdminController::bills
 * @see app/Http/Controllers/AdminController.php:251
 * @route 'http://localhost/admin/bills'
 */
export const bills = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bills.url(options),
    method: 'get',
})

bills.definition = {
    methods: ["get","head"],
    url: 'http://localhost/admin/bills',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::bills
 * @see app/Http/Controllers/AdminController.php:251
 * @route 'http://localhost/admin/bills'
 */
bills.url = (options?: RouteQueryOptions) => {
    return bills.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::bills
 * @see app/Http/Controllers/AdminController.php:251
 * @route 'http://localhost/admin/bills'
 */
bills.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bills.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminController::bills
 * @see app/Http/Controllers/AdminController.php:251
 * @route 'http://localhost/admin/bills'
 */
bills.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: bills.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AdminController::reports
 * @see app/Http/Controllers/AdminController.php:265
 * @route 'http://localhost/admin/reports'
 */
export const reports = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reports.url(options),
    method: 'get',
})

reports.definition = {
    methods: ["get","head"],
    url: 'http://localhost/admin/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::reports
 * @see app/Http/Controllers/AdminController.php:265
 * @route 'http://localhost/admin/reports'
 */
reports.url = (options?: RouteQueryOptions) => {
    return reports.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::reports
 * @see app/Http/Controllers/AdminController.php:265
 * @route 'http://localhost/admin/reports'
 */
reports.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reports.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminController::reports
 * @see app/Http/Controllers/AdminController.php:265
 * @route 'http://localhost/admin/reports'
 */
reports.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: reports.url(options),
    method: 'head',
})
const admin = {
    dashboard: Object.assign(dashboard, dashboard),
users: Object.assign(users, users48860f),
doctors: Object.assign(doctors, doctorsD3dd26),
appointments: Object.assign(appointments, appointments),
consultations: Object.assign(consultations, consultations),
prescriptions: Object.assign(prescriptions, prescriptions),
bills: Object.assign(bills, bills),
reports: Object.assign(reports, reports),
}

export default admin