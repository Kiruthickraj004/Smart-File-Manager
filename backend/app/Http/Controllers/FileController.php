<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\File;
use Illuminate\Support\Facades\Storage;
class FileController extends Controller
{
    public function index(){
        return response()->json(File::latest()->get());
    }

    public function store(Request $request){
        $request->validate([
            'file' => 'required|file|max:10240',
        ]);

        $file = $request->file('file');
        $path = $file->store('uploads','public');

        $newFile = File::create([
            'name' => $file->getClientOriginalName(),
            'path' => $path,
            'size' => $file->getSize(),
            'type' => $file->getMimeType()
        ]);
        return response()->json(['id' => $newFile->id,'name' => $newFile->name,'path' => $newFile->path,'size' => $newFile->size,'type' => $newFile->type]);
    }

    public function destroy($id){
        $file = File::findOrFail($id);
        storage::disk('public')->delete($file->path);
        $file->delete();
        return response()->json(['message' => 'file deleted']);
    }
}
