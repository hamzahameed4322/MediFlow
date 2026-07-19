import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PatientController::dashboard
 * @see app/Http/Controllers/PatientController.php:25
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: 'https://mediflow-production-60a9.up.railway.app/patient/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PatientController::dashboard
 * @see app/Http/Controllers/PatientController.php:25
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::dashboard
 * @see app/Http/Controllers/PatientController.php:25
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PatientController::dashboard
 * @see app/Http/Controllers/PatientController.php:25
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PatientController::dashboard
 * @see app/Http/Controllers/PatientController.php:25
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PatientController::dashboard
 * @see app/Http/Controllers/PatientController.php:25
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PatientController::dashboard
 * @see app/Http/Controllers/PatientController.php:25
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/dashboard'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
/**
* @see \App\Http\Controllers\PatientController::editProfile
 * @see app/Http/Controllers/PatientController.php:78
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/profile'
 */
export const editProfile = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: editProfile.url(options),
    method: 'get',
})

editProfile.definition = {
    methods: ["get","head"],
    url: 'https://mediflow-production-60a9.up.railway.app/patient/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PatientController::editProfile
 * @see app/Http/Controllers/PatientController.php:78
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/profile'
 */
editProfile.url = (options?: RouteQueryOptions) => {
    return editProfile.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::editProfile
 * @see app/Http/Controllers/PatientController.php:78
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/profile'
 */
editProfile.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: editProfile.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PatientController::editProfile
 * @see app/Http/Controllers/PatientController.php:78
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/profile'
 */
editProfile.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: editProfile.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PatientController::editProfile
 * @see app/Http/Controllers/PatientController.php:78
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/profile'
 */
    const editProfileForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: editProfile.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PatientController::editProfile
 * @see app/Http/Controllers/PatientController.php:78
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/profile'
 */
        editProfileForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: editProfile.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PatientController::editProfile
 * @see app/Http/Controllers/PatientController.php:78
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/profile'
 */
        editProfileForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: editProfile.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    editProfile.form = editProfileForm
/**
* @see \App\Http\Controllers\PatientController::updateProfile
 * @see app/Http/Controllers/PatientController.php:112
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/profile'
 */
export const updateProfile = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateProfile.url(options),
    method: 'put',
})

