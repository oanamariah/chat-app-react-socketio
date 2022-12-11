This project consists of a chat application where users can join a chat room using an id and 
send messages to other users. The messages are sent via a socket.io server. 
A message contains the username of the author, the time it was sent and the information 
itself.
When a new user joins a room, his username and the room id are stored in a local array to verify
the new username's uniqueness. Then in that respective chat, a message from 
the admin is broadcasted to all users announcing the joining of the new user. 
The user can change the room background  (it is changed only for himself), and he can choose from a
predefined list of images and can upload his image from local files.
On the client side, the socket.io client is constantly listening for new messages from users and 
it displays them accordingly. 
There is also an emoji button at the bottom left of the chat window that opens up an emoji window
inside the chat window.
The user can leave the chat, which on the server side it deletes his entry in the users array and 
the admin is sending a message on the chat with the user that left it. 
The application uses routes in order to access the join and chat pages. When an 
inexisting/bad route is trying to be accessed, an error is shown.
 

Errors, Bugs: 
- one bug is that whenever the page is refreshed, the information from the chat disappears, 
meaning the messages are no longer displayed, and the current user is disconnected and connected 
again but without a username and a room to belong to. This is happening because every refresh is 
seen by the socket.io server as a disconnection, so every information is being reset,  including the 
socket id. A solution to this problem would be storing the username information along with the 
socket id and updating the socket id with the new one whenever there is a change in the 
application. 
- when the page is refreshed, the chat background selected from the predefined list is no longer
displayed. This is happening because of the useEffect function that is triggered only when 
there is a change in the selected image. But this problem is not happening with the image 
uploaded from the user because the url of the image is created using a new Blob object which 
differs every refresh. 



Possible improvements: 
- delete messages for everybody: this would require the messages to be indexed the same for 
all users so that every user can know which message was deleted from his list
- redirect messages: find a way to maintain the information of the user that redirected the 
message and the chat that it came from
- reply to messages
- having a list of chat rooms from which the user can choose from
