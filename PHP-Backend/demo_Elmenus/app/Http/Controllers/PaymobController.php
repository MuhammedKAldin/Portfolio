<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Redirect;

class PaymobController extends Controller
{
    public function credit() 
    {
        //this fucntion that send all below function data to paymob and use it for routes;

        $tokens = $this->getToken();
        $order = $this->createOrder($tokens);
        $paymentToken = $this->getPaymentToken($order, $tokens);
        return Redirect::away('https://accept.paymob.com/api/acceptance/iframes/'.env('PAYMOB_IFRAME_ID').'?payment_token='.$paymentToken);
    }

    public function getToken() {
        //this function takes api key from env.file and get token from paymob accept


        $response = Http::post('https://accept.paymob.com/api/auth/tokens', [
            'api_key' => env('PAYMOB_API_KEY')
        ]);
        return $response->object()->token;
        
    }

    public function createOrder($tokens) {
        //this function takes last step token and send new order to paymob dashboard

        // $amount = new Checkoutshow; here you add your checkout controller
        // $total = $amount->totalProductAmount(); total amount function from checkout controller
        //here we add example for test only
        $total = 100;
        $items = [
            [ "name"=> "ASC1515",
                "amount_cents"=> "500000",
                "description"=> "Smart Watch",
                "quantity"=> "1"
            ],
            [
                "name"=> "ERT6565",
                "amount_cents"=> "200000",
                "description"=> "Power Bank",
                "quantity"=> "1"
            ]
        ];

        $data = [
            "auth_token" =>   $tokens,
            "delivery_needed" =>"false",
            "amount_cents"=> $total*100,
            "currency"=> "EGP",
            "items"=> $items,
        ];

        $response = Http::post('https://accept.paymob.com/api/ecommerce/orders', $data);
        return $response->object();
    }

    
    function wallet(Request $request)  
    {
        return $this->checkingOut(
            'paymob_mobile_wallet_payment',
            env('PAYMOB_MOBILE_WALLET_INTEGRATION_ID'),
            '00100',  // Use a valid order ID
            "01095304064"
        );
    }

    public function checkingOut($payment_method, $integration_id, $order_id, $iframe_id_or_wallet_number): RedirectResponse
    {
        // step 1: login to paymob
        $response = Http::withHeaders([
            'content-type' => 'application/json'
        ])->post('https://accept.paymobsolutions.com/api/auth/tokens',[
            "api_key"=> env('PAYMOB_API_KEY')
        ]);
        
        $json=$response->json();

        // step 2: send order data
        $response_final=Http::withHeaders([
            'content-type' => 'application/json'
        ])->post('https://accept.paymobsolutions.com/api/ecommerce/orders',[
            "auth_token"=>$json['token'],
            "delivery_needed"=>"false",
            "amount_cents"=>100,
            "merchant_order_id" => 15
        ]);

        $json_final=$response_final->json();
//        dd($json_final);
        $user = Auth::user();
        $name = $user->name;
        if ((count(explode(" ",$name)) == 1)) {
            $first_name = $name;$last_name=$name;
        } else {
            $first_name = explode(" ",$name)[0];
            $last_name = explode(" ",$name)[1];
        }
        //  step 3: send customer data
        $response_final_final=Http::withHeaders([
            'content-type' => 'application/json'
        ])->post('https://accept.paymobsolutions.com/api/acceptance/payment_keys',[
            "auth_token"=>$json['token'],
            "expiration"=> 36000,
            "amount_cents"=> 1000,
            "order_id"=>$order_id,
            "billing_data"=>[
                "first_name"            =>"MTest",
                "last_name"             => "KTest",
                // "phone_number"          => $user->phone ?: "NA",
                "phone_number"          => "NA",
                "email"                 => "test@example.com",
                "apartment"             => "NA",
                "floor"                 => "NA",
                "street"                => "New Maadi",
                "building"              => "NA",
                "shipping_method"       => "NA",
                "postal_code"           => "75275",
                "city"                  => "Cairo",
                // "state"                 => $user->state ?: "NA",
                "state"                 => "Maadi",
                "country"               => "Egypt",
            ],
            "currency"=>"EGP",
            "integration_id"=>$integration_id
        ]);

        $response_final_final_json=$response_final_final->json();

        if ($payment_method == 'paymob_mobile_wallet_payment') {
            $response_iframe =Http::withHeaders([
                'content-type' => 'application/json'
            ])->post('https://accept.paymob.com/api/acceptance/payments/pay',[
                "source"=>[
                    "identifier"=> $iframe_id_or_wallet_number,
//                "identifier"=> "01010101010",
                    "subtype"=> "WALLET"
                ],
                "payment_token"=>$response_final_final_json['token'],
            ]);
            return redirect($response_iframe->json()['redirect_url']);
        } else {
            return redirect('https://accept.paymobsolutions.com/api/acceptance/iframes/'. $iframe_id_or_wallet_number .'?payment_token=' . $response_final_final_json['token']);
        }
    }

