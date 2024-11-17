@extends('vendor.layout')

@section('content')

    <!-- bradcam_area_start -->
    <div class="bradcam_area breadcam_bg">
        <h3>Vendor Profile</h3>
    </div>
    <!-- bradcam_area_end -->

    <!--================Blog Area =================-->

        <div class="testimonial_area " style="background: #fff;padding: 5px;padding-top: 65px;">
            <div class="container">
                <div class="row">
                    <div class="col-xl-12 blog_right_sidebar">
                            <ul class="section_title mb-60 post_category_widget text-center" style="display: ruby-text;">
                                <li> <a href="{{route('vendorProfile')}}" class='widget_title' >General</a> </li>
                                <li> / </li>
                                <a href="{{route('vendorMeals')}}" class='widget_title' >Meals</a> </li>
                            </ul>
                    </div>

                    @if (session('success'))
                        <div class="alert alert-success">
                            {{ session('success') }}
                        </div>
                    @endif

                </div>
            </div>

        </div>



        <div class="container">
            <div class="row">

                
                <div class="col-lg-8 mb-5 mb-lg-0">

                    <div class="row">
                        <div class="col-12">
                            <h2 class="contact-title">Adding New Meal</h2>
                        </div>
                        <div class="col-lg-8">
                            <form enctype="multipart/form-data" class="form-contact contact_form" action="{{route('vendorCreateProcess')}}" method="post" id="contactForm" novalidate="novalidate">
                            @csrf
                                <div class="row">
                                    <div class="col-6">
                                        <div class="form-group">
                                            @error('meal_name')
                                            <span class="invalid-feedback" role="alert" style='display: block;'>
                                                <strong>{{ $message }}</strong>
                                            </span>
                                            @enderror

                                            <input class="form-control valid" name="meal_name" id="name" type="text" placeholder="Meal name">
                                        </div>

                                    </div>

                                    <div class="col-6">
                                        <div class="form-group">
                                            @error('meal_price')
                                            <span class="invalid-feedback" role="alert" style='display: block;'>
                                                <strong>{{ $message }}</strong>
                                            </span>
                                            @enderror

                                            <input class="form-control valid" name="meal_price" id="name" type="text" placeholder="Meal price">
                                        </div>
                                    </div>

                                    <div class="col-12">
                                        @error('meal_category')
                                        <span class="invalid-feedback" role="alert" style='display: block;'>
                                            <strong>{{ $message }}</strong>
                                        </span>
                                        @enderror

                                        <div class="form-group">
                                            <select name="meal_category" class="form-select" aria-label="Default select example" >
                                                <option selected="" value="none"> Select Category </option>
                                                <option value="grill">Grill</option>
                                                <option value="fried chicken">Fried Chicken</option>
                                                <option value="pizza">Pizza</option>
                                                <option value="burger">Burger</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class="col-12">
                                        @error('meal_desc')
                                        <span class="invalid-feedback" role="alert" style='display: block;'>
                                            <strong>{{ $message }}</strong>
                                        </span>
                                        @enderror

                                        <div class="form-group">
                                            <textarea class="form-control w-100" name="meal_desc" id="message" cols="30" rows="9" placeholder=" Meal Description"></textarea>
                                        </div>
                                    </div>
                                    
                                    <div class="col-12">
                                        <div class="form-group">
                                            <label>Meal Image :</label>

                                            @error('meal_image')
                                            <span class="invalid-feedback" role="alert" style='display: block;'>
                                                <strong>{{ $message }}</strong>
                                            </span>
                                            @enderror

                                            <div class="thumb">
                                                <img id="imagePreview" src="img/burger/1.png" alt="Image Preview" style="max-width: 200px; max-height: 200px;" />
                                            </div>
                                            <input id="mealImageInput" name="meal_image" type="file" class="form-control w-100" accept="image/*" />
                                        </div>

                                    </div>
                                </div>
                                <div class="form-group mt-3">
                                    <button type="submit" class="button button-contactForm btn_4 boxed-btn"> Submit </button>

                                </div>
                            </form>
                        </div>
                        <div class="col-lg-3 offset-lg-1">
                            <div class="media contact-info">
                                <span class="contact-info__icon"><i class="ti-home"></i></span>
                                <div class="media-body">
                                    <h3>Buttonwood, California.</h3>
                                    <p>Rosemead, CA 91770</p>
                                </div>
                            </div>
                            <div class="media contact-info">
                                <span class="contact-info__icon"><i class="ti-tablet"></i></span>
                                <div class="media-body">
                                    <h3>+1 253 565 2365</h3>
                                    <p>Mon to Fri 9am to 6pm</p>
                                </div>
                            </div>
                            
                        </div>
                    </div>

                </div>
                </div>
            </div>
        </div>
    <!--================Blog Area =================-->

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const imageInput = document.getElementById('mealImageInput');
            const imagePreview = document.getElementById('imagePreview');
    
            imageInput.addEventListener('change', function(event) {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        imagePreview.src = e.target.result; // Set the preview image source
                    };
                    reader.readAsDataURL(file); // Read the file as a data URL
                } else {
                    imagePreview.src = 'img/burger/1.png'; // Default image or placeholder
                }
            });
        });
    </script>
    

@endsection