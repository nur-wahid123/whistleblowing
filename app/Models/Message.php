<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Message extends Model
{
    use SoftDeletes;
    protected $dates = ['deleted_at'];

    public function createMessage($idSender,$idReciever,$messages){

        $this->create([
            'sender'=> $idSender,
            'reciever'=> $idReciever,
            'value'=> $messages
        ]);
        return $this;
    }

    public function sender()
    {
        return $this->belongsTo(User::class,"sender_id","id");
    }
    public function reciever()
    {
        return $this->belongsTo(Role::class,'reciever_id','id');
    }
    use HasFactory;
}
