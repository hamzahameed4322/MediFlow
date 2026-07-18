<?php

namespace App\Notifications;

use App\Models\Appointment;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AppointmentNoShowNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        public Appointment $appointment
    ) {}

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $date = $this->appointment->appointment_date instanceof \DateTimeInterface
            ? $this->appointment->appointment_date->format('Y-m-d')
            : $this->appointment->appointment_date;
        $time = substr($this->appointment->appointment_time, 0, 5);
        $doctorName = $this->appointment->doctor->user->name;

        return (new MailMessage)
            ->subject('Missed Appointment Notice')
            ->greeting('Hello '.$notifiable->name.',')
            ->line("You missed your scheduled appointment with Dr. {$doctorName} on {$date} at {$time}.")
            ->line('If you wish to reschedule, please browse available slots and book a new appointment.')
            ->action('Book New Appointment', route('patient.doctors'));
    }
}
