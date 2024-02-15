import React from 'react'
import style from "@/app/404.module.css"
import { Col, Container, Row } from 'react-bootstrap'
import Link from 'next/link'
function PageNotFound() {
  return (
    <section className={style.page_404}>
    <Container>
      <Row>
        <Col xs={12}>
          <div className="col-sm-10 offset-sm-1">
            <div className={style.four_zero_four_bg}>
              <h1 className={style.h1} >404</h1>
            </div>

            <div className={style.contant_box_404}>
              <h3 className={style.h3}>Look like you're lost</h3>

              <p>The page you are looking for is not available!</p>

              <Link href="/home" className={style.link_404}>
                Go to Home
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
  )
}

export default PageNotFound