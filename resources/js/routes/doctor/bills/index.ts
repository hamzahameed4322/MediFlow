import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\DoctorController::pay
 * @see app/Http/Controllers/DoctorController.php:354
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/bills/{bill}/pay'
 */
export const pay = (args: { bill: number | { id: number } } | [bill: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: pay.url(args, options),
    method: 'post',
})

pay.definition = {
    methods: ["post"],
    url: 'https://mediflow-production-60a9.up.railway.app/doctor/bills/{bill}/pay',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DoctorController::pay
 * @see app/Http/Controllers/DoctorController.php:354
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/bills/{bill}/pay'
 */
pay.url = (args: { bill: number | { id: number } } | [bill: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { bill: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { bill: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    bill: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        bill: typeof args.bill === 'object'
                ? args.bill.id
                : args.bill,
                }

    return pay.definition.url
            .replace('{bill}', parsedArgs.bill.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DoctorController::pay
 * @see app/Http/Controllers/DoctorController.php:354
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/bills/{bill}/pay'
 */
pay.post = (args: { bill: number | { id: number } } | [bill: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: pay.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DoctorController::pay
 * @see app/Http/Controllers/DoctorController.php:354
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/bills/{bill}/pay'
 */
    const payForm = (args: { bill: number | { id: number } } | [bill: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: pay.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DoctorController::pay
 * @see app/Http/Controllers/DoctorController.php:354
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/bills/{bill}/pay'
 */
        payForm.post = (args: { bill: number | { id: number } } | [bill: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: pay.url(args, options),
            method: 'post',
        })
    
    pay.form = payForm
const bills = {
    pay: Object.assign(pay, pay),
}

export default bills