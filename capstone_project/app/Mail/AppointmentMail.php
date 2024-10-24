<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class AppointmentMail extends Mailable
{
    use Queueable, SerializesModels;

    public $appointment;
    public $statusMessage;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($appointment, $statusMessage)
    {
        $this->appointment = $appointment;
        $this->statusMessage = $statusMessage;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Appointment Status Update')
                    ->view('emails.appointment-status');
    }
}
