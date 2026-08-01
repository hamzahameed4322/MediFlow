import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import profile from './profile'
import doctorsD3dd26 from './doctors'
import appointments40eafc from './appointments'
import reviews83e781 from './reviews'
/**
* @see \App\Http\Controllers\PatientController::dashboard
 * @see app/Http/Controllers/PatientController.php:27
 * @route 'http://cms.test/patient/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: 'http://cms.test/patient/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PatientController::dashboard
 * @see app/Http/Controllers/PatientController.php:27
 * @route 'http://cms.test/patient/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::dashboard
 * @see app/Http/Controllers/PatientController.php:27
 * @route 'http://cms.test/patient/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PatientController::dashboard
 * @see app/Http/Controllers/PatientController.php:27
 * @route 'http://cms.test/patient/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PatientController::dashboard
 * @see app/Http/Controllers/PatientController.php:27
 * @route 'http://cms.test/patient/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PatientController::dashboard
 * @see app/Http/Controllers/PatientController.php:27
 * @route 'http://cms.test/patient/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PatientController::dashboard
 * @see app/Http/Controllers/PatientController.php:27
 * @route 'http://cms.test/patient/dashboard'
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
* @see \App\Http\Controllers\PatientController::doctors
 * @see app/Http/Controllers/PatientController.php:139
 * @route 'http://cms.test/patient/doctors'
 */
export const doctors = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: doctors.url(options),
    method: 'get',
})

doctors.definition = {
    methods: ["get","head"],
    url: 'http://cms.test/patient/doctors',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PatientController::doctors
 * @see app/Http/Controllers/PatientController.php:139
 * @route 'http://cms.test/patient/doctors'
 */
doctors.url = (options?: RouteQueryOptions) => {
    return doctors.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::doctors
 * @see app/Http/Controllers/PatientController.php:139
 * @route 'http://cms.test/patient/doctors'
 */
doctors.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: doctors.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PatientController::doctors
 * @see app/Http/Controllers/PatientController.php:139
 * @route 'http://cms.test/patient/doctors'
 */
doctors.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: doctors.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PatientController::doctors
 * @see app/Http/Controllers/PatientController.php:139
 * @route 'http://cms.test/patient/doctors'
 */
    const doctorsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: doctors.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PatientController::doctors
 * @see app/Http/Controllers/PatientController.php:139
 * @route 'http://cms.test/patient/doctors'
 */
        doctorsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: doctors.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PatientController::doctors
 * @see app/Http/Controllers/PatientController.php:139
 * @route 'http://cms.test/patient/doctors'
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
* @see \App\Http\Controllers\PatientController::appointments
 * @see app/Http/Controllers/PatientController.php:211
 * @route 'http://cms.test/patient/appointments'
 */
export const appointments = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appointments.url(options),
    method: 'get',
})

appointments.definition = {
    methods: ["get","head"],
    url: 'http://cms.test/patient/appointments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PatientController::appointments
 * @see app/Http/Controllers/PatientController.php:211
 * @route 'http://cms.test/patient/appointments'
 */
appointments.url = (options?: RouteQueryOptions) => {
    return appointments.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::appointments
 * @see app/Http/Controllers/PatientController.php:211
 * @route 'http://cms.test/patient/appointments'
 */
appointments.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appointments.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PatientController::appointments
 * @see app/Http/Controllers/PatientController.php:211
 * @route 'http://cms.test/patient/appointments'
 */
appointments.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: appointments.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PatientController::appointments
 * @see app/Http/Controllers/PatientController.php:211
 * @route 'http://cms.test/patient/appointments'
 */
    const appointmentsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: appointments.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PatientController::appointments
 * @see app/Http/Controllers/PatientController.php:211
 * @route 'http://cms.test/patient/appointments'
 */
        appointmentsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: appointments.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PatientController::appointments
 * @see app/Http/Controllers/PatientController.php:211
 * @route 'http://cms.test/patient/appointments'
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
* @see \App\Http\Controllers\PatientController::bills
 * @see app/Http/Controllers/PatientController.php:303
 * @route 'http://cms.test/patient/bills'
 */
export const bills = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bills.url(options),
    method: 'get',
})

