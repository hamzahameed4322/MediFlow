<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class DoctorCredentialsNotification extends Notification
{
    use Queueable;

    public function __construct(public string $password) {}

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
        return (new MailMessage)
            ->subject('Your MediFlow doctor account is ready')
            ->greeting('Hello '.$notifiable->name.',')
            ->line('Your doctor account has been created in MediFlow.')
            ->line('Email: '.$notifiable->email)
            ->line('Temporary password: '.$this->password)
            ->action('Sign in to MediFlow', route('login'))
            ->line('Please sign in and change your password as soon as possible.');
    }
}
