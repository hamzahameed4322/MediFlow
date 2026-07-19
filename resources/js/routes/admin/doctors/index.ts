import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\AdminController::store
 * @see app/Http/Controllers/AdminController.php:135
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/doctors'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: 'https://mediflow-production-60a9.up.railway.app/admin/doctors',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AdminController::store
 * @see app/Http/Controllers/AdminController.php:135
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/doctors'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::store
 * @see app/Http/Controllers/AdminController.php:135
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/doctors'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AdminController::store
 * @see app/Http/Controllers/AdminController.php:135
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/doctors'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AdminController::store
 * @see app/Http/Controllers/AdminController.php:135
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/doctors'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\AdminController::update
 * @see app/Http/Controllers/AdminController.php:170
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/doctors/{doctor}'
 */
export const update = (args: { doctor: number | { id: number } } | [doctor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: 'https://mediflow-production-60a9.up.railway.app/admin/doctors/{doctor}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\AdminController::update
 * @see app/Http/Controllers/AdminController.php:170
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/doctors/{doctor}'
 */
update.url = (args: { doctor: number | { id: number } } | [doctor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{doctor}', parsedArgs.doctor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::update
 * @see app/Http/Controllers/AdminController.php:170
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/doctors/{doctor}'
 */
update.put = (args: { doctor: number | { id: number } } | [doctor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\AdminController::update
 * @see app/Http/Controllers/AdminController.php:170
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/doctors/{doctor}'
 */
    const updateForm = (args: { doctor: number | { id: number } } | [doctor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AdminController::update
 * @see app/Http/Controllers/AdminController.php:170
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/doctors/{doctor}'
 */
        updateForm.put = (args: { doctor: number | { id: number } } | [doctor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\AdminController::toggleStatus
 * @see app/Http/Controllers/AdminController.php:195
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/doctors/{doctor}/toggle-status'
 */
export const toggleStatus = (args: { doctor: number | { id: number } } | [doctor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleStatus.url(args, options),
    method: 'post',
})

toggleStatus.definition = {
    methods: ["post"],
    url: 'https://mediflow-production-60a9.up.railway.app/admin/doctors/{doctor}/toggle-status',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AdminController::toggleStatus
 * @see app/Http/Controllers/AdminController.php:195
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/doctors/{doctor}/toggle-status'
 */
toggleStatus.url = (args: { doctor: number | { id: number } } | [doctor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return toggleStatus.definition.url
            .replace('{doctor}', parsedArgs.doctor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::toggleStatus
 * @see app/Http/Controllers/AdminController.php:195
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/doctors/{doctor}/toggle-status'
 */
toggleStatus.post = (args: { doctor: number | { id: number } } | [doctor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleStatus.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AdminController::toggleStatus
 * @see app/Http/Controllers/AdminController.php:195
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/doctors/{doctor}/toggle-status'
 */
    const toggleStatusForm = (args: { doctor: number | { id: number } } | [doctor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggleStatus.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AdminController::toggleStatus
 * @see app/Http/Controllers/AdminController.php:195
 * @route 'https://mediflow-production-60a9.up.railway.app/admin/doctors/{doctor}/toggle-status'
 */
        toggleStatusForm.post = (args: { doctor: number | { id: number } } | [doctor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggleStatus.url(args, options),
            method: 'post',
        })
    
    toggleStatus.form = toggleStatusForm
const doctors = {
    store: Object.assign(store, store),
update: Object.assign(update, update),
toggleStatus: Object.assign(toggleStatus, toggleStatus),
}

export default doctors