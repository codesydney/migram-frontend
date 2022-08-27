# Migram

## About the Project

Migram is an acronym for Migrant Marketplace. It will help immigrants of refugee-background to generate some income by providing low-skilled work to the local community.

# Contributors

=======

## Contributors

Thank you to our contributors.

- [seqprav](https://github.com/seqprav) - Technical Team Lead
- [s-sindinovic](https://github.com/s-sinadinovic) - Frontend Lead Developer
- [engramar](https://github.com/engramar) - Project Coordinator
- [LillianLuzinsky](https://github.com/LillianLuzinsky) - UI/UX Designer
- [rpgarde](https://github.com/rpgarde) - Frontend Developer
- [HDKHALILI](https://github.com/HDKHALILI) - Frontend Developer
- [ettienekorayyi](https://github.com/ettienekorayyi) - Frontend Developer
- [davidtaing](https://github.com/davidtaing) - Frontend Developer

# Project MIGRAM (Migrant Marketplace)

# A. Lean Canvas

## 1. Project Background

IMS approached Code.Sydney early 2021 to consider building a marketplace app to help migrants of refugee background to get involved in the local community by offering low-skilled work under the supervision of IMS.

## 2. Customer Segments

- Service Providers will be mainly migrants of refugee background.
- End customers will be the local community around Wollongong and surrounds.
- Estimated customer size for both segments is quite low at the start, most likely less than 30.

## 3. Problem Statement

Many migrants of refugee background are having difficulty integrating to the society. Apart from language barriers, the local community needs to be more embracing of them being part of the local community.

## 4. Solution

One area to engage local community to help migrants of refugee background to integrate to the society is by introducing a marketplace app. IMS perceives the benefit of the app is two-fold, to get migrants of refugee background get involved in the community more and at the same time giving them some source of livelihood.

## 5. Key Metrics

### Growth metrics

- No. of Customer Signups
- % Customer Signup to First Task conversion

### Ongoing marketplace health metrics

- No. of Tasks per provider (ensuring an even spread of tasks)
- % Task assignment rate (% of tasks that get offers)
- % Task fulfillment rate (% of tasks requested that end up getting completed)
- % Customer Retention (% of customers that end up using Migram more than once)
- % Provider Retention (% of providers that end up using Migram more than once)

## 6. Unique Value Proposition

- Unlike larger task marketplaces like Airtasker which has a provider service fee of 10-20% ([link here](https://support.airtasker.com/hc/en-au/articles/200294499-What-is-the-service-fee)), Migram does not charge a service fee to providers.

- This maximises provider earnings, while also incentivising customers to support the local migrant community, knowing every $ they put in goes straight to the providers.

## 7. Unfair Advantage

- Unlike other apps which are mostly self-served, Migram will be a supervised app meaning there will be some sort of handholding by IMS to ensure the benefit of the app is realised.

## 8. Marketing Channels

- Local marketing (local community board, mail marketing, etc)
- Digital marketing (social media, etc)

## 9. Cost Structure

- Frontend hosting fee - Vercel ($5/month)
- Backend hosting fee - Heroku ($9/month)
- Cloudinary (Free tier)
- EmailJS (Free tier)

## 10. Revenue Streams

- TBA with IMS

## 11. User Acceptance Testing

We want to ensure that the app fits IMS's needs, as outlined in [Summary of Beta Version Success Criteria](#beta-success). User Acceptance Testing methodology TBD with IMS, but can come in the form of any of the following:

- **Lower involvement:** Code.Sydney sends IMS a list of UAT success criteria, and IMS fills it out before a set date. IMS can attend weekly meetings with Code.Sydney to discuss feedback
- **Higher involvement:** Live user interviews where an IMS rep goes through the features as facilitated by Code.Sydney, and we discuss live

Timelines:

- 31st Jan - Delivery of UAT version to IMS
- 20th Feb - UAT Success Criteria Definition
- 24th Feb - UAT Handover meeting
- 17th Mar - UAT Conclusion
- 1st Apr - Soft Launch

UAT Success Criteria per User Persona:
Note - we have split each UAT Criteria into a Github Issue [here](https://github.com/codesydney/migram-frontend/issues?q=is%3Aopen+label%3A%22uat+%3Atest_tube%3A%22+sort%3Acreated-asc)
<br/>
You can also watch the demo videos of the end-to-end process [here](https://youtube.com/playlist?list=PLrmj6oeKMLjHK_njjssfFAZ4ZuzY6bko_)
ID | User Persona | Test Case | Pass/Fail/Conditional |
|:--|:--|:--|:--|
UAT-1 | Customer | User is able to sign up | To do |
UAT-2 | Customer | User is able to sign in and sign out | To do |
UAT-3 | Customer | User can become a Customer | To do |
UAT-4 | Customer | User is able to add a card (Test Card: 4242 4242 4242 4242 04/24 242) | To do |
UAT-5 | Customer | User can post a Job (Input job field descriptions/images) | To do
UAT-6 | Customer | User is able to see and accept service providers offers for the job posted | To do
UAT-7 | Customer | User should be able to release payment after the actual job is done and marked as completed by the service provider | To do |
UAT-8 | Service Provider | User is able to sign up | To do |
UAT-9 | Service Provider | User is able to sign in and sign out | To do |
UAT-10 | Service Provider | User can become a Service Provider (It will redirect to Stripe website to enrol) with IMS handholding | To do |
UAT-11 | Service Provider | User can browse posted tasks by the customer and make an offer | To do |
UAT-12 | Service Provider | User can mark the task as completed after the actual job is done | To do |
UAT-13 | IMS Staff | User is able to sign up | To do |
UAT-14 | IMS Staff | User is able to sign in and sign out | To do |

## 12. Pre-production deployment

- Identify roles/responsibilities of IMS as well Code.Sydney support team in terms operations
- Infrastructure is already set up (stripe/hosting/domain/etc)
- Agreement of both parties to go live (i.e. soft launch)
- Stripe admin portal (provision of training by Praveen)
- Handling of customer issues, application issues. Ensure proper escalation channel/process is defined depending on the case type (either tech/process). Note: The team to confirm if additional feature is needed in the future.

## 13. Production deployment (Soft launch)

| Date            | Who                 | What                                                                | Status |
| :-------------- | :------------------ | :------------------------------------------------------------------ | :----- |
| 9-10 July 2022  | Engramar            | Prepare high level presentation for app users                       | To do  |
| 11-17 July 2022 | Engramar/Sam/Moises | Finalise Stage 1 version                                            | To do  |
| 18-24 July 2022 | Engramar/Sam/Moises | Onboard service providers and do dry run using controlled customers | To do  |
| 25-31 July 2022 | Engramar/Sam/Moises | Onboard first paying customers                                      | To do  |

## 14. Production deployment (Actual launch)

- Go Live (Standby support requirement?)

## 15. Post Production Activities

- After Go Live catch up (i.e. regular meeting schedule?)
- Backend monitoring and potential reporting by Code.Sydney (Paolo is interested to take this onboard)
- Support service requests handling
- User interviews (feedback)
- Future enhancements (app/processes)

# B. Project Status as of 20 February 2022

<a name="beta-success"/>

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
