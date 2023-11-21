import AnimatedComponent from 'animations/AnimatedComponent'
import Link from 'next/link'

const LINK_COLOR_BLUE = '#5468ff'

const NotFound = () => {
  return (
    <AnimatedComponent>
      <section className='page__section'>
        <div className='wrapper'>
          <div className='container'>
            <h2>Lost your way?</h2>
            <p>
              Sorry we can&apos;t find that page. You&apos;ll find loads to
              explore on the
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

export default NotFound
