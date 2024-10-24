<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Mail\AppointmentMail;
use Illuminate\Support\Facades\Mail;

class AppointmentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'appointment_date' => 'required|date',
            'appointment_time' => 'required|date_format:H:i',
            'reason' => 'required|string|max:255',
        ]);

        // Check if an appointment is already scheduled for the selected date and time
        $existingAppointment = Appointment::where('appointment_date', $request->input('appointment_date'))
                                          ->where('appointment_time', $request->input('appointment_time'))
                                          ->first();

        if ($existingAppointment) {
            return response()->json(['message' => 'The selected time is already booked.'], 409);
        }

        $appointment = new Appointment([
            'user_id' => Auth::id(),
            'appointment_date' => $request->input('appointment_date'),
            'appointment_time' => $request->input('appointment_time'),
            'reason' => $request->input('reason'),
        ]);

        $appointment->save();

        return response()->json(['message' => 'Appointment created successfully'], 201);
    }

    public function index()
    {
        $appointments = Appointment::with('user:id,first_name,last_name')->get();
        return response()->json($appointments);
    }

    public function destroy($id)
    {
        $appointment = Appointment::with('mail')->find($id);
        if (!$appointment) {
            return response()->json(['message' => 'Appointment not found'], 404);
        }
    
        $appointment->delete();
        $appointment->save();
    
        // Send email notification
        $statusMessage = 'canceled';
        Mail::to($appointment->mail->email)->send(new AppointmentMail($appointment, $statusMessage));
    
        return response()->json(['message' => 'Appointment canceled and user notified.']);
    } 

    public function accept($id)
    {
        $appointment = Appointment::with('mail')->find($id);
        if (!$appointment) {
            return response()->json(['message' => 'Appointment not found'], 404);
        }
    
        $appointment->accepted = true;
        $appointment->save();
    
        // Send email notification
        $statusMessage = 'accepted';
        Mail::to($appointment->mail->email)->send(new AppointmentMail($appointment, $statusMessage));
    
        return response()->json(['message' => 'Appointment accepted and user notified.']);
    }

    // New method to get appointments for a specific date
    public function getAppointmentsByDate($date)
    {
        $appointments = Appointment::where('appointment_date', $date)->get();
        return response()->json($appointments);
    }

}
