import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PatientController::dashboard
 * @see app/Http/Controllers/PatientController.php:25
 * @route 'http://localhost/patient/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: 'http://localhost/patient/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PatientController::dashboard
 * @see app/Http/Controllers/PatientController.php:25
 * @route 'http://localhost/patient/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::dashboard
 * @see app/Http/Controllers/PatientController.php:25
 * @route 'http://localhost/patient/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PatientController::dashboard
 * @see app/Http/Controllers/PatientController.php:25
 * @route 'http://localhost/patient/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PatientController::editProfile
 * @see app/Http/Controllers/PatientController.php:78
 * @route 'http://localhost/patient/profile'
 */
export const editProfile = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: editProfile.url(options),
    method: 'get',
})

editProfile.definition = {
    methods: ["get","head"],
    url: 'http://localhost/patient/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PatientController::editProfile
 * @see app/Http/Controllers/PatientController.php:78
 * @route 'http://localhost/patient/profile'
 */
editProfile.url = (options?: RouteQueryOptions) => {
    return editProfile.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::editProfile
 * @see app/Http/Controllers/PatientController.php:78
 * @route 'http://localhost/patient/profile'
 */
editProfile.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: editProfile.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PatientController::editProfile
 * @see app/Http/Controllers/PatientController.php:78
 * @route 'http://localhost/patient/profile'
 */
editProfile.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: editProfile.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PatientController::updateProfile
 * @see app/Http/Controllers/PatientController.php:112
 * @route 'http://localhost/patient/profile'
 */
export const updateProfile = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateProfile.url(options),
    method: 'put',
})

updateProfile.definition = {
    methods: ["put"],
    url: 'http://localhost/patient/profile',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\PatientController::updateProfile
 * @see app/Http/Controllers/PatientController.php:112
 * @route 'http://localhost/patient/profile'
 */
updateProfile.url = (options?: RouteQueryOptions) => {
    return updateProfile.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::updateProfile
 * @see app/Http/Controllers/PatientController.php:112
 * @route 'http://localhost/patient/profile'
 */
updateProfile.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateProfile.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\PatientController::browseDoctors
 * @see app/Http/Controllers/PatientController.php:137
 * @route 'http://localhost/patient/doctors'
 */
export const browseDoctors = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: browseDoctors.url(options),
    method: 'get',
})

