import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import users48860f from './users'
import doctorsD3dd26 from './doctors'
/**
* @see \App\Http\Controllers\AdminController::dashboard
 * @see app/Http/Controllers/AdminController.php:37
 * @route 'http://cms.test/admin/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: 'http://cms.test/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::dashboard
 * @see app/Http/Controllers/AdminController.php:37
 * @route 'http://cms.test/admin/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::dashboard
 * @see app/Http/Controllers/AdminController.php:37
 * @route 'http://cms.test/admin/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminController::dashboard
 * @see app/Http/Controllers/AdminController.php:37
 * @route 'http://cms.test/admin/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AdminController::dashboard
 * @see app/Http/Controllers/AdminController.php:37
 * @route 'http://cms.test/admin/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AdminController::dashboard
 * @see app/Http/Controllers/AdminController.php:37
 * @route 'http://cms.test/admin/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AdminController::dashboard
 * @see app/Http/Controllers/AdminController.php:37
 * @route 'http://cms.test/admin/dashboard'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
/**
* @see \App\Http\Controllers\AdminController::users
 * @see app/Http/Controllers/AdminController.php:97
 * @route 'http://cms.test/admin/users'
 */
export const users = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: users.url(options),
    method: 'get',
})

users.definition = {
    methods: ["get","head"],
    url: 'http://cms.test/admin/users',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::users
 * @see app/Http/Controllers/AdminController.php:97
 * @route 'http://cms.test/admin/users'
 */
users.url = (options?: RouteQueryOptions) => {
    return users.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::users
 * @see app/Http/Controllers/AdminController.php:97
 * @route 'http://cms.test/admin/users'
 */
users.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: users.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminController::users
 * @see app/Http/Controllers/AdminController.php:97
 * @route 'http://cms.test/admin/users'
 */
users.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: users.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AdminController::users
 * @see app/Http/Controllers/AdminController.php:97
 * @route 'http://cms.test/admin/users'
 */
    const usersForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: users.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AdminController::users
 * @see app/Http/Controllers/AdminController.php:97
 * @route 'http://cms.test/admin/users'
 */
        usersForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: users.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AdminController::users
 * @see app/Http/Controllers/AdminController.php:97
 * @route 'http://cms.test/admin/users'
 */
        usersForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: users.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    users.form = usersForm
/**
* @see \App\Http\Controllers\AdminController::doctors
 * @see app/Http/Controllers/AdminController.php:124
 * @route 'http://cms.test/admin/doctors'
 */
export const doctors = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: doctors.url(options),
    method: 'get',
})

doctors.definition = {
    methods: ["get","head"],
    url: 'http://cms.test/admin/doctors',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::doctors
 * @see app/Http/Controllers/AdminController.php:124
 * @route 'http://cms.test/admin/doctors'
 */
doctors.url = (options?: RouteQueryOptions) => {
    return doctors.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::doctors
 * @see app/Http/Controllers/AdminController.php:124
 * @route 'http://cms.test/admin/doctors'
 */
doctors.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: doctors.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminController::doctors
 * @see app/Http/Controllers/AdminController.php:124
 * @route 'http://cms.test/admin/doctors'
 */
doctors.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: doctors.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AdminController::doctors
 * @see app/Http/Controllers/AdminController.php:124
 * @route 'http://cms.test/admin/doctors'
 */
    const doctorsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: doctors.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AdminController::doctors
 * @see app/Http/Controllers/AdminController.php:124
 * @route 'http://cms.test/admin/doctors'
 */
        doctorsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: doctors.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AdminController::doctors
 * @see app/Http/Controllers/AdminController.php:124
 * @route 'http://cms.test/admin/doctors'
 */
        doctorsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: doctors.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    doctors.form = doctorsForm
/**
* @see \App\Http\Controllers\AdminController::appointments
 * @see app/Http/Controllers/AdminController.php:208
 * @route 'http://cms.test/admin/appointments'
 */
export const appointments = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appointments.url(options),
    method: 'get',
})

appointments.definition = {
    methods: ["get","head"],
    url: 'http://cms.test/admin/appointments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::appointments
 * @see app/Http/Controllers/AdminController.php:208
 * @route 'http://cms.test/admin/appointments'
 */
appointments.url = (options?: RouteQueryOptions) => {
    return appointments.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::appointments
 * @see app/Http/Controllers/AdminController.php:208
 * @route 'http://cms.test/admin/appointments'
 */
appointments.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appointments.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminController::appointments
 * @see app/Http/Controllers/AdminController.php:208
 * @route 'http://cms.test/admin/appointments'
 */
appointments.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: appointments.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AdminController::appointments
 * @see app/Http/Controllers/AdminController.php:208
 * @route 'http://cms.test/admin/appointments'
 */
    const appointmentsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: appointments.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AdminController::appointments
 * @see app/Http/Controllers/AdminController.php:208
 * @route 'http://cms.test/admin/appointments'
 */
        appointmentsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: appointments.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AdminController::appointments
 * @see app/Http/Controllers/AdminController.php:208
 * @route 'http://cms.test/admin/appointments'
 */
        appointmentsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: appointments.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    appointments.form = appointmentsForm
/**
* @see \App\Http\Controllers\AdminController::consultations
 * @see app/Http/Controllers/AdminController.php:250
 * @route 'http://cms.test/admin/consultations'
 */
export const consultations = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: consultations.url(options),
    method: 'get',
})

