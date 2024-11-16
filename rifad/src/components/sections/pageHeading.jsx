import React from 'react'


const PageHeading = ({heading, description, style}) => {
    return (
        <section className={style}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-12">
                        <h2>{heading}</h2>
                        <p>{description}</p>
                    </div>
                </div>
             
            </div>
        </section>
    )
}

export default PageHeading