@extends('layouts.layout_main')
@section('content')    
<div class="hero">
    <h1>shobee</h1>
</div>
    <section class="new_arrivals_area section-padding-30 clearfix">
    <div class="container-custom">
        <script>
            createEventLoginAndRegister()
            setTimeout(() => {
                $(".cart-bg-overlay").addClass("cart-bg-overlay-on")
                $(".right-side-cart-area").addClass("cart-on")
            }, 100);
        </script>
    </div>
   </section>   
@endsection