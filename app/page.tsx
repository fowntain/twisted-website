"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowDown, ArrowRight, Github, Twitter, Youtube, Play, Pause, X, Film } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isTrailerMode, setIsTrailerMode] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const descriptionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      const progress = Math.min(scrollPosition / (windowHeight * 0.7), 1)
      setScrollProgress(progress)

      if (scrollPosition > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const all = Array.from(document.querySelectorAll('.animate-on-scroll'));
          const idx = all.indexOf(el);
          const delay = Math.min(idx * 50, 300) + 100;
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add('animate-in');
          observer.unobserve(el);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [])

  const scrollToDescription = () => {
    descriptionRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const toggleTrailerMode = () => {
    setIsTrailerMode(!isTrailerMode)
    if (!isTrailerMode) {
      if (videoRef.current) {
        videoRef.current.muted = false
        videoRef.current.currentTime = 0
        videoRef.current.play()
      }
      setIsPlaying(true)
    } else {
      if (videoRef.current) {
        videoRef.current.muted = true
      }
    }
  }

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      <section
        ref={heroRef}
        className="relative h-[110vh] flex items-center"
        style={{
          transform: `translateY(${scrollProgress * -10}vh)`,
          zIndex: 10,
        }}
      >
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-black/70 z-10 transition-opacity duration-500"
            style={{ opacity: isTrailerMode ? 0 : 0.7 }}
          />
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted={!isTrailerMode}
            playsInline
            src="/trailer_cut.mp4"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        <div
          ref={heroContentRef}
          className="container mx-auto px-6 z-10 relative transition-opacity duration-500"
          style={{
            opacity: isTrailerMode ? 0 : 1 - scrollProgress,
            transform: `translateY(${scrollProgress * 50}px)`,
          }}
        >
          <h1 className="text-8xl md:text-9xl font-extrabold tracking-tighter bg-gradient-to-r from-purple-400 via-blue-300 to-purple-500 text-transparent bg-clip-text">
            TWISTED
          </h1>
          <p className="mt-4 text-xl md:text-2xl max-w-md text-gray-300">The next-gen storm chasing experience.</p>

          <div className="mt-12 flex items-center gap-6">
            <button
              onClick={scrollToDescription}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
            >
              <span>Discover More</span>
              <ArrowDown className="animate-bounce" />
            </button>
            <Link
              href="https://www.roblox.com/games/6161235818/Twisted-BETA"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
            >
              <span>Play Now</span>
              <ArrowRight />
            </Link>
          </div>
        </div>

        <div className="absolute top-8 right-8 z-20 flex gap-4">
          {!isTrailerMode ? (
            <button
              onClick={toggleTrailerMode}
              className="flex items-center gap-2 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-full transition-all duration-300"
            >
              <Film size={20} />
              <span>Watch Trailer</span>
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={toggleTrailerMode}
                className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
              >
                <X size={20} />
              </button>
              <button
                onClick={togglePlayPause}
                className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
            </div>
          )}
        </div>
      </section>

      <section
        ref={descriptionRef}
        className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black py-24"
        style={{
          zIndex: 20,
          marginTop: "-10vh", 
        }}
      >
        <div className="container mx-auto px-6 pt-36">
          {" "}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-on-scroll opacity-0 translate-y-8 bg-gradient-to-r from-purple-400 via-blue-300 to-purple-500 text-transparent bg-clip-text">
                About Twisted
              </h2>
              <p className="text-gray-300 mb-8 text-lg animate-on-scroll opacity-0 translate-y-8">
                Twisted is an exhilarating Roblox experience that puts you in the heart of tornado alley in the
                fictional state of Keysota. Chase, track, and witness the raw power of tornadoes as they tear across the
                landscape.
              </p>
              <p className="text-gray-300 mb-8 text-lg animate-on-scroll opacity-0 translate-y-8">
                Team up with friends or venture alone as a storm chaser, using your radar and your wits to
                predict tornado paths, capture the perfect footage, and gather the all-important data. Will you stay at a safe distance, or risk it all
                to get the perfect shot?
              </p>

              <div className="flex gap-6 mb-8 animate-on-scroll opacity-0 translate-y-8">
                <Link href="https://twitter.com/Twisted_RBX" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter size={24} />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="https://youtube.com/@TwistedRoblox" className="text-gray-400 hover:text-white transition-colors">
                  <Youtube size={24} />
                  <span className="sr-only">YouTube</span>
                </Link>
              </div>

              <Link
                href="https://www.roblox.com/games/6161235818/Twisted-BETA"
                className="inline-block bg-gradient-to-r from-purple-600 to-blue-300 hover:from-purple-700 hover:to-blue-400 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 animate-on-scroll opacity-0 translate-y-8"
              >
                Play Now
              </Link>
            </div>

            <div className="relative animate-on-scroll opacity-0 translate-y-8">
              <div className="relative bg-gray-900 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-300 text-transparent bg-clip-text">
                  Game Features
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span>Realistic tornado physics and weather systems</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span>Explore the vast open world of Keysota state</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span>Advanced radar simulations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span>Multiplayer storm chasing with friends</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span>Customizable vehicles and equipment</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative min-h-screen bg-black py-24" style={{ zIndex: 20 }}>
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center animate-on-scroll opacity-0 translate-y-8 bg-gradient-to-r from-purple-400 via-blue-300 to-purple-500 text-transparent bg-clip-text">
            Experience Keysota
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-6 rounded-lg animate-on-scroll opacity-0 translate-y-8">
              <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-blue-300 text-transparent bg-clip-text">
                Dynamic Weather
              </h3>
              <p className="text-gray-300">
                Experience realistic weather patterns that evolve in real-time. From clear skies to supercell
                thunderstorms, the weather in Keysota is always changing.
              </p>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg animate-on-scroll opacity-0 translate-y-8">
              <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-blue-300 text-transparent bg-clip-text">
                Tornado Variety
              </h3>
              <p className="text-gray-300">
                Encounter different types of tornadoes, from small rope twisters to massive EF5 wedge tornadoes that can
                destroy entire towns.
              </p>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg animate-on-scroll opacity-0 translate-y-8">
              <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-blue-300 text-transparent bg-clip-text">
                Vast Landscape
              </h3>
              <p className="text-gray-300">
                Explore the diverse terrain of Keysota, from flat plains perfect for spotting distant storms to hilly
                regions that provide a challenge for storm chasers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative bg-black py-8 border-t border-gray-800" style={{ zIndex: 20 }}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-blue-300 to-purple-500 text-transparent bg-clip-text">
                TWISTED
              </h2>
              <p className="text-gray-400">© {new Date().getFullYear()} Twisted Game. All rights reserved.</p>
            </div>
            <div className="flex gap-6">
              <Link href="https://github.com/fowntain/twisted-website" className="text-gray-400 hover:text-white transition-colors">
                  <Github size={24} />
                  <span className="sr-only">GitHub</span>
                </Link>
              <Link href="https://discord.gg/twisted" className="text-gray-400 hover:text-white transition-colors">
                Discord
              </Link>
              <Link href="https://fowntain.me" className="text-gray-400 hover:text-white transition-colors">
                Made with ❤️ by fowntain
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}