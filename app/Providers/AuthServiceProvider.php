<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\Internship;
use App\Policies\InternshipPolicy;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        Internship::class => InternshipPolicy::class,
    ];

    public function boot()
    {
        $this->registerPolicies();
    }
}
