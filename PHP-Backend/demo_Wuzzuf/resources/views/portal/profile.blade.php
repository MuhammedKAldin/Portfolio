@extends('portal.layout')

@section('content')
    <!-- bradcam_area  -->
    <div class="bradcam_area bradcam_bg_1">
        <div class="container">
            <div class="row">
                <div class="col-xl-12">
                    <div class="bradcam_text">
                        <h3>Profile</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--/ bradcam_area  -->
  <!-- ================ contact section start ================= -->
  <section class="contact-section section_padding">
    
    @include('portal.profile-nav')

    <div class="container">
      <div class="row">
        <div class="col-12">
            <h2 class="contact-title">Basic Information :</h2>
            </div>
            <div class="col-lg-8">
            <form class="form-contact contact_form" action="contact_process.php" method="post" id="contactForm" novalidate="novalidate">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="form-group">
                        <input class="form-control" name="name" id="name" type="text" placeholder = 'Profile Name' value='{{$user->name}}' >
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="form-group">
                        <input class="form-control" name="email" id="email" type="email" placeholder = 'Official email address' value='{{$user->email}}'>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-group">
                        <input class="form-control" name="subject" id="subject" type="text" placeholder = 'Headline / Industry' value='{{$user->headline}}'>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-group">
                            <textarea class="form-control w-100" name="message" id="message" cols="30" rows="9" placeholder = 'Profile Summary'>{{$user->summary}}</textarea>
                        </div>
                    </div>
                </div>
                <div class="form-group mt-3">
                <button type="submit" class="button button-contactForm btn_4 boxed-btn">Save Changes</button>
                </div>
            </form>
           </div>
          </div>
        </div>
    </div>
    </section>
@endsection