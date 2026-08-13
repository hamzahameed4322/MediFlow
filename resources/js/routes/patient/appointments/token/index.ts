import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Pdf\PdfController::pdf
 * @see app/Http/Controllers/Pdf/PdfController.php:60
 * @route 'http://cms.test/patient/appointments/{appointment}/token/pdf'
 */
export const pdf = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pdf.url(args, options),
    method: 'get',
})

pdf.definition = {
    methods: ["get","head"],
    url: 'http://cms.test/patient/appointments/{appointment}/token/pdf',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Pdf\PdfController::pdf
 * @see app/Http/Controllers/Pdf/PdfController.php:60
 * @route 'http://cms.test/patient/appointments/{appointment}/token/pdf'
 */
pdf.url = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return pdf.definition.url
            .replace('{appointment}', parsedArgs.appointment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Pdf\PdfController::pdf
 * @see app/Http/Controllers/Pdf/PdfController.php:60
 * @route 'http://cms.test/patient/appointments/{appointment}/token/pdf'
 */
pdf.get = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pdf.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Pdf\PdfController::pdf
 * @see app/Http/Controllers/Pdf/PdfController.php:60
 * @route 'http://cms.test/patient/appointments/{appointment}/token/pdf'
 */
pdf.head = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pdf.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Pdf\PdfController::pdf
 * @see app/Http/Controllers/Pdf/PdfController.php:60
 * @route 'http://cms.test/patient/appointments/{appointment}/token/pdf'
 */
    const pdfForm = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: pdf.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Pdf\PdfController::pdf
 * @see app/Http/Controllers/Pdf/PdfController.php:60
 * @route 'http://cms.test/patient/appointments/{appointment}/token/pdf'
 */
        pdfForm.get = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pdf.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Pdf\PdfController::pdf
 * @see app/Http/Controllers/Pdf/PdfController.php:60
 * @route 'http://cms.test/patient/appointments/{appointment}/token/pdf'
 */
        pdfForm.head = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pdf.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    pdf.form = pdfForm
const token = {
    pdf: Object.assign(pdf, pdf),
}

export default token