<!DOCTYPE html>
<html lang="en">
<head>

  @include('chat-header-layout')

  <!-- JavaScript -->
  <script src="https://js.pusher.com/7.2/pusher.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>
  <!-- End JavaScript -->

  <!-- CSS -->
  <link rel="stylesheet" href="/style.css">
  <!-- End CSS -->

</head>

<body>

  <div class="chat">

    <div class="top">
        @if ($userType == "employer")
            <a  href="{{ route('showCandidates', ['id' => $job_offer_id, 'stage' => $stage]) }}"><img src="{{asset("back.png")}}" width="55px" alt="Avatar" style="margin-top: -30px;margin-left: -21px;"></a>
        @elseif ($userType == "employee")
            <a  href="{{ route('showApplications') }}"><img src="{{asset("back.png")}}" width="55px" alt="Avatar" style="margin-top: -30px;margin-left: -21px;"></a>
        @endif
      <img src="{{asset("avatar.png")}}" width="55px" alt="Avatar" style="margin-top: -30px;margin-left: 15px;">
      <div>
        <p> Chatting with {{ $receiver->name }} </p>
        <small>Online</small>
      </div>
    </div>

    <!-- Chat -->

    <div class="messages">
    @include('receive', ['message' => " "])

      @foreach ($messages as $message)
        @if($message->sender == $sender) 
          @include('broadcast', ['message' => "$message->message"])
        @else
          @include('receive', ['message' => "$message->message"])
        @endif
      @endforeach
    </div>

    <div class="bottom">
      <form>
        <input type="text" id="message" name="message" placeholder="Enter message..." autocomplete="off">
        <button type="submit"></button>
      </form>
    </div>
    
  </div>
  
</body>

<script>

  //Receive messages
  // Pusher.logToConsole = true;
  
  var pusher = new Pusher('{{ config('broadcasting.connections.pusher.key') }}', {cluster: 'eu'});
  const channel = pusher.subscribe('chat{{auth()->user()->id}}');

  console.log("User Auth value :" + {{auth()->user()->id}} );

  // Receive messages
  channel.bind('chatMessage', function (data) 
  {
      let jsonMsg = data.message;

      let senderMessage = `
        <div class="left message">
            <img src="{{asset("avatar.png")}}" alt="Avatar">
            <p>` + jsonMsg + `</p>
        </div>`;
        
      $(".messages > .message").last().after(senderMessage);
      $("form #message").val('');
      $(document).scrollTop($(document).height());
  });

  //Broadcast messages
  $("form").submit(function (event) {
    event.preventDefault();

    $.ajax({
      url: "/jobs/chat/{{ $receiver->id }}/process",
      method: 'POST',
      headers: {
        'X-Socket-Id': pusher.connection.socket_id
      },
      data: {
        _token: '{{csrf_token()}}',
        message: $("form #message").val(),
      }
    }).done(function (res) 
    {
        let senderMessage = `
        <div class="right message">
            <p>` + $("form #message").val() + `</p>
            <img src="{{asset("avatar.png")}}" alt="Avatar">
        </div>`;

        $(".messages > .message").last().after(senderMessage);
        $("form #message").val('');
        $(document).scrollTop($(document).height());
    });
  });
  
</script>


</html>

