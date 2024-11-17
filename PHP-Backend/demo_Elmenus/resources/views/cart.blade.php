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
         @if (session('success'))
            <div class="alert alert-success">
               {{ session('success') }}
            </div>

            <script>
               document.addEventListener('DOMContentLoaded', function() 
               {
                  // Update cart display after clearing
                  localStorage.removeItem('cart');
                  displayCart(); 
               });
           </script>
         @endif

         @if (session('message'))
            <div class="alert alert-warning">
               {{ session('message') }}
            </div>
         @endif
      </div>

      <div class="container">
          <div id="cartItems" class="loading" class="row">
              {{-- <div class="col-12 text-center">
                  <div class="single_delicious d-flex align-items-center">
                     <div class="thumb">
                        <img src="img/burger/1.png" alt="">
                     </div>
                     <div class="info">
                        <div class="container">
                           <div class="row">
                              <div class="col-6"> 
                                 <h3>Beefy Burgers</h3>
                              </div>
                              <div class="col-6"> 
                                 <span>Price : 5 EGP</span>
                              </div>
                           </div>
                        </div>
                        <div class="container">
                           <div class="row">
                              <div class="col-6"> 
                                 <p class='description' >Great way to make your business appear trust and relevant.</p>
                              </div>

                              <div class="col-6"> 
                                 <a class="boxed-btn5" href=""> Remove </a>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
              </div> --}}
             
              <i class="fa fa-circle-o-notch fa-spin" style="font-size:74px"></i>

          </div>

          <div class="col-12 blog_right_sidebar">
            <a href="#" class='widget_title  section-active' style="font-size: 35px;" >SubTotal : <span id="subtotal">0</span> EGP</a> 
          </div>

         <form action="{{ route('checkout') }}" method="POST">
            @csrf
            <button class="button rounded-0 primary-bg text-white w-100 btn_1 boxed-btn" type="submit">
               Pay with Credit Card
            </button>
         </form>

         {{-- <form action="{{ route('wallet') }}" method="POST">
         @csrf
            <button class="button rounded-0 primary-bg text-white w-100 btn_1 boxed-btn" type="submit" style="margin-top: 37px;">
               Pay with Mobile Wallet
            </button>
            <input class="form-control valid" name="phone_number" type="text" placeholder="Mobile wallet number.." >
         </form> --}}

         <button id="clearCartBtn" class="button rounded-0 primary-bg text-white w-100 btn_1 boxed-btn"
         type="button" style="margin-top: 37px; ">Clear Cart
         </button>

      </div>
     </div>
     
   <script>
      document.addEventListener('DOMContentLoaded', function() 
      {
         // Function to get cart from local storage
         function getCart() {
            return JSON.parse(localStorage.getItem('cart')) || [];
         }

         // Function to save cart to local storage
         function saveCart(cart) {
            localStorage.setItem('cart', JSON.stringify(cart));
         }

         // Function to display cart items and calculate subtotal
         function displayCart() {
            const cart = getCart();

            const cartItemsContainer = document.getElementById('cartItems');
            const subtotalElement = document.getElementById('subtotal');
            let subtotal = 0;

            cartItemsContainer.innerHTML = '';

            cart.forEach(item => {
                  // Construct URLs dynamically if needed
                  var showMealImage = "{{ url('storage/meals') }}/" + item.image;

                  const itemHtml = `
                     <div class="col-12 text-center">
                        <div class="single_delicious d-flex align-items-center">
                              <div class="thumb">
                                 <img src="${showMealImage}" alt="" style="width: 236px; border-radius: 26%;">
                              </div>
                              <div class="info">
                                 <div class="container">
                                    <div class="row">
                                          <div class="col-6"> 
                                             <h3>${item.name}</h3>
                                          </div>
                                          <div class="col-6"> 
                                             <span>Price: ${item.price} EGP</span>
                                             <span>Quantity: ${item.quantity}</span>
                                          </div>
                                    </div>
                                 </div>
                                 <div class="container">
                                    <div class="row">
                                          <div class="col-6" style="text-align: left !important;"> 
                                             <p class='description'>Great way to make your business appear trust and relevant.</p>
                                          </div>
                                          <div class="col-6"> 
                                             <a class="boxed-btn5 remove-from-cart-btn" data-id="${item.id}" style="padding: 16px 20px;">
                                                <i class="fa fa-minus-square" aria-hidden="true" style="font-size: 22px;"></i>
                                             </a>
                                          </div>
                                    </div>
                                 </div>
                              </div>
                        </div>
                     </div>
                  `;
                  cartItemsContainer.insertAdjacentHTML('beforeend', itemHtml);
                  subtotal += item.price * item.quantity;
            });

            subtotalElement.textContent = subtotal;
         }

         // Function to handle cart item removal
         function handleRemoveFromCart(event) {
            if (event.target.classList.contains('remove-from-cart-btn')) {
                  const id = event.target.getAttribute('data-id');
                  let cart = getCart();
                  const itemIndex = cart.findIndex(item => item.id === id);

                  if (itemIndex !== -1) {
                     if (cart[itemIndex].quantity > 1) {
                        // Decrement quantity if more than 1
                        cart[itemIndex].quantity -= 1;
                     } else {
                        // Remove item if quantity is 1
                        cart.splice(itemIndex, 1);
                     }
                     saveCart(cart);
                     displayCart();
                  }
            }
         }

         // Attach event listener to the document
         document.addEventListener('click', handleRemoveFromCart);

         // Initial display of cart items
         displayCart();

         // Clear cart
         document.getElementById('clearCartBtn').addEventListener('click', function() {
            localStorage.removeItem('cart');
            displayCart(); // Update cart display after clearing
         });
      });

  </script>
   <!--================ Blog Area end =================-->

@endsection