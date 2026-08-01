<?php

namespace App\Notifications;

use App\Models\Appointment;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AppointmentCancelledNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        public Appointment $appointment,
        public string $actor,
        public string $reason
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

        if ($this->actor === 'patient') {
            $patientName = $this->appointment->patient->user->name;

            return (new MailMessage)
                ->subject("Appointment Cancelled by Patient: {$patientName}")
                ->greeting('Hello Dr. '.$notifiable->name.',')
                ->line("Your appointment scheduled with patient {$patientName} on {$date} at {$time} has been cancelled by the patient.")
                ->line('Reason: '.($this->reason ?: 'No reason provided.'))
                ->action('View Appointments', route('doctor.appointments'));
        }

        $doctorName = $this->appointment->doctor->user->name;

        return (new MailMessage)
            ->subject("Appointment Cancelled by Doctor: Dr. {$doctorName}")
            ->greeting('Hello '.$notifiable->name.',')
            ->line("Your appointment scheduled with Dr. {$doctorName} on {$date} at {$time} has been cancelled by the doctor.")
            ->line('Reason: '.($this->reason ?: 'No reason provided.'))
            ->action('View Dashboard', route('dashboard'));
    }
}
