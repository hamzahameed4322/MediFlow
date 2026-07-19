import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\DoctorController::edit
 * @see app/Http/Controllers/DoctorController.php:84
 * @route 'http://localhost/doctor/profile'
 */
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: 'http://localhost/doctor/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DoctorController::edit
 * @see app/Http/Controllers/DoctorController.php:84
 * @route 'http://localhost/doctor/profile'
 */
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DoctorController::edit
 * @see app/Http/Controllers/DoctorController.php:84
 * @route 'http://localhost/doctor/profile'
 */
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DoctorController::edit
 * @see app/Http/Controllers/DoctorController.php:84
 * @route 'http://localhost/doctor/profile'
 */
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\DoctorController::update
 * @see app/Http/Controllers/DoctorController.php:118
 * @route 'http://localhost/doctor/profile'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: 'http://localhost/doctor/profile',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\DoctorController::update
 * @see app/Http/Controllers/DoctorController.php:118
 * @route 'http://localhost/doctor/profile'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DoctorController::update
 * @see app/Http/Controllers/DoctorController.php:118
 * @route 'http://localhost/doctor/profile'
 */
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})
const profile = {
    edit: Object.assign(edit, edit),
update: Object.assign(update, update),
}

export default profile