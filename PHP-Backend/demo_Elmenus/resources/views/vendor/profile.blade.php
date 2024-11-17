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
                                <li> <a href="{{route('vendorProfile')}}" class='widget_title section-active' >General</a> </li>
                                <li> / </li>
                                <a href="{{route('vendorMeals')}}" class='widget_title' >Meals</a> </li>
                            </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="row">


                <div class="col-lg-8 mb-5 mb-lg-0">

                    <div class="row">
                        <div class="col-12">
                            <h2 class="contact-title">Basic Informations</h2>
                        </div>
                        <div class="col-lg-8">
                            <form class="form-contact contact_form" action="contact_process.php" method="post" id="contactForm" novalidate="novalidate">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <input class="form-control valid" name="name" id="name" type="text" placeholder="Vendor name" value="{{$user->name}}">
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <input class="form-control valid" name="email" id="email" type="email" placeholder="Vendor e-mail" value="{{$user->email}}">
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-group">
                                            <input class="form-control" name="subject" id="subject" type="text" placeholder="Enter Your Welcoming Phrase" value="{{$user->description}}">
                                        </div>
                                    </div>

                                    <div class="col-12">
                                        <div class="form-group">
                                            <textarea class="form-control w-100" name="message" id="message" cols="30" rows="9" placeholder=" Enter Branch Addresses" > {{$user->location}} </textarea>
                                        </div>
                                    </div>

                                </div>
                                <div class="form-group mt-3">
                                    <button type="submit" class="button button-contactForm boxed-btn">
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div class="col-lg-3 offset-lg-1">
                            <div class="media contact-info">
                                <span class="contact-info__icon"><i class="ti-home"></i></span>
                                <div class="media-body">
                                    <h3>Location / {{$user->location}}</h3>
                                </div>
                            </div>
                            <div class="media contact-info">
                                <span class="contact-info__icon"><i class="ti-tablet"></i></span>
                                <div class="media-body">
                                    <h3>Hotline / {{$user->hotline}}</h3>
                                </div>
                            </div>
                            
                        </div>
                    </div>

                </div>
                </div>
            </div>
        </div>
    <!--================Blog Area =================-->
@endsection