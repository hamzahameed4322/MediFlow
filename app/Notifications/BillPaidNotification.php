<?php

namespace App\Notifications;

use App\Models\Bill;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class BillPaidNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Bill $bill
    ) {}

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $patientName = $this->bill->appointment?->patient?->user?->name ?? 'Patient';
        $amount = number_format((float) $this->bill->amount, 2);

        return (new MailMessage)
            ->subject("Payment Cleared: Bill #{$this->bill->id}")
            ->greeting("Hello Dr. {$notifiable->name},")
            ->line("The billing status for appointment #{$this->bill->appointment_id} with patient {$patientName} has been marked as PAID.")
            ->line("Total Amount: \${$amount}")
            ->line('Thank you for providing care at MediFlow Clinic.');
    }
}
