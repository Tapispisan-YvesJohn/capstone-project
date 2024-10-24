<!DOCTYPE html>
<html>
<head>
    <title>Appointment Status Update</title>
</head>
<body>
    <h1>Appointment Status Update</h1>

    <p>Dear {{ $appointment->user->first_name }},</p>

    <p>Your appointment on {{ $appointment->appointment_date }} at {{ $appointment->appointment_time }} has been {{ $statusMessage }}.</p>

    <p>Reason: {{ $appointment->reason }}</p>

    <p>Thank you,</p>
    <p>PUP Guidance System</p>
</body>
</html>
