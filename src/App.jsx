import { useCallback, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import { siteData } from './data/siteData.js'
import { Intro, markIntroSeen, shouldShowIntro } from './components/Intro.jsx'
import { Header } from './components/Header.jsx'
import { Hero } from './components/Hero.jsx'
import { Inventory } from './components/inventory/Inventory.jsx'
import { VehicleModal } from './components/inventory/VehicleModal.jsx'
import { FeaturedVehicle } from './components/FeaturedVehicle.jsx'
import { SellTrade } from './components/SellTrade.jsx'
import { About } from './components/About.jsx'
import { Testimonials } from './components/Testimonials.jsx'
import { CtaBand } from './components/CtaBand.jsx'
import { Contact } from './components/Contact.jsx'
import { Footer } from './components/Footer.jsx'
import { WhatsAppFloat } from './components/WhatsAppFloat.jsx'
import { PrivacyDialog } from './components/PrivacyDialog.jsx'

export default function App() {
  const [introVisible, setIntroVisible] = useState(shouldShowIntro)
  const [selected, setSelected] = useState(null)
  const [privacyOpen, setPrivacyOpen] = useState(false)

  const finishIntro = useCallback(() => {
    markIntroSeen()
    setIntroVisible(false)
  }, [])

  const closeVehicle = useCallback(() => setSelected(null), [])
  const closePrivacy = useCallback(() => setPrivacyOpen(false), [])

  return (
    // reducedMotion="user": respeita a opção "reduzir movimento" do aparelho
    <MotionConfig reducedMotion="user">
      <a href="#conteudo" className="skip-link">
        {siteData.ui.skipToContent}
      </a>

      <Header />

      <main id="conteudo">
        <Hero ready={!introVisible} />
        <Inventory onOpen={setSelected} />
        <FeaturedVehicle onOpen={setSelected} />
        <SellTrade />
        <About />
        <Testimonials />
        <CtaBand />
        <Contact />
      </main>

      <Footer onPrivacy={() => setPrivacyOpen(true)} />
      <WhatsAppFloat visible={!introVisible && !selected} />

      <AnimatePresence>
        {selected && <VehicleModal key={selected.id} vehicle={selected} onClose={closeVehicle} />}
      </AnimatePresence>

      <AnimatePresence>{privacyOpen && <PrivacyDialog key="privacidade" onClose={closePrivacy} />}</AnimatePresence>

      <AnimatePresence>{introVisible && <Intro key="intro" onDone={finishIntro} />}</AnimatePresence>
    </MotionConfig>
  )
}
