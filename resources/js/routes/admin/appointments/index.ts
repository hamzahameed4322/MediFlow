import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\AdminController::status
 * @see app/Http/Controllers/AdminController.php:341
 * @route 'http://cms.test/admin/appointments/{appointment}/status'
 */
export const status = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: status.url(args, options),
    method: 'post',
})

status.definition = {
    methods: ["post"],
    url: 'http://cms.test/admin/appointments/{appointment}/status',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AdminController::status
 * @see app/Http/Controllers/AdminController.php:341
 * @route 'http://cms.test/admin/appointments/{appointment}/status'
 */
status.url = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return status.definition.url
            .replace('{appointment}', parsedArgs.appointment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::status
 * @see app/Http/Controllers/AdminController.php:341
 * @route 'http://cms.test/admin/appointments/{appointment}/status'
 */
status.post = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: status.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AdminController::status
 * @see app/Http/Controllers/AdminController.php:341
 * @route 'http://cms.test/admin/appointments/{appointment}/status'
 */
    const statusForm = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: status.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AdminController::status
 * @see app/Http/Controllers/AdminController.php:341
 * @route 'http://cms.test/admin/appointments/{appointment}/status'
 */
        statusForm.post = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: status.url(args, options),
            method: 'post',
        })
    
    status.form = statusForm
const appointments = {
    status: Object.assign(status, status),
}

export default appointments