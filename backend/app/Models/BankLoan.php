<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BankLoan extends Model
{
    protected $table = 'pret_bancaire';
    protected $primaryKey = 'num_compte';
    protected $fillable = [
        'num_compte',
        'nom_client',
        'nom_banque',
        'montant',
        'date_pret',
        'taux_pret'
    ];
}
