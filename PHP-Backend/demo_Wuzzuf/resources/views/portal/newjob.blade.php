@extends('portal.layout')

@section('content')
    <!-- bradcam_area  -->
    <div class="bradcam_area bradcam_bg_1">
        <div class="container">
            <div class="row">
                <div class="col-xl-12">
                    <div class="bradcam_text">
                        <h3>Add Job</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--/ bradcam_area  -->
  <!-- ================ contact section start ================= -->
  <section class="contact-section section_padding">
    <div class="container">
      <div class="row">
        <div class="col-12">

            @if (session('success'))
                <div class="alert alert-success">
                    {{ session('success') }}
                </div>
            @endif

            <h2 class="contact-title">Fill in the Required Job Details</h2>
            <div class="col-lg-8">
            <form action="{{route('createOffer')}}" method="post" novalidate="novalidate">
            @csrf
                <div class="row">
                    <div class="col-12">
                        <div class="form-group">
                        <input class="form-control" name="name" id="subject" type="text" placeholder = 'Role Required :Software Engineer, UI/UX Designer, Human Personnel, etc..'>
                        </div>

                        @error('name')
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                        @enderror 

                    </div>
                    <div class="col-12">
                        <div class="form-group">
                            <textarea class="form-control w-100" name="description" id="message" cols="30" rows="3" placeholder = 'Job Description...'></textarea>
                        </div>

                        {{-- @error('description')
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                        @enderror --}}

                    </div>
                    <div class="col-12">
                        <div class="form-group">
                            <textarea class="form-control w-100" name="responsibility" id="message" cols="30" rows="3" placeholder = 'Role Responsibility...'></textarea>
                        </div>
                        
                        {{-- @error('responsibility')
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                        @enderror --}}
                        
                    </div>
                    <div class="col-12">
                        <div class="form-group">
                            <textarea class="form-control w-100" name="qualifications" id="message" cols="30" rows="3" placeholder = 'Candidate Qualifications...'></textarea>
                        </div>
                        
                        {{-- @error('qualifications')
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                        @enderror --}}
                        
                    </div>
                    <div class="col-12">
                        <div class="form-group">
                            <textarea class="form-control w-100" name="benifits" id="message" cols="30" rows="3" placeholder = 'Benifits...'></textarea>
                        </div>
                        
                        {{-- @error('benifits')
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                        @enderror --}}
                        
                    </div>
                </div>
                <button type="submit" class="button button-contactForm btn_4 boxed-btn"> Add Job </button>
            </form>
           </div>
          </div>
        </div>
    </div>
  </section>
@endsection