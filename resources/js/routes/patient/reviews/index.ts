import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ReviewController::store
 * @see app/Http/Controllers/ReviewController.php:21
 * @route 'http://cms.test/patient/appointments/{appointment}/review'
 */
export const store = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: 'http://cms.test/patient/appointments/{appointment}/review',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ReviewController::store
 * @see app/Http/Controllers/ReviewController.php:21
 * @route 'http://cms.test/patient/appointments/{appointment}/review'
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
* @see \App\Http\Controllers\ReviewController::store
 * @see app/Http/Controllers/ReviewController.php:21
 * @route 'http://cms.test/patient/appointments/{appointment}/review'
 */
store.post = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ReviewController::store
 * @see app/Http/Controllers/ReviewController.php:21
 * @route 'http://cms.test/patient/appointments/{appointment}/review'
 */
    const storeForm = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ReviewController::store
 * @see app/Http/Controllers/ReviewController.php:21
 * @route 'http://cms.test/patient/appointments/{appointment}/review'
 */
        storeForm.post = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\ReviewController::update
 * @see app/Http/Controllers/ReviewController.php:48
 * @route 'http://cms.test/patient/reviews/{review}'
 */
export const update = (args: { review: number | { id: number } } | [review: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: 'http://cms.test/patient/reviews/{review}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\ReviewController::update
 * @see app/Http/Controllers/ReviewController.php:48
 * @route 'http://cms.test/patient/reviews/{review}'
 */
update.url = (args: { review: number | { id: number } } | [review: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { review: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { review: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    review: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        review: typeof args.review === 'object'
                ? args.review.id
                : args.review,
                }

    return update.definition.url
            .replace('{review}', parsedArgs.review.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ReviewController::update
 * @see app/Http/Controllers/ReviewController.php:48
 * @route 'http://cms.test/patient/reviews/{review}'
 */
update.put = (args: { review: number | { id: number } } | [review: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\ReviewController::update
 * @see app/Http/Controllers/ReviewController.php:48
 * @route 'http://cms.test/patient/reviews/{review}'
 */
    const updateForm = (args: { review: number | { id: number } } | [review: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ReviewController::update
 * @see app/Http/Controllers/ReviewController.php:48
 * @route 'http://cms.test/patient/reviews/{review}'
 */
        updateForm.put = (args: { review: number | { id: number } } | [review: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const reviews = {
    store: Object.assign(store, store),
update: Object.assign(update, update),
}

export default reviews