consultations.definition = {
    methods: ["get","head"],
    url: 'http://cms.test/admin/consultations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::consultations
 * @see app/Http/Controllers/AdminController.php:250
 * @route 'http://cms.test/admin/consultations'
 */
consultations.url = (options?: RouteQueryOptions) => {
    return consultations.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::consultations
 * @see app/Http/Controllers/AdminController.php:250
 * @route 'http://cms.test/admin/consultations'
 */
consultations.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: consultations.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminController::consultations
 * @see app/Http/Controllers/AdminController.php:250
 * @route 'http://cms.test/admin/consultations'
 */
consultations.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: consultations.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AdminController::consultations
 * @see app/Http/Controllers/AdminController.php:250
 * @route 'http://cms.test/admin/consultations'
 */
    const consultationsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: consultations.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AdminController::consultations
 * @see app/Http/Controllers/AdminController.php:250
 * @route 'http://cms.test/admin/consultations'
 */
        consultationsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: consultations.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AdminController::consultations
 * @see app/Http/Controllers/AdminController.php:250
 * @route 'http://cms.test/admin/consultations'
 */
        consultationsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: consultations.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    consultations.form = consultationsForm
/**
* @see \App\Http\Controllers\AdminController::prescriptions
 * @see app/Http/Controllers/AdminController.php:264
 * @route 'http://cms.test/admin/prescriptions'
 */
export const prescriptions = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: prescriptions.url(options),
    method: 'get',
})

prescriptions.definition = {
    methods: ["get","head"],
    url: 'http://cms.test/admin/prescriptions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::prescriptions
 * @see app/Http/Controllers/AdminController.php:264
 * @route 'http://cms.test/admin/prescriptions'
 */
prescriptions.url = (options?: RouteQueryOptions) => {
    return prescriptions.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::prescriptions
 * @see app/Http/Controllers/AdminController.php:264
 * @route 'http://cms.test/admin/prescriptions'
 */
prescriptions.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: prescriptions.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminController::prescriptions
 * @see app/Http/Controllers/AdminController.php:264
 * @route 'http://cms.test/admin/prescriptions'
 */
prescriptions.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: prescriptions.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AdminController::prescriptions
 * @see app/Http/Controllers/AdminController.php:264
 * @route 'http://cms.test/admin/prescriptions'
 */
    const prescriptionsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: prescriptions.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AdminController::prescriptions
 * @see app/Http/Controllers/AdminController.php:264
 * @route 'http://cms.test/admin/prescriptions'
 */
        prescriptionsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: prescriptions.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AdminController::prescriptions
 * @see app/Http/Controllers/AdminController.php:264
 * @route 'http://cms.test/admin/prescriptions'
 */
        prescriptionsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: prescriptions.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    prescriptions.form = prescriptionsForm
/**
* @see \App\Http\Controllers\AdminController::bills
 * @see app/Http/Controllers/AdminController.php:278
 * @route 'http://cms.test/admin/bills'
 */
export const bills = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bills.url(options),
    method: 'get',
})

bills.definition = {
    methods: ["get","head"],
    url: 'http://cms.test/admin/bills',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::bills
 * @see app/Http/Controllers/AdminController.php:278
 * @route 'http://cms.test/admin/bills'
 */
bills.url = (options?: RouteQueryOptions) => {
    return bills.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::bills
 * @see app/Http/Controllers/AdminController.php:278
 * @route 'http://cms.test/admin/bills'
 */
bills.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bills.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminController::bills
 * @see app/Http/Controllers/AdminController.php:278
 * @route 'http://cms.test/admin/bills'
 */
bills.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: bills.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AdminController::bills
 * @see app/Http/Controllers/AdminController.php:278
 * @route 'http://cms.test/admin/bills'
 */
    const billsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: bills.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AdminController::bills
 * @see app/Http/Controllers/AdminController.php:278
 * @route 'http://cms.test/admin/bills'
 */
        billsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: bills.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AdminController::bills
 * @see app/Http/Controllers/AdminController.php:278
 * @route 'http://cms.test/admin/bills'
 */
        billsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: bills.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    bills.form = billsForm
/**
* @see \App\Http\Controllers\AdminController::reports
 * @see app/Http/Controllers/AdminController.php:292
 * @route 'http://cms.test/admin/reports'
 */
export const reports = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reports.url(options),
    method: 'get',
})

reports.definition = {
    methods: ["get","head"],
    url: 'http://cms.test/admin/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::reports
 * @see app/Http/Controllers/AdminController.php:292
 * @route 'http://cms.test/admin/reports'
 */
reports.url = (options?: RouteQueryOptions) => {
    return reports.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::reports
 * @see app/Http/Controllers/AdminController.php:292
 * @route 'http://cms.test/admin/reports'
 */
reports.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reports.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminController::reports
 * @see app/Http/Controllers/AdminController.php:292
 * @route 'http://cms.test/admin/reports'
 */
reports.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: reports.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AdminController::reports
 * @see app/Http/Controllers/AdminController.php:292
 * @route 'http://cms.test/admin/reports'
 */
    const reportsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: reports.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AdminController::reports
 * @see app/Http/Controllers/AdminController.php:292
 * @route 'http://cms.test/admin/reports'
 */
        reportsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reports.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AdminController::reports
 * @see app/Http/Controllers/AdminController.php:292
 * @route 'http://cms.test/admin/reports'
 */
        reportsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reports.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    reports.form = reportsForm
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