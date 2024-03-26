<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FailedReturnJsonFormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'ho_ten' => 'required',
            'mat_khau' => 'required',
            'dang_nhap' => 'required',
            'nhap_lai_mat_khau' => 'required',
        ];
    }
    public function messages(): array
    {
        return [
            'ho_ten.required' => 'Họ tên không được để trống',          
            'mat_khau.required' => 'Mật khẩu không được để trống',
            'dang_nhap.required' => 'Email hoặc số điện thoại không thể để trống',
            'nhap_lai_mat_khau.required' => 'Mật khẩu nhập lại không được để trống',
        ];
    }  
}
