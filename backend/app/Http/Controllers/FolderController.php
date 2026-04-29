<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Folder;

class FolderController extends Controller
{
    public function index(){
        return response()->json(Folder::all());
    }

    public function store(Request $request){
        $request->validate([
            'name' => 'required|string'
        ]);

        $folder = Folder::create([
            'name' => $request->name,
            'parent_id' => $request->parent_id ?? null
        ]);
        return response()->json($folder);
    }
}
