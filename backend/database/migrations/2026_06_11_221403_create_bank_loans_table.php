<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pret_bancaire', function (Blueprint $table) {
            $table->string('num_compte')->primary();
            $table->string('nom_client');
            $table->string('nom_banque');
            $table->float('montant');
            $table->date('date_pret');
            $table->float('taux_pret');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pret_bancaire');
    }
};
