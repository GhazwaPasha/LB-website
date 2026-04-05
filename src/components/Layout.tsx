import { Header } from './Header'
import { Footer } from './Footer'
import { AnimatedOutlet } from './AnimatedOutlet'
import { ScrollToTop } from './ScrollToTop'

export function Layout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <AnimatedOutlet />
      <Footer />
    </>
  )
}
