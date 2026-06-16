<?php

namespace App\Http\Controllers;

use App\Models\Log;
class LogController extends Controller
{
    public function index() 
    {
        return response()->json([
        'data' => Log::latest()->get()
    ]);
    }
}
