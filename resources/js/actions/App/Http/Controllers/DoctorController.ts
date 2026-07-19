import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\DoctorController::dashboard
 * @see app/Http/Controllers/DoctorController.php:31
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: 'https://mediflow-production-60a9.up.railway.app/doctor/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DoctorController::dashboard
 * @see app/Http/Controllers/DoctorController.php:31
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DoctorController::dashboard
 * @see app/Http/Controllers/DoctorController.php:31
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DoctorController::dashboard
 * @see app/Http/Controllers/DoctorController.php:31
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DoctorController::dashboard
 * @see app/Http/Controllers/DoctorController.php:31
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DoctorController::dashboard
 * @see app/Http/Controllers/DoctorController.php:31
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DoctorController::dashboard
 * @see app/Http/Controllers/DoctorController.php:31
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/dashboard'
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
* @see \App\Http\Controllers\DoctorController::editProfile
 * @see app/Http/Controllers/DoctorController.php:84
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/profile'
 */
export const editProfile = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: editProfile.url(options),
    method: 'get',
})

editProfile.definition = {
    methods: ["get","head"],
    url: 'https://mediflow-production-60a9.up.railway.app/doctor/profile',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DoctorController::editProfile
 * @see app/Http/Controllers/DoctorController.php:84
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/profile'
 */
editProfile.url = (options?: RouteQueryOptions) => {
    return editProfile.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DoctorController::editProfile
 * @see app/Http/Controllers/DoctorController.php:84
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/profile'
 */
editProfile.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: editProfile.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DoctorController::editProfile
 * @see app/Http/Controllers/DoctorController.php:84
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/profile'
 */
editProfile.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: editProfile.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DoctorController::editProfile
 * @see app/Http/Controllers/DoctorController.php:84
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/profile'
 */
    const editProfileForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: editProfile.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DoctorController::editProfile
 * @see app/Http/Controllers/DoctorController.php:84
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/profile'
 */
        editProfileForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: editProfile.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DoctorController::editProfile
 * @see app/Http/Controllers/DoctorController.php:84
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/profile'
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
* @see \App\Http\Controllers\DoctorController::updateProfile
 * @see app/Http/Controllers/DoctorController.php:118
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/profile'
 */
export const updateProfile = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateProfile.url(options),
    method: 'put',
})

