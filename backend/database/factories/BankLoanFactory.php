<?php

namespace Database\Factories;

use App\Models\BankLoan;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<BankLoan>
 */
class BankLoanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'num_compte' => $this->faker->unique()->numerify('##########'),
            'nom_client' => $this->faker->name(),
            /**
             * Liste des banques opérant à Madagascar
             * @see https://fr.wikipedia.org/wiki/Liste_des_banques_malgaches
             */
            'nom_banque' => $this->faker->randomElement([
                "Banque Malgache de l'Océan Indien", 
                "Banque nationale de l'industrie",
                "State Bank of Mauritius",
                "BRED Madagasikara Banque populaire",
                "Bank of Africa Madagascar",
                "AccèsBanque Madagascar",
                "BGFIBank",
                "Baobab Banque Madagascar",
                "Banky First",
                "Société d'investissement pour la promotion des entreprises à Madagascar",
                "Mvola",
                "Atlantic Financial Bank Madagascar"
            ]),
            'montant' => $this->faker->randomFloat(2, 5000, 5000000),
            'date_pret' => $this->faker->dateTimeBetween('-5 years', 'now')->format('Y-m-d'),
            'taux_pret' => $this->faker->randomFloat(2, 0.5, 10)
        ];
    }
}
