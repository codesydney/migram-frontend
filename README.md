# Migram

## About the Project
Migram is an acronym for Migrant Marketplace. It will help immigrants of refugee-background to generate some income by providing low-skilled work to the local community.  

# Project MIGRAM (Migrant Marketplace)
# A. Lean Canvas
## 1. Project Background
IMS approached Code.Sydney early 2021 to consider building a marketplace app to help migrants of refugee background to get involved in the local community by offering low-skilled work under the supervision of IMS.  

## 2. Customer Segments
* Service Providers will be mainly migrants of refugee background. 
* End customers will be the local community around Wollongong and surrounds. 
* Estimated customer size for both segments?

## 3. Problem Statement
Many migrants of refugee background are having difficulty integrating to the society. Apart from language barriers, the local community needs to be more embracing of them being part of the local community.  

## 4. Solution 
One area to engage local community to help migrants of refugee background to integrate to the society is by introducing a marketplace app. IMS perceives the benefit of the app is two-fold, to get migrants of refugee background get involved in the community more and at the same time giving them some source of livelihood.  

## 5. Key Metrics

### Growth metrics
* No. of Customer Signups 
* % Customer Signup to First Task conversion

### Ongoing marketplace health metrics
* No. of Tasks per provider (ensuring an even spread of tasks)
* % Task assignment rate (% of tasks that get offers) 
* % Task fulfillment rate (% of tasks requested that end up getting completed) 
* % Customer Retention (% of customers that end up using Migram more than once) 
* % Provider Retention (% of providers that end up using Migram more than once) 

## 6. Unique Value Proposition 
* Unlike larger task marketplaces like Airtasker which has a provider service fee of 10-20% ([link here](https://support.airtasker.com/hc/en-au/articles/200294499-What-is-the-service-fee)), Migram does not charge a service fee to providers. 

* This maximises provider earnings, while also incentivising customers to support the local migrant community, knowing every $ they put in goes straight to the providers. 

## 7. Unfair Advantage 
* Unlike other apps which are mostly self-served, Migram will be a supervised app meaning there will be some sort of handholding by IMS to ensure the benefit of the app is realised.  

## 8. Marketing Channels
* Local marketing (local community board, mail marketing, etc) 
* Digital marketing (social media, etc)

## 9. Cost Structure 
* Frontend hosting fee - Vercel ($5/month)
* Backend hosting fee - Heroku ($9/month)
* Cloudinary (Free tier)
* EmailJS (Free tier)

## 10. Revenue Streams
* TBA with IMS 

## 11. User Acceptance Testing
* 31st Jan - ETA delivery to IMS
* 31st Jan - UAT Test Cases Success Criteria Feedback Form
* 3rd Feb - UAT Handover Meeting 
* 24th Feb - UAT Conclusion

## 12. Pre-production deployment
* Identify roles/responsibilities of IMS as well Code.Sydney support team in terms operations  
* Infrastructure is already set up (stripe/hosting/domain/etc)
* Agreement of both parties to go live (i.e. soft launch) 
* Stripe admin portal (provision of training by Praveen) 
* Handling of customer issues, application issues. Ensure proper escalation channel/process is defined depending on the case type (either tech/process). Note: The team to confirm if additional feature is needed in the future.    

## 13. Production deployment (Soft launch)
* Soft launch - Sanity testing
* One week of internal testing in production to identify gaps

## 14. Production deployment (Actual launch)
* Go Live (Standby support requirement?)

## 15. Post Production Activities
* After Go Live catch up (i.e. regular meeting schedule?)
* Backend monitoring and potential reporting by Code.Sydney (Paolo is interested to take this onboard)
* Support service requests handling
* User interviews (feedback)
* Future enhancements (app/processes)

<br/>
# B. Project Status as of 6 January 2022

# Summary of Beta Version Success Criteria

* [Ready for Demo] Success Criteria 1 Customer sign up / sign in / profile update
* [Ready for Demo] Success Criteria 2 Service provider sign up / sign in / profile update
* [Ready for Demo] Success Criteria 3 Customer job posting 
* [Ready for Demo] Success Criteria 4 Service provider offers
* [Ready for Demo] Success Criteria 5 Customer job discussion/acceptance/cancellation 
* [Ready for Demo] Success Criteria 6 Job provider job discussion/acceptance/cancellation
* [Ready for Demo] Success Criteria 7 Customer payment 
* [Ready for Demo] Success Criteria 8 Service provider payment receipt
* [Ready for Demo] Success Criteria 9 Customer job completion/cancellation/feedback
* [Ready for Demo] Success Criteria 10 Service provider job completion/cancellation/feedback

# Project Schedule

<h5> Thu 7/10 </h5>
- [Completed] BE: Accept offer functionality <br/>
- [Completed] FE: Image upload and revised task creation<br/>
<h5> Thu 14/10 </h5>
- [Completed] BE: Email functionality - e.g. on offer acceptance<br/>
- [Completed] FE: View all open tasks and select single task (dashboard)<br/>
<h5> Thu 21/10 </h5>
- [Completed] BE: Release payment [Completed] <br/>
- [Completed] FE: Functionality for customers to accept an offer<br/>
<h5> Thu 28/10 </h5>
- [Completed] BE: Hooks to update task status when payment has been received in provider's bank account<br/>
- [Completed] FE: Task management features, i.e. mark task as completed<br/>
<h5> Thu 4/11 </h5>
- [Completed] BE: Hooks to send email notification hen payment has been received in provider's bank account<br/>
- [Completed] FE: Handle payment from the customer<br/>
<h5> Thu 11/11 </h5>
- [Completed] Last few code tweaks and internal testing and fixes: The team member start internal testing and reporting bugs or provide feedback. Devs start working on the fixes as and when they see issues logged in Github Issue board. <br/>
<h5> Thu 16/12 </h5>
- [Completed] MVP Demo<br/>

<br/>
<br/>
<br/>
<br/>

![migram](https://user-images.githubusercontent.com/7553347/123510617-ed1b0280-d6bf-11eb-849d-fd5dd996ce3a.png)