updateProfile.definition = {
    methods: ["put"],
    url: 'https://mediflow-production-60a9.up.railway.app/doctor/profile',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\DoctorController::updateProfile
 * @see app/Http/Controllers/DoctorController.php:118
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/profile'
 */
updateProfile.url = (options?: RouteQueryOptions) => {
    return updateProfile.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DoctorController::updateProfile
 * @see app/Http/Controllers/DoctorController.php:118
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/profile'
 */
updateProfile.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateProfile.url(options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\DoctorController::updateProfile
 * @see app/Http/Controllers/DoctorController.php:118
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/profile'
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
* @see \App\Http\Controllers\DoctorController::updateProfile
 * @see app/Http/Controllers/DoctorController.php:118
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/profile'
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
* @see \App\Http\Controllers\DoctorController::schedules
 * @see app/Http/Controllers/DoctorController.php:142
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/schedules'
 */
export const schedules = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: schedules.url(options),
    method: 'get',
})

schedules.definition = {
    methods: ["get","head"],
    url: 'https://mediflow-production-60a9.up.railway.app/doctor/schedules',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DoctorController::schedules
 * @see app/Http/Controllers/DoctorController.php:142
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/schedules'
 */
schedules.url = (options?: RouteQueryOptions) => {
    return schedules.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DoctorController::schedules
 * @see app/Http/Controllers/DoctorController.php:142
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/schedules'
 */
schedules.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: schedules.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DoctorController::schedules
 * @see app/Http/Controllers/DoctorController.php:142
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/schedules'
 */
schedules.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: schedules.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DoctorController::schedules
 * @see app/Http/Controllers/DoctorController.php:142
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/schedules'
 */
    const schedulesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: schedules.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DoctorController::schedules
 * @see app/Http/Controllers/DoctorController.php:142
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/schedules'
 */
        schedulesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: schedules.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DoctorController::schedules
 * @see app/Http/Controllers/DoctorController.php:142
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/schedules'
 */
        schedulesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: schedules.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    schedules.form = schedulesForm
/**
* @see \App\Http\Controllers\DoctorController::storeSchedule
 * @see app/Http/Controllers/DoctorController.php:169
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/schedules'
 */
export const storeSchedule = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeSchedule.url(options),
    method: 'post',
})

storeSchedule.definition = {
    methods: ["post"],
    url: 'https://mediflow-production-60a9.up.railway.app/doctor/schedules',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DoctorController::storeSchedule
 * @see app/Http/Controllers/DoctorController.php:169
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/schedules'
 */
storeSchedule.url = (options?: RouteQueryOptions) => {
    return storeSchedule.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DoctorController::storeSchedule
 * @see app/Http/Controllers/DoctorController.php:169
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/schedules'
 */
storeSchedule.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeSchedule.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DoctorController::storeSchedule
 * @see app/Http/Controllers/DoctorController.php:169
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/schedules'
 */
    const storeScheduleForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeSchedule.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DoctorController::storeSchedule
 * @see app/Http/Controllers/DoctorController.php:169
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/schedules'
 */
        storeScheduleForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeSchedule.url(options),
            method: 'post',
        })
    
    storeSchedule.form = storeScheduleForm
/**
* @see \App\Http\Controllers\DoctorController::deleteSchedule
 * @see app/Http/Controllers/DoctorController.php:213
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/schedules/{schedule}'
 */
export const deleteSchedule = (args: { schedule: number | { id: number } } | [schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteSchedule.url(args, options),
    method: 'delete',
})

deleteSchedule.definition = {
    methods: ["delete"],
    url: 'https://mediflow-production-60a9.up.railway.app/doctor/schedules/{schedule}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\DoctorController::deleteSchedule
 * @see app/Http/Controllers/DoctorController.php:213
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/schedules/{schedule}'
 */
deleteSchedule.url = (args: { schedule: number | { id: number } } | [schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { schedule: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { schedule: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    schedule: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        schedule: typeof args.schedule === 'object'
                ? args.schedule.id
                : args.schedule,
                }

    return deleteSchedule.definition.url
            .replace('{schedule}', parsedArgs.schedule.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DoctorController::deleteSchedule
 * @see app/Http/Controllers/DoctorController.php:213
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/schedules/{schedule}'
 */
deleteSchedule.delete = (args: { schedule: number | { id: number } } | [schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteSchedule.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\DoctorController::deleteSchedule
 * @see app/Http/Controllers/DoctorController.php:213
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/schedules/{schedule}'
 */
    const deleteScheduleForm = (args: { schedule: number | { id: number } } | [schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: deleteSchedule.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DoctorController::deleteSchedule
 * @see app/Http/Controllers/DoctorController.php:213
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/schedules/{schedule}'
 */
        deleteScheduleForm.delete = (args: { schedule: number | { id: number } } | [schedule: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: deleteSchedule.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    deleteSchedule.form = deleteScheduleForm
/**
* @see \App\Http\Controllers\DoctorController::appointments
 * @see app/Http/Controllers/DoctorController.php:225
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/appointments'
 */
export const appointments = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appointments.url(options),
    method: 'get',
})

appointments.definition = {
    methods: ["get","head"],
    url: 'https://mediflow-production-60a9.up.railway.app/doctor/appointments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DoctorController::appointments
 * @see app/Http/Controllers/DoctorController.php:225
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/appointments'
 */
appointments.url = (options?: RouteQueryOptions) => {
    return appointments.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DoctorController::appointments
 * @see app/Http/Controllers/DoctorController.php:225
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/appointments'
 */
appointments.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: appointments.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DoctorController::appointments
 * @see app/Http/Controllers/DoctorController.php:225
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/appointments'
 */
appointments.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: appointments.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DoctorController::appointments
 * @see app/Http/Controllers/DoctorController.php:225
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/appointments'
 */
    const appointmentsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: appointments.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DoctorController::appointments
 * @see app/Http/Controllers/DoctorController.php:225
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/appointments'
 */
        appointmentsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: appointments.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DoctorController::appointments
 * @see app/Http/Controllers/DoctorController.php:225
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/appointments'
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
* @see \App\Http\Controllers\DoctorController::approveAppointment
 * @see app/Http/Controllers/DoctorController.php:260
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/appointments/{appointment}/approve'
 */
export const approveAppointment = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approveAppointment.url(args, options),
    method: 'post',
})

approveAppointment.definition = {
    methods: ["post"],
    url: 'https://mediflow-production-60a9.up.railway.app/doctor/appointments/{appointment}/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DoctorController::approveAppointment
 * @see app/Http/Controllers/DoctorController.php:260
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/appointments/{appointment}/approve'
 */
approveAppointment.url = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return approveAppointment.definition.url
            .replace('{appointment}', parsedArgs.appointment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DoctorController::approveAppointment
 * @see app/Http/Controllers/DoctorController.php:260
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/appointments/{appointment}/approve'
 */
approveAppointment.post = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: approveAppointment.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DoctorController::approveAppointment
 * @see app/Http/Controllers/DoctorController.php:260
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/appointments/{appointment}/approve'
 */
    const approveAppointmentForm = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: approveAppointment.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DoctorController::approveAppointment
 * @see app/Http/Controllers/DoctorController.php:260
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/appointments/{appointment}/approve'
 */
        approveAppointmentForm.post = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: approveAppointment.url(args, options),
            method: 'post',
        })
    
    approveAppointment.form = approveAppointmentForm
/**
* @see \App\Http\Controllers\DoctorController::rejectAppointment
 * @see app/Http/Controllers/DoctorController.php:272
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/appointments/{appointment}/reject'
 */
export const rejectAppointment = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: rejectAppointment.url(args, options),
    method: 'post',
})

rejectAppointment.definition = {
    methods: ["post"],
    url: 'https://mediflow-production-60a9.up.railway.app/doctor/appointments/{appointment}/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DoctorController::rejectAppointment
 * @see app/Http/Controllers/DoctorController.php:272
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/appointments/{appointment}/reject'
 */
rejectAppointment.url = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return rejectAppointment.definition.url
            .replace('{appointment}', parsedArgs.appointment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DoctorController::rejectAppointment
 * @see app/Http/Controllers/DoctorController.php:272
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/appointments/{appointment}/reject'
 */
rejectAppointment.post = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: rejectAppointment.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DoctorController::rejectAppointment
 * @see app/Http/Controllers/DoctorController.php:272
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/appointments/{appointment}/reject'
 */
    const rejectAppointmentForm = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: rejectAppointment.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DoctorController::rejectAppointment
 * @see app/Http/Controllers/DoctorController.php:272
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/appointments/{appointment}/reject'
 */
        rejectAppointmentForm.post = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: rejectAppointment.url(args, options),
            method: 'post',
        })
    
    rejectAppointment.form = rejectAppointmentForm
/**
* @see \App\Http\Controllers\DoctorController::cancelAppointment
 * @see app/Http/Controllers/DoctorController.php:284
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/appointments/{appointment}/cancel'
 */
export const cancelAppointment = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancelAppointment.url(args, options),
    method: 'post',
})

cancelAppointment.definition = {
    methods: ["post"],
    url: 'https://mediflow-production-60a9.up.railway.app/doctor/appointments/{appointment}/cancel',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DoctorController::cancelAppointment
 * @see app/Http/Controllers/DoctorController.php:284
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/appointments/{appointment}/cancel'
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
* @see \App\Http\Controllers\DoctorController::cancelAppointment
 * @see app/Http/Controllers/DoctorController.php:284
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/appointments/{appointment}/cancel'
 */
cancelAppointment.post = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancelAppointment.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DoctorController::cancelAppointment
 * @see app/Http/Controllers/DoctorController.php:284
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/appointments/{appointment}/cancel'
 */
    const cancelAppointmentForm = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: cancelAppointment.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DoctorController::cancelAppointment
 * @see app/Http/Controllers/DoctorController.php:284
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/appointments/{appointment}/cancel'
 */
        cancelAppointmentForm.post = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: cancelAppointment.url(args, options),
            method: 'post',
        })
    
    cancelAppointment.form = cancelAppointmentForm
/**
* @see \App\Http\Controllers\DoctorController::markNoShow
 * @see app/Http/Controllers/DoctorController.php:296
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/appointments/{appointment}/no-show'
 */
export const markNoShow = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markNoShow.url(args, options),
    method: 'post',
})

markNoShow.definition = {
    methods: ["post"],
    url: 'https://mediflow-production-60a9.up.railway.app/doctor/appointments/{appointment}/no-show',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DoctorController::markNoShow
 * @see app/Http/Controllers/DoctorController.php:296
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/appointments/{appointment}/no-show'
 */
markNoShow.url = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return markNoShow.definition.url
            .replace('{appointment}', parsedArgs.appointment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DoctorController::markNoShow
 * @see app/Http/Controllers/DoctorController.php:296
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/appointments/{appointment}/no-show'
 */
markNoShow.post = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markNoShow.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DoctorController::markNoShow
 * @see app/Http/Controllers/DoctorController.php:296
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/appointments/{appointment}/no-show'
 */
    const markNoShowForm = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: markNoShow.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DoctorController::markNoShow
 * @see app/Http/Controllers/DoctorController.php:296
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/appointments/{appointment}/no-show'
 */
        markNoShowForm.post = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: markNoShow.url(args, options),
            method: 'post',
        })
    
    markNoShow.form = markNoShowForm
/**
* @see \App\Http\Controllers\DoctorController::storeConsultation
 * @see app/Http/Controllers/DoctorController.php:308
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/appointments/{appointment}/consultation'
 */
export const storeConsultation = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeConsultation.url(args, options),
    method: 'post',
})

storeConsultation.definition = {
    methods: ["post"],
    url: 'https://mediflow-production-60a9.up.railway.app/doctor/appointments/{appointment}/consultation',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DoctorController::storeConsultation
 * @see app/Http/Controllers/DoctorController.php:308
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/appointments/{appointment}/consultation'
 */
storeConsultation.url = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return storeConsultation.definition.url
            .replace('{appointment}', parsedArgs.appointment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DoctorController::storeConsultation
 * @see app/Http/Controllers/DoctorController.php:308
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/appointments/{appointment}/consultation'
 */
storeConsultation.post = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeConsultation.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DoctorController::storeConsultation
 * @see app/Http/Controllers/DoctorController.php:308
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/appointments/{appointment}/consultation'
 */
    const storeConsultationForm = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeConsultation.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DoctorController::storeConsultation
 * @see app/Http/Controllers/DoctorController.php:308
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/appointments/{appointment}/consultation'
 */
        storeConsultationForm.post = (args: { appointment: number | { id: number } } | [appointment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeConsultation.url(args, options),
            method: 'post',
        })
    
    storeConsultation.form = storeConsultationForm
/**
* @see \App\Http\Controllers\DoctorController::bills
 * @see app/Http/Controllers/DoctorController.php:320
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/bills'
 */
export const bills = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bills.url(options),
    method: 'get',
})

bills.definition = {
    methods: ["get","head"],
    url: 'https://mediflow-production-60a9.up.railway.app/doctor/bills',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DoctorController::bills
 * @see app/Http/Controllers/DoctorController.php:320
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/bills'
 */
bills.url = (options?: RouteQueryOptions) => {
    return bills.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DoctorController::bills
 * @see app/Http/Controllers/DoctorController.php:320
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/bills'
 */
bills.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: bills.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DoctorController::bills
 * @see app/Http/Controllers/DoctorController.php:320
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/bills'
 */
bills.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: bills.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DoctorController::bills
 * @see app/Http/Controllers/DoctorController.php:320
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/bills'
 */
    const billsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: bills.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DoctorController::bills
 * @see app/Http/Controllers/DoctorController.php:320
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/bills'
 */
        billsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: bills.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DoctorController::bills
 * @see app/Http/Controllers/DoctorController.php:320
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/bills'
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
* @see \App\Http\Controllers\DoctorController::markBillPaid
 * @see app/Http/Controllers/DoctorController.php:354
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/bills/{bill}/pay'
 */
export const markBillPaid = (args: { bill: number | { id: number } } | [bill: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markBillPaid.url(args, options),
    method: 'post',
})

markBillPaid.definition = {
    methods: ["post"],
    url: 'https://mediflow-production-60a9.up.railway.app/doctor/bills/{bill}/pay',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\DoctorController::markBillPaid
 * @see app/Http/Controllers/DoctorController.php:354
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/bills/{bill}/pay'
 */
markBillPaid.url = (args: { bill: number | { id: number } } | [bill: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return markBillPaid.definition.url
            .replace('{bill}', parsedArgs.bill.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DoctorController::markBillPaid
 * @see app/Http/Controllers/DoctorController.php:354
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/bills/{bill}/pay'
 */
markBillPaid.post = (args: { bill: number | { id: number } } | [bill: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: markBillPaid.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\DoctorController::markBillPaid
 * @see app/Http/Controllers/DoctorController.php:354
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/bills/{bill}/pay'
 */
    const markBillPaidForm = (args: { bill: number | { id: number } } | [bill: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: markBillPaid.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\DoctorController::markBillPaid
 * @see app/Http/Controllers/DoctorController.php:354
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/bills/{bill}/pay'
 */
        markBillPaidForm.post = (args: { bill: number | { id: number } } | [bill: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: markBillPaid.url(args, options),
            method: 'post',
        })
    
    markBillPaid.form = markBillPaidForm
/**
* @see \App\Http\Controllers\DoctorController::patientHistory
 * @see app/Http/Controllers/DoctorController.php:366
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/patient-history/{patient}'
 */
export const patientHistory = (args: { patient: number | { id: number } } | [patient: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: patientHistory.url(args, options),
    method: 'get',
})

patientHistory.definition = {
    methods: ["get","head"],
    url: 'https://mediflow-production-60a9.up.railway.app/doctor/patient-history/{patient}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DoctorController::patientHistory
 * @see app/Http/Controllers/DoctorController.php:366
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/patient-history/{patient}'
 */
patientHistory.url = (args: { patient: number | { id: number } } | [patient: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { patient: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { patient: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    patient: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        patient: typeof args.patient === 'object'
                ? args.patient.id
                : args.patient,
                }

    return patientHistory.definition.url
            .replace('{patient}', parsedArgs.patient.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\DoctorController::patientHistory
 * @see app/Http/Controllers/DoctorController.php:366
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/patient-history/{patient}'
 */
patientHistory.get = (args: { patient: number | { id: number } } | [patient: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: patientHistory.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DoctorController::patientHistory
 * @see app/Http/Controllers/DoctorController.php:366
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/patient-history/{patient}'
 */
patientHistory.head = (args: { patient: number | { id: number } } | [patient: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: patientHistory.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DoctorController::patientHistory
 * @see app/Http/Controllers/DoctorController.php:366
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/patient-history/{patient}'
 */
    const patientHistoryForm = (args: { patient: number | { id: number } } | [patient: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: patientHistory.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DoctorController::patientHistory
 * @see app/Http/Controllers/DoctorController.php:366
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/patient-history/{patient}'
 */
        patientHistoryForm.get = (args: { patient: number | { id: number } } | [patient: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: patientHistory.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DoctorController::patientHistory
 * @see app/Http/Controllers/DoctorController.php:366
 * @route 'https://mediflow-production-60a9.up.railway.app/doctor/patient-history/{patient}'
 */
        patientHistoryForm.head = (args: { patient: number | { id: number } } | [patient: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: patientHistory.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    patientHistory.form = patientHistoryForm
const DoctorController = { dashboard, editProfile, updateProfile, schedules, storeSchedule, deleteSchedule, appointments, approveAppointment, rejectAppointment, cancelAppointment, markNoShow, storeConsultation, bills, markBillPaid, patientHistory }

export default DoctorController