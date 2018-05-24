import React, { Component, createElement } from 'react';
import logo from './logo.svg';
import './App.css';
import Gallery from './components/Gallery';
import './example.less';
import Background from './background.jpg';
import Websocket from 'react-websocket';

class App extends Component {
constructor(props) {
    super(props);

    this.state = {
      	pics: [],
		socket: null
    };
    this.newPicsFetcher = this.newPicsFetcher.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this)
  }

    handleData(data) {
        let result = data;
        console.log(result);
    }

    shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    newPicsFetcher(){
        fetch('https://cors-anywhere.herokuapp.com/https://hands-on-3.eu-gb.mybluemix.net/get_ads')
            .then(response => response.json())
            .then((data) => {
                var realpics = data.map(pic=>{
                    pic.id = pic._id,
                        pic.caption= pic.ad_name,
                        pic.orientation = 'landscape',
                        pic.src = pic.adlink,
                        pic.useForDemo=true})
				data = this.shuffleArray(data);
                this.setState({pics:data});
                console.log(data);
            });
	}

  componentWillMount() {
    fetch('https://cors-anywhere.herokuapp.com/https://hands-on-3.eu-gb.mybluemix.net/get_ads')
	.then(response => response.json())
	.then((data) => {
	var realpics = data.map(pic=>{
			pic.id = pic._id,
			pic.caption= pic.ad_name,
			pic.orientation = 'landscape',
			pic.src = pic.adlink,
			pic.useForDemo=true})
	data = this.shuffleArray(data);
	this.setState({pics:data});
	console.log(data);
});
  }
  render() {

    return (
      <div >
		<div style={{ marginBottom: 40, margin:0 }}>
			<h1 className="mainHeader">Welcome to Smart Bulletin Board.</h1>
		</div>


		<Gallery handler={this.newPicsFetcher} style ={{margin:'auto'}} images={this.state.pics.map(({ caption, id, orientation, useForDemo,src }) => ({
			src: src,
			thumbnail: src,
			srcSet: [
				
			],
			caption,
			orientation,
			useForDemo,
		}))} />



	</div>
    );
  }

}
const DEFAULT_IMAGES = [
	{ id: '1470619549108-b85c56fe5be8', caption: 'Photo by Alan Emery', orientation: 'landscape', useForDemo: true }, // https://unsplash.com/photos/SYzUF6XcWBY (Flamingo)
	{ id: '1471079502516-250c19af6928', caption: 'Photo by Jeremy Bishop', orientation: 'landscape', useForDemo: true }, // https://unsplash.com/photos/GIpGxe2_cT4 (Turtle)
	{ id: '1454023492550-5696f8ff10e1', caption: 'Photo by Jessica Weiller', orientation: 'landscape', useForDemo: true }, // https://unsplash.com/photos/LmVSKeDy6EA (Tiger)
	{ id: '1470854989922-5be2f7456d78', caption: 'Photo by Piotr Łaskawski', orientation: 'landscape', useForDemo: true }, // https://unsplash.com/photos/GXMr7BadXQo (Hedgehog)
	{ id: '1470317596697-cbdeda56f999', caption: 'Photo by Michel Bosma', orientation: 'landscape', useForDemo: true }, // https://unsplash.com/photos/XgF9e93Tkt0 (Ladybug)
{ id: '1470619549108-b85c56fe5be8', caption: 'Photo by Alan Emery', orientation: 'landscape', useForDemo: true },
{ id: '1470619549108-b85c56fe5be8', caption: 'Photo by Alan Emery', orientation: 'landscape', useForDemo: true }
];



const theme = {
	// container
	container: {
		background: 'rgba(255, 255, 255, 0.9)',
	},

	// arrows
	arrow: {
		backgroundColor: 'rgba(255, 255, 255, 0.8)',
		fill: '#222',
		opacity: 0.6,
		transition: 'opacity 200ms',

		':hover': {
			opacity: 1,
		},
	},
	arrow__size__medium: {
		borderRadius: 40,
		height: 40,
		marginTop: -20,

		'@media (min-width: 768px)': {
			height: 70,
			padding: 15,
		},
	},
	arrow__direction__left: { marginLeft: 10 },
	arrow__direction__right: { marginRight: 10 },
	close: {
		fill: '#D40000',
		opacity: 0.6,
		transition: 'all 200ms',
		':hover': {
			opacity: 1,
		},
	},

	// footer
	footer: {
		color: 'black',
	},
	footerCount: {
		color: 'rgba(0, 0, 0, 0.6)',
	},

	// thumbnails
	thumbnail: {
	},
	thumbnail__active: {
		boxShadow: '0 0 0 2px #00D8FF',
	},
};
function makeUnsplashSrc (id) {
	return `https://images.unsplash.com/photo-${id}?dpr=2&auto=format&w=1024&h=1024`;
}
function makeUnsplashSrcSet (id, size) {
	return `https://images.unsplash.com/photo-${id}?dpr=2&auto=format&w=${size} ${size}w`;
}
function makeUnsplashThumbnail (id, orientation = 'landscape') {
	const dimensions = orientation === 'square'
		? 'w=300&h=300'
		: 'w=240&h=159';

	return `https://images.unsplash.com/photo-${id}?dpr=2&auto=format&crop=faces&fit=crop&${dimensions}`;
}


export default App;
