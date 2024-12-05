<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    public function register(Request $request): JsonResponse 
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
            'c_password' => 'required|same:password',
        ]);

        if ($validator->fails()) {
            // return $this->sendError('Validation Error.', $validator->errors());
            $failed['name'] = "You are Not Signed";
            return $this->sendResponse($failed, 'Bad User.');
        }

        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        
        $user = User::create($input);
        $success['token'] = $user->createToken('MyApp')->accessToken;
        $success['name'] = $user->name;

        return $this->sendResponse($success, 'User registered successfully.');

        // try {
        //     $user = User::create($input);
        //     $success['token'] = $user->createToken('MyApp')->accessToken;
        //     $success['name'] = $user->name;

        //     return $this->sendResponse($success, 'User registered successfully.');
        // } catch (\Illuminate\Database\QueryException $e) {
        //     if ($e->errorInfo[1] == 1062) {
        //         return $this->sendError('Email already exists!');
        //     }

        //     return $this->sendError('Registration failed!', $e->getMessage());
        // }
    }

    public function login(Request $request): JsonResponse {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = Auth::user();
            $success['token'] = $user->createToken('MyApp')->accessToken;
            $success['name'] = $user->name;

            return $this->sendResponse($success, 'User login successfully.');
        } else {
            return $this->sendError('Unauthorised.', ['error' => 'Unauthorised']);
        }
    }
}
