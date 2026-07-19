import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import profile from './profile'
import doctorsD3dd26 from './doctors'
import appointments40eafc from './appointments'
/**
* @see \App\Http\Controllers\PatientController::dashboard
 * @see app/Http/Controllers/PatientController.php:25
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: 'https://mediflow-production-60a9.up.railway.app/patient/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PatientController::dashboard
 * @see app/Http/Controllers/PatientController.php:25
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::dashboard
 * @see app/Http/Controllers/PatientController.php:25
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PatientController::dashboard
 * @see app/Http/Controllers/PatientController.php:25
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PatientController::dashboard
 * @see app/Http/Controllers/PatientController.php:25
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PatientController::dashboard
 * @see app/Http/Controllers/PatientController.php:25
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PatientController::dashboard
 * @see app/Http/Controllers/PatientController.php:25
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/dashboard'
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
 * @see app/Http/Controllers/PatientController.php:137
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/doctors'
 */
export const doctors = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: doctors.url(options),
    method: 'get',
})

doctors.definition = {
    methods: ["get","head"],
    url: 'https://mediflow-production-60a9.up.railway.app/patient/doctors',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PatientController::doctors
 * @see app/Http/Controllers/PatientController.php:137
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/doctors'
 */
doctors.url = (options?: RouteQueryOptions) => {
    return doctors.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::doctors
 * @see app/Http/Controllers/PatientController.php:137
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/doctors'
 */
doctors.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: doctors.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PatientController::doctors
 * @see app/Http/Controllers/PatientController.php:137
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/doctors'
 */
doctors.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: doctors.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PatientController::doctors
 * @see app/Http/Controllers/PatientController.php:137
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/doctors'
 */
    const doctorsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: doctors.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PatientController::doctors
 * @see app/Http/Controllers/PatientController.php:137
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/doctors'
 */
        doctorsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: doctors.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PatientController::doctors
 * @see app/Http/Controllers/PatientController.php:137
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/doctors'
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
 * @see app/Http/Controllers/PatientController.php:196
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/appointments'
 */
export const appointments = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appointments.url(options),
    method: 'get',
})

appointments.definition = {
    methods: ["get","head"],
    url: 'https://mediflow-production-60a9.up.railway.app/patient/appointments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PatientController::appointments
 * @see app/Http/Controllers/PatientController.php:196
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/appointments'
 */
appointments.url = (options?: RouteQueryOptions) => {
    return appointments.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::appointments
 * @see app/Http/Controllers/PatientController.php:196
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/appointments'
 */
appointments.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appointments.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PatientController::appointments
 * @see app/Http/Controllers/PatientController.php:196
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/appointments'
 */
appointments.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: appointments.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PatientController::appointments
 * @see app/Http/Controllers/PatientController.php:196
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/appointments'
 */
    const appointmentsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: appointments.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PatientController::appointments
 * @see app/Http/Controllers/PatientController.php:196
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/appointments'
 */
        appointmentsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: appointments.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PatientController::appointments
 * @see app/Http/Controllers/PatientController.php:196
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/appointments'
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
 * @see app/Http/Controllers/PatientController.php:226
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/bills'
 */
export const bills = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bills.url(options),
    method: 'get',
})

bills.definition = {
    methods: ["get","head"],
    url: 'https://mediflow-production-60a9.up.railway.app/patient/bills',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PatientController::bills
 * @see app/Http/Controllers/PatientController.php:226
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/bills'
 */
bills.url = (options?: RouteQueryOptions) => {
    return bills.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::bills
 * @see app/Http/Controllers/PatientController.php:226
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/bills'
 */
bills.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bills.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PatientController::bills
 * @see app/Http/Controllers/PatientController.php:226
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/bills'
 */
bills.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: bills.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PatientController::bills
 * @see app/Http/Controllers/PatientController.php:226
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/bills'
 */
    const billsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: bills.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PatientController::bills
 * @see app/Http/Controllers/PatientController.php:226
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/bills'
 */
        billsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: bills.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PatientController::bills
 * @see app/Http/Controllers/PatientController.php:226
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/bills'
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
 * @see app/Http/Controllers/PatientController.php:247
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/medical-history'
 */
export const medicalHistory = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: medicalHistory.url(options),
    method: 'get',
})

medicalHistory.definition = {
    methods: ["get","head"],
    url: 'https://mediflow-production-60a9.up.railway.app/patient/medical-history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PatientController::medicalHistory
 * @see app/Http/Controllers/PatientController.php:247
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/medical-history'
 */
medicalHistory.url = (options?: RouteQueryOptions) => {
    return medicalHistory.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::medicalHistory
 * @see app/Http/Controllers/PatientController.php:247
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/medical-history'
 */
medicalHistory.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: medicalHistory.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PatientController::medicalHistory
 * @see app/Http/Controllers/PatientController.php:247
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/medical-history'
 */
medicalHistory.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: medicalHistory.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PatientController::medicalHistory
 * @see app/Http/Controllers/PatientController.php:247
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/medical-history'
 */
    const medicalHistoryForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: medicalHistory.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PatientController::medicalHistory
 * @see app/Http/Controllers/PatientController.php:247
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/medical-history'
 */
        medicalHistoryForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: medicalHistory.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PatientController::medicalHistory
 * @see app/Http/Controllers/PatientController.php:247
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/medical-history'
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
const patient = {
    dashboard: Object.assign(dashboard, dashboard),
profile: Object.assign(profile, profile),
doctors: Object.assign(doctors, doctorsD3dd26),
appointments: Object.assign(appointments, appointments40eafc),
bills: Object.assign(bills, bills),
medicalHistory: Object.assign(medicalHistory, medicalHistory),
}

export default patient