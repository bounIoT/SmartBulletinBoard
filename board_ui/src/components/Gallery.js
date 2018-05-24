import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite/no-important';
import Lightbox from 'react-images';
import Websocket from 'react-websocket';

class Gallery extends Component {
	constructor () {
		super();

		this.state = {
			lightboxIsOpen: false,
			currentImage: 0,
		};


		this.closeLightbox = this.closeLightbox.bind(this);
		this.gotoNext = this.gotoNext.bind(this);
		this.gotoPrevious = this.gotoPrevious.bind(this);
		this.gotoImage = this.gotoImage.bind(this);
		this.handleClickImage = this.handleClickImage.bind(this);
		this.openLightbox = this.openLightbox.bind(this);
		this.updateImageStats = this.updateImageStats.bind(this);

	}
    handleData(data) {
        let result = data;
        if(result==='geldi' && !this.state.lightboxIsOpen){
        	this.openLightbox(0,null);
			this.updateImageStats(0);
		}else if(result==='gitti' && this.state.lightboxIsOpen){
        	this.closeLightbox()
			this.props.handler()

		}else if(result==='right'){
			if(this.state.currentImage===this.props.images.length -1){

			}else{
                this.gotoNext()
                this.updateImageStats(this.state.currentImage)
			}

		}else if(result==='left'){

			if(this.state.currentImage===0){

			}else{
                this.gotoPrevious()
				this.updateImageStats(this.state.currentImage)
			}


		}
    }

    updateImageStats(index){
		console.log("updating index " + index);
		console.log(this.props.images[index].caption)
        fetch('https://cors-anywhere.herokuapp.com/https://hands-on-3.eu-gb.mybluemix.net/increment_ad_seen', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ad_name: this.props.images[index].caption,
                amount: 1,
            })
        }).then(data=>console.log(data))
	}

	openLightbox (index, event) {
		if(event){
            event.preventDefault();
		}

		this.setState({
			currentImage: index,
			lightboxIsOpen: true,
		});
	}
	closeLightbox () {
		this.setState({
			currentImage: 0,
			lightboxIsOpen: false,
		});
	}
	gotoPrevious () {
		this.setState({
			currentImage: this.state.currentImage - 1,
		});
	}
	gotoNext () {
		this.setState({
			currentImage: this.state.currentImage + 1,
		});
	}
	gotoImage (index) {
		this.setState({
			currentImage: index,
		});
	}
	handleClickImage () {
		if (this.state.currentImage === this.props.images.length - 1) return;

		this.gotoNext();
	}
	renderGallery () {
		const { images } = this.props;

		if (!images) return;

		const gallery = images.filter(i => i.useForDemo).map((obj, i) => {
			return (
				<a
					href={obj.src}
					className={css(classes.thumbnail, classes[obj.orientation])}
					key={i}
					onClick={(e) => this.openLightbox(i, e)}
				>
					<img src={obj.thumbnail} className={css(classes.source)} />

				</a>
			);
		});

		return (
			<div className={css(classes.gallery)}>
				{gallery}
			</div>
		);
	}
	render () {
		return (
			<div className="section">
				{this.props.heading && <h2>{this.props.heading}</h2>}
				{this.props.subheading && <p>{this.props.subheading}</p>}
				{this.renderGallery()}
				<Lightbox
					currentImage={this.state.currentImage}
					images={this.props.images}
					isOpen={this.state.lightboxIsOpen}
					onClickImage={this.handleClickImage}
					onClickNext={this.gotoNext}
					onClickPrev={this.gotoPrevious}
					onClickThumbnail={this.gotoImage}
					onClose={this.closeLightbox}
					preventScroll={this.props.preventScroll}
					showThumbnails={this.props.showThumbnails}
					spinner={this.props.spinner}
					spinnerColor={this.props.spinnerColor}
					spinnerSize={this.props.spinnerSize}
					theme={this.props.theme}
				/>
				<Websocket url='ws://localhost:1880/public/message'
						   onMessage={this.handleData.bind(this)}/>
			</div>

		);
	}
}

Gallery.displayName = 'Gallery';
Gallery.propTypes = {
	heading: PropTypes.string,
	images: PropTypes.array,
	showThumbnails: PropTypes.bool,
	subheading: PropTypes.string,
};

const gutter = {
	small: 2,
	large: 4,
};
const classes = StyleSheet.create({
	gallery: {
		marginRight: -gutter.small,
		overflow: 'hidden',

		'@media (min-width: 500px)': {
			marginRight: -gutter.large,
		},
	},

	// anchor
	thumbnail: {
		boxSizing: 'border-box',
		display: 'block',
		float: 'left',
		lineHeight: 0,
		paddingRight: gutter.small,
		paddingBottom: gutter.small,
		paddingLeft: '100px',
		overflow: 'hidden',

		'@media (min-width: 500px)': {
			paddingRight: gutter.small,

			paddingBottom: '50px',
		},
	},

	// orientation
	landscape: {
		width: '30%',
	},
	square: {
		paddingBottom: 0,
		width: '40%',

		'@media (min-width: 500px)': {
			paddingBottom: 0,
		},
	},

	// actual <img />
	source: {
		border: 0,
		display: 'block',
		height: '550px',

		maxWidth: '300%',
		width: '450px',
	},
});

export default Gallery;
