import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import profile from './profile'
import schedules15b2b6 from './schedules'
import appointments40eafc from './appointments'
import bills795ef8 from './bills'
/**
* @see \App\Http\Controllers\DoctorController::dashboard
 * @see app/Http/Controllers/DoctorController.php:31
 * @route 'http://cms.test/doctor/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: 'http://cms.test/doctor/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DoctorController::dashboard
 * @see app/Http/Controllers/DoctorController.php:31
 * @route 'http://cms.test/doctor/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DoctorController::dashboard
 * @see app/Http/Controllers/DoctorController.php:31
 * @route 'http://cms.test/doctor/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DoctorController::dashboard
 * @see app/Http/Controllers/DoctorController.php:31
 * @route 'http://cms.test/doctor/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DoctorController::dashboard
 * @see app/Http/Controllers/DoctorController.php:31
 * @route 'http://cms.test/doctor/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DoctorController::dashboard
 * @see app/Http/Controllers/DoctorController.php:31
 * @route 'http://cms.test/doctor/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DoctorController::dashboard
 * @see app/Http/Controllers/DoctorController.php:31
 * @route 'http://cms.test/doctor/dashboard'
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
* @see \App\Http\Controllers\DoctorController::schedules
 * @see app/Http/Controllers/DoctorController.php:142
 * @route 'http://cms.test/doctor/schedules'
 */
export const schedules = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: schedules.url(options),
    method: 'get',
})

schedules.definition = {
    methods: ["get","head"],
    url: 'http://cms.test/doctor/schedules',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DoctorController::schedules
 * @see app/Http/Controllers/DoctorController.php:142
 * @route 'http://cms.test/doctor/schedules'
 */
schedules.url = (options?: RouteQueryOptions) => {
    return schedules.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DoctorController::schedules
 * @see app/Http/Controllers/DoctorController.php:142
 * @route 'http://cms.test/doctor/schedules'
 */
schedules.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: schedules.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DoctorController::schedules
 * @see app/Http/Controllers/DoctorController.php:142
 * @route 'http://cms.test/doctor/schedules'
 */
schedules.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: schedules.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DoctorController::schedules
 * @see app/Http/Controllers/DoctorController.php:142
 * @route 'http://cms.test/doctor/schedules'
 */
    const schedulesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: schedules.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DoctorController::schedules
 * @see app/Http/Controllers/DoctorController.php:142
 * @route 'http://cms.test/doctor/schedules'
 */
        schedulesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: schedules.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DoctorController::schedules
 * @see app/Http/Controllers/DoctorController.php:142
 * @route 'http://cms.test/doctor/schedules'
 */
        schedulesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: schedules.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    schedules.form = schedulesForm
/**
* @see \App\Http\Controllers\DoctorController::appointments
 * @see app/Http/Controllers/DoctorController.php:225
 * @route 'http://cms.test/doctor/appointments'
 */
export const appointments = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appointments.url(options),
    method: 'get',
})

appointments.definition = {
    methods: ["get","head"],
    url: 'http://cms.test/doctor/appointments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DoctorController::appointments
 * @see app/Http/Controllers/DoctorController.php:225
 * @route 'http://cms.test/doctor/appointments'
 */
appointments.url = (options?: RouteQueryOptions) => {
    return appointments.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DoctorController::appointments
 * @see app/Http/Controllers/DoctorController.php:225
 * @route 'http://cms.test/doctor/appointments'
 */
appointments.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appointments.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DoctorController::appointments
 * @see app/Http/Controllers/DoctorController.php:225
 * @route 'http://cms.test/doctor/appointments'
 */
appointments.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: appointments.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DoctorController::appointments
 * @see app/Http/Controllers/DoctorController.php:225
 * @route 'http://cms.test/doctor/appointments'
 */
    const appointmentsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: appointments.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DoctorController::appointments
 * @see app/Http/Controllers/DoctorController.php:225
 * @route 'http://cms.test/doctor/appointments'
 */
        appointmentsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: appointments.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DoctorController::appointments
 * @see app/Http/Controllers/DoctorController.php:225
 * @route 'http://cms.test/doctor/appointments'
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
* @see \App\Http\Controllers\DoctorController::bills
 * @see app/Http/Controllers/DoctorController.php:320
 * @route 'http://cms.test/doctor/bills'
 */
export const bills = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bills.url(options),
    method: 'get',
})

