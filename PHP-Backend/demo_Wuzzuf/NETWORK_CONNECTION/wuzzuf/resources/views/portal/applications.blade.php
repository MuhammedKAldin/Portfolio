@extends('portal.layout')

@section('content')

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
  <!-- ================ contact section start ================= -->
  <section class="contact-section section_padding">
    <div class="container">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="recent_joblist_wrap">
                        <div class="recent_joblist white-bg ">
                            <div class="row align-items-center">
                                <div class="col-md-6">
                                    <h4>My Applications</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div class="job_lists m-0">
                        <div class="row">
                            <div class="col-lg-12 col-md-12">
                                @foreach ($jobs as $job)
                                <div class="single_jobs white-bg d-flex justify-content-between">
                                    
                                    <div class="jobs_left d-flex align-items-center">
                                        <div class="thumb">
                                            <img src="img/svg_icon/1.svg" alt="">
                                        </div>
                                        <div class="jobs_conetent">
                                            <a href="/jobs/50">
                                                <h4> {{$job->jobOffer->name}} </h4>
                                                <h6>{{'@'.$job->jobOffer->employer->name}}</h6>
                                                <p> <i class="fa fa-user"></i> {{$job->jobOffer->level}} </p>
                                            </a>
                                            <div class="links_locat d-flex align-items-center">
                                                <div class="location">
                                                    <p> <i class="fa fa-map-marker"></i> {{$job->jobOffer->location}}</p>
                                                </div>
                                                <div class="location">
                                                    <p> <i class="fa fa-clock-o"></i> {{$job->jobOffer->availability}}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    @if ($job->stage != "screening" && $job->stage != "declined")
                                    
                                    <div class="jobs_right">
                                        <div class="row">
                                                <div class="col-md-5" style="padding-top: 7px;padding-left: 44px;">
                                                    <a class="active" href="{{ route('chat', ['id' => $job->id, 'stage' => $job->stage,'user_id' => $job->id]) }}">
                                                        <button type="button" class="btn btn-primary position-relative">
                                                            Direct Message
                                                            <span class="position-absolute top-0 start-100 translate-middle p-2 bg-success border border-light rounded-circle" style="top: -10px;"></span>
                                                        </button>
                                                    </a>
                                                </div>
                                            
                                            <div class="col-lg-7">
                                                <div class="apply_now">
                                                    {{-- <a class="heart_mark" href="#"> <i class="fa fa-heart"></i> </a> --}}
                                                    <a class="boxed-btn4"> Status : {{$job->stage}} </a>
                                                </div>
                                                
                                                {{-- <div class="date">
                                                    <p>Post Since : {{ \Carbon\Carbon::parse($job->jobOffer->created_at)->format('d M Y') }}</p>
                                                </div> --}}

                                                <div class="date">
                                                    <p>Applied On : {{ \Carbon\Carbon::parse($job->created_at)->format('d M Y') }}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    @else

                                    <div class="jobs_right">
                                        <div class="apply_now">
                                            {{-- <a class="heart_mark" href="#"> <i class="fa fa-heart"></i> </a> --}}
                                            <a class="boxed-btn4"> Status : {{$job->stage}} </a>
                                        </div>
                                        
                                        {{-- <div class="date">
                                            <p>Post Since : {{ \Carbon\Carbon::parse($job->jobOffer->created_at)->format('d M Y') }}</p>
                                        </div> --}}

                                        <div class="date">
                                            <p>Applied On : {{ \Carbon\Carbon::parse($job->created_at)->format('d M Y') }}</p>
                                        </div>
                                    </div>

                                    @endif

                                </div>
                                <hr/>
                                @endforeach
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="pagination_wrap">
                                <ul>
                                    <li><a href="#"> <i class="ti-angle-left"></i> </a></li>
                                    <li><a href="#"><span>01</span></a></li>
                                    <li><a href="#"><span>02</span></a></li>
                                    <li><a href="#"> <i class="ti-angle-right"></i> </a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </section>
@endsection