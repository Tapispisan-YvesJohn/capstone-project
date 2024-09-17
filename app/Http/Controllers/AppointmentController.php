<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AppointmentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'appointment_date' => 'required|date',
            'appointment_time' => 'required|date_format:H:i',
            'reason' => 'required|string|max:255',
        ]);

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
        $appointments = Appointment::all();
        return response()->json($appointments);
    }

    public function destroy($id)
    {
        $appointment = Appointment::find($id);
        if ($appointment) {
            $appointment->delete();
            return response()->json(['message' => 'Appointment cancelled successfully']);
        } else {
            return response()->json(['message' => 'Appointment not found'], 404);
        }
    }

    public function accept($id)
    {
        $appointment = Appointment::find($id);
        if ($appointment) {
            $appointment->accepted = true;
            $appointment->save();
    
            return response()->json(['message' => 'Appointment accepted successfully'], 200);
        } else {
            return response()->json(['message' => 'Appointment not found'], 404);
        }
    }

}
