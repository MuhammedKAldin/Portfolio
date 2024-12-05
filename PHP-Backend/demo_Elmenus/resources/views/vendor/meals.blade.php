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
                                <a href="{{route('vendorMeals')}}" class='widget_title  section-active' >Meals</a> </li>
                            </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="row">

                <div class="col-lg-4">
                    <div class='text-center'>
                        <a class="boxed-btn5" href="{{route('vendorCreate')}}" style="padding: 16px 100px;"> 
                            Create New Meal
                        </a>
                    </div>

                    <div class="blog_right_sidebar" style=" padding-top: 10px;">
                        <aside class="single_sidebar_widget popular_post_widget" >
                            <h3 class="widget_title">Recent Posts</h3>
                            <div class="media post_item">
                                <img src="img/post/post_1.png" alt="post">
                                <div class="media-body">
                                    <a href="single-blog.html">
                                        <h3>From life was you fish...</h3>
                                    </a>
                                    <p>January 12, 2019</p>
                                </div>
                            </div>
                            <div class="media post_item">
                                <img src="img/post/post_2.png" alt="post">
                                <div class="media-body">
                                    <a href="single-blog.html">
                                        <h3>The Amazing Hubble</h3>
                                    </a>
                                    <p>02 Hours ago</p>
                                </div>
                            </div>
                            <div class="media post_item">
                                <img src="img/post/post_3.png" alt="post">
                                <div class="media-body">
                                    <a href="single-blog.html">
                                        <h3>Astronomy Or Astrology</h3>
                                    </a>
                                    <p>03 Hours ago</p>
                                </div>
                            </div>
                            <div class="media post_item">
                                <img src="img/post/post_4.png" alt="post">
                                <div class="media-body">
                                    <a href="single-blog.html">
                                        <h3>Asteroids telescope</h3>
                                    </a>
                                    <p>01 Hours ago</p>
                                </div>
                            </div>
                        </aside>

                    </div>
                </div>

                <div class="col-lg-8 mb-5 mb-lg-0">

                    <aside class="single_sidebar_widget search_widget">

                        <div class="form-group">
                            <div class="input-group mb-3">
                                <input id="searchInput" type="text" class="form-control" placeholder='Search Keyword'>
                                <div class="input-group-append">
                                    <button class="btn" type="button"><i class="ti-search"></i></button>
                                </div>
                            </div>
                        </div>
                        <button id="searchButton" class="button rounded-0 primary-bg text-white w-100 btn_1 boxed-btn"
                        type="button">Search
                        </button>
                    </aside>

                    <!--================Blog Area =================-->
                    <div class="best_burgers_area">
                        <div class="container">
                            <div id="searchResults" class="row">
                                @foreach ($items as $item)
                                    <div class="col-12 text-center">
                                        <div class="single_delicious d-flex align-items-center">
                                        <div class="thumb">
                                            <img src="{{asset('storage/meals/'.$item->meal_image)}}" alt="" style="width: 236px; border-radius: 26%;">
                                        </div>
                                        <div class="info" style="width: 100%;">
                                            <div class="container">
                                                <div class="row">
                                                    <div class="col-6"> 
                                                    <h3> {{$item->meal_name}} </h3>
                                                    </div>
                                                    <div class="col-6"> 
                                                        <span>Price : {{$item->meal_price}}  EGP</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="container">
                                                <div class="row">
                                                    <div class="col-6"> 
                                                    <p class='description' >  {{$item->meal_desc}}  </p>
                                                    </div>
                                                    <div class="col-6"> 
                                                        <a class="boxed-btn5" href="{{ route('vendorShowMeal', ['id' => $item->id]) }}" style="padding: 16px 20px;">
                                                            <i class="fa fa-pencil-square-o" aria-hidden="true" 
                                                            style="font-size: 22px";
                                                            ></i> 
                                                        </a>

                                                        <a class="boxed-btn5" href="{{ route('removeMeal', ['id' => $item->id]) }}" style="padding: 16px 20px;">
                                                            <i class="fa fa-minus-square" aria-hidden="true" 
                                                            style="font-size: 22px";
                                                            ></i> 
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                @endforeach
                            </div>
                        </div>
                    </div>

                    <nav class="blog-pagination justify-content-center d-flex">
                        <ul class="pagination">
                            <li class="page-item">
                                <a href="#" class="page-link" aria-label="Previous">
                                    <i class="ti-angle-left"></i>
                                </a>
                            </li>
                            <li class="page-item">
                                <a href="#" class="page-link">1</a>
                            </li>
                            <li class="page-item active">
                                <a href="#" class="page-link">2</a>
                            </li>
                            <li class="page-item">
                                <a href="#" class="page-link" aria-label="Next">
                                    <i class="ti-angle-right"></i>
                                </a>
                            </li>
                        </ul>
                    </nav>

                    </div>
                </div>
            </div>
        </div>

        <script>
                $('#searchButton').click(function(event) {
                    event.preventDefault(); // Prevent the default form submission

                    var query = $('#searchInput').val();

                    $.ajax({
                        url: "{{ route('vendorSearchMeals') }}",
                        method: 'GET',
                        data: {
                            query: query
                        },
                        success: function(response) 
                        {
                            $('#searchResults').empty(); // Clear previous results

                            if(response.length > 0) {
                                response.forEach(function(item) 
                                {
                                    // Construct the URLs dynamically
                                    var showMealUrl = "{{ url('vendor/meals') }}/" + item.id;
                                    var removeMealUrl = "{{ url('vendor/remove') }}/" + item.id;

                                    var resultHtml = `
                                        <div class="col-12 text-center">
                                            <div class="single_delicious d-flex align-items-center">
                                                <div class="thumb">
                                                    <img src="{{ asset('storage/meals/${item.meal_image}') }}" alt="" style="width: 236px; border-radius: 26%;">
                                                </div>
                                                <div class="info" style="width: 100%;">
                                                    <div class="container">
                                                        <div class="row">
                                                            <div class="col-6">
                                                                <h3>${item.meal_name}</h3>
                                                            </div>
                                                            <div class="col-6">
                                                                <span>Price: ${item.meal_price} EGP</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="container">
                                                        <div class="row">
                                                            <div class="col-6">
                                                                <p class='description'>${item.meal_desc}</p>
                                                            </div>
                                                            <div class="col-6">
                                                                <a class="boxed-btn5" href="${showMealUrl}" style="padding: 16px 20px;">
                                                                    <i class="fa fa-pencil-square-o" aria-hidden="true" style="font-size: 22px;"></i>
                                                                </a>
                                                                <a class="boxed-btn5" href="${removeMealUrl}" style="padding: 16px 20px;">
                                                                    <i class="fa fa-minus-square" aria-hidden="true" style="font-size: 22px;"></i>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    `;
                                    $('#searchResults').append(resultHtml);
                                });
                            } else {
                                $('#searchResults').append('<p>No results found</p>');
                            }
                        },
                        error: function() {
                            $('#searchResults').append('<p>There was an error processing your request</p>');
                        }
                    });
                });

        </script>
    <!--================Blog Area =================-->
@endsection