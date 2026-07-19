import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\PatientController::edit
 * @see app/Http/Controllers/PatientController.php:78
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/profile'
 */
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: 'https://mediflow-production-60a9.up.railway.app/patient/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PatientController::edit
 * @see app/Http/Controllers/PatientController.php:78
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/profile'
 */
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::edit
 * @see app/Http/Controllers/PatientController.php:78
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/profile'
 */
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PatientController::edit
 * @see app/Http/Controllers/PatientController.php:78
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/profile'
 */
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PatientController::edit
 * @see app/Http/Controllers/PatientController.php:78
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/profile'
 */
    const editForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PatientController::edit
 * @see app/Http/Controllers/PatientController.php:78
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/profile'
 */
        editForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PatientController::edit
 * @see app/Http/Controllers/PatientController.php:78
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/profile'
 */
        editForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\PatientController::update
 * @see app/Http/Controllers/PatientController.php:112
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/profile'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: 'https://mediflow-production-60a9.up.railway.app/patient/profile',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\PatientController::update
 * @see app/Http/Controllers/PatientController.php:112
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/profile'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::update
 * @see app/Http/Controllers/PatientController.php:112
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/profile'
 */
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\PatientController::update
 * @see app/Http/Controllers/PatientController.php:112
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/profile'
 */
    const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PatientController::update
 * @see app/Http/Controllers/PatientController.php:112
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/profile'
 */
        updateForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const profile = {
    edit: Object.assign(edit, edit),
update: Object.assign(update, update),
}

export default profile