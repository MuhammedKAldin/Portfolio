<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Message;
use Illuminate\Http\Request;
use App\Events\PusherBroadcast;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\Auth;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\Foundation\Application;

class PusherController extends Controller
{
    public function chat($job_offer_id, $stage = "screening", $user_id)
    {
        if(Auth::user()->id == $user_id)
        {
            echo 'Talking to yourself ? :D';
        }
        else if (Auth::check()) 
        {
            $sender = Auth::user()->id;
            $userType = Auth::user()->role;
            
            // Fetch messages exchanged between the logged-in user and another user
            $messages = Message::where(function($query) use ($sender, $user_id) {
                $query->where('sender', $sender)->where('receiver', $user_id);
            })->orWhere(function($query) use ($sender, $user_id) {
                $query->where('sender', $user_id)->where('receiver', $sender);
            })->orderBy('created_at', 'asc')
            ->get();

            $receiver = User::where('id', $user_id)->first();
            return view('portal.chat', compact('userType', 'job_offer_id', 'stage', 'receiver', 'messages', 'sender'));
        } 
        else 
        {
            return redirect("/");
        }
    }

    public function broadcast($user_id, Request $request)
    {
        /// Send Message
        //------------------------
        $data['sender'] = Auth::user()->id;
        $data['receiver'] = $user_id;
        $data['message'] = $request->message;

        Message::create($data);

        // Broadcast
        $message = $request->message;
        $receiver = $this->getUser($user_id);
        broadcast(new PusherBroadcast($receiver, $message));

        // return response()->json(['success' => true]);
    }

    // Service/Helper Method
    public function getUser($user_id) 
    {
        return User::where('id', $user_id)->first();
    }
}