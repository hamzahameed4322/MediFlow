import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \Laravel\Fortify\Http\Controllers\EmailVerificationNotificationController::store
 * @see vendor/laravel/fortify/src/Http/Controllers/EmailVerificationNotificationController.php:19
 * @route 'https://mediflow-production-60a9.up.railway.app/email/verification-notification'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: 'https://mediflow-production-60a9.up.railway.app/email/verification-notification',
} satisfies RouteDefinition<["post"]>

/**
* @see \Laravel\Fortify\Http\Controllers\EmailVerificationNotificationController::store
 * @see vendor/laravel/fortify/src/Http/Controllers/EmailVerificationNotificationController.php:19
 * @route 'https://mediflow-production-60a9.up.railway.app/email/verification-notification'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Laravel\Fortify\Http\Controllers\EmailVerificationNotificationController::store
 * @see vendor/laravel/fortify/src/Http/Controllers/EmailVerificationNotificationController.php:19
 * @route 'https://mediflow-production-60a9.up.railway.app/email/verification-notification'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Laravel\Fortify\Http\Controllers\EmailVerificationNotificationController::store
 * @see vendor/laravel/fortify/src/Http/Controllers/EmailVerificationNotificationController.php:19
 * @route 'https://mediflow-production-60a9.up.railway.app/email/verification-notification'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Laravel\Fortify\Http\Controllers\EmailVerificationNotificationController::store
 * @see vendor/laravel/fortify/src/Http/Controllers/EmailVerificationNotificationController.php:19
 * @route 'https://mediflow-production-60a9.up.railway.app/email/verification-notification'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const EmailVerificationNotificationController = { store }

export default EmailVerificationNotificationController