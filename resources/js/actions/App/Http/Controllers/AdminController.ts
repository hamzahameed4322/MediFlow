import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AdminController::dashboard
 * @see app/Http/Controllers/AdminController.php:37
 * @route 'http://cms.test/admin/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: 'http://cms.test/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::dashboard
 * @see app/Http/Controllers/AdminController.php:37
 * @route 'http://cms.test/admin/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::dashboard
 * @see app/Http/Controllers/AdminController.php:37
 * @route 'http://cms.test/admin/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminController::dashboard
 * @see app/Http/Controllers/AdminController.php:37
 * @route 'http://cms.test/admin/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AdminController::dashboard
 * @see app/Http/Controllers/AdminController.php:37
 * @route 'http://cms.test/admin/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AdminController::dashboard
 * @see app/Http/Controllers/AdminController.php:37
 * @route 'http://cms.test/admin/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AdminController::dashboard
 * @see app/Http/Controllers/AdminController.php:37
 * @route 'http://cms.test/admin/dashboard'
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
* @see \App\Http\Controllers\AdminController::users
 * @see app/Http/Controllers/AdminController.php:97
 * @route 'http://cms.test/admin/users'
 */
export const users = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: users.url(options),
    method: 'get',
})

users.definition = {
    methods: ["get","head"],
    url: 'http://cms.test/admin/users',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::users
 * @see app/Http/Controllers/AdminController.php:97
 * @route 'http://cms.test/admin/users'
 */
users.url = (options?: RouteQueryOptions) => {
    return users.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::users
 * @see app/Http/Controllers/AdminController.php:97
 * @route 'http://cms.test/admin/users'
 */
users.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: users.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminController::users
 * @see app/Http/Controllers/AdminController.php:97
 * @route 'http://cms.test/admin/users'
 */
users.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: users.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AdminController::users
 * @see app/Http/Controllers/AdminController.php:97
 * @route 'http://cms.test/admin/users'
 */
    const usersForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: users.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AdminController::users
 * @see app/Http/Controllers/AdminController.php:97
 * @route 'http://cms.test/admin/users'
 */
        usersForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: users.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AdminController::users
 * @see app/Http/Controllers/AdminController.php:97
 * @route 'http://cms.test/admin/users'
 */
        usersForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: users.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    users.form = usersForm
/**
* @see \App\Http\Controllers\AdminController::toggleUserStatus
 * @see app/Http/Controllers/AdminController.php:135
 * @route 'http://cms.test/admin/users/{user}/toggle-status'
 */
export const toggleUserStatus = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleUserStatus.url(args, options),
    method: 'post',
})

