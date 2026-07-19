import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::create
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route 'https://mediflow-production-60a9.up.railway.app/register'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: 'https://mediflow-production-60a9.up.railway.app/register',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::create
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route 'https://mediflow-production-60a9.up.railway.app/register'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::create
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route 'https://mediflow-production-60a9.up.railway.app/register'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::create
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route 'https://mediflow-production-60a9.up.railway.app/register'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::create
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route 'https://mediflow-production-60a9.up.railway.app/register'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::create
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route 'https://mediflow-production-60a9.up.railway.app/register'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::create
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:41
 * @route 'https://mediflow-production-60a9.up.railway.app/register'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::store
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:53
 * @route 'https://mediflow-production-60a9.up.railway.app/register'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: 'https://mediflow-production-60a9.up.railway.app/register',
} satisfies RouteDefinition<["post"]>

/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::store
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:53
 * @route 'https://mediflow-production-60a9.up.railway.app/register'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::store
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:53
 * @route 'https://mediflow-production-60a9.up.railway.app/register'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::store
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:53
 * @route 'https://mediflow-production-60a9.up.railway.app/register'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Laravel\Fortify\Http\Controllers\RegisteredUserController::store
 * @see vendor/laravel/fortify/src/Http/Controllers/RegisteredUserController.php:53
 * @route 'https://mediflow-production-60a9.up.railway.app/register'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const RegisteredUserController = { create, store }

export default RegisteredUserController