import React from 'react'
import PageHeading from '../components/sections/pageHeading'
import ProjectArticle from '../components/sections/projectArticle'
import { ScrollRestoration, useParams } from 'react-router-dom'
import Portfolio2 from '../components/sections/portfolio2'
// useParams

const SingleProject = () => {
    const {client} = useParams()
    console.log(client)
    return (
        <>
        
            <ProjectArticle params={client}/>
            {/* <PageHeading
                heading={"A Branch with Flowers"}
                description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit utsadi sfejdis aliquam, purus sit amet luctus venenatis, lectus magna sansit trandis fringilla urna, porttitor rhoncus dolor purus non enim dollors praesent tabasi elementum facilisis leo."}
            /> */}
            <Portfolio2 />
            <ScrollRestoration/>
        </>
    )
}

export default SingleProject