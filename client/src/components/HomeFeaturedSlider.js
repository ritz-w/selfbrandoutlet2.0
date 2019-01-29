import React from "react";
import Slider from "react-slick";

export default class HomeFeaturedSlider extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            featuredImages: [],
            activeSlide: 0,
            activeSlide2: 0,
          };
    }
    
    renderItems = () => {
        return this.props.featuredImages.map(item => {
            return (
                <div key={`carousel-item-${item._id}`}>
                <img className="carousel-slide" src={item.contextPhoto} alt={item.artist.name} key={item._id} />
                </div>
            )
        })
    }


  render() {
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      beforeChange: (current, next) => {this.setState({ activeSlide: next }, () => this.props.nextSlide(this.state.activeSlide))},
      afterChange: current => this.setState({ activeSlide2: current }),
    };
    return (
      <Slider {...settings}>
        {this.renderItems()}
      </Slider>
    );
  }
}