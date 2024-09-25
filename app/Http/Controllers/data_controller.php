<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class data_controller extends Controller
{
    public function load_dummy_data(Request $request) {
        $tbl_leave_reason_data = [];

        DB::table('tbl_leave_reason')->truncate();

        for($i = 1; $i <= 1000; $i++) {
            $reason = rand(1, 10);
            $gender = rand(1, 2);
            $age = rand(21, 65);

            if($age >= 60) {
                $reason = 11;
            }

            array_push($tbl_leave_reason_data, [
                "gender" => $gender,
                "age" => $age,
                "ref_leave_reason_id" => $reason,
            ]);
        }

        DB::table('tbl_leave_reason')->insert($tbl_leave_reason_data);

        $result = DB::table('vw_leave_reason')->get();

        dd($result);
    }
}
