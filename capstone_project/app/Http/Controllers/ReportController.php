<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        // Fetch filters from the request
        $name = $request->get('name');
        $course = $request->get('course');
        $date = $request->get('date');

        // Build the query
        $query = DB::table('reports')
            ->join('personal_information', 'reports.student_id', '=', 'personal_information.student_record_id')
            ->select(
                'reports.id',
                'reports.title',
                'personal_information.first_name',
                'personal_information.middle_name',
                'personal_information.last_name',
                'personal_information.course',
                'personal_information.email'
            );

        // Apply filters only if they are provided
        if (!empty($name)) {
            $query->where(function($q) use ($name) {
                $q->where(DB::raw('CONCAT(personal_information.first_name, " ", personal_information.last_name)'), 'LIKE', "%$name%")
                  ->orWhere(DB::raw('CONCAT(personal_information.first_name, " ", personal_information.middle_name)'), 'LIKE', "%$name%")
                  ->orWhere(DB::raw('CONCAT(personal_information.middle_name, " ", personal_information.last_name)'), 'LIKE', "%$name%");
            });
        }

        if (!empty($course)) {
            $query->where('personal_information.course', '=', $course);
        }

        if (!empty($date)) {
            $query->whereDate('reports.created_at', '=', $date);
        }

        // Get the filtered result
        $reports = $query->get();

        return response()->json($reports);
    }
}
