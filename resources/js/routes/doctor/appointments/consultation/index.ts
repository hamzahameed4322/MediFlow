import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DoctorController::store
 * @see app/Http/Controllers/DoctorController.php:308
 * @route 'http://cms.test/doctor/appointments/{appointment}/consultation'
 */
export const store = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: 'http://cms.test/doctor/appointments/{appointment}/consultation',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DoctorController::store
 * @see app/Http/Controllers/DoctorController.php:308
 * @route 'http://cms.test/doctor/appointments/{appointment}/consultation'
 */
store.url = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{appointment}', parsedArgs.appointment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DoctorController::store
 * @see app/Http/Controllers/DoctorController.php:308
 * @route 'http://cms.test/doctor/appointments/{appointment}/consultation'
 */
store.post = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DoctorController::store
 * @see app/Http/Controllers/DoctorController.php:308
 * @route 'http://cms.test/doctor/appointments/{appointment}/consultation'
 */
    const storeForm = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DoctorController::store
 * @see app/Http/Controllers/DoctorController.php:308
 * @route 'http://cms.test/doctor/appointments/{appointment}/consultation'
 */
        storeForm.post = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
const consultation = {
    store: Object.assign(store, store),
}

export default consultation