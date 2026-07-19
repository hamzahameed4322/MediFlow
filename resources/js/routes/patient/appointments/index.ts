import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\PatientController::store
 * @see app/Http/Controllers/PatientController.php:186
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/appointments'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: 'https://mediflow-production-60a9.up.railway.app/patient/appointments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PatientController::store
 * @see app/Http/Controllers/PatientController.php:186
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/appointments'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::store
 * @see app/Http/Controllers/PatientController.php:186
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/appointments'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PatientController::store
 * @see app/Http/Controllers/PatientController.php:186
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/appointments'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PatientController::store
 * @see app/Http/Controllers/PatientController.php:186
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/appointments'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\PatientController::cancel
 * @see app/Http/Controllers/PatientController.php:216
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/appointments/{appointment}/cancel'
 */
export const cancel = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(args, options),
    method: 'post',
})

cancel.definition = {
    methods: ["post"],
    url: 'https://mediflow-production-60a9.up.railway.app/patient/appointments/{appointment}/cancel',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PatientController::cancel
 * @see app/Http/Controllers/PatientController.php:216
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/appointments/{appointment}/cancel'
 */
cancel.url = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { appointment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { appointment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    appointment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        appointment: typeof args.appointment === 'object'
                ? args.appointment.id
                : args.appointment,
                }

    return cancel.definition.url
            .replace('{appointment}', parsedArgs.appointment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::cancel
 * @see app/Http/Controllers/PatientController.php:216
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/appointments/{appointment}/cancel'
 */
cancel.post = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PatientController::cancel
 * @see app/Http/Controllers/PatientController.php:216
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/appointments/{appointment}/cancel'
 */
    const cancelForm = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: cancel.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PatientController::cancel
 * @see app/Http/Controllers/PatientController.php:216
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/appointments/{appointment}/cancel'
 */
        cancelForm.post = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: cancel.url(args, options),
            method: 'post',
        })
    
    cancel.form = cancelForm
const appointments = {
    cancel: Object.assign(cancel, cancel),
}

export default appointments