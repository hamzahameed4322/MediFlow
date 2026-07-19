import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import users48860f from './users'
import doctorsD3dd26 from './doctors'
/**
* @see \App\Http\Controllers\AdminController::dashboard
 * @see app/Http/Controllers/AdminController.php:36
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: 'https://mediflow-production-60a9.up.railway.app/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::dashboard
 * @see app/Http/Controllers/AdminController.php:36
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::dashboard
 * @see app/Http/Controllers/AdminController.php:36
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminController::dashboard
 * @see app/Http/Controllers/AdminController.php:36
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AdminController::dashboard
 * @see app/Http/Controllers/AdminController.php:36
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AdminController::dashboard
 * @see app/Http/Controllers/AdminController.php:36
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AdminController::dashboard
 * @see app/Http/Controllers/AdminController.php:36
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/dashboard'
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
 * @see app/Http/Controllers/AdminController.php:96
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/users'
 */
export const users = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: users.url(options),
    method: 'get',
})

users.definition = {
    methods: ["get","head"],
    url: 'https://mediflow-production-60a9.up.railway.app/admin/users',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::users
 * @see app/Http/Controllers/AdminController.php:96
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/users'
 */
users.url = (options?: RouteQueryOptions) => {
    return users.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::users
 * @see app/Http/Controllers/AdminController.php:96
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/users'
 */
users.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: users.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminController::users
 * @see app/Http/Controllers/AdminController.php:96
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/users'
 */
users.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: users.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AdminController::users
 * @see app/Http/Controllers/AdminController.php:96
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/users'
 */
    const usersForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: users.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AdminController::users
 * @see app/Http/Controllers/AdminController.php:96
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/users'
 */
        usersForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: users.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AdminController::users
 * @see app/Http/Controllers/AdminController.php:96
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/users'
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
 * @see app/Http/Controllers/AdminController.php:123
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/doctors'
 */
export const doctors = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: doctors.url(options),
    method: 'get',
})

doctors.definition = {
    methods: ["get","head"],
    url: 'https://mediflow-production-60a9.up.railway.app/admin/doctors',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::doctors
 * @see app/Http/Controllers/AdminController.php:123
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/doctors'
 */
doctors.url = (options?: RouteQueryOptions) => {
    return doctors.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::doctors
 * @see app/Http/Controllers/AdminController.php:123
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/doctors'
 */
doctors.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: doctors.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminController::doctors
 * @see app/Http/Controllers/AdminController.php:123
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/doctors'
 */
doctors.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: doctors.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AdminController::doctors
 * @see app/Http/Controllers/AdminController.php:123
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/doctors'
 */
    const doctorsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: doctors.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AdminController::doctors
 * @see app/Http/Controllers/AdminController.php:123
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/doctors'
 */
        doctorsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: doctors.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AdminController::doctors
 * @see app/Http/Controllers/AdminController.php:123
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/doctors'
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
 * @see app/Http/Controllers/AdminController.php:207
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/appointments'
 */
export const appointments = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appointments.url(options),
    method: 'get',
})

appointments.definition = {
    methods: ["get","head"],
    url: 'https://mediflow-production-60a9.up.railway.app/admin/appointments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::appointments
 * @see app/Http/Controllers/AdminController.php:207
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/appointments'
 */
appointments.url = (options?: RouteQueryOptions) => {
    return appointments.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::appointments
 * @see app/Http/Controllers/AdminController.php:207
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/appointments'
 */
appointments.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appointments.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminController::appointments
 * @see app/Http/Controllers/AdminController.php:207
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/appointments'
 */
appointments.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: appointments.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AdminController::appointments
 * @see app/Http/Controllers/AdminController.php:207
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/appointments'
 */
    const appointmentsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: appointments.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AdminController::appointments
 * @see app/Http/Controllers/AdminController.php:207
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/appointments'
 */
        appointmentsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: appointments.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AdminController::appointments
 * @see app/Http/Controllers/AdminController.php:207
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/appointments'
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
 * @see app/Http/Controllers/AdminController.php:223
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/consultations'
 */
export const consultations = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: consultations.url(options),
    method: 'get',
})

