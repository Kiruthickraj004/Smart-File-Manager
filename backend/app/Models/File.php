<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    protected $fillable = [
    'name',
    'path',
    'folder_id',
    'size',
    'type',
];
}
