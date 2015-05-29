# url2png2s3
An example of how to use url2png service and push the result to s3

The file all.js holds all the configurations required to run this example, please fill in the blanks in that file and run npm install before attempting to run the service.

The server is configured to work on port 3001 by default, after successfully running you should be able to go to localhost:3001 and get a response of "I'm up!"

If all is well, running localhost:3001/capture?url=http://google.com will get you a screenshot of google in your s3 repository
