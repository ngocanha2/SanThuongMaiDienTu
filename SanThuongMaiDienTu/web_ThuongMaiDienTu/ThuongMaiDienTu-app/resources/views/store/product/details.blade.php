@extends('store.product.layout_product_update')
@section('content-child')
<div class="box-add-product">
    <div class="row">        
        <div class="col-md-12 col-6"><a class="btn btn-warning btn-submit" id="btn-submit-add-product">Xác nhận</a></div>            
    </div>
</div>
<script src="{{asset('js/store/update_product.js')}}"></script>
<script>
    loadProduct("{{$san_pham_id}}")
</script>
@endsection