browseDoctors.definition = {
    methods: ["get","head"],
    url: 'http://localhost/patient/doctors',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PatientController::browseDoctors
 * @see app/Http/Controllers/PatientController.php:137
 * @route 'http://localhost/patient/doctors'
 */
browseDoctors.url = (options?: RouteQueryOptions) => {
    return browseDoctors.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::browseDoctors
 * @see app/Http/Controllers/PatientController.php:137
 * @route 'http://localhost/patient/doctors'
 */
browseDoctors.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: browseDoctors.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PatientController::browseDoctors
 * @see app/Http/Controllers/PatientController.php:137
 * @route 'http://localhost/patient/doctors'
 */
browseDoctors.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: browseDoctors.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PatientController::availableSlots
 * @see app/Http/Controllers/PatientController.php:174
 * @route 'http://localhost/patient/doctors/{doctor}/slots'
 */
export const availableSlots = (args: { doctor: number | { id: number } } | [doctor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: availableSlots.url(args, options),
    method: 'get',
})

availableSlots.definition = {
    methods: ["get","head"],
    url: 'http://localhost/patient/doctors/{doctor}/slots',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PatientController::availableSlots
 * @see app/Http/Controllers/PatientController.php:174
 * @route 'http://localhost/patient/doctors/{doctor}/slots'
 */
availableSlots.url = (args: { doctor: number | { id: number } } | [doctor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return availableSlots.definition.url
            .replace('{doctor}', parsedArgs.doctor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::availableSlots
 * @see app/Http/Controllers/PatientController.php:174
 * @route 'http://localhost/patient/doctors/{doctor}/slots'
 */
availableSlots.get = (args: { doctor: number | { id: number } } | [doctor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: availableSlots.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PatientController::availableSlots
 * @see app/Http/Controllers/PatientController.php:174
 * @route 'http://localhost/patient/doctors/{doctor}/slots'
 */
availableSlots.head = (args: { doctor: number | { id: number } } | [doctor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: availableSlots.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PatientController::bookAppointment
 * @see app/Http/Controllers/PatientController.php:186
 * @route 'http://localhost/patient/appointments'
 */
export const bookAppointment = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bookAppointment.url(options),
    method: 'post',
})

bookAppointment.definition = {
    methods: ["post"],
    url: 'http://localhost/patient/appointments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PatientController::bookAppointment
 * @see app/Http/Controllers/PatientController.php:186
 * @route 'http://localhost/patient/appointments'
 */
bookAppointment.url = (options?: RouteQueryOptions) => {
    return bookAppointment.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::bookAppointment
 * @see app/Http/Controllers/PatientController.php:186
 * @route 'http://localhost/patient/appointments'
 */
bookAppointment.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bookAppointment.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PatientController::appointments
 * @see app/Http/Controllers/PatientController.php:196
 * @route 'http://localhost/patient/appointments'
 */
export const appointments = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appointments.url(options),
    method: 'get',
})

appointments.definition = {
    methods: ["get","head"],
    url: 'http://localhost/patient/appointments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PatientController::appointments
 * @see app/Http/Controllers/PatientController.php:196
 * @route 'http://localhost/patient/appointments'
 */
appointments.url = (options?: RouteQueryOptions) => {
    return appointments.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::appointments
 * @see app/Http/Controllers/PatientController.php:196
 * @route 'http://localhost/patient/appointments'
 */
appointments.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appointments.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PatientController::appointments
 * @see app/Http/Controllers/PatientController.php:196
 * @route 'http://localhost/patient/appointments'
 */
appointments.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: appointments.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PatientController::cancelAppointment
 * @see app/Http/Controllers/PatientController.php:216
 * @route 'http://localhost/patient/appointments/{appointment}/cancel'
 */
export const cancelAppointment = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancelAppointment.url(args, options),
    method: 'post',
})

cancelAppointment.definition = {
    methods: ["post"],
    url: 'http://localhost/patient/appointments/{appointment}/cancel',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PatientController::cancelAppointment
 * @see app/Http/Controllers/PatientController.php:216
 * @route 'http://localhost/patient/appointments/{appointment}/cancel'
 */
cancelAppointment.url = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return cancelAppointment.definition.url
            .replace('{appointment}', parsedArgs.appointment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::cancelAppointment
 * @see app/Http/Controllers/PatientController.php:216
 * @route 'http://localhost/patient/appointments/{appointment}/cancel'
 */
cancelAppointment.post = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancelAppointment.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\PatientController::bills
 * @see app/Http/Controllers/PatientController.php:226
 * @route 'http://localhost/patient/bills'
 */
export const bills = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bills.url(options),
    method: 'get',
})

bills.definition = {
    methods: ["get","head"],
    url: 'http://localhost/patient/bills',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PatientController::bills
 * @see app/Http/Controllers/PatientController.php:226
 * @route 'http://localhost/patient/bills'
 */
bills.url = (options?: RouteQueryOptions) => {
    return bills.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::bills
 * @see app/Http/Controllers/PatientController.php:226
 * @route 'http://localhost/patient/bills'
 */
bills.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bills.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PatientController::bills
 * @see app/Http/Controllers/PatientController.php:226
 * @route 'http://localhost/patient/bills'
 */
bills.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: bills.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\PatientController::medicalHistory
 * @see app/Http/Controllers/PatientController.php:247
 * @route 'http://localhost/patient/medical-history'
 */
export const medicalHistory = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: medicalHistory.url(options),
    method: 'get',
})

medicalHistory.definition = {
    methods: ["get","head"],
    url: 'http://localhost/patient/medical-history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PatientController::medicalHistory
 * @see app/Http/Controllers/PatientController.php:247
 * @route 'http://localhost/patient/medical-history'
 */
medicalHistory.url = (options?: RouteQueryOptions) => {
    return medicalHistory.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::medicalHistory
 * @see app/Http/Controllers/PatientController.php:247
 * @route 'http://localhost/patient/medical-history'
 */
medicalHistory.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: medicalHistory.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PatientController::medicalHistory
 * @see app/Http/Controllers/PatientController.php:247
 * @route 'http://localhost/patient/medical-history'
 */
medicalHistory.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: medicalHistory.url(options),
    method: 'head',
})
const PatientController = { dashboard, editProfile, updateProfile, browseDoctors, availableSlots, bookAppointment, appointments, cancelAppointment, bills, medicalHistory }

export default PatientController