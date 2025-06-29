<?php

namespace App\Listeners;

use App\Events\OrderPlaced;
use Illuminate\Support\Facades\Log;

class SendOrderNotification
{
    public function handle(OrderPlaced $event): void
    {
        Log::info("Email to admin: Order {$event->order->id} placed");
    }
}
