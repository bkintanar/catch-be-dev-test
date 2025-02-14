<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\QueryBuilder;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        return QueryBuilder::for(Customer::class)
            ->allowedFilters(['first_name', 'last_name', 'email', 'company', 'title'])
            ->allowedSorts('first_name', 'last_name')
            ->paginate($this->perPage)
            ->appends($request->query());
    }
}
