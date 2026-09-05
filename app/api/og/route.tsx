import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  try {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#f8fafc',
            padding: '60px',
            border: '16px solid #000000',
            fontFamily: 'sans-serif',
          }}
        >
          {/* Top Row: Brand & Availability Badge */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                backgroundColor: '#38bdf8',
                border: '3px solid #000',
                padding: '8px 20px',
                borderRadius: '8px',
                boxShadow: '4px 4px 0px #000',
              }}
            >
              <div
                style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  backgroundColor: '#000',
                }}
              />
              <span
                style={{
                  fontSize: '20px',
                  fontWeight: 900,
                  color: '#000',
                  letterSpacing: '0.05em',
                }}
              >
                A. ISSADURROFIQ JAYA UTAMA
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#6ee7b7',
                border: '3px solid #000',
                padding: '8px 18px',
                borderRadius: '8px',
                boxShadow: '4px 4px 0px #000',
                fontSize: '16px',
                fontWeight: 800,
                color: '#000',
              }}
            >
              AVAILABLE FOR ROLES
            </div>
          </div>

          {/* Center Main Headline */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              maxWidth: '1000px',
            }}
          >
            <div
              style={{
                fontSize: '56px',
                fontWeight: 900,
                lineHeight: 1.1,
                color: '#000000',
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
              }}
            >
              Crafting High-Performance Web Apps & Modern Interfaces
            </div>
            <div
              style={{
                fontSize: '24px',
                color: '#334155',
                fontWeight: 600,
              }}
            >
              Frontend & Full-Stack Developer • React.js • Next.js • TypeScript • Laravel • Node.js
            </div>
          </div>

          {/* Bottom Tech Pills & URL */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '3px solid #000000',
              paddingTop: '24px',
            }}
          >
            <div style={{ display: 'flex', gap: '12px' }}>
              {['Next.js 15', 'React 19', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'].map(
                (tech) => (
                  <div
                    key={tech}
                    style={{
                      backgroundColor: '#ffffff',
                      border: '2px solid #000',
                      padding: '6px 14px',
                      borderRadius: '6px',
                      boxShadow: '2px 2px 0px #000',
                      fontSize: '15px',
                      fontWeight: 700,
                      color: '#000',
                    }}
                  >
                    {tech}
                  </div>
                )
              )}
            </div>

            <div
              style={{
                fontSize: '18px',
                fontWeight: 800,
                color: '#000',
                backgroundColor: '#fed7aa',
                border: '2px solid #000',
                padding: '6px 16px',
                borderRadius: '6px',
                boxShadow: '2px 2px 0px #000',
              }}
            >
              github.com/DevIssa-It
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: unknown) {
    const errorMsg = e instanceof Error ? e.message : 'Unknown error'
    return new Response(`Failed to generate the image: ${errorMsg}`, {
      status: 500,
    })
  }
}