consultations.definition = {
    methods: ["get","head"],
    url: 'https://mediflow-production-60a9.up.railway.app/admin/consultations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::consultations
 * @see app/Http/Controllers/AdminController.php:223
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/consultations'
 */
consultations.url = (options?: RouteQueryOptions) => {
    return consultations.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::consultations
 * @see app/Http/Controllers/AdminController.php:223
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/consultations'
 */
consultations.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: consultations.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminController::consultations
 * @see app/Http/Controllers/AdminController.php:223
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/consultations'
 */
consultations.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: consultations.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AdminController::consultations
 * @see app/Http/Controllers/AdminController.php:223
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/consultations'
 */
    const consultationsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: consultations.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AdminController::consultations
 * @see app/Http/Controllers/AdminController.php:223
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/consultations'
 */
        consultationsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: consultations.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AdminController::consultations
 * @see app/Http/Controllers/AdminController.php:223
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/consultations'
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
 * @see app/Http/Controllers/AdminController.php:237
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/prescriptions'
 */
export const prescriptions = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: prescriptions.url(options),
    method: 'get',
})

prescriptions.definition = {
    methods: ["get","head"],
    url: 'https://mediflow-production-60a9.up.railway.app/admin/prescriptions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::prescriptions
 * @see app/Http/Controllers/AdminController.php:237
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/prescriptions'
 */
prescriptions.url = (options?: RouteQueryOptions) => {
    return prescriptions.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::prescriptions
 * @see app/Http/Controllers/AdminController.php:237
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/prescriptions'
 */
prescriptions.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: prescriptions.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminController::prescriptions
 * @see app/Http/Controllers/AdminController.php:237
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/prescriptions'
 */
prescriptions.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: prescriptions.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AdminController::prescriptions
 * @see app/Http/Controllers/AdminController.php:237
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/prescriptions'
 */
    const prescriptionsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: prescriptions.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AdminController::prescriptions
 * @see app/Http/Controllers/AdminController.php:237
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/prescriptions'
 */
        prescriptionsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: prescriptions.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AdminController::prescriptions
 * @see app/Http/Controllers/AdminController.php:237
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/prescriptions'
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
 * @see app/Http/Controllers/AdminController.php:251
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/bills'
 */
export const bills = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bills.url(options),
    method: 'get',
})

bills.definition = {
    methods: ["get","head"],
    url: 'https://mediflow-production-60a9.up.railway.app/admin/bills',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::bills
 * @see app/Http/Controllers/AdminController.php:251
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/bills'
 */
bills.url = (options?: RouteQueryOptions) => {
    return bills.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::bills
 * @see app/Http/Controllers/AdminController.php:251
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/bills'
 */
bills.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bills.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminController::bills
 * @see app/Http/Controllers/AdminController.php:251
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/bills'
 */
bills.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: bills.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AdminController::bills
 * @see app/Http/Controllers/AdminController.php:251
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/bills'
 */
    const billsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: bills.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AdminController::bills
 * @see app/Http/Controllers/AdminController.php:251
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/bills'
 */
        billsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: bills.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AdminController::bills
 * @see app/Http/Controllers/AdminController.php:251
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/bills'
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
 * @see app/Http/Controllers/AdminController.php:265
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/reports'
 */
export const reports = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reports.url(options),
    method: 'get',
})

reports.definition = {
    methods: ["get","head"],
    url: 'https://mediflow-production-60a9.up.railway.app/admin/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::reports
 * @see app/Http/Controllers/AdminController.php:265
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/reports'
 */
reports.url = (options?: RouteQueryOptions) => {
    return reports.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::reports
 * @see app/Http/Controllers/AdminController.php:265
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/reports'
 */
reports.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reports.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminController::reports
 * @see app/Http/Controllers/AdminController.php:265
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/reports'
 */
reports.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: reports.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AdminController::reports
 * @see app/Http/Controllers/AdminController.php:265
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/reports'
 */
    const reportsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: reports.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AdminController::reports
 * @see app/Http/Controllers/AdminController.php:265
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/reports'
 */
        reportsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reports.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AdminController::reports
 * @see app/Http/Controllers/AdminController.php:265
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/reports'
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