toggleUserStatus.definition = {
    methods: ["post"],
    url: 'http://cms.test/admin/users/{user}/toggle-status',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AdminController::toggleUserStatus
 * @see app/Http/Controllers/AdminController.php:135
 * @route 'http://cms.test/admin/users/{user}/toggle-status'
 */
toggleUserStatus.url = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { user: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { user: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    user: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        user: typeof args.user === 'object'
                ? args.user.id
                : args.user,
                }

    return toggleUserStatus.definition.url
            .replace('{user}', parsedArgs.user.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::toggleUserStatus
 * @see app/Http/Controllers/AdminController.php:135
 * @route 'http://cms.test/admin/users/{user}/toggle-status'
 */
toggleUserStatus.post = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleUserStatus.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AdminController::toggleUserStatus
 * @see app/Http/Controllers/AdminController.php:135
 * @route 'http://cms.test/admin/users/{user}/toggle-status'
 */
    const toggleUserStatusForm = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggleUserStatus.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AdminController::toggleUserStatus
 * @see app/Http/Controllers/AdminController.php:135
 * @route 'http://cms.test/admin/users/{user}/toggle-status'
 */
        toggleUserStatusForm.post = (args: { user: number | { id: number } } | [user: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggleUserStatus.url(args, options),
            method: 'post',
        })
    
    toggleUserStatus.form = toggleUserStatusForm
/**
* @see \App\Http\Controllers\AdminController::doctors
 * @see app/Http/Controllers/AdminController.php:150
 * @route 'http://cms.test/admin/doctors'
 */
export const doctors = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: doctors.url(options),
    method: 'get',
})

doctors.definition = {
    methods: ["get","head"],
    url: 'http://cms.test/admin/doctors',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::doctors
 * @see app/Http/Controllers/AdminController.php:150
 * @route 'http://cms.test/admin/doctors'
 */
doctors.url = (options?: RouteQueryOptions) => {
    return doctors.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::doctors
 * @see app/Http/Controllers/AdminController.php:150
 * @route 'http://cms.test/admin/doctors'
 */
doctors.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: doctors.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminController::doctors
 * @see app/Http/Controllers/AdminController.php:150
 * @route 'http://cms.test/admin/doctors'
 */
doctors.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: doctors.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AdminController::doctors
 * @see app/Http/Controllers/AdminController.php:150
 * @route 'http://cms.test/admin/doctors'
 */
    const doctorsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: doctors.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AdminController::doctors
 * @see app/Http/Controllers/AdminController.php:150
 * @route 'http://cms.test/admin/doctors'
 */
        doctorsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: doctors.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AdminController::doctors
 * @see app/Http/Controllers/AdminController.php:150
 * @route 'http://cms.test/admin/doctors'
 */
        doctorsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: doctors.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    doctors.form = doctorsForm
/**
* @see \App\Http\Controllers\AdminController::storeDoctor
 * @see app/Http/Controllers/AdminController.php:198
 * @route 'http://cms.test/admin/doctors'
 */
export const storeDoctor = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeDoctor.url(options),
    method: 'post',
})

storeDoctor.definition = {
    methods: ["post"],
    url: 'http://cms.test/admin/doctors',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AdminController::storeDoctor
 * @see app/Http/Controllers/AdminController.php:198
 * @route 'http://cms.test/admin/doctors'
 */
storeDoctor.url = (options?: RouteQueryOptions) => {
    return storeDoctor.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::storeDoctor
 * @see app/Http/Controllers/AdminController.php:198
 * @route 'http://cms.test/admin/doctors'
 */
storeDoctor.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeDoctor.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AdminController::storeDoctor
 * @see app/Http/Controllers/AdminController.php:198
 * @route 'http://cms.test/admin/doctors'
 */
    const storeDoctorForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeDoctor.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AdminController::storeDoctor
 * @see app/Http/Controllers/AdminController.php:198
 * @route 'http://cms.test/admin/doctors'
 */
        storeDoctorForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeDoctor.url(options),
            method: 'post',
        })
    
    storeDoctor.form = storeDoctorForm
/**
* @see \App\Http\Controllers\AdminController::updateDoctor
 * @see app/Http/Controllers/AdminController.php:233
 * @route 'http://cms.test/admin/doctors/{doctor}'
 */
export const updateDoctor = (args: { doctor: number | { id: number } } | [doctor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateDoctor.url(args, options),
    method: 'put',
})

updateDoctor.definition = {
    methods: ["put"],
    url: 'http://cms.test/admin/doctors/{doctor}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\AdminController::updateDoctor
 * @see app/Http/Controllers/AdminController.php:233
 * @route 'http://cms.test/admin/doctors/{doctor}'
 */
updateDoctor.url = (args: { doctor: number | { id: number } } | [doctor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return updateDoctor.definition.url
            .replace('{doctor}', parsedArgs.doctor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::updateDoctor
 * @see app/Http/Controllers/AdminController.php:233
 * @route 'http://cms.test/admin/doctors/{doctor}'
 */
updateDoctor.put = (args: { doctor: number | { id: number } } | [doctor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateDoctor.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\AdminController::updateDoctor
 * @see app/Http/Controllers/AdminController.php:233
 * @route 'http://cms.test/admin/doctors/{doctor}'
 */
    const updateDoctorForm = (args: { doctor: number | { id: number } } | [doctor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateDoctor.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AdminController::updateDoctor
 * @see app/Http/Controllers/AdminController.php:233
 * @route 'http://cms.test/admin/doctors/{doctor}'
 */
        updateDoctorForm.put = (args: { doctor: number | { id: number } } | [doctor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateDoctor.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateDoctor.form = updateDoctorForm
/**
* @see \App\Http\Controllers\AdminController::toggleDoctorStatus
 * @see app/Http/Controllers/AdminController.php:258
 * @route 'http://cms.test/admin/doctors/{doctor}/toggle-status'
 */
export const toggleDoctorStatus = (args: { doctor: number | { id: number } } | [doctor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleDoctorStatus.url(args, options),
    method: 'post',
})

toggleDoctorStatus.definition = {
    methods: ["post"],
    url: 'http://cms.test/admin/doctors/{doctor}/toggle-status',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AdminController::toggleDoctorStatus
 * @see app/Http/Controllers/AdminController.php:258
 * @route 'http://cms.test/admin/doctors/{doctor}/toggle-status'
 */
toggleDoctorStatus.url = (args: { doctor: number | { id: number } } | [doctor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return toggleDoctorStatus.definition.url
            .replace('{doctor}', parsedArgs.doctor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::toggleDoctorStatus
 * @see app/Http/Controllers/AdminController.php:258
 * @route 'http://cms.test/admin/doctors/{doctor}/toggle-status'
 */
toggleDoctorStatus.post = (args: { doctor: number | { id: number } } | [doctor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggleDoctorStatus.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AdminController::toggleDoctorStatus
 * @see app/Http/Controllers/AdminController.php:258
 * @route 'http://cms.test/admin/doctors/{doctor}/toggle-status'
 */
    const toggleDoctorStatusForm = (args: { doctor: number | { id: number } } | [doctor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggleDoctorStatus.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AdminController::toggleDoctorStatus
 * @see app/Http/Controllers/AdminController.php:258
 * @route 'http://cms.test/admin/doctors/{doctor}/toggle-status'
 */
        toggleDoctorStatusForm.post = (args: { doctor: number | { id: number } } | [doctor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggleDoctorStatus.url(args, options),
            method: 'post',
        })
    
    toggleDoctorStatus.form = toggleDoctorStatusForm
/**
* @see \App\Http\Controllers\AdminController::appointments
 * @see app/Http/Controllers/AdminController.php:270
 * @route 'http://cms.test/admin/appointments'
 */
export const appointments = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appointments.url(options),
    method: 'get',
})

appointments.definition = {
    methods: ["get","head"],
    url: 'http://cms.test/admin/appointments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::appointments
 * @see app/Http/Controllers/AdminController.php:270
 * @route 'http://cms.test/admin/appointments'
 */
appointments.url = (options?: RouteQueryOptions) => {
    return appointments.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::appointments
 * @see app/Http/Controllers/AdminController.php:270
 * @route 'http://cms.test/admin/appointments'
 */
appointments.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appointments.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminController::appointments
 * @see app/Http/Controllers/AdminController.php:270
 * @route 'http://cms.test/admin/appointments'
 */
appointments.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: appointments.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AdminController::appointments
 * @see app/Http/Controllers/AdminController.php:270
 * @route 'http://cms.test/admin/appointments'
 */
    const appointmentsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: appointments.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AdminController::appointments
 * @see app/Http/Controllers/AdminController.php:270
 * @route 'http://cms.test/admin/appointments'
 */
        appointmentsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: appointments.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AdminController::appointments
 * @see app/Http/Controllers/AdminController.php:270
 * @route 'http://cms.test/admin/appointments'
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
* @see \App\Http\Controllers\AdminController::updateAppointmentStatus
 * @see app/Http/Controllers/AdminController.php:341
 * @route 'http://cms.test/admin/appointments/{appointment}/status'
 */
export const updateAppointmentStatus = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateAppointmentStatus.url(args, options),
    method: 'post',
})

updateAppointmentStatus.definition = {
    methods: ["post"],
    url: 'http://cms.test/admin/appointments/{appointment}/status',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\AdminController::updateAppointmentStatus
 * @see app/Http/Controllers/AdminController.php:341
 * @route 'http://cms.test/admin/appointments/{appointment}/status'
 */
updateAppointmentStatus.url = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return updateAppointmentStatus.definition.url
            .replace('{appointment}', parsedArgs.appointment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::updateAppointmentStatus
 * @see app/Http/Controllers/AdminController.php:341
 * @route 'http://cms.test/admin/appointments/{appointment}/status'
 */
updateAppointmentStatus.post = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateAppointmentStatus.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\AdminController::updateAppointmentStatus
 * @see app/Http/Controllers/AdminController.php:341
 * @route 'http://cms.test/admin/appointments/{appointment}/status'
 */
    const updateAppointmentStatusForm = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateAppointmentStatus.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\AdminController::updateAppointmentStatus
 * @see app/Http/Controllers/AdminController.php:341
 * @route 'http://cms.test/admin/appointments/{appointment}/status'
 */
        updateAppointmentStatusForm.post = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateAppointmentStatus.url(args, options),
            method: 'post',
        })
    
    updateAppointmentStatus.form = updateAppointmentStatusForm
/**
* @see \App\Http\Controllers\AdminController::consultations
 * @see app/Http/Controllers/AdminController.php:392
 * @route 'http://cms.test/admin/consultations'
 */
export const consultations = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: consultations.url(options),
    method: 'get',
})

consultations.definition = {
    methods: ["get","head"],
    url: 'http://cms.test/admin/consultations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::consultations
 * @see app/Http/Controllers/AdminController.php:392
 * @route 'http://cms.test/admin/consultations'
 */
consultations.url = (options?: RouteQueryOptions) => {
    return consultations.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::consultations
 * @see app/Http/Controllers/AdminController.php:392
 * @route 'http://cms.test/admin/consultations'
 */
consultations.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: consultations.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminController::consultations
 * @see app/Http/Controllers/AdminController.php:392
 * @route 'http://cms.test/admin/consultations'
 */
consultations.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: consultations.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AdminController::consultations
 * @see app/Http/Controllers/AdminController.php:392
 * @route 'http://cms.test/admin/consultations'
 */
    const consultationsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: consultations.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AdminController::consultations
 * @see app/Http/Controllers/AdminController.php:392
 * @route 'http://cms.test/admin/consultations'
 */
        consultationsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: consultations.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AdminController::consultations
 * @see app/Http/Controllers/AdminController.php:392
 * @route 'http://cms.test/admin/consultations'
 */
        consultationsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: consultations.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    consultations.form = consultationsForm
/**
* @see \App\Http\Controllers\AdminController::prescriptions
 * @see app/Http/Controllers/AdminController.php:423
 * @route 'http://cms.test/admin/prescriptions'
 */
export const prescriptions = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: prescriptions.url(options),
    method: 'get',
})

prescriptions.definition = {
    methods: ["get","head"],
    url: 'http://cms.test/admin/prescriptions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::prescriptions
 * @see app/Http/Controllers/AdminController.php:423
 * @route 'http://cms.test/admin/prescriptions'
 */
prescriptions.url = (options?: RouteQueryOptions) => {
    return prescriptions.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::prescriptions
 * @see app/Http/Controllers/AdminController.php:423
 * @route 'http://cms.test/admin/prescriptions'
 */
prescriptions.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: prescriptions.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminController::prescriptions
 * @see app/Http/Controllers/AdminController.php:423
 * @route 'http://cms.test/admin/prescriptions'
 */
prescriptions.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: prescriptions.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AdminController::prescriptions
 * @see app/Http/Controllers/AdminController.php:423
 * @route 'http://cms.test/admin/prescriptions'
 */
    const prescriptionsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: prescriptions.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AdminController::prescriptions
 * @see app/Http/Controllers/AdminController.php:423
 * @route 'http://cms.test/admin/prescriptions'
 */
        prescriptionsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: prescriptions.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AdminController::prescriptions
 * @see app/Http/Controllers/AdminController.php:423
 * @route 'http://cms.test/admin/prescriptions'
 */
        prescriptionsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: prescriptions.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    prescriptions.form = prescriptionsForm
/**
* @see \App\Http\Controllers\AdminController::bills
 * @see app/Http/Controllers/AdminController.php:450
 * @route 'http://cms.test/admin/bills'
 */
export const bills = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bills.url(options),
    method: 'get',
})

bills.definition = {
    methods: ["get","head"],
    url: 'http://cms.test/admin/bills',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::bills
 * @see app/Http/Controllers/AdminController.php:450
 * @route 'http://cms.test/admin/bills'
 */
bills.url = (options?: RouteQueryOptions) => {
    return bills.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::bills
 * @see app/Http/Controllers/AdminController.php:450
 * @route 'http://cms.test/admin/bills'
 */
bills.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bills.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminController::bills
 * @see app/Http/Controllers/AdminController.php:450
 * @route 'http://cms.test/admin/bills'
 */
bills.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: bills.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AdminController::bills
 * @see app/Http/Controllers/AdminController.php:450
 * @route 'http://cms.test/admin/bills'
 */
    const billsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: bills.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AdminController::bills
 * @see app/Http/Controllers/AdminController.php:450
 * @route 'http://cms.test/admin/bills'
 */
        billsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: bills.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AdminController::bills
 * @see app/Http/Controllers/AdminController.php:450
 * @route 'http://cms.test/admin/bills'
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
* @see \App\Http\Controllers\AdminController::reports
 * @see app/Http/Controllers/AdminController.php:501
 * @route 'http://cms.test/admin/reports'
 */
export const reports = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reports.url(options),
    method: 'get',
})

reports.definition = {
    methods: ["get","head"],
    url: 'http://cms.test/admin/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::reports
 * @see app/Http/Controllers/AdminController.php:501
 * @route 'http://cms.test/admin/reports'
 */
reports.url = (options?: RouteQueryOptions) => {
    return reports.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::reports
 * @see app/Http/Controllers/AdminController.php:501
 * @route 'http://cms.test/admin/reports'
 */
reports.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reports.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminController::reports
 * @see app/Http/Controllers/AdminController.php:501
 * @route 'http://cms.test/admin/reports'
 */
reports.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: reports.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AdminController::reports
 * @see app/Http/Controllers/AdminController.php:501
 * @route 'http://cms.test/admin/reports'
 */
    const reportsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: reports.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AdminController::reports
 * @see app/Http/Controllers/AdminController.php:501
 * @route 'http://cms.test/admin/reports'
 */
        reportsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reports.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AdminController::reports
 * @see app/Http/Controllers/AdminController.php:501
 * @route 'http://cms.test/admin/reports'
 */
        reportsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reports.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    reports.form = reportsForm
/**
* @see \App\Http\Controllers\AdminController::doctorReviews
 * @see app/Http/Controllers/AdminController.php:366
 * @route 'http://cms.test/admin/doctors/{doctor}/reviews'
 */
export const doctorReviews = (args: { doctor: number | { id: number } } | [doctor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: doctorReviews.url(args, options),
    method: 'get',
})

doctorReviews.definition = {
    methods: ["get","head"],
    url: 'http://cms.test/admin/doctors/{doctor}/reviews',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AdminController::doctorReviews
 * @see app/Http/Controllers/AdminController.php:366
 * @route 'http://cms.test/admin/doctors/{doctor}/reviews'
 */
doctorReviews.url = (args: { doctor: number | { id: number } } | [doctor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return doctorReviews.definition.url
            .replace('{doctor}', parsedArgs.doctor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AdminController::doctorReviews
 * @see app/Http/Controllers/AdminController.php:366
 * @route 'http://cms.test/admin/doctors/{doctor}/reviews'
 */
doctorReviews.get = (args: { doctor: number | { id: number } } | [doctor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: doctorReviews.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AdminController::doctorReviews
 * @see app/Http/Controllers/AdminController.php:366
 * @route 'http://cms.test/admin/doctors/{doctor}/reviews'
 */
doctorReviews.head = (args: { doctor: number | { id: number } } | [doctor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: doctorReviews.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AdminController::doctorReviews
 * @see app/Http/Controllers/AdminController.php:366
 * @route 'http://cms.test/admin/doctors/{doctor}/reviews'
 */
    const doctorReviewsForm = (args: { doctor: number | { id: number } } | [doctor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: doctorReviews.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AdminController::doctorReviews
 * @see app/Http/Controllers/AdminController.php:366
 * @route 'http://cms.test/admin/doctors/{doctor}/reviews'
 */
        doctorReviewsForm.get = (args: { doctor: number | { id: number } } | [doctor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: doctorReviews.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AdminController::doctorReviews
 * @see app/Http/Controllers/AdminController.php:366
 * @route 'http://cms.test/admin/doctors/{doctor}/reviews'
 */
        doctorReviewsForm.head = (args: { doctor: number | { id: number } } | [doctor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: doctorReviews.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    doctorReviews.form = doctorReviewsForm
const AdminController = { dashboard, users, toggleUserStatus, doctors, storeDoctor, updateDoctor, toggleDoctorStatus, appointments, updateAppointmentStatus, consultations, prescriptions, bills, reports, doctorReviews }

export default AdminController