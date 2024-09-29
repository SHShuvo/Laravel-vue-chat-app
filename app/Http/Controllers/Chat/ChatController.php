<?php

namespace App\Http\Controllers\Chat;

use App\Events\MessageSent;
use App\Http\Controllers\Controller;
use App\Models\Chat\ChatMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function index($friend_id){
        $auth_id = Auth::id();

        $chats = ChatMessage::where(function($q) use($friend_id, $auth_id){
            $q->where('sender_id', $auth_id)->where('recciver_id', $friend_id);
        })
        ->orWhere(function($q) use($friend_id, $auth_id){
            $q->where('sender_id', $friend_id)->where('recciver_id', $auth_id);
        })
        ->with(['sender', 'receiver'])
        ->orderBy('id')
        ->get();

        return response($chats);
    }

    public function sendMessage(Request $request){
        $msg = ChatMessage::create([
            'sender_id'=>$request->sender_id,
            'recciver_id'=>$request->recciver_id,
            'message'=>$request->message
        ]);

        broadcast(new MessageSent($msg));

        return response(['message'=>$msg], 201);
    }
}
