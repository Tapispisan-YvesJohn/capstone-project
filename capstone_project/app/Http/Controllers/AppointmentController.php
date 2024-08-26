<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'appointment_date' => 'required|date|after_or_equal:today',
            'appointment_time' => 'required|date_format:H:i',
            'reason' => 'required|string|min:10',
        ]);

        $appointment = Appointment::create([
            'appointment_date' => $request->appointment_date,
            'appointment_time' => $request->appointment_time,
            'reason' => $request->reason,
        ]);
    
        return response()->json($appointment, 201);
    }

    public function index()
    {
        $appointments = Appointment::all();
        return response()->json($appointments);
    }
}
