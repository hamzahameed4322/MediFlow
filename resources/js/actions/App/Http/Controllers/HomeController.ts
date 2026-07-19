import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\HomeController::index
 * @see app/Http/Controllers/HomeController.php:15
 * @route 'https://mediflow-production-60a9.up.railway.app'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: 'https://mediflow-production-60a9.up.railway.app',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HomeController::index
 * @see app/Http/Controllers/HomeController.php:15
 * @route 'https://mediflow-production-60a9.up.railway.app'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HomeController::index
 * @see app/Http/Controllers/HomeController.php:15
 * @route 'https://mediflow-production-60a9.up.railway.app'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HomeController::index
 * @see app/Http/Controllers/HomeController.php:15
 * @route 'https://mediflow-production-60a9.up.railway.app'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HomeController::index
 * @see app/Http/Controllers/HomeController.php:15
 * @route 'https://mediflow-production-60a9.up.railway.app'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HomeController::index
 * @see app/Http/Controllers/HomeController.php:15
 * @route 'https://mediflow-production-60a9.up.railway.app'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HomeController::index
 * @see app/Http/Controllers/HomeController.php:15
 * @route 'https://mediflow-production-60a9.up.railway.app'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
const HomeController = { index }

export default HomeController