bills.definition = {
    methods: ["get","head"],
    url: 'http://cms.test/doctor/bills',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DoctorController::bills
 * @see app/Http/Controllers/DoctorController.php:320
 * @route 'http://cms.test/doctor/bills'
 */
bills.url = (options?: RouteQueryOptions) => {
    return bills.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DoctorController::bills
 * @see app/Http/Controllers/DoctorController.php:320
 * @route 'http://cms.test/doctor/bills'
 */
bills.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bills.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DoctorController::bills
 * @see app/Http/Controllers/DoctorController.php:320
 * @route 'http://cms.test/doctor/bills'
 */
bills.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: bills.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DoctorController::bills
 * @see app/Http/Controllers/DoctorController.php:320
 * @route 'http://cms.test/doctor/bills'
 */
    const billsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: bills.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DoctorController::bills
 * @see app/Http/Controllers/DoctorController.php:320
 * @route 'http://cms.test/doctor/bills'
 */
        billsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: bills.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DoctorController::bills
 * @see app/Http/Controllers/DoctorController.php:320
 * @route 'http://cms.test/doctor/bills'
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
* @see \App\Http\Controllers\DoctorController::patientHistory
 * @see app/Http/Controllers/DoctorController.php:366
 * @route 'http://cms.test/doctor/patient-history/{patient}'
 */
export const patientHistory = (args: { patient: number | { id: number } } | [patient: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: patientHistory.url(args, options),
    method: 'get',
})

patientHistory.definition = {
    methods: ["get","head"],
    url: 'http://cms.test/doctor/patient-history/{patient}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DoctorController::patientHistory
 * @see app/Http/Controllers/DoctorController.php:366
 * @route 'http://cms.test/doctor/patient-history/{patient}'
 */
patientHistory.url = (args: { patient: number | { id: number } } | [patient: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { patient: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { patient: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    patient: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        patient: typeof args.patient === 'object'
                ? args.patient.id
                : args.patient,
                }

    return patientHistory.definition.url
            .replace('{patient}', parsedArgs.patient.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DoctorController::patientHistory
 * @see app/Http/Controllers/DoctorController.php:366
 * @route 'http://cms.test/doctor/patient-history/{patient}'
 */
patientHistory.get = (args: { patient: number | { id: number } } | [patient: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: patientHistory.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DoctorController::patientHistory
 * @see app/Http/Controllers/DoctorController.php:366
 * @route 'http://cms.test/doctor/patient-history/{patient}'
 */
patientHistory.head = (args: { patient: number | { id: number } } | [patient: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: patientHistory.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DoctorController::patientHistory
 * @see app/Http/Controllers/DoctorController.php:366
 * @route 'http://cms.test/doctor/patient-history/{patient}'
 */
    const patientHistoryForm = (args: { patient: number | { id: number } } | [patient: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: patientHistory.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DoctorController::patientHistory
 * @see app/Http/Controllers/DoctorController.php:366
 * @route 'http://cms.test/doctor/patient-history/{patient}'
 */
        patientHistoryForm.get = (args: { patient: number | { id: number } } | [patient: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: patientHistory.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DoctorController::patientHistory
 * @see app/Http/Controllers/DoctorController.php:366
 * @route 'http://cms.test/doctor/patient-history/{patient}'
 */
        patientHistoryForm.head = (args: { patient: number | { id: number } } | [patient: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: patientHistory.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    patientHistory.form = patientHistoryForm
const doctor = {
    dashboard: Object.assign(dashboard, dashboard),
profile: Object.assign(profile, profile),
schedules: Object.assign(schedules, schedules15b2b6),
appointments: Object.assign(appointments, appointments40eafc),
bills: Object.assign(bills, bills795ef8),
patientHistory: Object.assign(patientHistory, patientHistory),
}

export default doctor