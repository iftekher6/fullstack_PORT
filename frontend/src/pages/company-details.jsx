import React from 'react'
import PageHeading from '../components/sections/pageHeading'
import ProjectArticle from '../components/sections/projectArticle'
import { ScrollRestoration, useParams } from 'react-router-dom'
import jarvis from "../assets/images/client-logos/download.png"
import Portfolio2 from '../components/sections/portfolio2'

const CompanyDetails = () => {
    const {company} = useParams()
    console.log(company)
 
    const companies = {
        google: { name: 'Google', description: 'A search engine giant.' },
        facebook: { name: 'Facebook', description: 'A social media platform.' },
        amazon: { name: 'Amazon', description: 'An e-commerce company.' },
        // Add more companies here
      };
      const eachCompany = companies[company] 
      console.log(companies[company].name)
    return (
        <>
            <PageHeading
                heading={eachCompany.name}
                description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit utsadi sfejdis aliquam, purus sit amet luctus venenatis, lectus magna sansit trandis fringilla urna, porttitor rhoncus dolor purus non enim dollors praesent tabasi elementum facilisis leo."}
                style={"single-page-hero-area"}
            />
            <Portfolio2/>
            <ScrollRestoration/>
        </>
    )
}

export default CompanyDetails