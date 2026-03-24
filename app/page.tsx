"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [heroEmail, setHeroEmail] = useState("");
  const [ctaEmail, setCtaEmail] = useState("");
  const [heroSuccess, setHeroSuccess] = useState(false);
  const [ctaSuccess, setCtaSuccess] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleSignup = async (type: "hero" | "cta") => {
    const email = type === "hero" ? heroEmail : ctaEmail;

    if (!email || !email.includes("@")) {
      alert("Please enter a valid email.");
      return;
    }

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        if (type === "hero") setHeroSuccess(true);
        if (type === "cta") setCtaSuccess(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {/* NAV */}
      <nav>
        <div className="nav-logo">Bankoma Market</div>
        <ul className="nav-links">
          <li>
            <a href="#designers">For Designers</a>
          </li>
          <li>
            <a href="#how">How It Works</a>
          </li>
        </ul>
        <a href="#waitlist" className="nav-cta">
          Join Waitlist
        </a>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <div>
            <div className="hero-tag">The home of African fashion</div>
            <h1 className="hero-headline">
              African
              <br />
              fashion
              <br />
              deserves
              <br />
              <em>a home.</em>
            </h1>
            <p className="hero-sub">
              Bankoma Market is a curated marketplace for African fashion
              designers — built to celebrate the craft, tell the stories, and
              connect creators with the world.
            </p>
          </div>
          <div className="hero-bottom" id="waitlist">
            <span className="form-label">Request early access</span>
            {!heroSuccess ? (
              <div className="form-row">
                <input
                  className="form-input"
                  type="email"
                  placeholder="your@email.com"
                  value={heroEmail}
                  onChange={(e) => setHeroEmail(e.target.value)}
                />
                <button
                  className="form-btn"
                  onClick={() => handleSignup("hero")}
                >
                  Request Access
                </button>
              </div>
            ) : (
              <div className="success-msg visible">
                ✓ &nbsp; {"You're"} on the list. {"We'll"} be in touch.
              </div>
            )}
            <p className="form-note">Invite only. Limited founding cohort.</p>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-grid-lines"></div>
          <div className="hero-big-b">B</div>
          <div className="hero-right-bottom">
            <span className="hero-right-label">Est. 2026</span>
            <div className="hero-cities">
              <span>Lagos · Accra · Nairobi</span>
              <span>London · New York · Toronto</span>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-track">
          {[...Array(2)].map((_, i) => (
            <span key={i} style={{ display: "flex" }}>
              <span className="ticker-item">African Fashion</span>
              <span className="ticker-item">·</span>
              <span className="ticker-item">Ankara</span>
              <span className="ticker-item">·</span>
              <span className="ticker-item">Kente</span>
              <span className="ticker-item">·</span>
              <span className="ticker-item">Aso-Oke</span>
              <span className="ticker-item">·</span>
              <span className="ticker-item">Adire</span>
              <span className="ticker-item">·</span>
              <span className="ticker-item">Kanga</span>
              <span className="ticker-item">·</span>
              <span className="ticker-item">Dashiki</span>
              <span className="ticker-item">·</span>
              <span className="ticker-item">Bogolan</span>
              <span className="ticker-item">·</span>
              <span className="ticker-item">Curated</span>
              <span className="ticker-item">·</span>
              <span className="ticker-item">Invite Only</span>
              <span className="ticker-item">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* MANIFESTO */}
      <section className="manifesto">
        <div className="section-label reveal">01 — Purpose</div>
        <div className="manifesto-body">
          <h2 className="reveal">
            Fashion is never just fabric.
            <br />
            <em>It is memory, pride, and belonging.</em>
          </h2>
          <div className="manifesto-cols">
            <p className="reveal">
              {
                "African fashion has always been world-class. The craft, the colour, the cultural depth — none of it needs to be explained to those who know. What it needed was a stage worthy of it."
              }
            </p>
            <p className="reveal">
              {
                "Bankoma Market was built for every designer who carries a culture in their hands and a story in every stitch — working from Lagos, London, Accra, or Atlanta. This is not just a marketplace. It is an archive, a community, and a home."
              }
            </p>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="pillars-section" id="designers">
        <div className="section-header reveal">
          <h2>
            Everything you need.
            <br />
            <em>{"Nothing you don't."}</em>
          </h2>
          <span className="section-header-label">02 — For Designers</span>
        </div>
        <div className="pillars">
          <div className="pillar reveal">
            <span className="pillar-num">01</span>
            <h3>Curated Access</h3>
            <p>
              Bankoma Market is not open to everyone. Every designer is reviewed
              and accepted. Your work sits alongside quality, not clutter.
            </p>
          </div>
          <div className="pillar reveal">
            <span className="pillar-num">02</span>
            <h3>Your Story, Front & Centre</h3>
            <p>
              {
                "Rich designer profiles. Cultural context. The origin of each piece. We help customers understand not just what they're buying, but where it comes from."
              }
            </p>
          </div>
          <div className="pillar reveal">
            <span className="pillar-num">03</span>
            <h3>Commission Only</h3>
            <p>
              No monthly fees. No upfront costs. We only earn when you earn.
              List for free, pay a small commission per sale.
            </p>
          </div>
        </div>
      </section>

      {/* HOW */}
      <section className="how" id="how">
        <div className="how-header reveal">
          <h2>
            From application
            <br />
            to <em>first sale.</em>
          </h2>
          <span className="how-header-label">03 — How It Works</span>
        </div>
        <div className="how-steps">
          <div className="how-step reveal">
            <span className="step-num">01</span>
            <h3>Apply</h3>
            <p>
              Submit your portfolio and brand story. We review every application
              personally.
            </p>
          </div>
          <div className="how-step reveal">
            <span className="step-num">02</span>
            <h3>Build Your Profile</h3>
            <p>
              Set up your storefront, upload your pieces, and tell the story
              behind your work.
            </p>
          </div>
          <div className="how-step reveal">
            <span className="step-num">03</span>
            <h3>Get Discovered</h3>
            <p>
              Reach customers around the world actively looking for authentic
              African fashion.
            </p>
          </div>
          <div className="how-step reveal">
            <span className="step-num">04</span>
            <h3>Get Paid</h3>
            <p>
              Secure checkout, automatic payouts. We handle payments so you
              focus on the craft.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-left reveal">
          <h2>
            Be part of
            <br />
            <em>
              what
              <br />
              comes
              <br />
              first.
            </em>
          </h2>
          <p>
            {
              "We're opening Bankoma Market to a small founding group of designers and shoppers. Join the waitlist to be considered for early access."
            }
          </p>
        </div>
        <div className="reveal">
          <span className="form-label">Join the waitlist</span>
          {!ctaSuccess ? (
            <div className="form-row">
              <input
                className="form-input"
                type="email"
                placeholder="your@email.com"
                value={ctaEmail}
                onChange={(e) => setCtaEmail(e.target.value)}
              />
              <button className="form-btn" onClick={() => handleSignup("cta")}>
                Join Waitlist
              </button>
            </div>
          ) : (
            <div className="success-msg visible">
              ✓ &nbsp; {"You're"} on the list. {"We'll"} be in touch.
            </div>
          )}
          <p className="form-note">
            No spam. Just an invite when the time is right.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">Bankoma Market</div>
        <div className="footer-center">The Home of African Fashion</div>
        <div className="footer-right">© 2026</div>
      </footer>
    </>
  );
}
