<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Validation\Rule;
class UserController extends Controller
{


    public function index(){

        $users = User::all();
        return response()->json([
            'data' => $users
        ], 200);
    }
    public function login(Request $request){

        $validatedData = $request->validate([
            'email' => 'email|required',
            'password' => 'required'
        ]);
        $user = User::where('email', $validatedData['email'])->first();

        if (!$user || !Hash::check($validatedData['password'], $user->password)) {
            return response([
                'message' => 'Wrong credentials'
            ], 401);
        }        
        
        
        $token = $user->createToken('my-token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'Type' => 'Bearer',
            'role' => $user->role,
            'user' => $user
        ]);
    }





    public function register(Request $request){
        $validatedData = $request->validate([
            'name' => 'required|max:55',
            'email' => 'email|required|unique:users',
            'password' => 'required|min:6',
            'role' => 'required'
        ]);
        $validatedData['password'] = Hash::make($validatedData['password']);

        $user = User::create($validatedData);

        
        return response()->json([
            'message' => 'Register Success', 'data' => $user
        ]);
    }


    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'message' => 'Logout Success'
        ]);

    }

    public function edit(Request $request, $id){
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }
        $validatedData = $request->validate([
            'name' => 'required|max:55',
            'email'  =>  Rule::unique('users', 'email')->ignore($user->id),
            'role' => 'required'
        ]);
       
        $user->name = $validatedData['name'];
        $user->email = $validatedData['email'];
        $user->role = $validatedData['role'];
        $user->save();

        return response()->json([
            'message' => 'User updated successfully',
            'data' => $user
        ], 200);
    }

    public function destroy($id){
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }
        $user->delete();

        return response()->json([
            'message' => 'User deleted successfully'
        ], 200);
    }
}