    public function getPaymentToken($order, $token)
    {
        //this function to add details to paymob order dashboard and you can fill this data from your Model Class as below


        // $amountt = new Checkoutshow;
        // $totall = $amountt->totalProductAmount();
        // $todayDate = Carbon::now();
        // $dataa = Order::where('user_id',Auth::user()->id)->whereDate('created_at',$todayDate)->orderBy('created_at','desc')->first();

        //we just added dummy data for test
        //all data we fill is required for paymob
        $billingData = [
            "apartment" => '45', //example $dataa->appartment
            "email" => "newmail@gmai.com", //example $dataa->email
            "floor" => '5',
            "first_name" => 'maher',
            "street" => "NA",
            "building" => "NA",
            "phone_number" => '0123456789',
            "shipping_method" => "NA",
            "postal_code" => "NA",
            "city" => "cairo",
            "country" => "NA",
            "last_name" => "fared",
            "state" => "NA"
        ];
        $data = [
            "auth_token" => $token,
            "amount_cents" => 100*100,
            "expiration" => 3600,
            "order_id" => $order->id, // this order id created by paymob
            "billing_data" => $billingData,
            "currency" => "EGP",
            "integration_id" => env('PAYMOB_INTEGRATION_ID')
        ];
        $response = Http::post('https://accept.paymob.com/api/acceptance/payment_keys', $data);
        return $response->object()->token;
    }


    public function callback(Request $request)
    {
        //this call back function its return the data from paymob and we show the full response and we checked if hmac is correct means successfull payment

        $data = $request->all();
        ksort($data);
        $hmac = $data['hmac'];
        $array = [
            'amount_cents',
            'created_at',
            'currency',
            'error_occured',
            'has_parent_transaction',
            'id',
            'integration_id',
            'is_3d_secure',
            'is_auth',
            'is_capture',
            'is_refunded',
            'is_standalone_payment',
            'is_voided',
            'order',
            'owner',
            'pending',
            'source_data_pan',
            'source_data_sub_type',
            'source_data_type',
            'success',
        ];
        $connectedString = '';
        foreach ($data as $key => $element) {
            if(in_array($key, $array)) {
                $connectedString .= $element;
            }
        }
        $secret = env('PAYMOB_HMAC');
        $hased = hash_hmac('sha512', $connectedString, $secret);
        if ( $hased == $hmac) {
            //this below data used to get the last order created by the customer and check if its exists to 
            // $todayDate = Carbon::now();
            // $datas = Order::where('user_id',Auth::user()->id)->whereDate('created_at',$todayDate)->orderBy('created_at','desc')->first();
            $status = $data['success'];
            // $pending = $data['pending'];

            if ( $status == "true" ) {

                //here we checked that the success payment is true and we updated the data base and empty the cart and redirct the customer to thankyou page

                // Cart::where('user_id',auth()->user()->id)->delete();
                // $datas->update([
                //     'payment_id' => $data['id'],
                //     'payment_status' => "Compeleted"
                // ]);
                // try {
                //     $order = Order::find($datas->id);
                //     Mail::to('maherfared@gmail.com')->send(new PlaceOrderMailable($order));
                // }catch(\Exception $e){
        
                // }
                return redirect()->route('cart')
                ->with('success', 'Payment Completed, Your Order Is Being Prepared! Delivery Center will contact you from 30-50 Min.');
            }
            else {
                // $datas->update([
                //     'payment_id' => $data['id'],
                //     'payment_status' => "Failed"
                // ]);


                return redirect()->route('cart')->with('message', 'Something Went Wrong Please Try Again');

            }
            
        }else {
            return redirect()->route('cart')->with('message', 'Something Went Wrong Please Try Again');
        }
    }


}

/// USER'S BASE INFO //=====================================
// "first_name"            => $first_name,
// "last_name"             => $last_name,
// "phone_number"          => $user->phone ?: "NA",
// "email"                 => $user->email,
// "apartment"             => "NA",
// "floor"                 => "NA",
// "street"                => $user->address,
// "building"              => "NA",
// "shipping_method"       => "NA",
// "postal_code"           => $user->postal_code,
// "city"                  => $user->city,
// "state"                 => $user->state ?: "NA",
// "country"               => $user->country,
//============================================================