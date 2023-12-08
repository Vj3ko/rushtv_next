'use client'
import AnimatedComponent from 'animations/AnimatedComponent'
import Link from 'next/link'

const LINK_COLOR_BLUE = '#5468ff'

const Error = () => {
  return (
    <AnimatedComponent>
      <section className='page__section'>
        <div className='wrapper'>
          <div className='container'>
            <h2>Error occurred!</h2>
            <p>
              Sorry, encountered an error. Go back to
              <Link href='/' style={{ color: LINK_COLOR_BLUE }}>
                {' '}
                home{' '}
              </Link>
              page.
            </p>
          </div>
        </div>
      </section>
    </AnimatedComponent>
  )
}

export default Error
