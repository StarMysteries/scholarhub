<?php

namespace App\Http\Controllers;

use App\Models\Scholarship;

class ScholarshipController extends Controller
{
    private $scholarship;

    public function __construct(Scholarship $scholarship) {
        $this->scholarship = $scholarship;
    }
}
