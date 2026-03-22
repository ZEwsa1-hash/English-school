import { Hero } from '@/components/sections/Hero'
import { Benefits } from '@/components/sections/Benefits'
import { Features } from '@/components/sections/Features'
import { Courses } from '@/components/sections/Courses'
import { LevelCta } from '@/components/sections/LevelCta'
import { Reviews } from '@/components/sections/Reviews'
import { VideoSection } from '@/components/sections/VideoSection'
import { Faq } from '@/components/sections/Faq'
import { ContactSection } from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <main>
      <Hero />
      <Benefits />
      <Features />
      <Courses />
      <LevelCta />
      <Reviews />
      <VideoSection />
      <Faq />
      <ContactSection />
    </main>
  )
}
