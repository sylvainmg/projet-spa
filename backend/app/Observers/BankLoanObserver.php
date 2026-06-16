<?php

namespace App\Observers;

use App\Models\BankLoan;
use App\Models\Log;

class BankLoanObserver
{
    /**
     * Handle the BankLoan "created" event.
     */
    public function created(BankLoan $bankLoan): void
    {
        Log::create([
            'type'    => 'add',
            'message' => "Prêt de {$bankLoan->nom_client} ajouté (" . number_format($bankLoan->montant, 2, ',', ' ') . 'Ar)',
        ]);
    }

    /**
     * Handle the BankLoan "updated" event.
     */
    public function updated(BankLoan $bankLoan): void
    {
        Log::create([
            'type'    => 'edit',
            'message' => "Prêt de {$bankLoan->nom_client} modifié",
        ]);
    }

    /**
     * Handle the BankLoan "deleted" event.
     */
    public function deleted(BankLoan $bankLoan): void
    {
        Log::create([
            'type'    => 'delete',
            'message' => "Prêt de {$bankLoan->nom_client} supprimé",
        ]);
    }

    /**
     * Handle the BankLoan "restored" event.
     */
    public function restored(BankLoan $bankLoan): void
    {
        //
    }

    /**
     * Handle the BankLoan "force deleted" event.
     */
    public function forceDeleted(BankLoan $bankLoan): void
    {
        //
    }
}
