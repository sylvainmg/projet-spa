<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class ConvertCamelToSnake
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Replace request payload with converted keys
        $request->replace($this->convertArrayToSnake($request->all()));

        return $next($request);
    }

    /**
     * Recursively convert array keys to snake_case.
     */
    protected function convertArrayToSnake(array $data): array
    {
        $snakeData = [];

        foreach ($data as $key => $value) {
            // Convert the key to snake case
            $snakeKey = Str::snake($key);

            // If the value is an array, recursively convert it as well
            if (is_array($value)) {
                $value = $this->convertArrayToSnake($value);
            }

            $snakeData[$snakeKey] = $value;
        }

        return $snakeData;
    }
}
