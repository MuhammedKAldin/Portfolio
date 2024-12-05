@extends('layout')

@section('content')

    <!-- video_area_start -->
        <div class="video_area video_bg overlay">
            <div class="video_area_inner text-center">
                <h3>ELMENUS </h3>
                <span>Find The Best Restaurants in Your Town!</span>
                <div class="video_payer">
                    <a href="https://www.youtube.com/watch?v=vLnPwxZdW4Y" class="video_btn popup-video">
                        <i class="fa fa-play"></i>
                    </a>
            </div>
        </div>
    </div>
    <!-- video_area_end -->

    <!-- features_room_startt -->
    <div class="Burger_President_area">
            <div class="Burger_President_here">
                <div class="single_Burger_President">
                    <div class="room_thumb">
                        <img src="{{asset('img/burgers/1.png')}}" alt="">
                        <div class="room_heading d-flex justify-content-between align-items-center">
                            <div class="room_heading_inner">
                                <span>$20</span>
                                <h3>Old School Burger</h3>
                                <p>Great way to make your business appear trust <br> and relevant.</p>
                                <a href="#" class="boxed-btn3">Order Now</a>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div class="single_Burger_President">
                    <div class="room_thumb">
                        <img src="{{asset('img/burgers/2.png')}}" alt="">
                        <div class="room_heading d-flex justify-content-between align-items-center">
                            <div class="room_heading_inner">
                                <span>$20</span>
                                <h3>Cheese Madness Burger</h3>
                                <p>Great way to make your business appear trust <br> and relevant.</p>
                                <a href="#" class="boxed-btn3">Order Now</a>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
    <!-- features_room_end -->

    <!-- slider_area_start -->
    <div class="slider_area">
        <div class="slider_active owl-carousel">
            <div class="single_slider  d-flex align-items-center slider_bg_1 overlay">
                <div class="container">
                    <div class="row align-items-center justify-content-center">
                        <div class="col-xl-9 col-md-9 col-md-12">
                            <div class="slider_text text-center">
                                {{-- <div class="deal_text">
                                    <span>Big Deal</span>
                                </div>
                                <h3>Burger <br>
                                    Bachelor</h3>
                                <h4>Maxican</h4> --}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="single_slider  d-flex align-items-center slider_bg_2 overlay">
                <div class="container">
                    <div class="row align-items-center justify-content-center">
                        <div class="col-xl-9 col-md-9 col-md-12">
                            <div class="slider_text text-center">
                                {{-- <div class="deal_text">
                                    <span>Big Deal</span>
                                </div>
                                <h3>Burger <br>
                                    Bachelor</h3>
                                <h4>Maxican</h4> --}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="single_slider  d-flex align-items-center slider_bg_3 overlay">
                <div class="container">
                    <div class="row align-items-center justify-content-center">
                        <div class="col-xl-9 col-md-9 col-md-12">
                            <div class="slider_text text-center">
                                {{-- <div class="deal_text">
                                    <span>Big Deal</span>
                                </div>
                                <h3>Burger <br>
                                    Bachelor</h3>
                                <h4>Maxican</h4> --}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="single_slider  d-flex align-items-center slider_bg_4 overlay">
                <div class="container">
                    <div class="row align-items-center justify-content-center">
                        <div class="col-xl-9 col-md-9 col-md-12">
                            <div class="slider_text text-center">
                                {{-- <div class="deal_text">
                                    <span>Big Deal</span>
                                </div>
                                <h3>Burger <br>
                                    Bachelor</h3>
                                <h4>Maxican</h4> --}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    
<!-- instragram_area_start -->
<div class="instragram_area">
    <div class="container">
    <div class="row">
        <div class="col-lg-3 col-md-6">
            <div class="single_instagram">
                <a href="#">
                    <img src="{{asset('img/instragram/grills.png')}}" alt="">
                    <div class="ovrelay">
                        <i class="fa fa-instagram"></i>
                    </div>
                    <span class="food-category"> Grills </span>
                </a>
            </div>
        </div>
        <div class="col-lg-3 col-md-6">
            <div class="single_instagram">
                <a href="#">
                    <img src="{{asset('img/instragram/friedchicken.png')}}" alt="">
                    <div class="ovrelay">
                        <i class="fa fa-instagram"></i>
                    </div>
                    <span class="food-category"> Fried Chicken </span>
                </a>
            </div>
        </div>
        <div class="col-lg-3 col-md-6">
            <div class="single_instagram">
                <a href="#">
                    <img src="{{asset('img/instragram/pizza.png')}}" alt="">
                    <div class="ovrelay">
                        <i class="fa fa-instagram"></i>
                    </div>
                    <span class="food-category"> Pizza </span>
                </a>
            </div>
        </div>
        <div class="col-lg-3 col-md-6">
            <div class="single_instagram">
                <a href="#">
                    <img src="{{asset('img/instragram/burgers.png')}}" alt="">
                    <div class="ovrelay">
                        <i class="fa fa-instagram"></i>
                    </div>
                    <span class="food-category"> Burgers </span>
                </a>
            </div>
        </div>

    </div>
    </div>
    </div>
    <!-- instragram_area_end -->

    <!-- slider_area_end -->
@endsection