<?php

namespace App\Mail\Transport;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Symfony\Component\Mailer\Exception\TransportException;
use Symfony\Component\Mailer\SentMessage;
use Symfony\Component\Mailer\Transport\AbstractTransport;
use Symfony\Component\Mime\Address;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mime\MessageConverter;

class BrevoTransport extends AbstractTransport
{
    /**
     * Create a new Brevo API transport instance.
     */
    public function __construct(protected string $apiKey)
    {
        parent::__construct();
    }

    /**
     * Send the email via Brevo's transactional HTTP API.
     *
     * @throws TransportException
     */
    protected function doSend(SentMessage $message): void
    {
        $email = MessageConverter::toEmail($message->getOriginalMessage());

        $payload = [
            'sender' => $this->formatAddress($message->getEnvelope()->getSender()),
            'to' => $this->formatAddresses($email->getTo()),
            'subject' => $email->getSubject(),
        ];

        if ($email->getCc()) {
            $payload['cc'] = $this->formatAddresses($email->getCc());
        }

        if ($email->getBcc()) {
            $payload['bcc'] = $this->formatAddresses($email->getBcc());
        }

        if ($email->getReplyTo()) {
            $payload['replyTo'] = $this->formatAddress($email->getReplyTo()[0]);
        }

        if ($htmlBody = $email->getHtmlBody()) {
            $payload['htmlContent'] = $htmlBody;
        }

        if ($textBody = $email->getTextBody()) {
            $payload['textContent'] = $textBody;
        }

        if ($attachments = $email->getAttachments()) {
            $payload['attachment'] = [];

            foreach ($attachments as $attachment) {
                $headers = $attachment->getPreparedHeaders();
                $filename = $headers->getHeaderParameter('Content-Disposition', 'filename');

                $payload['attachment'][] = [
                    'name' => $filename,
                    'content' => base64_encode($attachment->getBody()),
                ];
            }
        }

        $response = Http::withHeaders([
            'api-key' => $this->apiKey,
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
        ])->post('https://api.brevo.com/v3/smtp/email', $payload);

        if ($response->failed()) {
            $errorMessage = $response->json('message', 'Unknown Brevo API error');
            $errorCode = $response->json('code', 'unknown');

            Log::error('Brevo API email failed', [
                'status' => $response->status(),
                'code' => $errorCode,
                'message' => $errorMessage,
                'to' => collect($email->getTo())->map(fn (Address $a): string => $a->getAddress())->all(),
            ]);

            throw new TransportException(
                sprintf('Brevo API request failed: [%s] %s', $errorCode, $errorMessage),
            );
        }

        $messageId = $response->json('messageId');

        if ($messageId) {
            $email->getHeaders()->addHeader('X-Brevo-Message-ID', $messageId);
        }
    }

    /**
     * Format a single address for the Brevo API payload.
     *
     * @return array{email: string, name?: string}
     */
    private function formatAddress(Address $address): array
    {
        $formatted = ['email' => $address->getAddress()];

        if ($address->getName()) {
            $formatted['name'] = $address->getName();
        }

        return $formatted;
    }

    /**
     * Format multiple addresses for the Brevo API payload.
     *
     * @param  Address[]  $addresses
     * @return array<int, array{email: string, name?: string}>
     */
    private function formatAddresses(array $addresses): array
    {
        return array_map(fn (Address $address): array => $this->formatAddress($address), $addresses);
    }

    /**
     * Get the string representation of the transport.
     */
    public function __toString(): string
    {
        return 'brevo';
    }
}