bills.definition = {
    methods: ["get","head"],
    url: 'http://cms.test/patient/bills',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PatientController::bills
 * @see app/Http/Controllers/PatientController.php:303
 * @route 'http://cms.test/patient/bills'
 */
bills.url = (options?: RouteQueryOptions) => {
    return bills.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::bills
 * @see app/Http/Controllers/PatientController.php:303
 * @route 'http://cms.test/patient/bills'
 */
bills.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bills.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PatientController::bills
 * @see app/Http/Controllers/PatientController.php:303
 * @route 'http://cms.test/patient/bills'
 */
bills.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: bills.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PatientController::bills
 * @see app/Http/Controllers/PatientController.php:303
 * @route 'http://cms.test/patient/bills'
 */
    const billsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: bills.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PatientController::bills
 * @see app/Http/Controllers/PatientController.php:303
 * @route 'http://cms.test/patient/bills'
 */
        billsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: bills.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PatientController::bills
 * @see app/Http/Controllers/PatientController.php:303
 * @route 'http://cms.test/patient/bills'
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
* @see \App\Http\Controllers\PatientController::medicalHistory
 * @see app/Http/Controllers/PatientController.php:324
 * @route 'http://cms.test/patient/medical-history'
 */
export const medicalHistory = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: medicalHistory.url(options),
    method: 'get',
})

medicalHistory.definition = {
    methods: ["get","head"],
    url: 'http://cms.test/patient/medical-history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PatientController::medicalHistory
 * @see app/Http/Controllers/PatientController.php:324
 * @route 'http://cms.test/patient/medical-history'
 */
medicalHistory.url = (options?: RouteQueryOptions) => {
    return medicalHistory.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::medicalHistory
 * @see app/Http/Controllers/PatientController.php:324
 * @route 'http://cms.test/patient/medical-history'
 */
medicalHistory.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: medicalHistory.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PatientController::medicalHistory
 * @see app/Http/Controllers/PatientController.php:324
 * @route 'http://cms.test/patient/medical-history'
 */
medicalHistory.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: medicalHistory.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PatientController::medicalHistory
 * @see app/Http/Controllers/PatientController.php:324
 * @route 'http://cms.test/patient/medical-history'
 */
    const medicalHistoryForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: medicalHistory.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PatientController::medicalHistory
 * @see app/Http/Controllers/PatientController.php:324
 * @route 'http://cms.test/patient/medical-history'
 */
        medicalHistoryForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: medicalHistory.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PatientController::medicalHistory
 * @see app/Http/Controllers/PatientController.php:324
 * @route 'http://cms.test/patient/medical-history'
 */
        medicalHistoryForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: medicalHistory.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    medicalHistory.form = medicalHistoryForm
/**
* @see \App\Http\Controllers\PatientController::reviews
 * @see app/Http/Controllers/PatientController.php:269
 * @route 'http://cms.test/patient/reviews'
 */
export const reviews = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reviews.url(options),
    method: 'get',
})

reviews.definition = {
    methods: ["get","head"],
    url: 'http://cms.test/patient/reviews',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PatientController::reviews
 * @see app/Http/Controllers/PatientController.php:269
 * @route 'http://cms.test/patient/reviews'
 */
reviews.url = (options?: RouteQueryOptions) => {
    return reviews.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::reviews
 * @see app/Http/Controllers/PatientController.php:269
 * @route 'http://cms.test/patient/reviews'
 */
reviews.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reviews.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PatientController::reviews
 * @see app/Http/Controllers/PatientController.php:269
 * @route 'http://cms.test/patient/reviews'
 */
reviews.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: reviews.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PatientController::reviews
 * @see app/Http/Controllers/PatientController.php:269
 * @route 'http://cms.test/patient/reviews'
 */
    const reviewsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: reviews.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PatientController::reviews
 * @see app/Http/Controllers/PatientController.php:269
 * @route 'http://cms.test/patient/reviews'
 */
        reviewsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reviews.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PatientController::reviews
 * @see app/Http/Controllers/PatientController.php:269
 * @route 'http://cms.test/patient/reviews'
 */
        reviewsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reviews.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    reviews.form = reviewsForm
const patient = {
    dashboard: Object.assign(dashboard, dashboard),
profile: Object.assign(profile, profile),
doctors: Object.assign(doctors, doctorsD3dd26),
appointments: Object.assign(appointments, appointments40eafc),
bills: Object.assign(bills, bills),
medicalHistory: Object.assign(medicalHistory, medicalHistory),
reviews: Object.assign(reviews, reviews83e781),
}

export default patient