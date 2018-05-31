import http.server as ht
import os, sys, subprocess
from os import curdir, sep

PORT_NUMBER = 8000

#This class handles any incoming request from
#the browser 
class myHandler(ht.BaseHTTPRequestHandler):
	
	#Handler for the GET requests
	def do_GET(self):
		if self.path=="/":
			self.path="/empty-example/main/index.html"

		try:
			#Check the file extension required and
			#set the right mime type

			sendReply = False
			if self.path.endswith(".html"):
				mimetype='text/html'
				sendReply = True
			if self.path.endswith(".png"):
				mimetype='image/png'
				sendReply = True
			if self.path.endswith(".jpg"):
				mimetype='image/jpg'
				sendReply = True
			if self.path.endswith(".gif"):
				mimetype='image/gif'
				sendReply = True
			if self.path.endswith(".js"):
				mimetype='application/javascript'
				sendReply = True
			if self.path.endswith(".css"):
				mimetype='text/css'
				sendReply = True

			if sendReply == True:
				#Open the static file requested and send it
				print(self.path)
				with open(curdir + sep + self.path,'rb') as f: 

					self.send_response(200)
					self.send_header('Content-type',mimetype)
					self.end_headers()
					self.wfile.write(f.read())
			
		except Exception as e:
			print(e)
			self.send_response(400);

		return

try:
	#Create a web server and define the handler to manage the
	#incoming request
	server = ht.HTTPServer(('', PORT_NUMBER), myHandler)
	print ('Started httpserver on port ' , PORT_NUMBER)
	
	#Open the page we are seving in the default browser of the machine
	url = 'http://localhost:' + str(PORT_NUMBER) + '/'
	print(url)
	if sys.platform == 'win64':
		os.startfile(url)
	elif sys.platform=='win32':
		os.startfile(url)
	elif sys.platform=='darwin':
		subprocess.Popen(['open', url])
	else:
		try:
			subprocess.Popen(['xdg-open', url])
		except OSError:
			print('Please open a browser on: '+url)

	#Wait forever for incoming http requests
	server.serve_forever()

except KeyboardInterrupt:
	print ('^C received, shutting down the web server')
	server.socket.close()


