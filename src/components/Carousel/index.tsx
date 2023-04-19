import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { ImageView } from '@components'
import { getImageUri } from '@utils'

type CarouselProps = {
    images: Array<string>,
    isServer?: boolean;
    height?: number | string;
    width?: number | string;
}

function index({ images, isServer = true, ...props }: CarouselProps) {
    return (
        <Carousel autoPlay>
            {
                images.map(item => {
                    return <ImageView {...props} icon={item ? getImageUri(item) : item} />
                })
            }
        </Carousel>
    )
}

export default index