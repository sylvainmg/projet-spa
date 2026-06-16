<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Log extends Model
{
    protected $table = 'historique';
    protected $fillable = ['type', 'message'];
}
