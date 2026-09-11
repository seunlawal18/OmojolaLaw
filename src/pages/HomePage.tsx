import React from 'react'
import CinematicHero    from '../components/CinematicHero'
import TrustBar         from '../components/TrustBar'
import IntroSection     from '../components/IntroSection'
import PracticeAreas    from '../components/PracticeAreas'
import WhyChooseUs      from '../components/WhyChooseUs'
import ServiceAreas     from '../components/ServiceAreas'
import AttorneyProfile  from '../components/AttorneyProfile'
import LegalInsights    from '../components/LegalInsights'
import Reviews          from '../components/Reviews'
import FAQ              from '../components/FAQ'
import ConsultationCTA  from '../components/ConsultationCTA'
import Locations        from '../components/Locations'

const HomePage: React.FC = () => (
  <main>
    {/* 1. Cinematic scroll-driven video hero */}
    <CinematicHero />

    {/* 2. Trust indicators */}
    <TrustBar />

    {/* 3. Firm introduction */}
    <IntroSection />

    {/* 4. Practice areas */}
    <PracticeAreas />

    {/* 5. Why choose us */}
    <WhyChooseUs />

    {/* 6. Service areas + practice sub-lists */}
    <ServiceAreas />

    {/* 7. Attorney profile */}
    <AttorneyProfile />

    {/* 8. Legal insights — YouTube video guides */}
    <LegalInsights />

    {/* 9. Client reviews */}
    <Reviews />

    {/* 10. FAQ */}
    <FAQ />

    {/* 11. Consultation CTA + form */}
    <ConsultationCTA />

    {/* 12. Locations + interactive map */}
    <Locations />
  </main>
)

export default HomePage
