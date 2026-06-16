<?php

namespace Database\Seeders;

use App\Models\BankLoan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BankLoanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        BankLoan::factory()->count(20)->create();
    }
}
