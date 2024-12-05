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

    <div class="catagory_area">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="popular_search align-items-center">
                        <ul>
                            <li><a href="{{ route('showProfile', ['id' => $user->id]) }}">General</a></li>
                            <li><a href="{{ route('showJobs', ['id' => $user->id]) }}">Jobs</a></li>
                            {{-- <li><a href="#">Review</a></li> --}}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container">

        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="recent_joblist_wrap">
                        <div class="recent_joblist white-bg ">
                            <div class="row align-items-center">
                                <div class="col-md-6">
                                    <h4>Job Listing</h4>
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
                                                <a href="/profile/{{$job->employer_id}}">
                                                    <h4> {{$job->name}} </h4>
                                                    <h6>{{'@'.$job->employer->name}}</h6>
                                                    <p> <i class="fa fa-user"></i> {{$job->level}} </p>
                                                </a>
                                                <div class="links_locat d-flex align-items-center">
                                                    <div class="location">
                                                        <p> <i class="fa fa-map-marker"></i> {{$job->location}}</p>
                                                    </div>
                                                    <div class="location">
                                                        <p> <i class="fa fa-clock-o"></i> {{$job->availability}}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        
                                        <div class="jobs_right">
                                            <div class="apply_now">
                                                @if (Auth::check() && $job->employer_id == Auth::id())
                                                    <a href="{{ route('showCandidates', ['id' => $job->id, 'stage' => 'screening']) }}" class="boxed-btn3">View Candidates</a>
                                                @else
                                                    @if (Auth::check())
                                                        <a href="{{ route('applyToJob', ['jid' => $job->id, 'uid' => Auth::id()]) }}" class="boxed-btn3">Apply Now</a>
                                                    @else
                                                        <a href="{{ route('login') }}" class="boxed-btn3">Apply Now</a>
                                                    @endif
                                                @endif
                                            </div>
                                            <div class="date">
                                                <p>Post Since : {{ \Carbon\Carbon::parse($job->created_at)->format('d M Y') }}</p>
                                            </div>
                                        </div>
                                        

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