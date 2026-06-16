<?php

namespace App\Http\Controllers;

use App\Models\BankLoan;
use Illuminate\Http\Request;

class BankLoanController extends Controller
{
    private function validationRules(?string $numCompte = null): array
    {
        return [
            'rules' => [
                'num_compte' => ['required', 'string', 
                    $numCompte 
                        ? 'unique:pret_bancaire,num_compte,' . $numCompte . ',num_compte'
                        : 'unique:pret_bancaire,num_compte'
                ],
                'nom_client' => ['required', 'string', 'max:255'],
                'nom_banque' => ['required', 'string', 'max:255'],
                'montant'    => ['required', 'numeric', 'min:0.01'],
                'date_pret'  => ['required', 'date'],
                'taux_pret'  => ['required', 'numeric', 'min:0'],
            ],
            'messages' => [
                'num_compte.string'  => 'Le numéro de compte doit être une chaîne de caractères.',
                'nom_client.string'  => 'Le nom du client doit être une chaîne de caractères.',
                'nom_client.max'     => 'Le nom du client ne doit pas dépasser 255 caractères.',
                'nom_banque.string'  => 'Le nom de la banque doit être une chaîne de caractères.',
                'nom_banque.max'     => 'Le nom de la banque ne doit pas dépasser 255 caractères.',
                'num_compte.required' => 'Le numéro de compte est obligatoire.',
                'num_compte.unique'   => 'Ce numéro de compte existe déjà.',
                'nom_client.required' => 'Le nom du client est obligatoire.',
                'nom_banque.required' => 'Le nom de la banque est obligatoire.',
                'montant.required'    => 'Le montant est obligatoire.',
                'montant.numeric'     => 'Le montant doit être un nombre.',
                'montant.min'         => 'Le montant doit être supérieur à 0.',
                'date_pret.required'  => 'La date du prêt est obligatoire.',
                'date_pret.date'      => 'La date du prêt est invalide.',
                'taux_pret.required'  => 'Le taux du prêt est obligatoire.',
                'taux_pret.numeric'   => 'Le taux doit être un nombre.',
                'taux_pret.min'       => 'Le taux doit être positif ou nul.'
            ]
        ];
    }

    public function index(Request $request)
    {
        $query = BankLoan::query();

        if ($search = $request->query('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('nom_client', 'like', "%{$search}%")
                  ->orWhere('nom_banque', 'like', "%{$search}%")
                  ->orWhere('num_compte', 'like', "%{$search}%");
            });
        }

        return response()->json([
            'data' => $query->orderBy('date_pret', 'desc')->get()
        ]);
    }

    public function store(Request $request)
    {
        $v = $this->validationRules();
        $data = $request->validate($v['rules'], $v['messages']);

        $loan = BankLoan::create($data);

        return response()->json([
            'data' => $loan,
            'message' => 'Insertion réussie.'
        ], 201);
    }

    public function update(Request $request, string $numCompte)
    {
        $loan = BankLoan::findOrFail($numCompte);

        $v = $this->validationRules($numCompte);
        $data = $request->validate($v['rules'], $v['messages']);

        $loan->update($data);

        return response()->json([
            'data' => $loan,
            'message' => 'Modification réussie.'
        ]);
    }

    public function destroy(string $numCompte)
    {
        $bankLoan = BankLoan::findOrFail($numCompte);
        $bankLoan->delete();

        return response()->json([
            'message' => 'Suppression réussie.'
        ]);
    }
}
