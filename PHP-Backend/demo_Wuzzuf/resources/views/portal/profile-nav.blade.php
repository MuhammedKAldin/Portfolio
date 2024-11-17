<div class="catagory_area">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="popular_search align-items-center">
                    <ul>
                        <li><a href="{{ route('showProfile', ['id' => $user->id]) }}">General</a></li>

                        @if ($user->role == "employer")
                            <li><a href="{{ route('showProfileJobs', ['id' => $user->id]) }}">Jobs</a></li>
                        @endif
                        {{-- <li><a href="#">Review</a></li> --}}
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>