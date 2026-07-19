import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route 'https://mediflow-production-60a9.up.railway.app/settings/appearance'
 */
const Controller = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller.url(options),
    method: 'get',
})

Controller.definition = {
    methods: ["get","head"],
    url: 'https://mediflow-production-60a9.up.railway.app/settings/appearance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route 'https://mediflow-production-60a9.up.railway.app/settings/appearance'
 */
Controller.url = (options?: RouteQueryOptions) => {
    return Controller.definition.url + queryParams(options)
}

/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route 'https://mediflow-production-60a9.up.railway.app/settings/appearance'
 */
Controller.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: Controller.url(options),
    method: 'get',
})
/**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route 'https://mediflow-production-60a9.up.railway.app/settings/appearance'
 */
Controller.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: Controller.url(options),
    method: 'head',
})

    /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route 'https://mediflow-production-60a9.up.railway.app/settings/appearance'
 */
    const ControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: Controller.url(options),
        method: 'get',
    })

            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route 'https://mediflow-production-60a9.up.railway.app/settings/appearance'
 */
        ControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controller.url(options),
            method: 'get',
        })
            /**
* @see \Inertia\Controller::__invoke
 * @see vendor/inertiajs/inertia-laravel/src/Controller.php:13
 * @route 'https://mediflow-production-60a9.up.railway.app/settings/appearance'
 */
        ControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: Controller.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    Controller.form = ControllerForm
export default Controller