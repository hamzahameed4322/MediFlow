import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
import consultation from './consultation'
/**
* @see \App\Http\Controllers\DoctorController::approve
 * @see app/Http/Controllers/DoctorController.php:260
 * @route 'http://localhost/doctor/appointments/{appointment}/approve'
 */
export const approve = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

approve.definition = {
    methods: ["post"],
    url: 'http://localhost/doctor/appointments/{appointment}/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DoctorController::approve
 * @see app/Http/Controllers/DoctorController.php:260
 * @route 'http://localhost/doctor/appointments/{appointment}/approve'
 */
approve.url = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return approve.definition.url
            .replace('{appointment}', parsedArgs.appointment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DoctorController::approve
 * @see app/Http/Controllers/DoctorController.php:260
 * @route 'http://localhost/doctor/appointments/{appointment}/approve'
 */
approve.post = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approve.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DoctorController::reject
 * @see app/Http/Controllers/DoctorController.php:272
 * @route 'http://localhost/doctor/appointments/{appointment}/reject'
 */
export const reject = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

reject.definition = {
    methods: ["post"],
    url: 'http://localhost/doctor/appointments/{appointment}/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DoctorController::reject
 * @see app/Http/Controllers/DoctorController.php:272
 * @route 'http://localhost/doctor/appointments/{appointment}/reject'
 */
reject.url = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return reject.definition.url
            .replace('{appointment}', parsedArgs.appointment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DoctorController::reject
 * @see app/Http/Controllers/DoctorController.php:272
 * @route 'http://localhost/doctor/appointments/{appointment}/reject'
 */
reject.post = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DoctorController::cancel
 * @see app/Http/Controllers/DoctorController.php:284
 * @route 'http://localhost/doctor/appointments/{appointment}/cancel'
 */
export const cancel = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(args, options),
    method: 'post',
})

cancel.definition = {
    methods: ["post"],
    url: 'http://localhost/doctor/appointments/{appointment}/cancel',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DoctorController::cancel
 * @see app/Http/Controllers/DoctorController.php:284
 * @route 'http://localhost/doctor/appointments/{appointment}/cancel'
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
* @see \App\Http\Controllers\DoctorController::cancel
 * @see app/Http/Controllers/DoctorController.php:284
 * @route 'http://localhost/doctor/appointments/{appointment}/cancel'
 */
cancel.post = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\DoctorController::noShow
 * @see app/Http/Controllers/DoctorController.php:296
 * @route 'http://localhost/doctor/appointments/{appointment}/no-show'
 */
export const noShow = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: noShow.url(args, options),
    method: 'post',
})

noShow.definition = {
    methods: ["post"],
    url: 'http://localhost/doctor/appointments/{appointment}/no-show',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DoctorController::noShow
 * @see app/Http/Controllers/DoctorController.php:296
 * @route 'http://localhost/doctor/appointments/{appointment}/no-show'
 */
noShow.url = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return noShow.definition.url
            .replace('{appointment}', parsedArgs.appointment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DoctorController::noShow
 * @see app/Http/Controllers/DoctorController.php:296
 * @route 'http://localhost/doctor/appointments/{appointment}/no-show'
 */
noShow.post = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: noShow.url(args, options),
    method: 'post',
})
const appointments = {
    approve: Object.assign(approve, approve),
reject: Object.assign(reject, reject),
cancel: Object.assign(cancel, cancel),
noShow: Object.assign(noShow, noShow),
consultation: Object.assign(consultation, consultation),
}

export default appointments