@extends('portal.layout')

@section('content')

    <div class="bradcam_area bradcam_bg_1">
        <div class="container">
            <div class="row">
                <div class="col-xl-12">
                    <div class="bradcam_text">
                        <h3>Candidates</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- featured_hiring_stages_area_start  -->


    
    <!-- featured_candidates_area_start  -->
    <div class="featured_candidates_area candidate_page_padding">
        <div class="catagory_area">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="popular_search align-items-center">
                            <h4>Stages </h4>

                            @foreach ($stageArr as $stageName)

                                @if (capitalizeFirstLetter($stage) == capitalizeFirstLetter($stageName))
                                    <a class="active" href="{{ route('showCandidates', ['id' => $job_offer_id, 'stage' => $stageName]) }}">
                                        <button type="button" class="btn btn-primary position-relative">
                                            {{ capitalizeFirstLetter($stageName) }}
                                            <span class="position-absolute top-0 start-100 translate-middle p-2 bg-success border border-light rounded-circle" style="top: -10px;"></span>
                                        </button>
                                    </a>
                                @else
                                    <a class="active" href="{{ route('showCandidates', ['id' => $job_offer_id, 'stage' => $stageName]) }}">
                                        <button type="button" class="btn btn-primary position-relative">
                                            {{ capitalizeFirstLetter($stageName) }}
                                        </button>
                                    </a>
                                @endif
                
                            @endforeach
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">

                @if (count($jobs) > 0)

                        @foreach ($jobs as $job)

                            <div class="col-md-6 col-lg-3" id="cadidateCard_{{ $job->id }}">
                                <div class="single_candidates text-center">
                                    <div class="thumb">
                                        <img src="{{asset('img/candidate.png')}}" alt="">
                                    </div>
                                    <a href="{{ route('showProfile', ['id' => $job->user_id]) }}"><h4>{{ $job->user->name }}</h4></a>
                                    <p> {{ $job->user->headline }} </p>

                                    @if ($job->stage != "screening" && $job->stage != "declined")
                                        <a href="{{ route('chat', ['id' => $job->job_offer_id, 'user_id' => $job->user_id, 'stage' => $stage]) }}">
                                            <img src="{{ asset('img/direct-message.png') }}" width="30px" />
                                            <small>Direct Chat</small>
                                        </a>
                                    @endif
                                

                                <hr/>
                                <label style="margin-bottom: 25px;"> Hiring Stage </label>
                                    <meta name="csrf-token" content="{{ csrf_token() }}">
                                    <select id="hiringStageSelect-{{ $job->id }}" class="form-select" aria-label="Default select example" onchange="changeHiringStage({{ $job->id }})">
                                        <option selected="" value="{{ $job->stage }}"> {{ capitalizeFirstLetter($job->stage) }}</option>
                                        <option value="screening">Screening</option>
                                        <option value="declined">Declined</option>
                                        <option value="shortlisted">Shortlisted</option>
                                        <option value="interview">Interview</option>
                                        <option value="accepted">Accepted</option>
                                    </select>
                                </div>
                            </div>

                        @endforeach

                @endif

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
    <!-- featured_candidates_area_end  -->

    <script>
        function changeHiringStage(jobId) 
        {
            // Get the selected value from the select element
            var stage = document.getElementById('hiringStageSelect-' + jobId).value;
            var candidateCard = document.getElementById('cadidateCard_' + jobId).style.display = "none";
            
            // Setup AJAX with CSRF token
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
    
            // Make the AJAX request
            $.ajax({
                url: '{{ route("updateCandidates") }}',
                type: 'POST',
                data: {
                    id: jobId, // Send the Job ID
                    stage: stage, // Send the selected stage value
                },
                success: function (response) {
                    console.log('Stage updated successfully.');
                },
                error: function (err) {
                    console.log('Error updating stage:', err);
                },
            });
        }
    </script>

@endsection