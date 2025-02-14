<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

abstract class Controller
{
    protected const ITEMS_PER_PAGE = 15;

    protected int $perPage = self::ITEMS_PER_PAGE;

    public function __construct(Request $request)
    {
        $this->perPage = $request->per_page ?? self::ITEMS_PER_PAGE;
    }
}