updateProfile.definition = {
    methods: ["put"],
    url: 'https://mediflow-production-60a9.up.railway.app/patient/profile',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\PatientController::updateProfile
 * @see app/Http/Controllers/PatientController.php:112
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/profile'
 */
updateProfile.url = (options?: RouteQueryOptions) => {
    return updateProfile.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::updateProfile
 * @see app/Http/Controllers/PatientController.php:112
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/profile'
 */
updateProfile.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateProfile.url(options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\PatientController::updateProfile
 * @see app/Http/Controllers/PatientController.php:112
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/profile'
 */
    const updateProfileForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateProfile.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PatientController::updateProfile
 * @see app/Http/Controllers/PatientController.php:112
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/profile'
 */
        updateProfileForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateProfile.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateProfile.form = updateProfileForm
/**
* @see \App\Http\Controllers\PatientController::browseDoctors
 * @see app/Http/Controllers/PatientController.php:137
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/doctors'
 */
export const browseDoctors = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: browseDoctors.url(options),
    method: 'get',
})

browseDoctors.definition = {
    methods: ["get","head"],
    url: 'https://mediflow-production-60a9.up.railway.app/patient/doctors',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PatientController::browseDoctors
 * @see app/Http/Controllers/PatientController.php:137
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/doctors'
 */
browseDoctors.url = (options?: RouteQueryOptions) => {
    return browseDoctors.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::browseDoctors
 * @see app/Http/Controllers/PatientController.php:137
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/doctors'
 */
browseDoctors.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: browseDoctors.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PatientController::browseDoctors
 * @see app/Http/Controllers/PatientController.php:137
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/doctors'
 */
browseDoctors.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: browseDoctors.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PatientController::browseDoctors
 * @see app/Http/Controllers/PatientController.php:137
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/doctors'
 */
    const browseDoctorsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: browseDoctors.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PatientController::browseDoctors
 * @see app/Http/Controllers/PatientController.php:137
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/doctors'
 */
        browseDoctorsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: browseDoctors.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PatientController::browseDoctors
 * @see app/Http/Controllers/PatientController.php:137
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/doctors'
 */
        browseDoctorsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: browseDoctors.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    browseDoctors.form = browseDoctorsForm
/**
* @see \App\Http\Controllers\PatientController::availableSlots
 * @see app/Http/Controllers/PatientController.php:174
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/doctors/{doctor}/slots'
 */
export const availableSlots = (args: { doctor: number | { id: number } } | [doctor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: availableSlots.url(args, options),
    method: 'get',
})

availableSlots.definition = {
    methods: ["get","head"],
    url: 'https://mediflow-production-60a9.up.railway.app/patient/doctors/{doctor}/slots',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PatientController::availableSlots
 * @see app/Http/Controllers/PatientController.php:174
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/doctors/{doctor}/slots'
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
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/doctors/{doctor}/slots'
 */
availableSlots.get = (args: { doctor: number | { id: number } } | [doctor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: availableSlots.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PatientController::availableSlots
 * @see app/Http/Controllers/PatientController.php:174
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/doctors/{doctor}/slots'
 */
availableSlots.head = (args: { doctor: number | { id: number } } | [doctor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: availableSlots.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PatientController::availableSlots
 * @see app/Http/Controllers/PatientController.php:174
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/doctors/{doctor}/slots'
 */
    const availableSlotsForm = (args: { doctor: number | { id: number } } | [doctor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: availableSlots.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PatientController::availableSlots
 * @see app/Http/Controllers/PatientController.php:174
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/doctors/{doctor}/slots'
 */
        availableSlotsForm.get = (args: { doctor: number | { id: number } } | [doctor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: availableSlots.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PatientController::availableSlots
 * @see app/Http/Controllers/PatientController.php:174
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/doctors/{doctor}/slots'
 */
        availableSlotsForm.head = (args: { doctor: number | { id: number } } | [doctor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: availableSlots.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    availableSlots.form = availableSlotsForm
/**
* @see \App\Http\Controllers\PatientController::bookAppointment
 * @see app/Http/Controllers/PatientController.php:186
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/appointments'
 */
export const bookAppointment = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bookAppointment.url(options),
    method: 'post',
})

bookAppointment.definition = {
    methods: ["post"],
    url: 'https://mediflow-production-60a9.up.railway.app/patient/appointments',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PatientController::bookAppointment
 * @see app/Http/Controllers/PatientController.php:186
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/appointments'
 */
bookAppointment.url = (options?: RouteQueryOptions) => {
    return bookAppointment.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::bookAppointment
 * @see app/Http/Controllers/PatientController.php:186
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/appointments'
 */
bookAppointment.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: bookAppointment.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PatientController::bookAppointment
 * @see app/Http/Controllers/PatientController.php:186
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/appointments'
 */
    const bookAppointmentForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: bookAppointment.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PatientController::bookAppointment
 * @see app/Http/Controllers/PatientController.php:186
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/appointments'
 */
        bookAppointmentForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: bookAppointment.url(options),
            method: 'post',
        })
    
    bookAppointment.form = bookAppointmentForm
/**
* @see \App\Http\Controllers\PatientController::appointments
 * @see app/Http/Controllers/PatientController.php:196
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/appointments'
 */
export const appointments = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appointments.url(options),
    method: 'get',
})

appointments.definition = {
    methods: ["get","head"],
    url: 'https://mediflow-production-60a9.up.railway.app/patient/appointments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PatientController::appointments
 * @see app/Http/Controllers/PatientController.php:196
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/appointments'
 */
appointments.url = (options?: RouteQueryOptions) => {
    return appointments.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::appointments
 * @see app/Http/Controllers/PatientController.php:196
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/appointments'
 */
appointments.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appointments.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PatientController::appointments
 * @see app/Http/Controllers/PatientController.php:196
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/appointments'
 */
appointments.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: appointments.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PatientController::appointments
 * @see app/Http/Controllers/PatientController.php:196
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/appointments'
 */
    const appointmentsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: appointments.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PatientController::appointments
 * @see app/Http/Controllers/PatientController.php:196
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/appointments'
 */
        appointmentsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: appointments.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PatientController::appointments
 * @see app/Http/Controllers/PatientController.php:196
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/appointments'
 */
        appointmentsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: appointments.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    appointments.form = appointmentsForm
/**
* @see \App\Http\Controllers\PatientController::cancelAppointment
 * @see app/Http/Controllers/PatientController.php:216
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/appointments/{appointment}/cancel'
 */
export const cancelAppointment = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancelAppointment.url(args, options),
    method: 'post',
})

cancelAppointment.definition = {
    methods: ["post"],
    url: 'https://mediflow-production-60a9.up.railway.app/patient/appointments/{appointment}/cancel',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PatientController::cancelAppointment
 * @see app/Http/Controllers/PatientController.php:216
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/appointments/{appointment}/cancel'
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
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/appointments/{appointment}/cancel'
 */
cancelAppointment.post = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancelAppointment.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PatientController::cancelAppointment
 * @see app/Http/Controllers/PatientController.php:216
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/appointments/{appointment}/cancel'
 */
    const cancelAppointmentForm = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: cancelAppointment.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PatientController::cancelAppointment
 * @see app/Http/Controllers/PatientController.php:216
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/appointments/{appointment}/cancel'
 */
        cancelAppointmentForm.post = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: cancelAppointment.url(args, options),
            method: 'post',
        })
    
    cancelAppointment.form = cancelAppointmentForm
/**
* @see \App\Http\Controllers\PatientController::bills
 * @see app/Http/Controllers/PatientController.php:226
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/bills'
 */
export const bills = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bills.url(options),
    method: 'get',
})

bills.definition = {
    methods: ["get","head"],
    url: 'https://mediflow-production-60a9.up.railway.app/patient/bills',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PatientController::bills
 * @see app/Http/Controllers/PatientController.php:226
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/bills'
 */
bills.url = (options?: RouteQueryOptions) => {
    return bills.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::bills
 * @see app/Http/Controllers/PatientController.php:226
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/bills'
 */
bills.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bills.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PatientController::bills
 * @see app/Http/Controllers/PatientController.php:226
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/bills'
 */
bills.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: bills.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PatientController::bills
 * @see app/Http/Controllers/PatientController.php:226
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/bills'
 */
    const billsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: bills.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PatientController::bills
 * @see app/Http/Controllers/PatientController.php:226
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/bills'
 */
        billsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: bills.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PatientController::bills
 * @see app/Http/Controllers/PatientController.php:226
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/bills'
 */
        billsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: bills.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    bills.form = billsForm
/**
* @see \App\Http\Controllers\PatientController::medicalHistory
 * @see app/Http/Controllers/PatientController.php:247
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/medical-history'
 */
export const medicalHistory = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: medicalHistory.url(options),
    method: 'get',
})

medicalHistory.definition = {
    methods: ["get","head"],
    url: 'https://mediflow-production-60a9.up.railway.app/patient/medical-history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PatientController::medicalHistory
 * @see app/Http/Controllers/PatientController.php:247
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/medical-history'
 */
medicalHistory.url = (options?: RouteQueryOptions) => {
    return medicalHistory.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PatientController::medicalHistory
 * @see app/Http/Controllers/PatientController.php:247
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/medical-history'
 */
medicalHistory.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: medicalHistory.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PatientController::medicalHistory
 * @see app/Http/Controllers/PatientController.php:247
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/medical-history'
 */
medicalHistory.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: medicalHistory.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PatientController::medicalHistory
 * @see app/Http/Controllers/PatientController.php:247
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/medical-history'
 */
    const medicalHistoryForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: medicalHistory.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PatientController::medicalHistory
 * @see app/Http/Controllers/PatientController.php:247
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/medical-history'
 */
        medicalHistoryForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: medicalHistory.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PatientController::medicalHistory
 * @see app/Http/Controllers/PatientController.php:247
 * @route 'https://mediflow-production-60a9.up.railway.app/patient/medical-history'
 */
        medicalHistoryForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: medicalHistory.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    medicalHistory.form = medicalHistoryForm
const PatientController = { dashboard, editProfile, updateProfile, browseDoctors, availableSlots, bookAppointment, appointments, cancelAppointment, bills, medicalHistory }

export default PatientController