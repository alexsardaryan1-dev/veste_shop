import Hero from './sections/Hero.jsx'
import Newsletter from './sections/Newsletter.jsx'
import PromoSection from './sections/PromoSection.jsx'
import NewArrivals from './sections/NewArrivals.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <NewArrivals />
      <Newsletter />
      <PromoSection />
    </>
  )
}