	** Final Project - planning notes **
	
* Project brief
	
	* **Build a full-stack application** by making your own backend and your own front-end
	* **Have an API of your design**
	* **Have an interactive front-end**, preferably using a modern front-end framework
	* **Be a complete product**, which most likely means multiple relationships and CRUD functionality for at least a couple of models
	* **Use a database**, whether that's one we've covered in class or one you want to learn
	* **Implement thoughtful user stories** that are significant enough to help you know which features to build and which to scrap
	* **Have a visually impressive design** to kick your portfolio up a notch and have something to wow future clients & employers
	* **Be deployed online** so it's publicly accessible


* Proposed project
	
	* **Real-time feedback site for writers**
	* My goal is to develop a tool for writers to obtain real-time feedback on their work
	* This will take the form of a website where authors can write 'live' into a text input field, which will save and post at set intervals. 
	* Authors can choose whether their work remains in draft form (and not be subject to written feedback) or to make it live. If this works, authors should still be able to revert to draft status at any time.
	* Other authors can then post feedback on draft versions (with a like tick/star), or the live version where they will be able to comment in real-time (using websockets).
	* Authors can see feedback which other authors have given on their work, they can choose whether to keep onto this feedback (which could be used in support of publisher queries etc) or to delete a comment.
	* Authors should only be able to comment on the work of other authors if they themselves have uploaded work of their own.



* User stories

	* **Author 1 - contributing author**
	* The contributing author might register on the site with the intention of posting their work. 
	* Following registration/login the author can add a 'new story' or other piece of creative writing.
	* Alternatively the author may wish to edit an existing story.
	* The author will then be able to add content to the live text editor, which will auto-save periodically. Drop-down at top of the story allows author to select a genre for the story
	* The default setting will be 'draft'. The author can decide, if they are comfortable with receiving feedback on their work, to make the piece live.
	* If the author does decide to make their story live they will have freedom to choose whether or not they keep any feedback received. Comments which they disagree with, or are otherwise unhappy with, can be deleted. Positive feedback can be retained.
	* Could potentially include a random word generator (like Wordnik's API) which will give random words to help in event of writer's block

	* **Author 2 - reviewing author**
	* Review on the site is on a 'peer-review'basis.
	* Reviewing authors must have posted work of their own before they can comment on the work of other authors
	* Having logged in as above, the author will have an option to 'browse' other author stories
	* Depending on the status of a particular story (as set by contributing author) the reviewing author can provide feedback either in the form of a 'like', or a more substantive comment. (any feedback given should be kept constructive).
	


	
* **MVP**
	* **Authentication** authors have to register/login in order to comment on other writer's work

	* **Separate models for author, story and comment**
	* **Draft/live status selector** giving the author the choice of whether their work should be open for in-depth feedback, or just to be 'liked'
	* **User home-page** displays accordion with author's own stories, together with a smaller side-panel showing recently browsed stories. Image uploader for user avatar to stop the site being too text heavy
	* **Real-time text editor**, for new stories or existing ones, which updates and saves at regular intervals, to be viewed by other authors. Sockets should be used for the regular updating, this will need to be in app.js (backend?) and could be developed as suggested at http://robdodson.me/building-a-countdown-timer-with-socket-dot-io/
	* **'Browse'/comment functionality** allowing an author who has logged-in to browse recently uploaded stories and provide feedback in the form of a like or, using sockets, actual comments
	* **Styling** Add bootstrap, minimal styling but clean

* **Nice to have**
	* Additional authentication - oauth with Facebook, twitter etc
	* Author response functionality - authors can respond to feedback from others?
	* Author 'status' info - how many likes they have received, how many comments made, how many story contributions they have added
	* Saving functionality for stories - can they be saved other than on-screen? (eg, conversion to pdf), can authors upload a story in, eg word format and work on it from there?
	* Customizable timer - authors can set intervals for story updates (eg may want 1 minute, or 10), may want to pause timer (if unhappy with state of changes as update point approaches)
	* Browsing functionality - options for filtering stories by, eg, genre, most recently updated etc, pagination to cycle through stories. Search functionality? (similar lines to search fields from Sinatra project?)
	* Incorporate Wordnik API to generate a random word for inspiration
	
	
* **Technology to use**

	* MEAN stack, angular for front-end, node for back-end, with Express and MongoDB/Mongoose for data
	* Web-sockets for live feedback functionality (sockets.io)
	* Embedded text editor - build this or use 3rd party API/plugin?
	* Image uploader for user Avatars etc
	* Authentication - potentially use Oauth for Facebook authentication depending on MVP. Definitely use JWT.
	* Bootstrap and SASS for styling
	* 3rd party links/apis? Google books for searching, Amazon self-publishing, Indiegogo for crowdfunding?
	* WYSIWYG text editor, eg jQuery text editor? Probably not
	
* **Project structure**

* **Backend/API**	
	* Config/routes.j | seeds.js
	* Controllers/authors.js | stories.js | comments.js
	* Models/Author.js | Story.js | Comment.js
	* App.js
	* Package.json

* **Frontend**
	* CSS & SASS/ app.css etc
	* JS
		* Controllers/authors.js | stories.js | comments.js
		* Models/Author.js | Story.js | Comment.js
		* Services/Token.js
		* Vendors/angular | angular.jwt | angular.resource
		* bowerrc/bower.json
		* Index.html | Additional html partials

* **HTML partials**
	* Index/home - show/hide forms for log-in and register
	* Author-home - showing profile and index of author's own stories, together with comments on them. Comments can be deleted but only by the author of the story to which they relate.
	* Story-browse/home (with index/show etc)
	
	 

* Project models
	
	Author
	
	Username,
	Email address,
	avatar,
	password,
	password confirmation,
	bio,
	has many comments [], 
	has many stories []
	
	Use < form ngIf="author: stories.length > 0"> As a basis for setting whether an author is able to comment on the work of others. The author's stories will take the form of an array, if the array for that author is empty the autor will not be able to add comments for other authors. 
	
	
	Story
	Belongs to one author,
	genre,
	text/content,
	has many comments,
	rating stars? No scoring system, just as likes on newspaper btl
	
	Comments
	text/content,
	Belongs to one author,
	Belongs to one story (and to another author through the story)# Final-project
