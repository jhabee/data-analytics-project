<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class api_controller extends Controller
{
    public function get_age_bracket(Request $request) {
        $result = DB::table('vw_leave_reason_report_age_bracket')->get();
        
        return response()->json($result);
    }
    
    public function get_gender(Request $request) {
        $result = DB::table('vw_leave_reason_report_gender')->get();
        
        return response()->json($result);
    }
    
    public function get_reason(Request $request) {
        $result = DB::table('vw_leave_reason_report_reason')->get();
        
        return response()->json($result);
    }
    
    public function get_count(Request $request) {
        $result = DB::table('tbl_leave_reason')->count();
        
        return response()->json(["count" => $result]);
    }
}
