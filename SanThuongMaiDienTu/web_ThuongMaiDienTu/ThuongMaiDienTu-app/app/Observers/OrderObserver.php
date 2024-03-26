<?php

namespace App\Observers;

use App\Models\don_hang;
use App\Services\ProductStoreService;
use Illuminate\Support\Facades\Log;

class OrderObserver
{
    public $afterCommit = true;
    public function creating(don_hang $don_hang)
    {
                
    }
    /**
     * Handle the don_hang "created" event.
     *
     * @param  \App\Models\don_hang  $don_hang
     * @return void
     */
    public function created(don_hang $don_hang)
    {
        //
    }

    /**
     * Handle the don_hang "updated" event.
     *
     * @param  \App\Models\don_hang  $don_hang
     * @return void
     */
    public function updated(don_hang $don_hang)
    {
        Log::info("vàoassadsd");
        // if(isset($don_hang->trang_thai["Đang xử lý"]) && !isset($don_hang->trang_thai["Đang giao"]))
        // {
        //     ProductStoreService::updateQuantityWithOrder($don_hang);
        // }
    }

    /**
     * Handle the don_hang "deleted" event.
     *
     * @param  \App\Models\don_hang  $don_hang
     * @return void
     */
    public function deleted(don_hang $don_hang)
    {
        //
    }

    /**
     * Handle the don_hang "restored" event.
     *
     * @param  \App\Models\don_hang  $don_hang
     * @return void
     */
    public function restored(don_hang $don_hang)
    {
        //
    }

    /**
     * Handle the don_hang "force deleted" event.
     *
     * @param  \App\Models\don_hang  $don_hang
     * @return void
     */
    public function forceDeleted(don_hang $don_hang)
    {
        //
    }
}
