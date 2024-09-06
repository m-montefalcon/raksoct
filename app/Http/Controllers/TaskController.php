<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use Illuminate\Http\Request;
use PhpParser\Node\Stmt\TryCatch;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //

        $tasks = Task::all();   
        return response()->json([
            'data' => $tasks
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
public function store(StoreTaskRequest $request)
{
    $validatedData = $request->validated();
    try {
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $path = $file->store('public');
            $validatedData['file'] = $path;
        }

        // // Ensure assign_to is included in the validated data and cast to an integer
        // if (isset($validatedData['assign_to'])) {
        //     $validatedData['assign_to'] = (int)$validatedData['assign_to'];
        // }

        $task = Task::create($validatedData);
    } catch (\Throwable $th) {
        return response()->json([
            'message' => 'Error while creating task',
            'error' => $th->getMessage()
        ], 500);
    }

    return response()->json([
        'data' => $task
    ], 200);
}

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //

        $task = Task::find($task);
        return response()->json([
            'data' => $task
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        //
        $task = Task::find($task);
        $task->delete();
        return response()->json([
            'message' => 'Task deleted successfully'
        ], 200);
    }
}
