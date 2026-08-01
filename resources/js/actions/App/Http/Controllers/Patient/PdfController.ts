import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Patient\PdfController::downloadPrescription
 * @see app/Http/Controllers/Patient/PdfController.php:15
 * @route 'http://cms.test/patient/appointments/{appointment}/prescription/pdf'
 */
export const downloadPrescription = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadPrescription.url(args, options),
    method: 'get',
})

downloadPrescription.definition = {
    methods: ["get","head"],
    url: 'http://cms.test/patient/appointments/{appointment}/prescription/pdf',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Patient\PdfController::downloadPrescription
 * @see app/Http/Controllers/Patient/PdfController.php:15
 * @route 'http://cms.test/patient/appointments/{appointment}/prescription/pdf'
 */
downloadPrescription.url = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return downloadPrescription.definition.url
            .replace('{appointment}', parsedArgs.appointment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Patient\PdfController::downloadPrescription
 * @see app/Http/Controllers/Patient/PdfController.php:15
 * @route 'http://cms.test/patient/appointments/{appointment}/prescription/pdf'
 */
downloadPrescription.get = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadPrescription.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Patient\PdfController::downloadPrescription
 * @see app/Http/Controllers/Patient/PdfController.php:15
 * @route 'http://cms.test/patient/appointments/{appointment}/prescription/pdf'
 */
downloadPrescription.head = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: downloadPrescription.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Patient\PdfController::downloadPrescription
 * @see app/Http/Controllers/Patient/PdfController.php:15
 * @route 'http://cms.test/patient/appointments/{appointment}/prescription/pdf'
 */
    const downloadPrescriptionForm = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: downloadPrescription.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Patient\PdfController::downloadPrescription
 * @see app/Http/Controllers/Patient/PdfController.php:15
 * @route 'http://cms.test/patient/appointments/{appointment}/prescription/pdf'
 */
        downloadPrescriptionForm.get = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: downloadPrescription.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Patient\PdfController::downloadPrescription
 * @see app/Http/Controllers/Patient/PdfController.php:15
 * @route 'http://cms.test/patient/appointments/{appointment}/prescription/pdf'
 */
        downloadPrescriptionForm.head = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: downloadPrescription.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    downloadPrescription.form = downloadPrescriptionForm
/**
* @see \App\Http\Controllers\Patient\PdfController::downloadToken
 * @see app/Http/Controllers/Patient/PdfController.php:60
 * @route 'http://cms.test/patient/appointments/{appointment}/token/pdf'
 */
export const downloadToken = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadToken.url(args, options),
    method: 'get',
})

downloadToken.definition = {
    methods: ["get","head"],
    url: 'http://cms.test/patient/appointments/{appointment}/token/pdf',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Patient\PdfController::downloadToken
 * @see app/Http/Controllers/Patient/PdfController.php:60
 * @route 'http://cms.test/patient/appointments/{appointment}/token/pdf'
 */
downloadToken.url = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return downloadToken.definition.url
            .replace('{appointment}', parsedArgs.appointment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Patient\PdfController::downloadToken
 * @see app/Http/Controllers/Patient/PdfController.php:60
 * @route 'http://cms.test/patient/appointments/{appointment}/token/pdf'
 */
downloadToken.get = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadToken.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Patient\PdfController::downloadToken
 * @see app/Http/Controllers/Patient/PdfController.php:60
 * @route 'http://cms.test/patient/appointments/{appointment}/token/pdf'
 */
downloadToken.head = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: downloadToken.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Patient\PdfController::downloadToken
 * @see app/Http/Controllers/Patient/PdfController.php:60
 * @route 'http://cms.test/patient/appointments/{appointment}/token/pdf'
 */
    const downloadTokenForm = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: downloadToken.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Patient\PdfController::downloadToken
 * @see app/Http/Controllers/Patient/PdfController.php:60
 * @route 'http://cms.test/patient/appointments/{appointment}/token/pdf'
 */
        downloadTokenForm.get = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: downloadToken.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Patient\PdfController::downloadToken
 * @see app/Http/Controllers/Patient/PdfController.php:60
 * @route 'http://cms.test/patient/appointments/{appointment}/token/pdf'
 */
        downloadTokenForm.head = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: downloadToken.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    downloadToken.form = downloadTokenForm
const PdfController = { downloadPrescription, downloadToken }

export default PdfController