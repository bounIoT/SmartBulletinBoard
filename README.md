
# Smart Bulletin Board

Our cloud service page is alive [here](https://hands-on-3.eu-gb.mybluemix.net/home)  

Smart Bulletin Board is a connected bulletin board that will enable the students and the flier posters to interact with each other, enabling the customers to see the statistics about their advertisements and enabling students to apply for the job advertisements directly. Smart Bulletin Boards will be located in different building in campus and the advertisements will be seen according to where the boards are located in the campus based on the customers preferences.  

Below you can find our poster:

![Project Poster](https://github.com/bounIoT/SmartBulletinBoard/blob/master/documents/Final-report-1pager-template%20.jpg?raw=true)
# Team Members

* A. Emirhan Karagül
* M. Hakan Kurtoğlu
* Barın Özmen  
Our group consists of one 3rd and two 4th grader Computer Engineers. 

## Screenshots of flows can be found inside the relevant directories inside this repository. Other documents can be found under the documents directory.

### Hardware setup
Below you can find the sketch of our hardware setup
![Setup sketch](https://github.com/bounIoT/SmartBulletinBoard/blob/master/documents/pin_connections.jpeg?raw=true)

# Flow of data
Below you can find all the flows and their related codes inside this repository.
## Cloud  

### Student
![Student Flow](https://github.com/bounIoT/SmartBulletinBoard/blob/master/cloud/student/student_flow.png?raw=true)
### Api
![Api Flow](https://github.com/bounIoT/SmartBulletinBoard/blob/master/cloud/api/api_flows.png?raw=true)
### Advertiser
![Advertiser Flow 1](https://raw.githubusercontent.com/bounIoT/SmartBulletinBoard/master/cloud/advertiser/advertiser_flow1.png)
![Advertiser Flow 2](https://raw.githubusercontent.com/bounIoT/SmartBulletinBoard/master/cloud/advertiser/advertiser_flow2.png)
## Pi
![Pi Flow](https://github.com/bounIoT/SmartBulletinBoard/blob/master/node/pi_flow.png?raw=true)

## Board UI
Board UI is implemented using ReactJS. What is done in the board ui is listening to the websocket that is opened in pi's node-red flows and acting according to it. It can be seen under SmartBulletinBoard/board_ui/src/components/Gallery.js what the socket listener does.

![Setup sketch](https://github.com/bounIoT/SmartBulletinBoard/blob/master/documents/pin_connections.jpeg?raw=true)

### Development Environment
* Ubuntu 16.04
* NodeJS v8.6.0
* ReactJS
* Node-Red v0.18.4

### Production Environment
* RASPBIAN STRETCH WITH DESKTOP Kernel 4.14
* NodeJS v6.6.0
* ReactJS
* Node-Red v0.18.4

### Cloud Environment
* MLab MongoDB v3
* IBM IOT boilerplate Node-RED
