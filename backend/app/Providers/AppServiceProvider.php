<?php

namespace App\Providers;

use App\Models\BankLoan;
use App\Observers\BankLoanObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        BankLoan::observe(BankLoanObserver::class);
    }
}
