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
    
       <!--================Blog Area =================-->
       <section class="blog_area single-post-area section-padding">
           <div class="container">
             <div class="row">
                <div class="col-lg-4">
                    <div class="blog_right_sidebar">

                       <aside class="single_sidebar_widget post_category_widget">
                          <h4 class="widget_title">Category</h4>
                          <ul class="list cat-list">
                             <li>
                                <a href="#" class="d-flex">
                                   <p>Grills </p>
                                   <p>(37)</p>
                                </a>
                             </li>
                             <li>
                                <a href="#" class="d-flex">
                                   <p>Fried Chicken</p>
                                   <p>(10)</p>
                                </a>
                             </li>
                             <li>
                                <a href="#" class="d-flex">
                                   <p>Pizza </p>
                                   <p>(03)</p>
                                </a>
                             </li>
                             <li>
                                <a href="#" class="d-flex">
                                   <p>Burgers</p>
                                   <p>(11)</p>
                                </a>
                             </li>
                             
                          </ul>
                       </aside>
                       
                    </div>
                 </div>

                <div class="col-lg-8 posts-list">
                    <div class="single_sidebar_widget search_widget">
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
                    </div>

                    </br>
                    
                    <div id="searchResults">
                        @foreach ($vendors as $vendor)
                        <div class="single-post">
                           <!-- features_room_startt -->
                           <div class="Burger_President_area">
                              <div class="Burger_President_here">
                                 <div class="single_Burger_President" style="width:100%!important;">
                                       <div class="room_thumb">
                                          <img src="{{asset('storage/vendors/'.$vendor->image)}}" alt="">
                                          <div class="room_heading d-flex justify-content-between align-items-center">
                                             <div class="room_heading_inner">
                                                   <span> {{$vendor->name}} </span>
                                                   <h3> {{$vendor->location}} </h3>
                                                   <p> {{$vendor->description}} </p>
                                                   <a href="{{route('openMenu', ["id" => $vendor->verified_user_id])}}" class="boxed-btn3">Open Menu</a>
                                             </div>
                                             
                                          </div>
                                       </div>
                                 </div>

                              </div>
                           </div>
                        </div>
                        </br>
                        @endforeach

                    </div>
               </div>
           </div>
       </section>
       <!--================ Blog Area end =================-->

       <script>
         $('#searchButton').click(function(event) 
         {
             event.preventDefault(); // Prevent the default form submission
     
             var query = $('#searchInput').val();
            
             $.ajax({
                 url: "{{ route('search') }}",
                 method: 'GET',
                 data: {
                     query: query
                 },
                 success: function(response) 
                 {

                  $('#searchResults').empty(); // Clear previous results

                  if(response.length > 0) 
                  {
                     response.forEach(function(item) 
                     {
                        // Construct URLs dynamically if needed
                        var showMenuUrl = "{{ url('/menus') }}/" + item.id; 

                        // Build HTML using the properties from the response
                        var resultHtml = `
                           <div class="single-post">
                              <div class="Burger_President_area">
                                    <div class="Burger_President_here">
                                       <div class="single_Burger_President" style="width:100%!important;">
                                          <div class="room_thumb">
                                                <img src="{{ asset('storage/vendors/') }}/${item.image}" alt="">
                                                <div class="room_heading d-flex justify-content-between align-items-center">
                                                   <div class="room_heading_inner">
                                                      <span>${item.name}</span>
                                                      <h3>${item.location}</h3>
                                                      <p>${item.description}</p>
                                                      <a href="${showMenuUrl}" class="boxed-btn3">Open Menu</a>
                                                   </div>
                                                </div>
                                          </div>
                                       </div>
                                    </div>
                              </div>
                           </div>
                           <br>
                        `;
                        $('#searchResults').append(resultHtml);
                     });
                  } else {
                     $('#searchResults').append('<p>No results found</p>');
                  }
                     
                 },
                 error: function(jqXHR, textStatus, errorThrown) {
                     console.error("Error:", textStatus, errorThrown);
                     $('#searchResults').append('<p>There was an error processing your request</p>');
                 }
             });
         });
     </script>
     
    <!-- slider_area_end -->
@endsection