@extends('layout')

@section('content')

    <!-- video_area_start -->
       <div class="video_area video_bg overlay">
        <div class="video_area_inner text-center">
            <h3>Burger <br>
                Bachelor</h3>
            <span>How we make delicious Burger</span>
            <div class="video_payer">
                <a href="https://www.youtube.com/watch?v=vLnPwxZdW4Y" class="video_btn popup-video">
                    <i class="fa fa-play"></i>
                </a>
            </div>
        </div>
    </div>
    <!-- video_area_end -->
    
    <!--================Blog Area =================-->
    <div class="best_burgers_area">
      <div class="container">
          <div class="row">
              <div class="col-12 text-center">
               @foreach ($items as $item)
                  <div class="single_delicious d-flex align-items-right">
                     <div class="thumb">
                        <img src="{{asset('storage/meals/'.$item->meal_image)}}" alt="" style="width: 236px; border-radius: 26%;">
                     </div>
                     <div class="info">
                        <div class="container">
                           <div class="row">
                              <div class="col-6"> 
                                 <h3>{{$item->meal_name}}</h3>
                              </div>
                              <div class="col-6"> 
                                 <a class="add-to-cart-btn boxed-btn5" href="" 
                                    data-id="{{ $item->id }}"
                                    data-name="{{ $item->meal_name }}" 
                                    data-price="{{ $item->meal_price }}" 
                                    data-image="{{ $item->meal_image }}"> Add To Cart </a>
                              </div>
                           </div>
                        </div>
                        <div class="container">
                           <div class="row">
                              <div class="col-6" style="text-align: left !important;"> 
                                 <p class='description' > {{$item->meal_desc}}.</p>
                              </div>
                              <div class="col-6"> 
                                 <span>Price : {{$item->meal_price}} EGP</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  @endforeach

              </div>
              
          </div>
      </div>
     </div>
     
   <script>
      
      // Function to get cart from local storage
      function getCart() 
      {
          return JSON.parse(localStorage.getItem('cart')) || [];
      }
   
      // Function to save cart to local storage
      function saveCart(cart) {
          localStorage.setItem('cart', JSON.stringify(cart));
      }
   
      // Function to handle add to cart button click
      document.querySelectorAll('.add-to-cart-btn').forEach(button => 
      {
          button.addEventListener('click', function() 
          {
              event.preventDefault(); // Prevent the default action of the <a> tag

              const id = this.getAttribute('data-id');
              const name = this.getAttribute('data-name');
              const price = parseFloat(this.getAttribute('data-price'));
              const image = this.getAttribute('data-image');
   
              const cart = getCart();
              const existingItem = cart.find(item => item.id === id);
   
              if (existingItem) {
                  existingItem.quantity += 1;
              } else {
                  cart.push({ id, name, price, image, quantity: 1 });
              }
   
              saveCart(cart);
              alert('Item added to cart');
          });
      });

   </script>
   <!--================ Blog Area end =================-->

@endsection