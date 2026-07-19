import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\PatientController::slots
 * @see app/Http/Controllers/PatientController.php:174
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/doctors/{doctor}/slots'
 */
export const slots = (args: { doctor: number | { id: number } } | [doctor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: slots.url(args, options),
    method: 'get',
})

slots.definition = {
    methods: ["get","head"],
    url: 'https://mediflow-production-60a9.up.railway.app/patient/doctors/{doctor}/slots',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PatientController::slots
 * @see app/Http/Controllers/PatientController.php:174
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/doctors/{doctor}/slots'
 */
slots.url = (args: { doctor: number | { id: number } } | [doctor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { doctor: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { doctor: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    doctor: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        doctor: typeof args.doctor === 'object'
                ? args.doctor.id
                : args.doctor,
                }

    return slots.definition.url
            .replace('{doctor}', parsedArgs.doctor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::slots
 * @see app/Http/Controllers/PatientController.php:174
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/doctors/{doctor}/slots'
 */
slots.get = (args: { doctor: number | { id: number } } | [doctor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: slots.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PatientController::slots
 * @see app/Http/Controllers/PatientController.php:174
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/doctors/{doctor}/slots'
 */
slots.head = (args: { doctor: number | { id: number } } | [doctor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: slots.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PatientController::slots
 * @see app/Http/Controllers/PatientController.php:174
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/doctors/{doctor}/slots'
 */
    const slotsForm = (args: { doctor: number | { id: number } } | [doctor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: slots.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PatientController::slots
 * @see app/Http/Controllers/PatientController.php:174
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/doctors/{doctor}/slots'
 */
        slotsForm.get = (args: { doctor: number | { id: number } } | [doctor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: slots.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PatientController::slots
 * @see app/Http/Controllers/PatientController.php:174
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/doctors/{doctor}/slots'
 */
        slotsForm.head = (args: { doctor: number | { id: number } } | [doctor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: slots.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    slots.form = slotsForm
const doctors = {
    slots: Object.assign(slots, slots),
}

export default doctors