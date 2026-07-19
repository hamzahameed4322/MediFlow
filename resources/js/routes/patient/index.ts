import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
import profile from './profile'
import doctorsD3dd26 from './doctors'
import appointments40eafc from './appointments'
/**
* @see \App\Http\Controllers\PatientController::dashboard
 * @see app/Http/Controllers/PatientController.php:25
 * @route 'http://localhost/patient/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: 'http://localhost/patient/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PatientController::dashboard
 * @see app/Http/Controllers/PatientController.php:25
 * @route 'http://localhost/patient/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::dashboard
 * @see app/Http/Controllers/PatientController.php:25
 * @route 'http://localhost/patient/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PatientController::dashboard
 * @see app/Http/Controllers/PatientController.php:25
 * @route 'http://localhost/patient/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PatientController::doctors
 * @see app/Http/Controllers/PatientController.php:137
 * @route 'http://localhost/patient/doctors'
 */
export const doctors = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: doctors.url(options),
    method: 'get',
})

doctors.definition = {
    methods: ["get","head"],
    url: 'http://localhost/patient/doctors',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PatientController::doctors
 * @see app/Http/Controllers/PatientController.php:137
 * @route 'http://localhost/patient/doctors'
 */
doctors.url = (options?: RouteQueryOptions) => {
    return doctors.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::doctors
 * @see app/Http/Controllers/PatientController.php:137
 * @route 'http://localhost/patient/doctors'
 */
doctors.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: doctors.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PatientController::doctors
 * @see app/Http/Controllers/PatientController.php:137
 * @route 'http://localhost/patient/doctors'
 */
doctors.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: doctors.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PatientController::appointments
 * @see app/Http/Controllers/PatientController.php:196
 * @route 'http://localhost/patient/appointments'
 */
export const appointments = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appointments.url(options),
    method: 'get',
})

appointments.definition = {
    methods: ["get","head"],
    url: 'http://localhost/patient/appointments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PatientController::appointments
 * @see app/Http/Controllers/PatientController.php:196
 * @route 'http://localhost/patient/appointments'
 */
appointments.url = (options?: RouteQueryOptions) => {
    return appointments.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::appointments
 * @see app/Http/Controllers/PatientController.php:196
 * @route 'http://localhost/patient/appointments'
 */
appointments.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appointments.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PatientController::appointments
 * @see app/Http/Controllers/PatientController.php:196
 * @route 'http://localhost/patient/appointments'
 */
appointments.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: appointments.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PatientController::bills
 * @see app/Http/Controllers/PatientController.php:226
 * @route 'http://localhost/patient/bills'
 */
export const bills = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bills.url(options),
    method: 'get',
})

bills.definition = {
    methods: ["get","head"],
    url: 'http://localhost/patient/bills',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PatientController::bills
 * @see app/Http/Controllers/PatientController.php:226
 * @route 'http://localhost/patient/bills'
 */
bills.url = (options?: RouteQueryOptions) => {
    return bills.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::bills
 * @see app/Http/Controllers/PatientController.php:226
 * @route 'http://localhost/patient/bills'
 */
bills.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bills.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PatientController::bills
 * @see app/Http/Controllers/PatientController.php:226
 * @route 'http://localhost/patient/bills'
 */
bills.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: bills.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PatientController::medicalHistory
 * @see app/Http/Controllers/PatientController.php:247
 * @route 'http://localhost/patient/medical-history'
 */
export const medicalHistory = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: medicalHistory.url(options),
    method: 'get',
})

medicalHistory.definition = {
    methods: ["get","head"],
    url: 'http://localhost/patient/medical-history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PatientController::medicalHistory
 * @see app/Http/Controllers/PatientController.php:247
 * @route 'http://localhost/patient/medical-history'
 */
medicalHistory.url = (options?: RouteQueryOptions) => {
    return medicalHistory.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::medicalHistory
 * @see app/Http/Controllers/PatientController.php:247
 * @route 'http://localhost/patient/medical-history'
 */
medicalHistory.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: medicalHistory.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PatientController::medicalHistory
 * @see app/Http/Controllers/PatientController.php:247
 * @route 'http://localhost/patient/medical-history'
 */
medicalHistory.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: medicalHistory.url(options),
    method: 'head',
})
const patient = {
    dashboard: Object.assign(dashboard, dashboard),
profile: Object.assign(profile, profile),
doctors: Object.assign(doctors, doctorsD3dd26),
appointments: Object.assign(appointments, appointments40eafc),
bills: Object.assign(bills, bills),
medicalHistory: Object.assign(medicalHistory, medicalHistory),
}

export default patient