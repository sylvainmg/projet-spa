<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BankLoan extends Model
{
    use HasFactory;
    
    protected $table = 'pret_bancaire';
    protected $primaryKey = 'num_compte';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;
    protected $fillable = [
        'num_compte',
        'nom_client',
        'nom_banque',
        'montant',
        'date_pret',
        'taux_pret'
    ];
}
